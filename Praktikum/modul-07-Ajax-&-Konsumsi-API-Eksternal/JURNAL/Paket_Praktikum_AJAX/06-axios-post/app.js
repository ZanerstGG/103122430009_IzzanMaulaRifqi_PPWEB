const form = document.querySelector("#form-user");
const tombol = document.querySelector("#kirim");
const status = document.querySelector("#status");
const hasil = document.querySelector("#hasil");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Cegah form memuat ulang halaman.
  const userBaru = {
    name: document.querySelector("#nama").value.trim(),
    email: document.querySelector("#email").value.trim()
  };
  if (!userBaru.name) {
    status.textContent = "Nama tidak boleh hanya spasi.";
    return;
  }
  tombol.disabled = true;
  status.textContent = "Mengirim...";
  hasil.textContent = "";
  try {
    const response = await axios.post("/api/users", userBaru, { timeout: 5000 });
    status.textContent = `HTTP ${response.status}: simulasi berhasil, data tidak disimpan.`;
    hasil.textContent = JSON.stringify(response.data, null, 2);
  } catch (error) {
    status.textContent = `Gagal: ${error.response?.data?.message || error.message}`;
  } finally {
    tombol.disabled = false;
  }
});
