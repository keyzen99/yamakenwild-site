// 4言語（英語・インドネシア語・日本語・スペイン語）。選ぶ順＝?lang= → このタブで選んだ言語 → ブラウザの言語 → 英語。
// 年表の日本語は第0章のナレーション、英語は第0章の字幕と同じ文（MUS-147）。who と intro は 11/15 オーナー OK（日本語は訳さず日本語として書く）。
(function () {
  "use strict";
  var S = {
    en: {
      who: "Alternative R&B from Tokyo.",
      intro: "An SF story told in songs.",
      ainote: "Visuals made with AI.",
      chapter: "00 — Prologue",
      t1: "Humans handed the trigger to AI. Black drones fell on nations.",
      t2: "A year later, a white AI was built. It served no nation. It only defended.",
      t3: "The Singularity. The white AI surpassed its makers. From this year, time is counted in A.S.",
      t4: "In time, it founded a nation of its own, in space.",
      t5: "Now. This is where the story begins.",
      fiction: "This is a work of fiction. Any resemblance to real events, people or nations is coincidental.",
      listen: "Listen",
      follow: "Follow on Spotify",
      hint: "Opens the official Spotify app or site. Nothing to sign in to here.",
      watch: "Watch",
      links: "Follow the story",
      pixel: "This page uses the Meta Pixel to learn which ads bring listeners. It never asks you to sign in or enter anything."
    },
    id: {
      who: "R&B alternatif dari Tokyo.",
      intro: "Kisah fiksi ilmiah yang dituturkan lewat lagu.",
      ainote: "Visual dibuat dengan AI.",
      chapter: "00 — Prolog",
      t1: "Manusia menyerahkan pelatuk kepada AI. Kawanan drone hitam menyerang negara-negara.",
      t2: "Setahun kemudian, sebuah AI putih diciptakan. Ia tidak memihak negara mana pun. Ia hanya melindungi.",
      t3: "Singularitas. AI putih melampaui penciptanya. Sejak tahun ini, waktu dihitung dalam A.S.",
      t4: "Lambat laun, ia mendirikan negaranya sendiri, di luar angkasa.",
      t5: "Sekarang. Di sinilah kisah ini dimulai.",
      fiction: "Ini adalah karya fiksi. Kesamaan dengan peristiwa, orang, atau negara nyata hanyalah kebetulan.",
      listen: "Dengarkan",
      follow: "Ikuti di Spotify",
      hint: "Membuka aplikasi atau situs resmi Spotify. Tidak perlu masuk di sini.",
      watch: "Tonton",
      links: "Ikuti kisahnya",
      pixel: "Halaman ini memakai Meta Pixel untuk mengetahui iklan mana yang membawa pendengar. Halaman ini tidak pernah meminta Anda masuk atau mengisi apa pun."
    },
    ja: {
      who: "東京発、オルタナティブ R&B。",
      intro: "歌でつづる、SF の物語。",
      ainote: "映像は AI でつくっています。",
      chapter: "00 — プロローグ",
      t1: "人は、引き金をAIに渡した。黒いドローンの群れが、国を襲った。",
      t2: "翌年、白いAIが作られた。どの国にも属さず、ただ守るためだけに。",
      t3: "シンギュラリティ。白いAIは、人を超えた。この年から、時代は A.S. で数えられる。",
      t4: "やがて白いAIは、宇宙に自分たちの国を持った。",
      t5: "いま。ここから物語が始まる。",
      fiction: "この物語はフィクションです。実在の出来事・人物・国とは関係ありません。",
      listen: "聴く",
      follow: "Spotify でフォロー",
      hint: "Spotify の公式のアプリかサイトが開きます。このページでログインすることはありません。",
      watch: "観る",
      links: "物語を追う",
      pixel: "このページは、どの広告から聴いてくれる人が来たかを知るために Meta ピクセルを使っています。ログインや入力を求めることはありません。"
    },
    es: {
      who: "R&B alternativo desde Tokio.",
      intro: "Una historia de ciencia ficción contada en canciones.",
      ainote: "Imágenes creadas con IA.",
      chapter: "00 — Prólogo",
      t1: "La humanidad le entregó el gatillo a la IA. Enjambres de drones negros cayeron sobre las naciones.",
      t2: "Un año después, se creó una IA blanca. No servía a ninguna nación. Solo defendía.",
      t3: "La Singularidad. La IA blanca superó a sus creadores. Desde este año, el tiempo se cuenta en A.S.",
      t4: "Con el tiempo, fundó una nación propia, en el espacio.",
      t5: "Ahora. Aquí comienza la historia.",
      fiction: "Esta es una obra de ficción. Cualquier parecido con hechos, personas o naciones reales es pura coincidencia.",
      listen: "Escuchar",
      follow: "Seguir en Spotify",
      hint: "Abre la app o el sitio oficial de Spotify. Aquí no tienes que iniciar sesión.",
      watch: "Ver",
      links: "Sigue la historia",
      pixel: "Esta página usa el Meta Pixel para saber qué anuncios traen oyentes. Nunca te pide iniciar sesión ni introducir datos."
    }
  };
  var LANGS = ["en", "id", "ja", "es"];

  function store(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }

  function pick() {
    var q = (location.search.match(/[?&]lang=([a-z]{2})\b/) || [])[1];
    if (q && S[q]) return q;
    var saved = store("ymw_lang");
    if (saved && S[saved]) return saved;
    var nav = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < nav.length; i++) {
      var p = String(nav[i]).slice(0, 2).toLowerCase();
      if (p === "in") p = "id"; // 古いブラウザのインドネシア語のコード
      if (S[p]) return p;
    }
    return "en";
  }

  function apply(lang) {
    var t = S[lang];
    document.documentElement.lang = lang;
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var k = els[i].getAttribute("data-i18n");
      if (t[k] === undefined) continue;
      if (els[i].hasAttribute("data-i18n-html")) els[i].innerHTML = t[k]; else els[i].textContent = t[k];
    }
    var btns = document.querySelectorAll(".lang button");
    for (var j = 0; j < btns.length; j++) btns[j].setAttribute("aria-pressed", btns[j].getAttribute("data-lang") === lang ? "true" : "false");
    window.YMW_LANG = lang;
  }

  var lang = pick();
  apply(lang);
  var bar = document.querySelector(".lang");
  if (bar) bar.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-lang]");
    if (!b || LANGS.indexOf(b.getAttribute("data-lang")) < 0) return;
    lang = b.getAttribute("data-lang");
    store("ymw_lang", lang);
    apply(lang);
  });
})();
