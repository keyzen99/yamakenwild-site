# 依頼：Spotify のフォローボタンで、Spotify アプリを直接開く（2026-11-21・オーナー OK・Steve の音楽の日次から）

## なぜ
- 広告（MUS-149）から来た人が公式ページで「Follow on Spotify」を押した数（ピクセルの SpotifyFollowClick・広告のクリックから7日）は、11/14〜19 で 16件。
- 同じ期間に Spotify for Artists で増えたフォロワーは +3（1→4・28日の窓は 11/19 まで＝遅れは差し引き済み）。押した人の約2割しかフォローになっていない。
- 11/20 にオーナーと決めた条件「押下の半分も実際のフォローにならなければ、ボタンの先を直す」に当たった。11/21 の日次でオーナーが依頼を OK。
- 今の作り：`index.html` の `#follow-spotify` は `https://open.spotify.com/artist/5FAwNVjJ845iEXphlAFnzU` を `target="_blank"` で開くだけ。広告から来た人は Instagram の中のブラウザでこのページを見ている。そこから open.spotify.com を開くと、多くの場合 Spotify アプリに渡らず同じブラウザの中で開き、Spotify にログインしていないので、フォローの前にログインを求められて止まる（疑い。Steve 側では実機で確かめていない）。

## やること（中身の案・決めるのはこのリポのセッションとオーナー）
- ボタンを押したら Spotify アプリでアーティストのページが開くようにする。案：
  1. iOS・Android とも、まず `spotify:artist:5FAwNVjJ845iEXphlAFnzU` を開き、アプリが無い（開けなかった）ときだけ `https://open.spotify.com/artist/5FAwNVjJ845iEXphlAFnzU` へ回す。
  2. Android は intent の URL（パッケージ com.spotify.music・フォールバックに open.spotify.com）でも同じことができる。
  3. Instagram の中のブラウザでは独自の URL スキームが止められることがある。止められる場合は、アプリで開くための案内（「…」→「外部ブラウザで開く」）を1行だけ出す、などの代わりの手を考える。
- 実機で確かめる組み合わせ：iPhone と Android のそれぞれで、①Instagram の中のブラウザ ②Safari／Chrome。Spotify アプリが入っている場合と無い場合。
- 下の説明文（`hint`・4言語）は、作りに合わせて直す。「アプリかサイトが開く」の言い方が変わるなら、公開の言葉なのでオーナーの確認を取る。

## 測るもの（Steve が毎朝読む）
- SpotifyFollowClick の数と、Spotify for Artists のフォロワーの増え方の比（今 16 対 +3）。
- 直したら公開の日時を Steve に伝える（比べる区切りにする。Spotify for Artists は約2日遅れ）。

## 守ること
- ピクセルのイベント名（PageView・Read10s・SpotifyPlay・Listen・SpotifyFollowClick・YouTubePlay・YouTubeSeriesClick・Engaged）は変えない（広告の目標とカスタムコンバージョンが名前で結びついている）。押した時点で SpotifyFollowClick を送る今の作りは残す（アプリへ移る前に送り終える）。
- 4言語（EN・ID・JA・ES）とも同じ作り。
- 11/27 に新曲 NEGAU の公開と広告の追加があるので、それより前に出せるとよい。

## 追加（2026-11-21 オーナー OK）：Apple Music を控えめに足す
- なぜ：行き先が Spotify と YouTube だけなので、Spotify を使っていない人はページで止まる。ただし北極星は Spotify フォロワー＋YouTube 登録＝Apple Music は数えない。Spotify を押す人を分けないよう、**Spotify は主のボタンのまま**にする。
- やること：
  1. Spotify のフォローボタンの下に、小さなテキストのリンクで「Apple Music でも聴ける」（4言語・英語の例 Also on Apple Music）。ボタンの形にしない。
  2. 下のリンク一覧（Follow the story）に Apple Music を1行足す。
  3. 押したらピクセルに新しいイベント `AppleMusicClick` を送る。**Engaged には数えない**（広告の目標に入れるかは 11/27 に Steve が決める）。既存のイベント名は変えない。
- リンク先（iTunes Search API で確認・アーティスト ID 1895380795）：`https://music.apple.com/jp/artist/yamaken-wild/1895380795`。国のコード（jp）のままだとウェブでは日本のストアが開く。見る人の国のストアへ回す `https://geo.music.apple.com/artist/yamaken-wild/1895380795` が使えるかを確かめて、使えるならそちらに。Apple Music アプリが入っていればアプリで開くか、iPhone で確かめる。
- 公開はボタンの修正と一緒に1回で。文言はオーナーの承認（push の前の確認に全文を入れる）。

## 今回はやらないこと
- ボタンの上に「フォローする理由」の1行を足す案は、オーナーが 11/21 に「今回はボタンの修正だけ」と決めた＝入れない（修正の効き目だけを測るため）。
