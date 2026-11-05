// Soal 01 - Portal informasi praktikum
// Pengumuman: XMLHttpRequest. Direktori peserta: Fetch API.

// ===== Konfigurasi URL =====
// Untuk uji 404, ubah sementara menjadi "hilang.txt", simpan, lalu refresh browser.
// Kembalikan ke "pengumuman.txt" setelah pengujian selesai.
const URL_PENGUMUMAN = "pengumuman.txt";

const SUMBER = {
  mock: { nama: "Mock lokal", url: "/api/users?delay=1500" },
  eksternal: { nama: "JSONPlaceholder", url: "https://jsonplaceholder.typicode.com/users" }
};
const BATAS_TUNGGU_FETCH = 10000; // ms, agar jaringan yang macet tetap berakhir dengan pesan gagal

// ===== Elemen DOM =====
const catatan = document.querySelector("#catatan");
const tombolTambah = document.querySelector("#tambah");
const teksHitungan = document.querySelector("#hitungan");
const teksWaktuAwal = document.querySelector("#waktu-awal");

const tombolPengumuman = document.querySelector("#muat-pengumuman");
const statusPengumuman = document.querySelector("#status-pengumuman");
const isiPengumuman = document.querySelector("#isi-pengumuman");
document.querySelector("#url-pengumuman").textContent = URL_PENGUMUMAN;

const pilihanSumber = document.querySelector("#sumber");
const tombolPeserta = document.querySelector("#ambil-peserta");
const statusPeserta = document.querySelector("#status-peserta");
const daftarPeserta = document.querySelector("#daftar-peserta");
const infoPeserta = document.querySelector("#info-peserta");
const log = document.querySelector("#log");

// ===== Utilitas =====
const jam = (tanggal = new Date()) =>
  tanggal.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

function catatLog(pesan) {
  const item = document.createElement("li");
  item.textContent = `[${jam()}] ${pesan}`;
  log.append(item);
  log.scrollTop = log.scrollHeight;
}

function aturStatus(elemen, pesan, keadaan) {
  elemen.textContent = pesan;
  elemen.dataset.state = keadaan; // loading | success | error
}

// ===== Aktivitas praktikan =====
// Hitungan dan waktu awal hanya disimpan di variabel/DOM halaman ini,
// sehingga tidak hilang karena AJAX tidak memuat ulang halaman.
let hitungan = 0;
const waktuAwal = new Date();
teksWaktuAwal.textContent = `${waktuAwal.toLocaleDateString("id-ID")} ${jam(waktuAwal)}`;
catatLog("Halaman pertama dibuka.");

tombolTambah.addEventListener("click", () => {
  hitungan += 1;
  teksHitungan.textContent = hitungan;
  catatLog(`Tombol Tambah hitungan diklik. Hitungan = ${hitungan}.`);
});

// ===== Pengumuman dengan XMLHttpRequest =====
tombolPengumuman.addEventListener("click", () => {
  tombolPengumuman.disabled = true;
  aturStatus(statusPengumuman, `Memuat pengumuman dari ${URL_PENGUMUMAN}...`, "loading");
  catatLog(`XHR GET ${URL_PENGUMUMAN} dikirim.`);

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    // readyState 4 = DONE: request selesai (berhasil maupun gagal).
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      isiPengumuman.textContent = xhr.responseText;
      aturStatus(statusPengumuman, `Berhasil (HTTP ${xhr.status}). Dimuat pukul ${jam()} melalui XHR.`, "success");
      catatLog(`XHR selesai: HTTP ${xhr.status}, pengumuman ditampilkan.`);
    } else if (xhr.status === 404) {
      isiPengumuman.textContent = "-";
      aturStatus(statusPengumuman, `Gagal memuat pengumuman: HTTP 404, file "${URL_PENGUMUMAN}" tidak ditemukan.`, "error");
      catatLog("XHR gagal: HTTP 404 (file tidak ditemukan).");
    } else if (xhr.status !== 0) {
      isiPengumuman.textContent = "-";
      aturStatus(statusPengumuman, `Gagal memuat pengumuman: HTTP ${xhr.status}. Coba lagi beberapa saat.`, "error");
      catatLog(`XHR gagal: HTTP ${xhr.status}.`);
    }
    // status 0 = gangguan jaringan/timeout; ditangani oleh onerror dan ontimeout.
  };

  xhr.onerror = () => {
    aturStatus(statusPengumuman, "Gagal memuat pengumuman: gangguan jaringan. Pastikan server masih berjalan.", "error");
    catatLog("XHR gagal: gangguan jaringan.");
  };
  xhr.ontimeout = () => {
    aturStatus(statusPengumuman, "Gagal memuat pengumuman: waktu tunggu habis.", "error");
    catatLog("XHR gagal: timeout.");
  };
  xhr.onloadend = () => {
    tombolPengumuman.disabled = false; // aktifkan kembali setelah proses selesai
  };

  xhr.open("GET", URL_PENGUMUMAN, true); // true = asynchronous
  xhr.timeout = 5000;
  xhr.send();
});

// ===== Direktori peserta dengan Fetch =====
tombolPeserta.addEventListener("click", async () => {
  const sumber = SUMBER[pilihanSumber.value];
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), BATAS_TUNGGU_FETCH);

  tombolPeserta.disabled = true;
  pilihanSumber.disabled = true;
  daftarPeserta.replaceChildren();
  infoPeserta.textContent = "";
  aturStatus(statusPeserta, `Memuat peserta dari ${sumber.nama}...`, "loading");
  catatLog(`Fetch GET ${sumber.url} dikirim (${sumber.nama}).`);

  try {
    const response = await fetch(sumber.url, { signal: controller.signal });
    // Fetch tidak menolak promise untuk HTTP 4xx/5xx, jadi response.ok wajib diperiksa.
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }
    const users = await response.json();
    const tampil = users.slice(0, 3);

    for (const user of tampil) {
      const item = document.createElement("li");
      item.textContent = `${user.name} - ${user.email}`;
      daftarPeserta.append(item);
    }
    aturStatus(statusPeserta, `Berhasil (HTTP ${response.status}) pukul ${jam()}.`, "success");
    infoPeserta.textContent = `Sumber: ${sumber.nama} | Ditampilkan: ${tampil.length} dari ${users.length} data.`;
    catatLog(`Fetch selesai: HTTP ${response.status}, ${tampil.length} peserta ditampilkan dari ${sumber.nama}.`);
  } catch (error) {
    let alasan;
    if (error.name === "AbortError") alasan = "waktu tunggu habis";
    else if (error.status) alasan = `server menjawab ${error.message}`;
    else if (error instanceof TypeError) alasan = "gangguan jaringan atau server tidak dapat dihubungi";
    else alasan = error.message;

    const saran = pilihanSumber.value === "eksternal"
      ? "Periksa sambungan internet Anda, atau pilih Mock lokal secara manual lalu tekan Ambil peserta."
      : "Pastikan server praktikum (node server.cjs) masih berjalan.";
    aturStatus(statusPeserta, `Gagal mengambil peserta dari ${sumber.nama}: ${alasan}. ${saran}`, "error");
    infoPeserta.textContent = `Sumber: ${sumber.nama} | Ditampilkan: 0 data.`;
    catatLog(`Fetch gagal (${sumber.nama}): ${alasan}.`);
  } finally {
    clearTimeout(timer);
    tombolPeserta.disabled = false;
    pilihanSumber.disabled = false;
  }
});
