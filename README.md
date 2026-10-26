# ☁️ Frieren & Himmel — Love Among The Clouds
**Digital Wedding Invitation Template**

Proyek ini adalah *template* undangan pernikahan digital berbasis web dengan tema "Sky & Clouds" (Langit & Awan) yang terinspirasi dari karakter Frieren dan Himmel. Undangan ini dirancang agar responsif (mendukung tampilan HP dan PC), interaktif, dan mudah dikonfigurasi tanpa harus mengubah struktur HTML secara manual[cite: 6, 7, 8].

---

## ✨ Fitur Utama
* **Konfigurasi Terpusat**: Seluruh data mempelai, jadwal acara, teks ucapan, dan daftar foto galeri diatur melalui satu objek konfigurasi (JSON/JavaScript) di dalam file `main.js`.
* **Animasi Interaktif**: Dilengkapi dengan animasi pintu pembuka (*cover door*), efek kelopak biru berjatuhan (*petal fall*), dan efek transisi kemunculan elemen (*reveal*)[cite: 7, 8].
* **Penghitung Waktu Mundur (*Countdown*)**: Otomatis menghitung hari, jam, menit, dan detik menuju jadwal acara pertama[cite: 7].
* **Pemutar Musik Latar**: Pemutar musik dengan animasi gelombang suara (*equalizer*) di sudut layar[cite: 6, 8]. Jika file musik gagal dimuat, tamu dapat memilih lagu dari perangkat mereka sendiri[cite: 6, 7].
* **Galeri Foto (Lightbox)**: Galeri foto dengan fitur *modal lightbox* yang mendukung navigasi *swipe* (usap) di layar sentuh dan panah *keyboard*[cite: 6, 7].
* **Buku Tamu (*Guestbook*)**: Formulir ucapan dan doa yang dinamis. (Catatan: Versi saat ini menyimpan data menggunakan *LocalStorage* peramban / demo-mode)[cite: 6, 7].
* **Simpan ke Kalender**: Tombol untuk mengunduh jadwal acara dalam format `.ics` agar tamu dapat menyimpannya ke Google/Apple Calendar.
* **Hadiah Digital**: Integrasi QR Code DANA untuk penerimaan tanda kasih secara digital[cite: 6, 7].

---

## 📂 Struktur Proyek
Sebagian besar fitur dan gaya pada proyek ini bergantung pada file-file berikut:
* `index.html` - Struktur utama halaman undangan[cite: 6].
* `js/main.js` - Pusat logika (konfigurasi data, *countdown*, kontrol pemutar musik, dan pengelolaan *guestbook*)[cite: 6].
* `css/style.css` - Desain tampilan utama, variabel warna tema langit, kueri media (*media queries*) untuk tampilan responsif, dan *keyframes* animasi[cite: 6, 8].
* `bootstrap-5.3.8-dist/` - Direktori *framework* Bootstrap 5 (hanya menggunakan fitur *Grid* dan *Modal*)[cite: 6].
* `assets/` - Folder penyimpanan aset *font* kustom (Cormorant & Inter), gambar (`.jpg`, `.jpeg`, `.webp`), dan audio (`.mp3`)[cite: 6, 8].

---

## 🛠 Panduan Konfigurasi & Personalisasi

### 1. Mengubah Data Mempelai, Acara, dan Galeri
Buka file `js/main.js`[cite: 6]. Anda hanya perlu mencari dan mengubah isi dari objek `const config = { ... }` di baris paling atas[cite: 7]:
- `bride` & `groom`: Ubah nama mempelai[cite: 7].
- `venue`: Ubah nama gedung, alamat, dan *link* Google Maps[cite: 7].
- `schedule`: Atur tanggal dan waktu (*start* & *end*) untuk Akad dan Resepsi dengan format ISO (misal: `2026-10-31T10:00:00+07:00`)[cite: 7].
- `dana`: Ubah jalur file gambar *barcode* dan nama akun penerima[cite: 7].
- `gallery`: Tambah/hapus daftar gambar, *caption*, dan penyesuaian posisi potong gambar (misal: `position: "0% 30%"`)[cite: 7].

### 2. Mengubah Warna Tema (Palette)
Buka file `css/style.css` dan cari bagian `:root` di baris atas[cite: 6, 8]. Ubah kode *hex color* sesuai selera Anda:
```css
:root {
  --sky: #3B7EA6;             /* biru langit utama */
  --deep-blue: #1C598A;       /* biru tua: teks/elemen kontras */
  --ice-blue: #8EC3E6;        /* aksen biru es */
  --cloud-white: #F8FBFE;     /* putih awan (background dasar) */
  /* ... dan warna lainnya */
}
