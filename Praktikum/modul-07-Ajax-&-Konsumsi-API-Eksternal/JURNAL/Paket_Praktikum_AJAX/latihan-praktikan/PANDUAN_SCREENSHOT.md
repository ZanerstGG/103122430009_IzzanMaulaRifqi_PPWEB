# Panduan Pengujian dan Screenshot — Modul 07

## Cara menjalankan

1. Buka folder `Paket_Praktikum_AJAX`, klik dua kali `JALANKAN.bat`
   (atau buka terminal di folder itu lalu jalankan `node server.cjs`). Biarkan terminal tetap terbuka.
2. Soal 1: http://127.0.0.1:3007/latihan-praktikan/soal-01/
3. Soal 2: http://127.0.0.1:3007/latihan-praktikan/soal-02/

> Tips: tekan **F12 → tab Network** saat mengambil screenshot. Daftar request (pengumuman.txt, /api/users, status 200/404/503/201)
> menjadi bukti tambahan bahwa data diambil dengan AJAX tanpa reload halaman. Panel **Riwayat aktivitas/Riwayat request** di bawah
> halaman juga mencatat setiap request beserta jamnya.

---

## Soal 1 — Portal informasi praktikum

| No | Langkah | Yang harus terlihat di screenshot | Hasil uji |
|----|---------|-----------------------------------|-----------|
| 1a | Klik **Muat pengumuman**. | Teks pengumuman tampil di kotak `pre`, status "Berhasil (HTTP 200) ... melalui XHR". | Lulus |
| 1b | Buka `soal-01/pengumuman.txt`, ubah satu baris (misal `08.00` → `09.30`), simpan. Klik **Muat pengumuman** lagi **tanpa refresh**. | Isi baru tampil, jam di status berubah. Ambil screenshot sebelum & sesudah. Setelah itu kembalikan isi file. | Lulus |
| 2 | Buka `soal-01/app.js`, ubah baris 7 menjadi `const URL_PENGUMUMAN = "hilang.txt";`, simpan, refresh browser, klik **Muat pengumuman**. | Status merah: "Gagal memuat pengumuman: HTTP 404, file "hilang.txt" tidak ditemukan." URL di bagian atas menampilkan `hilang.txt`. **Kembalikan** ke `"pengumuman.txt"` setelah screenshot. | Lulus |
| 3 | Pilih **Mock lokal**, klik **Ambil peserta**. Selama 1,5 detik loading: ketik di **Catatan praktikan** dan klik **Tambah hitungan** 3 kali. | Tiga peserta (Budi, Siti, Andi), "Sumber: Mock lokal \| Ditampilkan: 3 dari 3 data", catatan masih ada, hitungan = 3, waktu awal tidak berubah. Riwayat aktivitas menunjukkan klik hitungan terjadi **di antara** "Fetch ... dikirim" dan "Fetch selesai". | Lulus |
| 3+ | (Opsional) Screenshot **saat loading**. | Status "Memuat peserta dari Mock lokal...", tombol Ambil peserta abu-abu (nonaktif), tombol Tambah hitungan tetap aktif. | Lulus |
| 4 | Pilih **JSONPlaceholder**, klik **Ambil peserta**. | Dengan internet: 3 pengguna (Leanne Graham, Ervin Howell, Clementine Bauch), "Ditampilkan: 3 dari 10 data". Tanpa internet: pesan gagal yang menyarankan memeriksa internet atau memilih Mock lokal. Pilihan sumber **tetap** JSONPlaceholder. | Lulus (internet tersedia; jalur gagal juga sudah dicoba) |

**Bukti jalur gagal eksternal (opsional):** putuskan Wi-Fi atau di DevTools → Network pilih **Offline**, lalu klik Ambil peserta dengan sumber JSONPlaceholder.
Catatan: mode Offline juga memutus server lokal, jadi kembalikan ke **No throttling** setelah selesai.

---

## Soal 2 — Aplikasi registrasi peserta React

| No | Langkah | Yang harus terlihat di screenshot | Hasil uji |
|----|---------|-----------------------------------|-----------|
| 5 | Buka halaman soal-02, tunggu 1 detik. Lalu klik **Muat ulang**. | Daftar 3 peserta muncul otomatis. Riwayat request: "GET #1 dikirim" (otomatis dari useEffect), lalu "GET #2 dikirim" setelah klik Muat ulang. | Lulus |
| 6a | Pilih skenario **Data kosong**. | Kotak kuning "Data kosong: server mengembalikan 0 peserta (HTTP 200)." Daftar lama hilang. | Lulus |
| 6b | Pilih skenario **Error HTTP**. | Kotak merah "Gagal: server menjawab HTTP 503 - Simulasi server bermasalah." Daftar lama hilang. | Lulus |
| 7 | Pilih **Timeout**, tunggu, lalu pilih **Berhasil**. | Pesan "Waktu tunggu habis: server tidak menjawab dalam 700 ms (timeout)." Riwayat: "GET #.. gagal setelah ~710 ms: ECONNABORTED". Setelah pilih Berhasil, 3 peserta tampil lagi dan tombol aktif. | Lulus (gagal di ±712 ms) |
| 8 | Pilih **Error HTTP**, lalu **segera** (< 1 detik) pilih **Data kosong** (atau Berhasil). | Hasil akhir mengikuti pilihan terakhir. Riwayat menunjukkan "GET #.. dibatalkan (AbortController) karena pilihan berubah." dan teks "Hasil di atas berasal dari skenario: ..." sesuai pilihan terakhir. | Lulus |
| 9 | Pastikan skenario **Berhasil**. Isi Nama `Rina Praktikan`, Email `rina@example.com`, klik **Kirim pendaftaran**. | Kotak hijau "Simulasi berhasil, data tidak disimpan." Status HTTP 201, id 101, name Rina Praktikan, email rina@example.com, simulated true. Daftar GET di kiri tetap 3 peserta (klik Muat ulang untuk membuktikan). | Lulus |
| 10a | Isi Nama hanya spasi, Email valid, klik Kirim. | Pesan merah di bawah Nama: "Nama wajib diisi dan tidak boleh hanya berisi spasi." Halaman tidak reload. | Lulus |
| 10b | Isi Nama valid, Email `rina-example.com`, klik Kirim. | Pesan merah di bawah Email: "Format email tidak valid. Contoh yang benar: nama@example.com". | Lulus |

**Kondisi gagal untuk laporan:** screenshot 2 (HTTP 404), 6b (HTTP 503), atau 7 (timeout) dapat dipakai sebagai "satu kondisi gagal".

---

## Ringkasan alur untuk laporan

- **XHR (Soal 1, pengumuman):** event `click` → `new XMLHttpRequest()` → `open("GET", "pengumuman.txt", true)` → `send()`.
  `onreadystatechange` menunggu `readyState === 4`, memeriksa `status` 200–299, lalu mengisi `<pre id="isi-pengumuman">` dengan `responseText`.
  `onerror`/`ontimeout` menangani gangguan jaringan; `onloadend` mengaktifkan kembali tombol.
- **Fetch (Soal 1, direktori):** event `click` → `fetch(url)` → periksa `response.ok` → `response.json()` → ambil `slice(0, 3)` →
  isi `<ul id="daftar-peserta">` dan `#info-peserta`. Blok `finally` mengaktifkan tombol kembali.
- **Axios (Soal 2):** `axios.get(url, { timeout, signal })` membaca `response.data`; `axios.post("/api/users", objekData)` mengirim JSON
  dan menerima HTTP 201. Axios otomatis menolak promise untuk status 4xx/5xx dan timeout, sehingga cukup ditangani di `catch`.
- **useState:** menyimpan `users`, `loading`, `error`, `skenario`, `form`, `formError`, `mengirim`, `hasilPost`. Setiap perubahan state membuat React menggambar ulang bagian yang berubah.
- **useEffect:** menjalankan GET saat render pertama dan saat `[skenario, percobaan]` berubah. Cleanup-nya (`aktif = false` + `controller.abort()`)
  membatalkan request lama sehingga response lama tidak menimpa pilihan terbaru.
