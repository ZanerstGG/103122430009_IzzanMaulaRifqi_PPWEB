// Soal 02 - Aplikasi registrasi peserta React
// Axios GET (useEffect) + Axios POST (form), dengan loading/error memakai useState.
const { useState, useEffect, useRef } = React;

// Skenario GET sesuai tabel soal: URL dan batas tunggu Axios.
const SKENARIO = {
  berhasil: { label: "Berhasil", url: "/api/users?delay=1000", timeout: 5000 },
  kosong: { label: "Data kosong", url: "/api/users?mode=empty&delay=1000", timeout: 5000 },
  error: { label: "Error HTTP", url: "/api/users?mode=error&delay=1000", timeout: 5000 },
  timeout: { label: "Timeout", url: "/api/users?delay=2500", timeout: 700 }
};

const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const jam = () => new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

// Ubah error Axios menjadi pesan yang mudah dipahami.
function pesanGagal(err, batas) {
  if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
    return `Waktu tunggu habis: server tidak menjawab dalam ${batas} ms (timeout).`;
  }
  if (err.response) {
    const detail = err.response.data && err.response.data.message ? ` - ${err.response.data.message}` : "";
    return `Gagal: server menjawab HTTP ${err.response.status}${detail}`;
  }
  return "Gagal: gangguan jaringan. Pastikan server praktikum masih berjalan.";
}

function App() {
  // ---------- State daftar peserta (GET) ----------
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [skenario, setSkenario] = useState("berhasil");
  const [percobaan, setPercobaan] = useState(0); // dinaikkan oleh tombol Muat ulang
  const [hasilUntuk, setHasilUntuk] = useState("");

  // ---------- State formulir (POST) ----------
  const [form, setForm] = useState({ name: "", email: "" });
  const [formError, setFormError] = useState({});
  const [mengirim, setMengirim] = useState(false);
  const [hasilPost, setHasilPost] = useState(null);
  const [errorPost, setErrorPost] = useState("");

  // ---------- Riwayat request (bukti pengujian) ----------
  const [log, setLog] = useState([]);
  const nomorRequest = useRef(0);
  const catat = pesan => setLog(lama => [...lama, `[${jam()}] ${pesan}`]);
  const logRef = useRef(null);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  // ---------- GET awal dan saat skenario / percobaan berubah ----------
  useEffect(() => {
    const pilihan = SKENARIO[skenario];
    const controller = new AbortController();
    let aktif = true;      // penanda effect masih yang terbaru
    let selesai = false;
    const nomor = ++nomorRequest.current;
    const mulai = performance.now();

    async function ambilPeserta() {
      setLoading(true);
      setError("");
      setUsers([]);          // bersihkan daftar lama
      setHasilUntuk("");
      catat(`GET #${nomor} dikirim: ${pilihan.url} (skenario ${pilihan.label}, timeout ${pilihan.timeout} ms)`);
      try {
        const response = await axios.get(pilihan.url, {
          timeout: pilihan.timeout,
          signal: controller.signal
        });
        const lama = Math.round(performance.now() - mulai);
        if (!aktif) return;  // response lama tidak boleh menimpa pilihan terbaru
        setUsers(response.data);
        setHasilUntuk(pilihan.label);
        catat(`GET #${nomor} selesai: HTTP ${response.status}, ${response.data.length} peserta (${lama} ms)`);
      } catch (err) {
        if (axios.isCancel(err) || !aktif) return; // dibatalkan oleh cleanup
        const lama = Math.round(performance.now() - mulai);
        setError(pesanGagal(err, pilihan.timeout));
        setHasilUntuk(pilihan.label);
        catat(`GET #${nomor} gagal setelah ${lama} ms: ${err.response ? "HTTP " + err.response.status : err.code}`);
      } finally {
        selesai = true;
        if (aktif) setLoading(false); // pulihkan kontrol
      }
    }

    ambilPeserta();

    // Cleanup: dijalankan saat skenario berubah, Muat ulang ditekan, atau komponen dilepas.
    return () => {
      aktif = false;
      if (!selesai) catat(`GET #${nomor} dibatalkan (AbortController) karena pilihan berubah.`);
      controller.abort();
    };
  }, [skenario, percobaan]);

  // ---------- Formulir pendaftaran ----------
  function ubahInput(event) {
    const { name, value } = event.target;
    setForm(lama => ({ ...lama, [name]: value }));
    setFormError(lama => ({ ...lama, [name]: "" }));
  }

  function validasi(data) {
    const hasil = {};
    if (!data.name.trim()) hasil.name = "Nama wajib diisi dan tidak boleh hanya berisi spasi.";
    if (!data.email.trim()) hasil.email = "Email wajib diisi.";
    else if (!POLA_EMAIL.test(data.email.trim())) hasil.email = "Format email tidak valid. Contoh yang benar: nama@example.com";
    return hasil;
  }

  async function kirimPendaftaran(event) {
    event.preventDefault(); // cegah reload halaman
    const kesalahan = validasi(form);
    setFormError(kesalahan);
    setHasilPost(null);
    setErrorPost("");
    if (Object.keys(kesalahan).length) {
      catat("POST ditolak oleh validasi formulir (tidak dikirim ke server).");
      return;
    }

    const objekData = { name: form.name.trim(), email: form.email.trim() };
    setMengirim(true);
    catat(`POST /api/users dikirim: ${JSON.stringify(objekData)}`);
    try {
      const response = await axios.post("/api/users", objekData);
      setHasilPost({ status: response.status, ...response.data });
      catat(`POST selesai: HTTP ${response.status}, id ${response.data.id}, simulated ${response.data.simulated}`);
    } catch (err) {
      setErrorPost(pesanGagal(err, 0));
      catat(`POST gagal: ${err.response ? "HTTP " + err.response.status : err.code}`);
    } finally {
      setMengirim(false); // pulihkan tombol
    }
  }

  // ---------- Tampilan status GET ----------
  let statusGet, keadaanGet;
  if (loading) { statusGet = `Memuat daftar peserta (skenario ${SKENARIO[skenario].label})...`; keadaanGet = "loading"; }
  else if (error) { statusGet = error; keadaanGet = "error"; }
  else if (users.length === 0) { statusGet = "Data kosong: server mengembalikan 0 peserta (HTTP 200)."; keadaanGet = "empty"; }
  else { statusGet = `Berhasil: ${users.length} peserta dimuat.`; keadaanGet = "success"; }

  return (
    <div className="grid">
      <section className="panel" aria-labelledby="judul-daftar" aria-busy={loading}>
        <h2 id="judul-daftar">Daftar peserta (GET)</h2>
        <label htmlFor="skenario">Skenario GET</label>
        <select id="skenario" value={skenario} onChange={e => setSkenario(e.target.value)}>
          {Object.entries(SKENARIO).map(([kunci, s]) => (
            <option key={kunci} value={kunci}>{s.label}</option>
          ))}
        </select>
        <p className="meta">URL: <code>{SKENARIO[skenario].url}</code> | Timeout Axios: {SKENARIO[skenario].timeout} ms</p>
        <div className="actions">
          <button type="button" disabled={loading} onClick={() => setPercobaan(n => n + 1)}>
            {loading ? "Memuat..." : "Muat ulang"}
          </button>
        </div>
        <p role="status" className="result" data-state={keadaanGet}>{statusGet}</p>
        {!loading && !error && users.length > 0 && (
          <ul className="users">
            {users.map(user => <li key={user.id}>{user.name} - {user.email}</li>)}
          </ul>
        )}
        {hasilUntuk && <p className="meta">Hasil di atas berasal dari skenario: <strong>{hasilUntuk}</strong></p>}
      </section>

      <section className="panel" aria-labelledby="judul-form">
        <h2 id="judul-form">Formulir pendaftaran (POST)</h2>
        <form onSubmit={kirimPendaftaran} noValidate>
          <label htmlFor="nama">Nama</label>
          <input id="nama" name="name" value={form.name} onChange={ubahInput}
                 aria-invalid={!!formError.name} placeholder="Contoh: Rina Praktikan" />
          {formError.name && <p className="hint">{formError.name}</p>}

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={ubahInput}
                 aria-invalid={!!formError.email} placeholder="Contoh: rina@example.com" />
          {formError.email && <p className="hint">{formError.email}</p>}

          <button type="submit" disabled={mengirim}>{mengirim ? "Mengirim..." : "Kirim pendaftaran"}</button>
        </form>

        {mengirim && <p className="result" data-state="loading" role="status">Mengirim data pendaftaran...</p>}
        {errorPost && <p className="result" data-state="error" role="status">{errorPost}</p>}
        {hasilPost && (
          <div className="result" data-state="success" role="status">
            <strong>Simulasi berhasil, data tidak disimpan.</strong>
            <dl className="response">
              <dt>Status HTTP</dt><dd>{hasilPost.status}</dd>
              <dt>id</dt><dd>{hasilPost.id}</dd>
              <dt>name</dt><dd>{hasilPost.name}</dd>
              <dt>email</dt><dd>{hasilPost.email}</dd>
              <dt>simulated</dt><dd>{String(hasilPost.simulated)}</dd>
            </dl>
          </div>
        )}
      </section>

      <section className="panel full" aria-labelledby="judul-log">
        <h2 id="judul-log">Riwayat request</h2>
        <p className="meta">Mencatat setiap GET/POST, pembatalan oleh cleanup effect, dan lama response.</p>
        <ol className="log" ref={logRef}>
          {log.map((baris, i) => <li key={i}>{baris}</li>)}
        </ol>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
