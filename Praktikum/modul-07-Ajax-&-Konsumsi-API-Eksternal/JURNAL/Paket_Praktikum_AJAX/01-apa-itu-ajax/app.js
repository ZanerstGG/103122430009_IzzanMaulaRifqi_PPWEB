const tombol = document.querySelector("#ambil");
const hasil = document.querySelector("#hasil");
document.querySelector("#waktu").textContent = new Date().toLocaleTimeString("id-ID");

tombol.addEventListener("click", async () => {
  tombol.disabled = true;
  hasil.textContent = "Memuat pesan...";
  try {
    const response = await fetch("/api/info?delay=700");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    // Hanya elemen hasil yang diubah; halaman tidak di-reload.
    hasil.textContent = data.message;
  } catch (error) {
    hasil.textContent = `Gagal mengambil pesan: ${error.message}`;
  } finally {
    tombol.disabled = false;
  }
});
