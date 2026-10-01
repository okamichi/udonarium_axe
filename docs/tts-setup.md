# キャラクター読み上げ（Irodori TTS）

公開チャットの新しいPC発言を、部屋で指定した1台が生成します。本文は生成前に送信され、完成したWAVだけが既存のAudioStorage / P2P経由で参加者に共有されます。生成担当も同じ受信経路で順次再生します。BGM・通常SEとは別のAudioPlayerを使います。

## 開発環境で使う

Node.js 22以降と、起動済みのIrodori TTS Serverが必要です。このリポジトリのBridgeには追加パッケージのインストールは不要です。

リポジトリルートで、Bridge用のターミナルを開きます。

```sh
export TTS_BRIDGE_TOKEN="$(openssl rand -hex 24)"
# この値を生成担当の接続設定に入力します。
printf '%s\n' "$TTS_BRIDGE_TOKEN"
node tools/tts-bridge/server.mjs
```

Bridgeは `127.0.0.1:8090` のみに待ち受け、Irodoriの `http://127.0.0.1:8088` に接続します。別のターミナルで以下を実行します。

```sh
npm start
```

`http://localhost:4200` を開いてください。`angular.json` と `proxy.tts.json` により `/api/tts/` がBridgeへ転送され、ブラウザからは同一オリジンになります。TTSのためのCORS許可は不要です。

1. PCのキャラクターシート → **設定** → **TTS設定** を開きます。
2. **公開セリフを読み上げる** をONにし、プロファイルID・スタイルID・声色・固定シード・生成ステップ・速度を指定します。
3. チャットウィンドウの **歯車** → **TTS設定** → **生成担当・接続設定** で、Bridge認証トークンと読み上げ対象の公開タブを設定します。
4. **この端末を担当にする** を押します。実際に短い文を生成してモデルをウォームアップし、成功後に部屋へ担当を通知します。
5. 各参加者は **担当を探す** → **担当 … を使う** で同じ担当を選び、**この端末で読み上げ** をONにします。音声が開始できない場合は **音声を開始／再開** を押します。
6. 発言者として設定済みのPCを選び、対象タブへ公開セリフを投稿します。

参加者はIrodoriやBridgeを起動する必要はありません。各ブラウザのlocalhostは別の端末を指すため、参加者からGMのlocalhostを呼び出す構成にはしません。

キャラクター設定は同期・複製・キャラクター保存に含まれます。担当、epoch、生成／再生キュー、トークンはセッション内だけに保持し、部屋保存やlocalStorageへ書きません。担当変更時は旧担当で接続を解除し、新担当が起動した後、全参加者が新しい通知を選び直します。

## 声を固定する

サーバー側プロファイルは `tools/tts-bridge/profiles.json` が初期設定です。`melissa/default` はユーザー指定の声色・シード `1520596899881326291`・10ステップを使用します。

通常はこの `profiles.json` を直接編集し、Bridgeを再起動してください。別の設定ファイルを使う場合だけ、`TTS_PROFILES` へファイル名を指定します。指定したファイルや既定の `profiles.json` が存在しない場合は、起動エラーになります。

```sh
export TTS_PROFILES=/absolute/path/to/private-profiles.json
export TTS_UPSTREAM=http://127.0.0.1:8088
node tools/tts-bridge/server.mjs
```

各プロファイルは `name`, `revision`, `voice`, `caption`, `seed`, `steps`, `speed`, `allowCharacterOverrides`, `styles` を持ちます。

- `voice: "none"` はVoice Designを使用します。登録済み参照音声を利用する場合は、Irodori側のvoice IDをここで指定します。ブラウザから任意の参照ファイルパスは指定できません。
- `seed` はJSONでも**文字列**で記載します。19桁の値をJavaScriptの数値にすると精度が失われるためです。Bridgeが検証後に整数のJSONへ変換します。許容範囲は0～9223372036854775807です。
- `steps` はIrodoriのAPIでは `irodori.num_steps` に対応します。1～100、速度は0.5～2、声色は1000文字までです。
- `allowCharacterOverrides: true` のプロファイルでは、各PCの声色・シード・ステップ・速度を適用します。異なるPCは同名でもキャラクターIDで識別されます。
- `false` はサーバー設定を固定するための設定です。現行のPC編集UIからの上書き要求はエラーになります。PCごとの編集を使う通常運用では `true` にしてください。
- `styles` の各キーでサーバー側設定を追加できます。例えば `default` と `calm` を登録し、PCのスタイルIDで選択します。ただしキャラシートから送る声色・シード・ステップ・速度などが優先されるので、IDだけ変更してもそれらの項目はサーバー設定へ切り替わりません。
- 音声添付にはサーバーの `revision` と実際の声設定のハッシュを記録します。参照音声やチェックポイントを変更する際は `revision` も更新してください。

同じcaption・seed・ステップ・速度・モデルを固定すると再現性を保ちやすくなりますが、シードは話者IDではありません。継続して同じPCの声を使う場合は参照音声を固定してください。

キャラシートで自然な文章を **この端末で試聴** し、気に入った声ができたら **この試聴をキャラの声として固定** を押します。試聴WAVを、このブラウザの接続先Bridgeが使うIrodoriサーバへ登録し、参照音声IDをキャラに保存・同期します。次の試聴と新しいチャットの発言は、その参照音声を使って生成します。チャットの生成担当も同じIrodoriサーバを使う必要があります。別のキャラは別の試聴を固定してください。声色の説明は参照音声の特徴に合わせ、発言ごとの感情・演技はタグで指定します。参照にしても声の完全一致は保証できません。

既にIrodoriに登録した音声は **参照音声ID** に直接指定できます。空欄はBridgeプロファイルのvoiceを使用します（初期設定はnone）。参照ファイルのパスやURLは指定できません。生成担当を別サーバへ移す場合は、参照音声ファイルも同じIDで移してください。キャラ保存にはIDだけが含まれ、参照音声の実体はIrodori側のvoicesディレクトリに残ります。過去のセリフのWAVは声の固定で変更されません。

キャラクターの **この端末で試聴** はBridgeへ直接生成を依頼し、ローカルでだけ再生します。試聴WAVは部屋の音声カタログへ登録しません。試聴する端末にはBridgeへの接続設定とトークンが必要です。Bridgeをその端末で起動する必要はありません。

## 発言ごとの感情・演技（v4-Large）

v4-Largeは本文の絵文字による演技制御に対応しています。Bridgeでは日本語の記法を対応する絵文字へ変換し、本文中の位置を維持します。元のチャット表示・同期データは変更しません。

Bridgeは参照音声の有無にかかわらず1発言をまとめて生成します。上流サーバの句点による自動分割で、後半の文に冒頭の演技指示が届かなくなることを避けるためです。絵文字の効果は文脈によって変わるため、弱い場合は `（演技：強い怒りを込めて、鋭く言い切る）` のような文章の指示も試してください。これは発言全体のcaptionに追加されます。

```text
（喜び）会えてうれしい！
（怒り）やめて！（囁き）誰かに聞かれるわ。
😆会えてうれしい！👂ここだけの話ね。
（演技：ためらいながら、語尾を弱めて）実は、話したいことがあるの。
```

- 定型指示: 喜び 😆、怒り 😠、悲しみ 😭、驚き 😲、心配 😟、緊張 😰、安堵 😌、自信 😎、照れ 🫣、囁き／ささやき／小声 👂、優しく 🫶、笑い 🤭、ため息 😮‍💨、早口 ⏩、ゆっくり 🐢、叫び 😱、眠そう 😪、懇願 🙏、ナレーション 📖、間 ⏸️。「通常」は空文字へ変換します（それ以前の絵文字の効果をリセットする指示ではありません）。
- `（怒り）` など、全角丸カッコ内が定型指示に一致する場合はタグとして扱います。自由記述には `（演技：…）` または `（感情：…）` を使います。コロンは半角・全角に対応します。従来の `[感情:…]` と `[演技:…]` も使えます。
- 定型にない自由記述は本文から除き、その発言全体のcaptionに追加します。途中からの演技変更には定型指示か絵文字を使ってください。
- `（本当に？）` など定型指示に一致しない普通の丸カッコや `[注釈:…]` は変更しません。半角丸カッコも通常の本文として扱います。認識した指示は1個100文字、自由記述の合計200文字、固定captionとの合計1000文字までです。本文の300文字上限は記法込みです。
- 固定caption・参照voice・シードは維持します。音声の照合ハッシュには指示を含む元の本文を使うため、感情だけ編集した場合も古い音声の再生を防ぎます。
- 試聴文にも同じ記法を使えます。絵文字は音声モデルへの指示として送られますが、効果は文脈に左右され、完全な再現は保証されません。

## v4-Largeの制御パラメータ

公式モデルカード、公式パラメータガイド、起動中サーバのOpenAPIとローカルソースを2026-09-30に照合しました。感情用の独立した数値フィールドはなく、captionと本文の絵文字を使用します。

| PC／Bridge設定       | 上流API                     | 役割                                              |
| -------------------- | --------------------------- | ------------------------------------------------- |
| 声色・話し方         | `irodori.caption`           | 声の特徴と演技の説明                              |
| プロファイルのvoice  | `voice`                     | 登録済み参照音声による話者指定。`none` は参照なし |
| 固定シード           | `irodori.seed`              | 同じ条件での再現性。話者IDではない                |
| 生成ステップ         | `irodori.num_steps`         | 品質と所要時間の調整                              |
| 速度                 | `speed`                     | 予測音声長を介して話速を調整                      |
| 本文の強度           | `irodori.cfg_scale_text`    | 読み上げ本文への追従                              |
| 声色・演技指示の強度 | `irodori.cfg_scale_caption` | captionへの追従                                   |
| 参照音声の強度       | `irodori.cfg_scale_speaker` | 参照音声への追従。参照なしでは無効                |

CFGはキャラ設定の「指示の強度」で編集できます。空欄は上流サーバの既定値を使い、既存のキャラ設定はそのまま使用できます。通常の既定値は本文3、caption3、参照音声5です。このBridgeでは0～10に制限し、高すぎる値は自然さを損なう可能性があります。Bridgeのプロファイルやstylesにも `cfgScaleText`, `cfgScaleCaption`, `cfgScaleSpeaker` を指定できます。PC側の指定値が優先されます。

既存の10ステップは維持しています。公式v4-Largeの評価は40ステップで行われています。声の一貫性をさらに重視する場合は、同じPCの登録済み参照音声を使用し、固定captionは声の特徴、発言の指示は感情・話し方に絞ります。

上流の実験的な `speaker_kv_scale`、サンプリングスケジュール、LoRA、参照ファイルパスなどは今回のPC編集項目には含めていません。

参照:

- [v4-Large公式モデルカード](https://huggingface.co/Aratako/Irodori-TTS-v4-Large)
- [公式パラメータガイド](https://github.com/Aratako/Irodori-TTS/blob/main/docs/parameters.md)（v4 Small中心の説明のためLargeのモデルカードと照合）
- [公式サーバAPI](https://github.com/Aratako/Irodori-TTS-Server#api)
- ローカルの `/absolute/path/to/Irodori-TTS-v4-Large/EMOJI_ANNOTATIONS.md`（モデルカードからのGitHubリンクは確認時404）
- 起動中の `http://127.0.0.1:8088/openapi.json` と `/absolute/path/to/Irodori-TTS-Server/src/irodori_openai_tts/app.py`

## 配信時の同一オリジン設定

アックスと同じ配信元の `/api/tts/` にプロキシを配置する構成では、Bridge URLを空欄にします。公開HTTPSページからローカルHTTPへ直接接続する構成は標準対応にしません。以下は既存のHTTPS `server` ブロック内へ配置するnginxの例です。NginxとBridgeは同じホスト上で動かします。

```nginx
location /api/tts/ {
    # 必要なら利用端末のIP・ネットワークをallow/denyで制限します。
    # BridgeのBearer認証はアクセス元にかかわらず必須です。
    proxy_pass http://127.0.0.1:8090;
    proxy_http_version 1.1;
    proxy_set_header Authorization $http_authorization;
    proxy_read_timeout 70s;
    client_max_body_size 10m;
}
```

トークンを配布JavaScriptや共有データに埋め込まないでください。BridgeはBearer認証を必須にし、汎用のURL転送やファイルパス指定は提供しません。Nodeの環境変数はBridge用ターミナルでのみ指定します。`TTS_BRIDGE_PORT` で待受ポートを変更できます。

## アックスの配信元と別のオリジンにあるBridgeへ接続する

アックスのHTML・JavaScriptを自分のWebサーバで配信し、TTS用のサーバを別に置く場合にも利用できます。以下ではアックスの配信元を `https://axe.example.com`、Bridgeの公開先を `https://tts.example.com` とします。生成担当はチャットの歯車 → **TTS設定** → **生成担当・接続設定** の **Bridge URL** に `https://tts.example.com/api/tts/` を入力します。`https://tts.example.com` だけなら `/api/tts/` を補います。独自のサブパスを使う場合はAPIのルートまで指定してください。アックスと同じオリジンで `/api/tts/` をプロキシする構成なら、URL欄は空欄のままで使え、CORSも不要です。

Bridge URLと認証トークンはそのブラウザのメモリだけに保持し、部屋・キャラ・localStorageへ保存しません。ページを再読み込みすると再入力が必要です。生成担当中はURLを編集できません。接続先を変更するときは **担当接続を解除** してから変更してください。ヘルス確認、音声生成、キャラの試聴、参照音声登録はすべて同じURLを使います。参加者はBridge URL・トークンを入力せず、P2Pで音声を受け取ります。

外部URLはHTTPSを使用します。認証情報・クエリ・フラグメントを含むURLは拒否し、Cookie送信とリダイレクト追従も行いません。HTTPの開発ページからHTTPの `localhost`・`127.0.0.1`・`[::1]` へ接続する場合だけ例外とします。

構成は `Irodori :8088 ←→ Bridge :8090 ←→ Nginx HTTPS :443 ←→ 生成担当ブラウザ ←→ P2P参加者` です。ブラウザはアックスの配布サーバからアックスを読み込み、そのブラウザからTTS側のNginxへ直接接続します。アックスの配布サーバが音声生成を中継する必要はありません。同じサーバ上のBridgeとIrodoriをループバックで待ち受けさせ、公開する受信ポートはNginxの443番にします。Bridgeを変更せず、NginxでCORSを処理できます。次の例をTTS側の `nginx.conf` の `http { ... }` 内に置き、ドメイン・証明書パス・許可オリジンを実環境に合わせて変更してください。`https://axe.example.com` は自分のアックス配信元のオリジン（スキーム・ホスト・必要ならポート）に置き換えてください。

```nginx
# httpコンテキスト。Originには /udonarium_axe/ のようなパスは含まれません。
map $http_origin $tts_cors_origin {
    default "";
    "https://axe.example.com" "https://axe.example.com";
}
map $http_origin $tts_origin_allowed {
    default 0;
    "" 1; # curlなど、Originを送らない要求もBridgeのBearer認証は必要
    "https://axe.example.com" 1;
}
limit_req_zone $binary_remote_addr zone=tts_api:10m rate=1r/s;

server {
    listen 443 ssl;
    server_name tts.example.com;
    ssl_certificate     /etc/letsencrypt/live/tts.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tts.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location /api/tts/ {
        if ($tts_origin_allowed = 0) { return 403; }
        if ($request_method !~ ^(GET|POST|OPTIONS)$) { return 405; }

        # エラー応答にもCORSヘッダーを付け、ブラウザがエラーを読めるようにする。
        add_header Access-Control-Allow-Origin $tts_cors_origin always;
        add_header Vary Origin always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;
        add_header Access-Control-Expose-Headers "X-TTS-Duration-Ms, X-TTS-Profile-Revision" always;
        add_header Access-Control-Max-Age 600 always;

        # プリフライトにはBearerが付かないので、Bridgeへ転送せず応答する。
        # 実際のGET/POSTは下の転送先で必ず認証する。
        if ($request_method = OPTIONS) { return 204; }

        limit_req zone=tts_api burst=10 nodelay;
        limit_req_status 429;
        client_max_body_size 10m;
        proxy_pass http://127.0.0.1:8090;
        proxy_http_version 1.1;
        proxy_set_header Authorization $http_authorization;
        proxy_connect_timeout 5s;
        proxy_read_timeout 70s;
        proxy_send_timeout 70s;
    }

    location / { return 404; }
}
```

`Authorization` 付きのクロスオリジン要求はプリフライトが必要です。また、WAV検証で使う `X-TTS-Duration-Ms` と `X-TTS-Profile-Revision` を `Access-Control-Expose-Headers` で公開しないと、生成が成功してもアックス側で応答を読めません。CORSヘッダーはNginxだけで付け、Bridge側には重複して追加しません。CORSはブラウザからの利用範囲を制御するもので、認証の代わりにはなりません。公開JavaScriptへトークンを埋め込まず、生成担当が入力してください。

設定後は `nginx -t` で検証し、プリフライトを確認します。

```sh
curl -i -X OPTIONS https://tts.example.com/api/tts/synthesize \
  -H 'Origin: https://axe.example.com' \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: authorization,content-type'
```

204と許可オリジン・メソッド・ヘッダーが返ることを確認してください。認証なしの `GET /api/tts/health` は401、認証付きではヘルス応答が返る構成です。URLは末尾のスラッシュも含め実際のAPIに直接到達するものを指定し、HTTPからHTTPSへの転送や別ドメインへのリダイレクトに頼らないでください。接続エラーの場合はHTTPS証明書、許可Origin、OPTIONS応答、上記の公開ヘッダーを確認します。

参考: [Nginxのadd_header](https://nginx.org/en/docs/http/ngx_http_headers_module.html)、[CORSとプリフライト](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)。

## 対象・制御・保存

- 自動生成は新規送信専用フックだけで開始します。履歴同期、部屋読込、音声添付の復元では開始しません。ダイス／リソースコマンドは新規送信時に除外し、通常のセリフである印を付けます。
- 秘話、秘密、システム、ダイス結果、閲覧制限付きタブ、対象外タブはAPI呼び出しより前に除外します。PL・見学者の両方が閲覧可能なタブだけが対象です。
- 300文字を超えるセリフは生成しません。本文を無断で短縮しません。
- 生成は1件ずつ、待機は最大10件です。Bridgeの生成タイムアウトは60秒、音声待ちは15秒、自動再生期限は受付から90秒です。
- 初回のモデルロードにも時間がかかります。今回の実測はロード約51.82秒、発声処理約2.54秒でした。セッション開始前の担当設定でウォームアップします。初回に60秒を超える環境ではIrodori側で事前ロードしてください。
- **今のセリフをスキップ** と **この端末の待機を破棄** はローカル操作です。担当の **部屋の生成・再生待機を破棄** は全参加者へ中止を通知します。クライアントの中止は結果を破棄するもので、GPU上の処理停止を保証しません。
- 編集・削除・公開範囲変更を再検証して古い音声を破棄します。生成後に共有済みの音声を他端末から回収する機能はありません。
- 各端末は受付順に1件ずつ再生します。厳密に同じ時刻での再生開始は保証しません。途中参加・再有効化では高水位以前を自動再生しません。
- TTS音量は既存SE音量との積です。音声停止でBGM・通常SEは停止しません。
- TTS WAVは専用の `tts` カテゴリで分類し、通常のジュークボックス一覧・保存用音声一覧・アセットZIPから除外します。音声添付参照はチャットに残りますが、実体はセッションキャッシュです。
- キャッシュ上限は128MiBまたは200件。再生待ち・生成結果の共有待ち・転送中・BGM等から参照中のものを保護し、古い未使用TTS音声を破棄します。破棄済みIDは自動再取得から除外します。音声がなくても勝手に再生成しません。

## 検証

```sh
node --test tools/tts-bridge/server.test.mjs tools/tts-bridge/synthesis.test.mjs
npx vitest run src/app/domain/tts src/app/application/tts
npm run lint
npm run build
# Playwrightは上で生成したdist/を配信して検証します。
npx playwright test e2e/tts.spec.ts --project=chromium
# 実Irodori + 一時Bridge + Chromiumで発言から再生まで確認する場合
TTS_REAL_E2E=1 npx playwright test e2e/tts.spec.ts --project=chromium --workers=1
```

実IrodoriとBridgeの疎通・WAV検証は以下で実行できます。短い発声を1回生成し、WAVをOSの一時ディレクトリへ保存します。認証トークンはこの試験内だけで生成・破棄します。

```sh
node tools/tts-bridge/smoke.mjs
```
