// ==================== 1. DATA UNDANGAN ====================
const config = {
  bride: { fullName: "Frieren" },
  groom: { fullName: "Himmel" },
  storageKey: "frieren-himmel-sky-v1",
  timeZone: "Asia/Jakarta",
  timeZoneLabel: "WIB",

  venue: {
    name: "Enam Langit by Plataran",
    address: "Butuh, Candirejo, Kec. Borobudur, Kabupaten Magelang, Jawa Tengah",
    mapQuery: "Enam Langit by Plataran Borobudur Magelang",
    mapsUrl: "https://maps.google.com/?q=Enam+Langit+by+Plataran+Borobudur+Magelang",
  },

  schedule: [
    { title: "Akad Nikah", start: "2026-10-31T10:00:00+07:00", end: "2026-10-31T12:00:00+07:00" },
    { title: "Resepsi Pernikahan", start: "2026-12-31T12:00:00+07:00", end: "2026-10-31T17:00:00+07:00" }
  ],

  music: { src: "assets/music/wedding-song.mp3", volume: 0.5 },

  dana: { image: "assets/pics/dana.jpeg", name: "a.n. Frieren & Himmel" },

  gallery: [
    { src: "assets/pics/frieren-&-himmel-wedding.jpeg", alt: "Ilustrasi pasangan pengantin di pelaminan", caption: "Where our forever begins",  position: "0% 30%"},
    { src: "assets/pics/frieren-&-himmel-in-flower-field.jpg", alt: "Ilustrasi pasangan berbaring di antara bunga", caption: "A fraction of a journey, an eternity under the same sky." },
    { src: "assets/pics/frieren-&-himmel-dancing.jpg", alt: "Ilustrasi pasangan berdansa di ladang bunga", caption: "A fleeting waltz that transcends lifetimes.", position: "0% 20%"},
    { src: "assets/pics/frieren.jpg", alt: "Potret ilustrasi Frieren", caption: "Frieren, a gentle light" },
    { src: "assets/pics/himmel.jpg", alt: "Potret ilustrasi Himmel", caption: "Himmel, a place called home" }
  ],

  closing: "Kehadiranmu adalah bahagia yang melengkapi hari kami. Terima kasih untuk setiap doa dan cinta yang dititipkan."
};

const firstEvent = config.schedule[0];

// ==================== 2. FUNGSI BANTU ====================
const $ = id => document.getElementById(id);

function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatDate(value, options) {
  return new Intl.DateTimeFormat("id-ID", { timeZone: config.timeZone, ...options }).format(new Date(value));
}
const longDate = value => formatDate(value, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const clock = value => formatDate(value, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).replace(".", ":");

// Ikon SVG
const iconPaths = {
  envelope: ["M3 5h18v14H3z", "m3 6 9 7 9-7"],
  home: ["m3 10 9-7 9 7", "M5 9v12h14V9", "M9 21v-8h6v8"],
  heart: ["M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"],
  calendar: ["M4 5h16v16H4z", "M8 3v4m8-4v4M4 10h16M8 14h2m4 0h2m-8 3h2"],
  image: ["M3 3h18v18H3z", "m3 17 6-6 5 5 3-3 4 4", "M16 7h.01"],
  gift: ["M3 8h18v4H3zM5 12v9h14v-9M12 8v13", "M12 8C5 8 5 2 8 3s4 5 4 5Zm0 0c7 0 7-6 4-5s-4 5-4 5Z"]
};
function drawIcon(node) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.4");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  (iconPaths[node.dataset.icon] || iconPaths.heart).forEach(d => {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", d);
    svg.append(path);
  });
  node.replaceChildren(svg);
}
document.querySelectorAll("[data-icon]").forEach(drawIcon);

document.querySelectorAll("[data-bind]").forEach(node => {
  const value = node.dataset.bind.split(".").reduce((obj, key) => obj?.[key], config);
  if (typeof value === "string") node.textContent = value;
});

document.querySelectorAll("[data-date]").forEach(node => {
  node.textContent = longDate(firstEvent.start);
  node.setAttribute("datetime", firstEvent.start);
});

const guest = (new URLSearchParams(location.search).get("to") || "").trim().slice(0, 80);
$("coverGuest").textContent = guest || "Tamu Undangan";
if (guest) $("wishName").value = guest;

// ==================== 3. MUSIK ====================
const audio = $("weddingMusic");
const musicButton = $("musicControl");
const player = $("musicPlayer");
const musicNotice = $("musicNotice");
audio.volume = config.music.volume;

function showMusicNotice(text) {
  $("musicMessage").textContent = text;
  musicNotice.hidden = false;
}

function updateMusicButton() {
  const playing = !audio.paused;
  player.classList.toggle("is-playing", playing);
  musicButton.textContent = playing ? "❚❚" : "▶";
}
async function playMusic() {
  if (!audio.getAttribute("src")) {
    showMusicNotice("File wedding-song.mp3 belum ditambahkan. Pilih audio dari perangkat untuk mencoba musik.");
    return;
  }
  try {
    await audio.play();
    musicNotice.hidden = true;
  } catch (error) {
    if (error.name !== "AbortError") showMusicNotice("Musik belum dapat diputar. Coba tekan tombol putar lagi.");
  }
}
musicButton.addEventListener("click", () => (audio.paused ? playMusic() : audio.pause()));
["playing", "pause", "ended"].forEach(name => audio.addEventListener(name, updateMusicButton));
audio.addEventListener("error", () => showMusicNotice("Berkas musik tidak ditemukan. Periksa path di main.js, atau pilih audio dari perangkat."));
// Progress bar, waktu, dan geser posisi lagu
const formatTime = seconds => Math.floor(seconds / 60) + ":" + String(Math.floor(seconds % 60)).padStart(2, "0");
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  $("playerProgress").style.width = (audio.currentTime / audio.duration) * 100 + "%";
  $("playerTime").textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
});
$("playerBar").addEventListener("click", event => {
  if (!audio.duration) return;
  const box = event.currentTarget.getBoundingClientRect();
  audio.currentTime = ((event.clientX - box.left) / box.width) * audio.duration;
});
$("dismissMusicNotice").addEventListener("click", () => { musicNotice.hidden = true; });

$("localMusic").addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file || !file.type.startsWith("audio/")) return;
  audio.src = URL.createObjectURL(file);
  playMusic();
});

// ==================== 4. COVER & NAVIGASI ====================
const cover = $("cover");
const content = $("invitationContent");

function startReveal() {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;
  document.body.classList.add("js-reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  setTimeout(() => document.querySelectorAll(".reveal").forEach(el => observer.observe(el)), 280);
}

function startNavHighlight() {
  if (!("IntersectionObserver" in window)) return;
  const links = [...document.querySelectorAll(".desktop-nav a, .bottom-nav a")];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle("active", link.hash === "#" + entry.target.id));
    });
  }, { rootMargin: "-10% 0px -60% 0px" });
  document.querySelectorAll(".section-anchor").forEach(section => observer.observe(section));
}

let opened = false;
$("openInvitation").addEventListener("click", () => {
  if (opened) return;
  opened = true;

  player.hidden = false;
  audio.src = config.music.src;
  playMusic();

  document.body.classList.remove("locked");
  content.inert = false;
  window.scrollTo({ top: 0, behavior: "instant" });
  cover.classList.add("is-opening");
  startReveal();
  startNavHighlight();
  updateScroll();

  setTimeout(() => { cover.hidden = true; }, prefersReducedMotion ? 0 : 1080);
});

// ==================== 5. ACARA & COUNTDOWN ====================
const venueQuery = encodeURIComponent(config.venue.mapQuery);
$("eventMap").src = "https://www.google.com/maps?q=" + venueQuery + "&output=embed";
$("mapLink").href = config.venue.mapsUrl;

config.schedule.forEach(item => {
  const column = make("li", "col-sm-6");
  const box = make("div", "bg-body-secondary rounded-3 p-2 h-100");
  box.append(make("strong", "d-block", item.title), make("small", "text-body-secondary", clock(item.start) + " – " + clock(item.end) + " " + config.timeZoneLabel));
  column.append(box);
  $("eventSchedule").append(column);
});

function tick() {
  const remaining = Math.max(0, Date.parse(firstEvent.start) - Date.now());
  const total = Math.floor(remaining / 1000);
  const units = { days: Math.floor(total / 86400), hours: Math.floor(total / 3600) % 24, minutes: Math.floor(total / 60) % 60, seconds: total % 60 };
  Object.entries(units).forEach(([id, value]) => { $(id).textContent = String(value).padStart(2, "0"); });
  $("countdownMessage").textContent = remaining
    ? longDate(firstEvent.start) + " · " + clock(firstEvent.start) + " " + config.timeZoneLabel
    : "Hari bahagia telah tiba. Terima kasih atas cinta dan doa yang mengiringi.";
  if (!remaining) clearInterval(countdownTimer);
}
const countdownTimer = setInterval(tick, 1000);
tick();

// ==================== 6. GALERI ====================
const modal = new bootstrap.Modal($("galleryModal"));
let currentPhoto = 0;

function showPhoto(index) {
  currentPhoto = (index + config.gallery.length) % config.gallery.length;
  const photo = config.gallery[currentPhoto];
  $("lightboxImage").src = photo.src;
  $("lightboxImage").alt = photo.alt;
  $("galleryCaption").textContent = String(currentPhoto + 1).padStart(2, "0") + " / " + String(config.gallery.length).padStart(2, "0") + " — " + photo.caption;
}

config.gallery.forEach((photo, index) => {
  const column = make("div", "col-6 col-md-4");
  const button = make("button", "gallery-item ratio ratio-4x3 p-0 border-0 rounded-3 overflow-hidden reveal");
  button.type = "button";
  const image = make("img", "object-fit-cover");
  image.src = photo.src;
  image.alt = photo.alt;
  image.loading = "lazy";
  if (photo.position) image.style.objectPosition = photo.position;
  button.append(image);
  button.addEventListener("click", () => { showPhoto(index); modal.show(button); });
  column.append(button);
  $("galleryGrid").append(column);
});

$("previousPhoto").addEventListener("click", () => showPhoto(currentPhoto - 1));
$("nextPhoto").addEventListener("click", () => showPhoto(currentPhoto + 1));
$("galleryModal").addEventListener("keydown", event => {
  if (event.key === "ArrowRight") showPhoto(currentPhoto + 1);
  if (event.key === "ArrowLeft") showPhoto(currentPhoto - 1);
});

let touchStartX = null;
$("galleryModal").addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
$("galleryModal").addEventListener("touchend", event => {
  if (touchStartX === null) return;
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 45) showPhoto(currentPhoto + (distance < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });

// ==================== 7. DONASI dana ====================
const danaImage = $("danaImage");
danaImage.src = config.dana.image;
$("danaDownload").href = config.dana.image;
$("danaPath").textContent = config.dana.image;

danaImage.addEventListener("error", () => {
  danaImage.hidden = true;
  $("danaEmpty").hidden = false;
  $("danaDownload").hidden = true;
});

// ==================== 8. UCAPAN ====================
const defaultWishes = [
  { name: "Heiter", message: "Selamat menempuh hidup baru, Frieren dan Himmel! Akhirnya perjalanan panjang ini berlabuh juga di pelaminan. Nikmati hari bahagia ini, dan tentu saja, segelas anggur terbaik untuk merayakannya! 🍷✨", createdAt: "2026-10-20T14:02:00.000Z" },
  { name: "Fern", message: "Selamat berbahagia untuk kalian berdua. Senang sekali melihat penantian panjang ini akhirnya berbuah manis. Semoga kalian selalu saling menjaga—dan Himmel, tolong pastikan Frieren tidak lupa waktu terus ya. 🤍", createdAt: "2026-10-20T14:11:00.000Z" },
  { name: "Stark", message: "Happy Wedding untuk Frieren dan Himmel! Aku sempat gugup membayangkan hari pernikahan kalian, tapi melihat kalian sekarang, kalian benar-benar pasangan yang hebat. Semoga lancar sampai hari H! 🎉", createdAt: "2026-10-20T14:40:00.000Z" }
];
const wishKey = config.storageKey + ":wishes";

function loadWishes() {
  try {
    const data = JSON.parse(localStorage.getItem(wishKey));
    return Array.isArray(data) ? data : defaultWishes;
  } catch {
    return defaultWishes;
  }
}

function renderWishes() {
  const wishes = loadWishes();
  $("wishCount").textContent = wishes.length + " ucapan";
  $("wishList").replaceChildren(...wishes.map(wish => {
    const card = make("article", "card card-body border-0 bg-body-tertiary mb-2 py-2");
    const top = make("div", "d-flex justify-content-between align-items-baseline gap-2");
    const time = make("time", "small text-body-secondary", formatDate(wish.createdAt, { dateStyle: "medium", timeStyle: "short" }));
    time.dateTime = wish.createdAt;
    top.append(make("strong", "", wish.name), time);
    card.append(top, make("p", "small mb-0 mt-1", wish.message));
    return card;
  }));
}

const wishText = $("wishText");
function updateCounter() { $("wishCounter").textContent = wishText.value.length + " / 500"; }
wishText.addEventListener("input", updateCounter);

$("wishForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = $("wishName").value.trim();
  const message = wishText.value.trim();
  const status = $("wishStatus");
  if (name.length < 2 || message.length < 5) {
    status.textContent = "Isi nama minimal 2 karakter dan ucapan minimal 5 karakter.";
    status.className = "form-text mt-2 mb-0 text-danger";
    return;
  }
  try {
    const wishes = loadWishes();
    wishes.unshift({ name, message, createdAt: new Date().toISOString() });
    localStorage.setItem(wishKey, JSON.stringify(wishes.slice(0, 100)));
    renderWishes();
    wishText.value = "";
    updateCounter();
    status.textContent = "Terima kasih. Ucapan tersimpan di browser ini.";
    status.className = "form-text mt-2 mb-0 text-success";
  } catch {
    status.textContent = "Ucapan belum tersimpan. Penyimpanan browser tidak tersedia.";
    status.className = "form-text mt-2 mb-0 text-danger";
  }
});
renderWishes();

// ==================== 9. EFEK: KELOPAK BIRU & SCROLL ====================
if (!prefersReducedMotion) {
  for (let i = 0; i < 8; i++) {
    const petal = make("span", "petal");
    petal.style.left = (i * 13 + 3) + "%";
    petal.style.setProperty("--duration", (18 + i * 1.8) + "s");
    petal.style.setProperty("--delay", (-i * 4.6) + "s");
    petal.style.setProperty("--sway", (i % 2 ? 70 : -65) + "px");
    $("petals").append(petal);
  }
}

let scrollQueued = false;
function updateScroll() {
  scrollQueued = false;
  if (document.body.classList.contains("locked")) return;
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  $("readingProgress").style.transform = "scaleX(" + (maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0) + ")";
}

addEventListener("scroll", () => {
  if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); }
}, { passive: true });