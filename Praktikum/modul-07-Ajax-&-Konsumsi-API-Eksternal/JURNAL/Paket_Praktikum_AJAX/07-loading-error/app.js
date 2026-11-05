const tombol = document.querySelector("#jalankan");
const pilihan = document.querySelector("#mode");
const status = document.querySelector("#status");
const daftar = document.querySelector("#daftar");

tombol.addEventListener("click", async () => {
  const mode = pilihan.value;
  const controller = new AbortController();
  const batas = mode === "timeout" ? 700 : 5000;
  const timer = setTimeout(() => controller.abort(), batas);
  const delay = mode === "timeout" ? 2500 : 900;
  tombol.disabled = pilihan.disabled = true;
  status.dataset.state = "loading";
  status.textContent = "Memuat data...";
  daftar.replaceChildren();
  try {
    const response = await fetch(`/api/users?mode=${mode}&delay=${delay}`, {
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Server memberi HTTP ${response.status}.`);
    const users = await response.json();
    for (const user of users) {
      const item = document.createElement("li");
      item.textContent = user.name;
      daftar.append(item);
    }
    status.dataset.state = "success";
    status.textContent = users.length ? "Berhasil memuat data." : "Berhasil, tetapi data kosong.";
  } catch (error) {
    status.dataset.state = "error";
    status.textContent = error.name === "AbortError"
      ? "Waktu tunggu habis. Silakan coba lagi."
      : `Gagal memuat. ${error.message}`;
  } finally {
    clearTimeout(timer);
    tombol.disabled = pilihan.disabled = false;
  }
});
