import { TtsApiClient } from '@axe/application/tts/tts-api-client';
import { DEFAULT_TTS_VOICE } from '@axe/domain/tts/tts-types';

describe('TtsApiClient Bridge接続先', () => {
  let api: TtsApiClient;
  const fetchMock = vi.fn();
  beforeEach(() => {
    api = new TtsApiClient();
    api.token = 'test-only-bridge-token';
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('location', { protocol: 'https:' });
    fetchMock.mockReset();
    fetchMock.mockImplementation(() => Promise.resolve(new Response('{}')));
  });
  afterEach(() => vi.unstubAllGlobals());

  it('空欄は同一オリジン、Cookieとリダイレクトを使わずBearer認証する', async () => {
    await api.request('health');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/tts/health');
    expect(init.credentials).toBe('omit');
    expect(init.redirect).toBe('error');
    expect(init.headers.get('Authorization')).toBe('Bearer test-only-bridge-token');
  });

  it.each([
    [' https://tts.example.com ', 'https://tts.example.com/api/tts/health'],
    ['https://tts.example.com/api/tts', 'https://tts.example.com/api/tts/health'],
    ['https://tts.example.com/axe/api/tts/', 'https://tts.example.com/axe/api/tts/health'],
  ])('外部URL %s へ接続する', async (base, expected) => {
    api.bridgeUrl = base;
    await api.request('health');
    expect(fetchMock.mock.calls[0][0]).toBe(expected);
  });

  it('試聴音声の登録も同じ外部接続先と認証を使う', async () => {
    api.bridgeUrl = 'https://tts.example.com';
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ id: 'axe-test-reference' })));
    const wav = new Blob(['test wav'], { type: 'audio/wav' });
    expect(await api.registerVoice(wav)).toBe('axe-test-reference');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://tts.example.com/api/tts/voices');
    expect(init.body).toBe(wav);
    expect(init.headers.get('Content-Type')).toBe('audio/wav');
    expect(init.headers.get('Authorization')).toBe('Bearer test-only-bridge-token');
  });

  it('外部生成のWAVと公開された音声メタデータを読み取る', async () => {
    api.bridgeUrl = 'https://tts.example.com/api/tts/';
    fetchMock.mockResolvedValue(
      new Response(new TextEncoder().encode('RIFF0000WAVEtest'), {
        headers: {
          'Content-Type': 'audio/wav',
          'X-TTS-Duration-Ms': '1000',
          'X-TTS-Profile-Revision': 'external-1',
        },
      })
    );
    const result = await api.synthesize('external-test', 'こんにちは', DEFAULT_TTS_VOICE, new AbortController().signal);
    expect(fetchMock.mock.calls[0][0]).toBe('https://tts.example.com/api/tts/synthesize');
    expect(result.durationMs).toBe(1000);
    expect(result.revision).toBe('external-1');
    expect(result.blob.size).toBe(16);
  });

  it.each([
    'http://tts.example.com',
    'http://127.0.0.1:8090',
    '//tts.example.com',
    '/api/tts',
    'javascript:alert(1)',
    'https://user:password@tts.example.com',
    'https://tts.example.com?token=example',
    'https://tts.example.com/#fragment',
  ])('不正・安全でないURL %s は通信前に拒否する', async (url) => {
    api.bridgeUrl = url;
    await expect(api.request('health')).rejects.toThrow('Bridge URL');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('HTTPの開発ページからだけHTTPループバックを許可する', async () => {
    vi.stubGlobal('location', { protocol: 'http:' });
    api.bridgeUrl = 'http://127.0.0.1:8090';
    await api.request('health');
    expect(fetchMock.mock.calls[0][0]).toBe('http://127.0.0.1:8090/api/tts/health');
    api.bridgeUrl = 'http://192.168.1.1:8090';
    await expect(api.request('health')).rejects.toThrow('Bridge URL');
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
