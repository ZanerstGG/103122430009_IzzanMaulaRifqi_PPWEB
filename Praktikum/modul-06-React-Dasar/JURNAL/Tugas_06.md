div align="center">

# LAPORAN PRAKTIKUM

*Disusun untuk memenuhi Tugas Laporan Praktikum Mata Kuliah Perancangan dan Pemrograman Web*

<br><br>

<img src="TUP_Vertikal copy.png" alt="Deskripsi Gambar" width="300" height="300" />

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

# Laporan Praktikum 06: REACT DASAR

**Nama:** Izzan Maula Rifqi <br>
**NIM:** 103122430009 <br>
**Kelas:** SE-08-02 <br>
**Dosen Pengampu:** Arif Amrulloh <br>

## Soal


### A. Tugas Program

Buat satu aplikasi React untuk mengelola peserta praktikum. Aplikasi harus dapat menambah, mengubah, menghapus, mencari, dan menyaring peserta, serta mengubah status kehadiran dan menampilkan ringkasan data secara langsung.

Seluruh fitur merupakan satu kesatuan program. Gunakan JSX, functional component, props, `useState`, event handler, serta render list dengan `map()` dan `key`. Jawaban berupa proyek yang dapat dijalankan di browser.

### B. Data Awal

Ketika aplikasi pertama kali dibuka, tampilkan data berikut. Setiap peserta mempunyai ID unik dan stabil, nama, NIM, kelas, serta status kehadiran.

| ID | Nama | NIM | Kelas | Kehadiran |
|---|---|---|---|---|
| `m-1` | Ani | `10121001` | TI-2A | Hadir |
| `m-2` | Budi | `10121002` | TI-2B | Belum hadir |
| `m-3` | Citra | `10121003` | TI-2A | Belum hadir |

Gunakan string untuk ID dan NIM. Simpan status kehadiran dalam bentuk boolean: `true` untuk hadir dan `false` untuk belum hadir. Peserta baru selalu dimulai dengan status belum hadir.

### C. Susunan Tampilan

1. Tampilkan judul aplikasi dan ringkasan yang berisi Total peserta, Hadir, Belum hadir, serta Hasil ditampilkan.
2. Tampilkan form peserta, kolom pencarian, dan filter kelas.
3. Tampilkan daftar peserta yang berisi nama, NIM, kelas, status, dan tombol tindakan untuk setiap peserta.

Pada kondisi awal, total peserta adalah 3, hadir 1, belum hadir 2, dan hasil ditampilkan 3. Tampilan boleh berbentuk kartu atau tabel.

### D. Form Tambah dan Ubah Peserta

1. Sediakan input Nama mahasiswa, input NIM, dan pilihan Kelas. Pilihan kelas terdiri atas `Pilih kelas`, `TI-2A`, dan `TI-2B`. `Pilih kelas` merupakan nilai awal dan tidak dianggap sebagai kelas yang valid.
2. Semua input harus terkontrol melalui state. Rapikan spasi di awal dan akhir nama serta NIM. Nama wajib diisi dan memiliki sedikitnya 3 karakter setelah dirapikan; NIM wajib terdiri atas tepat 8 digit dan tetap disimpan sebagai teks.
3. Tolak NIM yang sudah digunakan peserta lain. Saat mengedit, NIM milik peserta yang sedang diedit boleh tetap digunakan. Tampilkan pesan validasi yang jelas; data dan isi form tetap tersedia ketika validasi gagal.
4. Dalam mode tambah, tombol utama bertuliskan **Tambah peserta**. Data valid ditambahkan pada akhir array dengan ID baru, status belum hadir, lalu form dikosongkan dan pilihan kelas kembali ke nilai awal.
5. Tombol **Edit** pada peserta mengisi form dengan data peserta itu. Tombol utama berubah menjadi **Simpan perubahan** dan tombol **Batal** muncul. Penyimpanan memperbarui peserta yang sama tanpa mengganti ID, urutan, atau status kehadirannya.
6. Setelah perubahan berhasil atau Batal ditekan, form kembali ke mode tambah. Batal tidak mengubah data peserta. Tangani `onSubmit` agar tombol Enter dapat mengirim form tanpa memuat ulang halaman.

### E. Hapus dan Kehadiran

1. Tombol **Hapus** menghapus hanya peserta yang dipilih berdasarkan ID. Jika peserta itu sedang diedit, batalkan mode edit dan kosongkan form.
2. Sediakan tombol **Tandai hadir** untuk peserta yang belum hadir, dan **Batalkan hadir** untuk peserta yang hadir. Tombol hanya mengubah status peserta yang dipilih. Status serta ringkasan harus langsung diperbarui.

### F. Pencarian dan Filter

Pencarian mencocokkan sebagian nama atau NIM, mengabaikan huruf besar/kecil serta spasi di awal dan akhir kata pencarian. Filter kelas memiliki pilihan **Semua kelas**, **TI-2A**, dan **TI-2B**.

Saat pencarian dan filter digunakan bersamaan, tampilkan hanya peserta yang memenuhi kedua kondisi. Pencarian kosong atau hanya berisi spasi berarti tidak membatasi hasil.

### G. Ringkasan dan Kondisi Kosong

Total peserta, Hadir, dan Belum hadir dihitung dari seluruh data, sehingga nilainya tidak berubah hanya karena pencarian atau filter. Hasil ditampilkan dihitung dari daftar yang sedang terlihat. Setelah tambah, ubah, hapus, atau perubahan kehadiran, seluruh angka harus mengikuti data terbaru.

- Jika seluruh data kosong, tampilkan **Belum ada peserta.**
- Jika data masih ada tetapi pencarian/filter tidak menghasilkan kecocokan, tampilkan **Peserta tidak ditemukan.**
- Pencarian dan filter hanya mengubah tampilan, bukan menghapus data sumber.

### H. Komponen yang Wajib Dibuat

| Komponen | Tanggung jawab |
|---|---|
| `App` | Menyimpan state utama, mengolah data, dan menghubungkan seluruh komponen. |
| `FormPeserta` | Menampilkan input dan tombol tambah, simpan, serta batal. |
| `FilterPeserta` | Menampilkan input pencarian dan pilihan filter kelas. |
| `DaftarPeserta` | Merender hasil pencarian/filter dengan `map()`. |
| `ItemPeserta` | Menampilkan satu peserta beserta tombol Edit, Hapus, dan kehadiran. |
| `RingkasanPeserta` | Menampilkan empat angka ringkasan dari data yang diterima. |

Simpan data utama, nilai form, mode edit, pencarian, filter, dan pesan dalam state di `App`. Kirim data serta fungsi penanganan event melalui props. Komponen anak tidak boleh mengubah props secara langsung. Gunakan ID stabil sebagai `key` dan perbarui array/object melalui setter state.

### I. Menjalankan dan Mengumpulkan Program

Gunakan React + JavaScript (`.jsx`) dengan Vite. Dari folder proyek, jalankan perintah berikut secara berurutan, kemudian buka alamat yang muncul pada terminal.

```bash
npm install
npm run dev
```

Data cukup disimpan dalam state selama aplikasi berjalan. Reload mengembalikan data awal. Sebelum dikumpulkan, pastikan `npm run build` berhasil.

Kumpulkan satu ZIP proyek berisi `src`, `index.html`, `package.json`, `package-lock.json`, konfigurasi Vite, dan README singkat cara menjalankan. Sertakan tangkapan layar kondisi awal, hasil tambah/edit, hasil pencarian, dan kondisi kosong. Keluarkan `node_modules` dan `dist` dari ZIP.

## Program/Kode
Program Tersedia di [manajemen-peserta](manajemen-peserta)

## Output

Tabel Pengujian Website

| No. | Tindakan | Hasil yang diharapkan | Screenshot |  |
|---:|---|---|---|---|
| 1 | Buka aplikasi. | Total 3; hadir 1; belum hadir 2; terlihat 3 peserta. | ![alt text](<Screenshot/Buka aplikasi..png>) |
| 2 | Coba kirim form kosong, nama `An`, NIM `12A`, atau kelas belum dipilih. Uji setiap kasus dengan isian lain yang valid. | Setiap input yang tidak sesuai ditolak dengan pesan yang jelas; total tetap 3. | ![alt text](<Screenshot/Coba kirim form kosong, nama An, NIM 12A,.png>) |
| 3 | Tambah Dina dengan NIM `10121001` dan kelas TI-2B. | Ditolak karena NIM sudah digunakan Ani; total tetap 3. | ![alt text](<Screenshot/Tambah Dina dengan NIM 00123001 dan.png>) |
| 4 | Tambah Dina dengan NIM `00123001` dan kelas TI-2B. | Total 4; hadir 1; belum hadir 3. NIM tetap `00123001`; form kembali kosong. | ![alt text](<Screenshot/Tambah Dina dengan NIM 10121001 dan.png>) |
| 5 | Klik **Tandai hadir** pada Budi. | Total 4; hadir 2; belum hadir 2. Status Budi menjadi hadir. | ![alt text](<Screenshot/Klik Tandai hadir pada Budi..png>) |
| 6 | Dengan filter Semua kelas, cari nama menggunakan teks ` bU `. | Hanya Budi terlihat; hasil ditampilkan 1. Ringkasan seluruh data tetap 4, 2, dan 2. | ![alt text](<Screenshot/Dengan filter Semua kelas, cari nama.png>) |
| 7 | Pertahankan pencarian `bU`, lalu pilih filter TI-2A. | Hasil ditampilkan 0; **Peserta tidak ditemukan.** tampil; data sumber tetap ada. | ![alt text](<Screenshot/Pertahankan pencarian bU, lalu pilih filter.png>) |
| 8 | Kosongkan pencarian dan pilih Semua kelas. Edit Dina menjadi Dina Putri, kelas TI-2A, NIM tetap. | Perubahan diterima; total tetap 4. ID dan status belum hadir milik Dina tetap. | ![alt text](<Screenshot/Kosongkan pencarian dan pilih Semua kelas..png>) |
| 9 | Edit lagi Dina Putri, ubah NIM menjadi `10121002`, lalu simpan. Setelah ditolak, klik Batal. | NIM ganda ditolak; data sebelumnya tetap. Batal mengosongkan form dan mengaktifkan mode tambah. | ![alt text](<Screenshot/Edit lagi Dina Putri, ubah NIM menjadi.png>) |
| 10 | Klik Edit pada Ani, lalu hapus Ani dari daftar. | Ani terhapus; mode edit dibatalkan. Total 3; hadir 1; belum hadir 2. | ![alt text](<Screenshot/Klik Edit pada Ani, lalu hapus Ani dari daftar.png>) |
| 11 | Hapus seluruh peserta yang tersisa. | Semua ringkasan bernilai 0; **Belum ada peserta.** tampil. | ![alt text](<Screenshot/Hapus seluruh peserta yang tersisa..png>) |
| 12 | Muat ulang halaman. | Tiga peserta awal tampil kembali; total 3, hadir 1, belum hadir 2. | ![alt text](<Screenshot/Muat ulang halaman..png>) |

## Deskripsi
Program ini adalah membuat aplikasi Manajemen Peserta Praktikum menggunakan `React` dan `JavaScript` dengan `Vite`. Aplikasi ini memiliki fitur untuk menambah, mengubah, menghapus, mencari, dan memfilter data peserta, serta mengubah status kehadiran. <br>
Pembuatan aplikasi menggunakan beberapa komponen React, seperti App, FormPeserta, FilterPeserta, DaftarPeserta, ItemPeserta, dan RingkasanPeserta. Pengelolaan data menggunakan `useState` dan `props`, dilengkapi validasi nama, NIM, serta kelas untuk memastikan data yang dimasukkan sesuai ketentuan. <br>
Setelah aplikasi selesai dibuat, dilakukan pengujian berdasarkan 12 skenario pada soal, mulai dari validasi input hingga penghapusan data dan pemuatan ulang halaman.
