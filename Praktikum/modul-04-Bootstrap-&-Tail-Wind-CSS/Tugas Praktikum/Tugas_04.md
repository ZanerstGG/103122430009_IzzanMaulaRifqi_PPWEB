<div align="center">

# LAPORAN PRAKTIKUM

*Disusun untuk memenuhi Tugas Laporan Praktikum Mata Kuliah Perancangan dan Pemrograman Web*

<br><br>

<img src="TUP_Vertikal.png" alt="Deskripsi Gambar" width="300" height="300" />

<br><br>

**Disusun oleh :**

| Nama | NIM |
|---|---|
| Izzan Maula Rifqi | 103122430009 |

<br><br>

### PROGRAM STUDI S1 SOFTWARE ENGINEERING
### TELKOM UNIVERSITY PURWOKERTO

### 2026 / 2027

</div>

<br>

---

# Laporan Praktikum 04: BOOTSTRAP & TAILWIND CSS

**Nama:** Izzan Maula Rifqi <br>
**NIM:** 103122430009 <br>
**Kelas:** SE-08-02 <br>
**Dosen Pengampu:** Arif Amrulloh <br>

## Soal
Petunjuk Umum

Kerjakan kedua soal dalam file HTML terpisah. Gunakan struktur HTML5,
atribut `lang="id"`, dan `meta viewport`. Siapkan koneksi internet agar
CDN dapat dimuat, lalu uji halaman melalui browser.

**Soal 1. Bootstrap - Pendaftaran Peserta Praktikum** <br>
Buat halaman pendaftaran peserta Praktikum Pemrograman Web menggunakan
Bootstrap. Halaman harus memuat informasi praktikum, form pendaftaran,
serta tabel peserta dengan ketentuan berikut.
Hubungkan Bootstrap 5.3.0 di dalam `<head>` menggunakan CDN CSS berikut:
``` html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
```
Ketentuan:
1.  Tampilkan judul "Pendaftaran Praktikum Pemrograman Web" dengan teks
    rata tengah, huruf kapital, dan cetak tebal menggunakan class
    Bootstrap.
2.  Gunakan container dan grid Bootstrap. Pada lebar layar minimal 768
    px, informasi praktikum berada di kiri dan form di kanan dengan
    lebar sama. Pada layar lebih kecil, informasi berada di atas form.
3.  Bagian informasi memuat satu gambar kegiatan atau kampus dengan
    class `img-fluid` dan atribut `alt`, serta deskripsi singkat tentang
    praktikum. Simpan gambar di folder `assets`.
4.  Buat form berisi Nama Lengkap, NIM, Email, dan Kelas. Gunakan label
    yang terhubung ke input dan class `form-control`. Semua isian wajib
    diisi menggunakan `required`; Email menggunakan `type="email"`.
5.  Sediakan tombol "Daftar" berwarna hijau sebagai tombol submit dan
    "Reset" berwarna abu-abu sebagai tombol reset. Gunakan class `btn`
    dan varian warna yang sesuai. Uji validasi isian dan fungsi Reset.
6.  Di bawah kedua kolom, buat tabel peserta menggunakan `table`,
    `table-striped`, `table-bordered`, dan `table-hover`. Bungkus dengan
    `table-responsive` agar dapat digulir pada layar sempit. Isi tabel
    dengan tiga data contoh berikut. <br>

| No. | Nama Lengkap | NIM | Kelas |
| --- | --- | --- | --- |
| 1 | Alya Putri | 101142400101 | IF-45-01 |
| 2 | Bima Pratama | 101142400102 | IF-45-02 |
| 3 | Nabila Zahra | 101142400103 | IF-45-01 |

Hasil yang dibuat: `soal_bootstrap.html`.
Pastikan jarak antarelemen rapi, gambar mengikuti lebar kolom, dan
perubahan susunan kolom sesuai ukuran layar.

**Soal 2. Tailwind CSS - Katalog Perlengkapan Kuliah** <br>
Buat halaman katalog "Toko Kampus" menggunakan Tailwind CSS. Halaman
memuat navigasi, empat kartu produk, bagian detail produk, dan kontak.
Susun seluruh tampilan melalui utility class pada atribut `class` di
HTML.
Hubungkan Tailwind melalui Play CDN di dalam `<head>` sesuai modul:
``` html
<script src="https://cdn.tailwindcss.com"></script>
```
Ketentuan:
1.  Buat bagian beranda dengan judul "Toko Kampus" yang tebal dan rata
    tengah, serta deskripsi "Perlengkapan kuliah untuk kebutuhan
    sehari-hari". Tambahkan navigasi Beranda, Produk, dan Kontak
    menggunakan flexbox dan jarak antartautan. Setiap tautan menuju
    bagian halaman yang sesuai.
2.  Tampilkan empat kartu produk menggunakan grid. Susunan harus 1 kolom
    pada lebar kurang dari 640 px, 2 kolom pada lebar 640--1023 px, dan
    4 kolom pada lebar minimal 1024 px. Gunakan prefix `sm:` dan `lg:`
    serta gap antarkartu.
3.  Setiap kartu memuat gambar produk, nama, harga, deskripsi singkat,
    dan tombol "Lihat Detail". Gunakan latar kartu putih, padding, sudut
    membulat, dan bayangan. Nama produk dicetak tebal; deskripsi
    berwarna abu-abu. Atur gambar agar mengikuti lebar kartu dan beri
    atribut `alt`.
4.  Buat tombol berlatar biru dengan teks putih. Atur padding dan sudut
    membulat melalui utility class. Warna latar tombol menjadi lebih
    gelap saat diarahkan kursor menggunakan prefix `hover:`.
5.  Gunakan data contoh di bawah. Setelah grid, tambahkan bagian detail
    untuk masing-masing produk, dengan informasi bahan atau ukuran yang
    boleh ditentukan sendiri. Setiap tombol "Lihat Detail" harus
    mengarah ke detail produk yang sesuai menggunakan tautan anchor dan
    `id`. <br>

| Produk | Harga | Deskripsi singkat |
| --- | --- | --- |
| Buku Catatan | Rp15.000 | Buku untuk mencatat materi kuliah. |
| Pulpen | Rp5.000 | Pulpen untuk menulis tugas dan catatan. |
| Tumbler | Rp35.000 | Botol minum untuk dibawa ke kampus. |
| Tas Kuliah | Rp120.000 | Tas untuk menyimpan buku dan alat tulis. |

6.  Tambahkan bagian Kontak berisi nama "Toko Kampus" dan alamat email
    contoh `toko@example.com`. Atur lebar halaman, margin, padding,
    warna latar, serta tipografi menggunakan utility class Tailwind.
**Hasil yang dibuat:** `soal_tailwind.html`.
Pastikan seluruh tautan bekerja dan susunan kartu berubah sesuai tiga
rentang lebar layar yang ditentukan. <br>

**Berkas yang Dikumpulkan** <br>
Kumpulkan satu ZIP berisi `soal_bootstrap.html`, `soal_tailwind.html`,
folder `assets`, serta tangkapan layar setiap halaman pada lebar 390 px,
800 px, dan 1280 px.
Gunakan nama berkas `NIM_Nama_Modul04.zip`. <br>
**Aspek yang Diperiksa**
-   Kelengkapan elemen
-   Ketepatan penggunaan class
-   Responsivitas
-   Fungsi form dan tautan sesuai ketentuan
-   Kerapian kode

## Program/Kode
Soal 1 tersedia di [soal_bootstrap.html](<Soal 1/soal_bootstrap.html>).<br>
Soal 2 tersedia di [soal_tailwind.html](<Soal 2/soal_tailwind.html>).


## Output
![Soal 1 390](<gambar/Soal 1 390px.png>)
![Soal 1 800](<gambar/Soal 1 800px.png>)
![Soal 1 1280](<gambar/Soal 1 1280px.png>)

![Soal 2 390](<gambar/Soal 2 390px.png>)
![Soal 2 800](<gambar/Soal 2 800px.png>)
![Soal 2 1280](<gambar/Soal 2 1280px.png>)

## Deskripsi
Pada soal 1, membuat halaman pendaftaran peserta praktikum menggunakan
`Bootstrap`. Halaman berisi informasi praktikum, form pendaftaran, dan
tabel data peserta. Fokus utamanya adalah penggunaan `container`,
`grid`, `form-control`, tombol Bootstrap, tabel, serta tampilan
`responsive` agar susunan informasi dan form berubah sesuai ukuran
layar.
Dan pada soal 2, adalah membuat halaman katalog sederhana bernama "Toko Kampus"
menggunakan `Tailwind CSS`. Halaman berisi navigasi, empat kartu produk,
detail setiap produk, dan bagian kontak. Fokus utamanya adalah
penggunaan `utility class`, `grid`, `flexbox`, `responsive design`,
`hover`, serta `anchor` untuk menghubungkan tombol produk dengan
detailnya.