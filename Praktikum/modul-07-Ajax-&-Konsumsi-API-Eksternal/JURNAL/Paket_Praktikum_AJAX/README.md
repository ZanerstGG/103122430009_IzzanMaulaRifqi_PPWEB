# Praktikum AJAX - Mulai di sini

Paket pendamping Modul 07: AJAX dan konsumsi API. Semua pengguna dalam mock adalah data fiktif.

## Jalankan di Windows

1. Ekstrak **seluruh** ZIP ke satu folder biasa.
2. Pastikan Node.js 18 atau lebih baru tersedia. Jika belum, instal Node.js LTS dari https://nodejs.org dan buka kembali terminal.
3. Klik dua kali **JALANKAN.bat**. Browser dibuka otomatis.
4. Jika browser tidak terbuka, buka **http://127.0.0.1:3007**.
5. Biarkan terminal berjalan. Tekan **Ctrl+C** untuk menghentikan server.

Tidak perlu `npm install`, XAMPP, database, API key, atau sambungan internet untuk contoh 01-08.
Internet diperlukan hanya saat memilih JSONPlaceholder di contoh 09 atau saat mengunduh Node.js.
Jangan membuka contoh AJAX langsung melalui `file://`: server HTTP diperlukan.

## Melalui terminal (Windows, macOS, Linux)

Buka terminal di folder paket, lalu jalankan:

```sh
node server.cjs
```

Buka http://127.0.0.1:3007 secara manual. Alternatif: `npm start` untuk server dan browser otomatis.
Jika port 3007 terpakai, tutup server lama atau gunakan port lain:

Windows Command Prompt:
```bat
set PORT=3008
node server.cjs
```

PowerShell:
```powershell
$env:PORT=3008
node server.cjs
```

Lalu buka http://127.0.0.1:3008. Ini bukan perintah untuk dijalankan dalam console JavaScript browser.

## Daftar contoh

01-apa-itu-ajax: 7.1, perubahan sebagian halaman.
02-cara-kerja-ajax: 7.2, urutan request dan response.
03-event-xhr: 7.3, event klik dan XMLHttpRequest.
04-fetch-get: 7.4.1, membaca JSON dengan Fetch.
05-axios-get: 7.4.2, membaca JSON dengan Axios.
06-axios-post: 7.4.3, mengirim JSON dengan Axios.
07-loading-error: 7.5.1, loading, berhasil, kosong, error, dan timeout.
08-react-state: 7.5.2, useState, useEffect, dan cleanup.
09-api-eksternal: pengayaan, API mock dan JSONPlaceholder.

## Cara membaca dan mengedit kode

Buka folder contoh yang dipilih. `index.html` berisi tampilan; `app.js` berisi logika.
Contoh React memakai `app.jsx`. Buka file di VS Code/editor teks, simpan, lalu refresh browser.
Babel lokal menerjemahkan JSX di browser agar perubahan app.jsx langsung bisa dicoba.
Ini susunan khusus latihan. Untuk aplikasi React produksi, gunakan bundler seperti Vite.
`assets/ui.js` hanya membantu navigasi dan menampilkan kode. `assets/style.css` mengatur tampilan bersama.

## Kontrak API mock

- GET `/api/info`: objek `{ message: ... }`.
- GET `/api/users`: array tiga pengguna, masing-masing memiliki id, name, dan email.
- GET `/api/users?mode=error`: HTTP 503.
- GET `/api/users?mode=empty`: HTTP 200 dengan array kosong.
- Parameter `delay` dalam milidetik, dibatasi 0-5000.
- POST `/api/users`: kirim JSON `{ "name": "Budi", "email": "budi@example.com" }`.
  Response HTTP 201: id 101, name, email, simulated true. Tidak disimpan; GET tetap berisi data awal.
- POST tidak valid mengembalikan HTTP 400; tipe isi selain JSON mendapat HTTP 415.

Server ini hanya mendengarkan 127.0.0.1 dan ditujukan untuk praktikum di komputer sendiri.
Server statis Python atau XAMPP biasa tidak menyediakan endpoint mock ini. Gunakan `server.cjs` agar seluruh contoh bekerja.

## Jika ada masalah

- `node` tidak dikenali: instal Node.js LTS, lalu tutup dan buka kembali terminal.
- Situs tidak dapat dijangkau: pastikan server hidup dan alamat/port sesuai.
- `Unexpected token <` saat membaca JSON: URL mungkin menuju HTML, bukan endpoint API.
- Error 503 pada contoh 07/08: memang skenario gagal. Pilih Berhasil untuk pulih.
- Timeout contoh 07: memang disengaja. Pilih Berhasil untuk melanjutkan.
- API eksternal gagal: cek internet dan layanan, atau pilih Mock lokal. Tidak ada perpindahan sumber otomatis.
- CORS API eksternal: izinnya diatur server API. Menggunakan `mode: "no-cors"` tidak membuat JSON bisa dibaca.
- Dua request React saat pengembangan: StrictMode dapat menjalankan setup/cleanup effect tambahan. Contoh paket ini tidak mengaktifkan StrictMode.

## Pustaka yang disertakan

Axios 1.7.9, React/ReactDOM 18.3.1, Babel Standalone 7.26.4; lisensi MIT disertakan di vendor.
IBM Plex Sans dan IBM Plex Mono dari Google Fonts memakai SIL Open Font License; berkas lisensi juga disertakan.
Versi tersebut dipatok untuk latihan yang konsisten, bukan klaim versi terbaru.
Daftar sumber dan catatan desain tersedia di SUMBER_DAN_LISENSI.md.
