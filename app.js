// YAMAKEN.WILD 公式ページの計測（MUS-147）。
// ページの上の行動を Meta のピクセルへ送り、広告が「曲を自分で聴いた人」を学べるようにする。
// 送る行動は1回の訪問で各1回だけ。PIXEL_ID が空のあいだは送らず、?debug=1 の画面と console に出すだけ。
(function () {
  "use strict";

  var CONFIG = {
    PIXEL_ID: "",                                   // YW の広告アカウントで作ったピクセル（COO が入れる）
    SPOTIFY_URI: "spotify:track:4eJJGgnir1jf80eSIGvyRN", // いま推す1曲＝TAIFU
    TRACK_NAME: "TAIFU",
    YOUTUBE_ID: "C9PUmKzTyMo",                      // TAIFU の MV
    READ_MS: 10000,                                 // Read10s＝画面が見えている時間の合計
    LISTEN_MS: 20000                                // Listen＝実際に再生が進んだ時間の合計（未ログインは30秒の試聴）
  };

  var DEBUG = /[?&]debug=1\b/.test(location.search);
  var fired = {};
  var debugEl = document.getElementById("debug");
  var debugLines = [];
  if (DEBUG && debugEl) debugEl.hidden = false;

  function log(msg) {
    var line = new Date().toTimeString().slice(0, 8) + " " + msg;
    if (window.console) console.log("[ymw] " + line);
    if (DEBUG && debugEl) { debugLines.push(line); debugEl.textContent = debugLines.slice(-10).join("\n"); }
  }

  // ---- Meta のピクセル（ID があるときだけ読み込む） ----
  if (CONFIG.PIXEL_ID) {
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", CONFIG.PIXEL_ID);
  }

  function send(name, params) {
    if (fired[name]) return;
    fired[name] = true;
    if (CONFIG.PIXEL_ID && window.fbq) {
      if (name === "PageView") window.fbq("track", "PageView");
      else window.fbq("trackCustom", name, params || {});
    }
    log("event " + name + (params ? " " + JSON.stringify(params) : "") + (CONFIG.PIXEL_ID ? "" : "（PIXEL_ID 未設定＝送っていない）"));
  }

  send("PageView");

  // ---- Read10s：画面が見えている時間を足していく ----
  var visibleMs = 0;
  var readTimer = setInterval(function () {
    if (document.visibilityState === "visible") visibleMs += 1000;
    if (visibleMs >= CONFIG.READ_MS) { send("Read10s"); clearInterval(readTimer); }
  }, 1000);

  // ---- Spotify の埋め込み（iFrame API）：SpotifyPlay と Listen ----
  var heardMs = 0, lastPos = null, lastLoggedSec = -1;
  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    var el = document.getElementById("spotify-embed");
    IFrameAPI.createController(el, { uri: CONFIG.SPOTIFY_URI, width: "100%", height: 152 }, function (controller) {
      log("spotify ready " + CONFIG.SPOTIFY_URI);
      controller.addListener("playback_update", function (e) {
        var d = e && e.data;
        if (!d) return;
        if (!d.isPaused && !d.isBuffering) {
          send("SpotifyPlay", { track: CONFIG.TRACK_NAME });
          // 再生が自然に進んだ分だけ足す（シークで飛んだ分は数えない）
          if (lastPos !== null && d.position > lastPos && d.position - lastPos < 5000) heardMs += d.position - lastPos;
          var sec = Math.floor(heardMs / 1000);
          if (DEBUG && sec !== lastLoggedSec && sec % 5 === 0) { lastLoggedSec = sec; log("spotify heard " + sec + "s（位置 " + Math.round(d.position / 1000) + "s）"); }
          if (heardMs >= CONFIG.LISTEN_MS) send("Listen", { track: CONFIG.TRACK_NAME, seconds: Math.round(heardMs / 1000) });
        }
        lastPos = d.position;
      });
    });
  };
  var sp = document.createElement("script");
  sp.src = "https://open.spotify.com/embed/iframe-api/v1";
  sp.async = true;
  document.body.appendChild(sp);

  // ---- Follow on Spotify ----
  var follow = document.getElementById("follow-spotify");
  if (follow) follow.addEventListener("click", function () { send("SpotifyFollowClick", { track: CONFIG.TRACK_NAME }); });

  // ---- YouTube の MV：見える位置に来たら読み込む・再生したら YouTubePlay ----
  function loadYouTube() {
    window.onYouTubeIframeAPIReady = function () {
      /* global YT */
      new YT.Player("youtube-embed", {
        host: "https://www.youtube-nocookie.com",
        videoId: CONFIG.YOUTUBE_ID,
        playerVars: { rel: 0, playsinline: 1 },
        events: {
          onStateChange: function (e) { if (e.data === 1) send("YouTubePlay", { video: CONFIG.YOUTUBE_ID }); }
        }
      });
      log("youtube ready " + CONFIG.YOUTUBE_ID);
    };
    var yt = document.createElement("script");
    yt.src = "https://www.youtube.com/iframe_api";
    yt.async = true;
    document.body.appendChild(yt);
  }
  var ytBox = document.getElementById("youtube-embed");
  if ("IntersectionObserver" in window && ytBox) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (x) { return x.isIntersecting; })) { io.disconnect(); loadYouTube(); }
    }, { rootMargin: "200px" });
    io.observe(ytBox);
  } else {
    loadYouTube();
  }
})();
