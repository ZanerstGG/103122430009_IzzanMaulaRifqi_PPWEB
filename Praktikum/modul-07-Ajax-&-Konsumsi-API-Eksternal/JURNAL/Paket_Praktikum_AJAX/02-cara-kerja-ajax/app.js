const tombol = document.querySelector("#mulai");
const log = document.querySelector("#log");
const hasil = document.querySelector("#hasil");
let hitungan = 0;
document.querySelector("#hitung").addEventListener("click", () => {
  document.querySelector("#angka").textContent = ++hitungan;
});

function catat(pesan) {
  const item = document.createElement("li");
  item.textContent = pesan;
  log.append(item);
}

tombol.addEventListener("click", async () => {
  log.replaceChildren();
  tombol.disabled = true;
  hasil.textContent = "Menunggu response...";
  catat("Event: tombol diklik.");
  try {
    catat("Browser mengirim GET /api/info ke server lokal.");
    const response = await fetch("/api/info?delay=1500");
    catat(`Response tiba: HTTP ${response.status}.`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    catat("JavaScript membaca JSON menjadi objek.");
    hasil.textContent = data.message;
    catat("DOM diperbarui: pesan hasil berubah.");
  } catch (error) {
    hasil.textContent = `Request gagal: ${error.message}`;
  } finally {
    tombol.disabled = false;
  }
});
