// Utilitas tampilan bersama. Logika tiap pelajaran ada di app.js / app.jsx.
document.querySelectorAll("[data-file-warning]").forEach(el => {
  el.hidden = location.protocol !== "file:";
});
document.querySelector("#pindah-materi")?.addEventListener("change", event => {
  location.href = event.target.value;
});
document.querySelectorAll("details[data-source]").forEach(details => {
  let dimuat = false;
  details.addEventListener("toggle", async () => {
    if (!details.open || dimuat) return;
    const kode = details.querySelector("code");
    if (location.protocol === "file:") {
      kode.textContent = "Jalankan JALANKAN.bat, lalu buka lewat http://127.0.0.1:3007 untuk melihat kode di sini. File sumber juga bisa dibuka di editor.";
      return;
    }
    try {
      const response = await fetch(details.dataset.source);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      kode.textContent = await response.text();
      dimuat = true;
    } catch (error) {
      kode.textContent = `Kode gagal dimuat: ${error.message}. Buka file sumber melalui editor.`;
    }
  });
});
