# Axe TTS Bridge

Node.js 22以降。追加依存なし。Bearer認証、許可済みプロファイル／スタイル、1件ずつの生成、requestIdの冪等性、WAV・サイズ・長さの検証を提供します。

起動・PC設定・プロキシ設定は [docs/tts-setup.md](../../docs/tts-setup.md) を参照してください。

- `GET /api/tts/health`: Irodoriの疎通とロード状態。
- `GET /api/tts/profiles`: ID、表示名、revision、スタイルIDの一覧。
- `POST /api/tts/voices`: 認証済み端末の試聴WAV（最大10MiB・60秒）をIrodoriへ登録し、内容ハッシュから作った参照音声IDを返します。同じWAVの再登録は同じIDです。
- `POST /api/tts/synthesize`: `{ requestId, text, profileId, styleId, settings?: { caption, seed, steps, speed, voiceId } }` からWAVを返します。seedは文字列。voiceIdは登録済み参照音声のID（空欄はプロファイル既定）。

応答ヘッダー: `X-TTS-Duration-Ms`, `X-TTS-Profile-Revision`。

`TTS_BRIDGE_TOKEN`（16文字以上）を必須とします。既定の設定ファイルは同じディレクトリの `profiles.json` で、サンプルとして `melissa/default` を用意しています。直接編集してBridgeを再起動してください。別のファイルを使う場合は `TTS_PROFILES` で指定します。設定ファイルが存在しない場合は起動エラーになります。`TTS_UPSTREAM`, `TTS_BRIDGE_PORT` も指定できます。待受は127.0.0.1に固定。任意の外部URL・参照ファイルパス・モデル指定は受け付けません。CORSは開放しません。

同じrequestIdに異なる内容を渡すと409を返します。失敗も含め結果を90秒保持し、再試行で生成を重複させません。最大10要求、200個のID、WAVキャッシュ128MiB。期限切れやキャッシュから外れた結果を同じIDで無制限に再生成しません。
