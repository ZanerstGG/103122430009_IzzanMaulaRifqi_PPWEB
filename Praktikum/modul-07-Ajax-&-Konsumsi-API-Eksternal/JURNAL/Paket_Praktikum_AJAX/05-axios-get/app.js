const tombol = document.querySelector("#ambil");
const status = document.querySelector("#status");
const daftar = document.querySelector("#daftar");

tombol.addEventListener("click", async () => {
  tombol.disabled = true;
  status.textContent = "Memuat dengan Axios...";
  daftar.replaceChildren();
  try {
    const response = await axios.get("/api/users", { timeout: 5000 });
    const users = response.data;
    for (const user of users) {
      const item = document.createElement("li");
      item.textContent = `${user.name} - ${user.email}`;
      daftar.append(item);
    }
    status.textContent = users.length ? `${users.length} pengguna dimuat.` : "Data kosong.";
  } catch (error) {
    status.textContent = `Gagal: ${error.response?.status || error.message}`;
  } finally {
    tombol.disabled = false;
  }
});
