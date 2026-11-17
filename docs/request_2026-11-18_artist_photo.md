# 依頼：新しいアーティスト写真を公式ページに入れる（2026-11-18・オーナーの案・Steve から）

## なぜ
- オーナーが新しいアーティスト写真を作った（2026-11-17〜18）。顔は斜めの影の帯で隠し、髪にエメラルドの光が当たる実写。
- 配信と売り込みの場所は、この写真に差し替えた（Spotify・YouTube・Groover・SoundCloud・Bandcamp・OTONAMI は 11/18 に反映済み。Apple Music は承認待ち）。Instagram と TikTok はアニメ絵のまま。
- 公式ページにも同じ写真を入れて、ページから Spotify や YouTube へ行った人が「同じ人だ」と分かるようにしたい。

## オーナーの案（2026-11-18）
1. **favicon にする**（いまは favicon が無い）。
2. **「YAMAKEN.WILD」という名前の横に、写真を小さなアイコンとして入れる**。
3. **ページの中の「YAMAKEN.WILD」の文字を、もう少し太くする**。

先頭の絵（ロボットとパイロットの画・`assets/hero.jpg`）と `og:image` は替えない。

## いつやるか（オーナー 2026-11-18）
- **Apple Music の審査が通ってから**。Apple Music for Artists のアーティスト画像は 11/18 に申請して「承認待ち」。通ったら Steve が知らせる。
- それまでは、このリポでは何も変えない。

## いまのページの事実（2026-11-18 に確認）
- favicon の指定は無い（`index.html` に `rel="icon"` が無い）。
- 名前は `index.html` 24行目の `<h1>YAMAKEN.WILD</h1>`。先頭の絵の左下に重なっている。
- `style.css` 31行目：`h1 { font-size: 32px; font-weight: 500; letter-spacing: .08em; }`。書体は Helvetica Neue。

## やること（中身の案・決めるのはこのリポのセッションとオーナー）
- favicon：`favicon.ico`（16・32・48）と `favicon-32.png`、ホーム画面用の `apple-touch-icon.png`（180）を置き、`<head>` に指定を足す。
- 名前の横のアイコン：`<h1>` の左に丸いアイコンを置く。文字の高さに合わせて 32〜40px くらい（素材は 192px）。丸く切るのは CSS で。
- 名前の太さ：`font-weight` を 500 から 700 に。Helvetica Neue には 600 が無い端末が多いので、700 が確実。
- 連載の題（`.story h2.series`）は 500 のままにする（映像の題と同じ形、という決まりがある）。名前だけが太くなり、名前と題の強弱がつく。

## 素材の置き場所
- `~/Git/Steve/tmp/yamaken_light/final/site/`
  - `favicon.ico`・`favicon-32.png`・`apple-touch-icon.png`・`icon-512.png`：髪と影の帯を主役にした切り抜き。16px でも緑の髪と黒い帯の形が残ることを見本で確かめた。
  - `name-icon-192.jpg`：顎・首・上着まで入る切り抜き。名前の横のアイコン用。
- 元の完成版は `~/Library/Mobile Documents/com~apple~CloudDocs/ミュージック/Yamaken/` の `yamaken_wild_light_*.jpg`（位置情報なし）。別の大きさが要るときはここから切り出す。

## 守ること
- 顔の出ている元写真や途中のファイルは使わない（顔を出さない方針）。使うのは上の素材だけ。
- ピクセルの ID とイベント名は変えない。4言語とも同じ作りにする。
- 先頭の画面は広告（MUS-149・11/27 まで）の計測に結びついている。公開したら日時を Steve に伝える（比較の区切りにする）。
- 文言は足さない。足すときはオーナーの確認（公開の言葉）。
