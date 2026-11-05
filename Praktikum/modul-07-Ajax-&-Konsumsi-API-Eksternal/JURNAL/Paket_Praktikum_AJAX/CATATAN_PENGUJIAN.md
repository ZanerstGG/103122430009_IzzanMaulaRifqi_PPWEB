# Catatan pengujian

Diperiksa pada 30 Oktober 2026 dengan Microsoft Edge dan Node.js lokal.

- 15 kelompok pemeriksaan perilaku lulus: AJAX, event/XHR, Fetch, Axios GET/POST, empat skenario loading/error, React, sumber kode/navigasi, responsivitas, dan kontrak API.
- Contoh utama berhasil ketika akses ke internet diblokir; seluruh library dan font dimuat dari paket.
- POST diuji dengan payload benar dan salah; response simulasi tidak mengubah daftar GET.
- React diuji pada hasil berhasil, error, kosong, muat ulang, dan perubahan mode saat request berjalan.
- Tampilan seluruh contoh diperiksa pada lebar 390, 768, dan 1440 piksel tanpa overflow horizontal halaman.
- Tidak ada error runtime JavaScript yang tidak diharapkan.
- JSONPlaceholder juga berhasil diakses langsung dan menampilkan tiga pengguna pertama saat pengujian; layanan eksternal dapat berubah ketersediaannya.
- Seluruh 15 halaman PDF dirender dan diperiksa. Tidak ada halaman kosong atau teks keluar dari batas halaman.

Error 503, timeout, dan data kosong pada pilihan skenario adalah hasil yang disengaja untuk latihan.
