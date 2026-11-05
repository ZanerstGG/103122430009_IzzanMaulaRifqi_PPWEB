const tombol = document.querySelector("#ambil");
const pilihan = document.querySelector("#sumber");
const status = document.querySelector("#status");
const daftar = document.querySelector("#daftar");

tombol.addEventListener("click", async () => {
  const lokal = pilihan.value === "lokal";
  const url = lokal ? "/api/users" : "https://jsonplaceholder.typicode.com/users";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  tombol.disabled = pilihan.disabled = true;
  status.textContent = `Memuat dari ${lokal ? "mock lokal" : "JSONPlaceholder"}...`;
  daftar.replaceChildren();
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const users = await response.json();
    for (const user of users.slice(0, 3)) {
      const item = document.createElement("li");
      item.textContent = `${user.name} - ${user.email}`;
      daftar.append(item);
    }
    status.textContent = `Berhasil. Menampilkan maksimal 3 pengguna dari ${lokal ? "mock lokal" : "JSONPlaceholder"}.`;
  } catch (error) {
    status.textContent = `Gagal (${error.name === "AbortError" ? "timeout" : error.message}). `
      + (lokal ? "Pastikan server masih berjalan." : "Periksa internet atau pilih Mock lokal.");
  } finally {
    clearTimeout(timer);
    tombol.disabled = pilihan.disabled = false;
  }
});
