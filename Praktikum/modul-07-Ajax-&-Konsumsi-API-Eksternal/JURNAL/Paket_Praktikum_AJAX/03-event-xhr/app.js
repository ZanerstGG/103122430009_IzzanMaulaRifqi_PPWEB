const tombol = document.querySelector("#muat");
const hasil = document.querySelector("#hasil");

tombol.addEventListener("click", () => {
  tombol.disabled = true;
  hasil.textContent = "Memuat teks...";
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      hasil.textContent = xhr.responseText;
    } else if (xhr.status !== 0) {
      hasil.textContent = `Gagal: HTTP ${xhr.status}`;
    }
  };
  xhr.onerror = () => { hasil.textContent = "Koneksi gagal."; };
  xhr.ontimeout = () => { hasil.textContent = "Waktu tunggu habis."; };
  xhr.onloadend = () => { tombol.disabled = false; };
  // open menyiapkan request; send yang mengirimkannya.
  xhr.open("GET", "ajax_info.txt", true);
  xhr.timeout = 5000;
  xhr.send();
});
