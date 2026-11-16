# 依頼：最初の画面で再生できるようにする（2026-11-16・オーナー OK・Steve の音楽の日次から）

## なぜ
- 広告（MUS-149・Instagram のリールの面）から来た人の動き＝ピクセルの2日分（公開のページだけ）で PageView 49・Read10s 22・SpotifyPlay 1・Listen 0・SpotifyFollowClick 1。
- 10秒いた 22人のうち、再生を押したのは1人。「鳴らない」ではなく「押さない」が漏れ。
- 今の作り：先頭が縦長の絵（hero.jpg 720×900）＋名前と2行。Spotify の埋め込みは次の節（Listen）で、スマホでは最初の画面の下に出る。広告から来た人はリールの続きの気分のまま最初の画面で止まる。

## やること（中身の案・決めるのはこのリポのセッションとオーナー）
- 最初の画面（スマホで縦 1 画面）の中に、押せば曲が鳴るものを置く。案：
  1. Spotify の埋め込み（TAIFU・コンパクト 80px）を絵の上か直下に重ねる＝今の SpotifyPlay・Listen の計測がそのまま使える
  2. 広告と同じ縦の映像のまま曲が流れる YouTube のショート（ログイン不要）＝YouTubePlay を「聴いた」に数える計測を足す
- 絵は残してよい（オーナーが選んだ画）。高さを詰めて再生を最初の画面に入れる。
- 文言を変える・足すときはオーナーの確認（公開の言葉）。

## 測るもの（Steve が毎朝読む）
- (SpotifyPlay + YouTubePlay) ÷ Read10s（今 1÷22）と Listen の件数。
- 直したら公開の日時を Steve に伝える（MUS-149 の比較の区切りにする）。

## 守ること
- ピクセルの ID・イベント名（PageView・Read10s・SpotifyPlay・Listen・SpotifyFollowClick・YouTubePlay・YouTubeSeriesClick）は変えない（広告の目標とカスタムコンバージョンが名前で結びついている）。
- 4言語（EN・ID・JA・ES）とも同じ作り。
