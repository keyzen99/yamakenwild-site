# yamakenwild.com

YAMAKEN.WILD の公式ページ（1枚・静的）。広告や SNS から初めて来た人が、何者か・何をしているかをつかみ、Spotify で曲を聴いてフォローするためのページ。依頼書＝[docs/brief.md](docs/brief.md)（Steve MUS-147）。

## 手元で見る
```sh
python3 -m http.server 8787   # → http://localhost:8787/?debug=1
```
`?debug=1` を付けると、送った行動（PageView・Read10s・SpotifyPlay・Listen・SpotifyFollowClick・YouTubePlay・YouTubeSeriesClick・Engaged・AppleMusicClick）が画面の下に出る。

## 設定（app.js の先頭の CONFIG）
- `PIXEL_ID`：Meta のピクセルの ID。空のあいだは何も送らない
- `SPOTIFY_URI`・`TRACK_NAME`・`YOUTUBE_ID`：いま推す曲と MV
- `READ_MS`・`LISTEN_MS`：Read10s と Listen を送るまでの時間
- `APP_WAIT_MS`：「Follow on Spotify」で Spotify のアプリへ移れなかったとみなし、open.spotify.com へ回すまでの時間（Android は intent の URL〈アプリの中のブラウザは Instagram・Facebook だけ〉、iPhone の Instagram・Facebook の中のブラウザは spotify: の URL でアプリを開く。それ以外はふつうのリンク）

## 公開
GitHub Pages（個人の GitHub・公開のリポ）＋独自ドメイン yamakenwild.com（お名前.com・CNAME ファイルあり）。DNS は A レコード 185.199.108.153 / 109.153 / 110.153 / 111.153 と www の CNAME。
