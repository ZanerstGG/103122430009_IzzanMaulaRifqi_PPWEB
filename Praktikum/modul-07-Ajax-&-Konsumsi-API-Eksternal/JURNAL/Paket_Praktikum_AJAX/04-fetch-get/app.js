const tombol = document.querySelector("#ambil");
const status = document.querySelector("#status");
const daftar = document.querySelector("#daftar");

tombol.addEventListener("click", async () => {
  tombol.disabled = true;
  status.textContent = "Memuat pengguna...";
  daftar.replaceChildren();
  try {
    const response = await fetch("/api/users?delay=700");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const users = await response.json();
    for (const user of users) {
      const item = document.createElement("li");
      item.textContent = `${user.name} - ${user.email}`;
      daftar.append(item);
    }
    status.textContent = users.length ? `${users.length} pengguna dimuat.` : "Data kosong.";
  } catch (error) {
    status.textContent = `Gagal memuat: ${error.message}`;
  } finally {
    tombol.disabled = false;
  }
});
