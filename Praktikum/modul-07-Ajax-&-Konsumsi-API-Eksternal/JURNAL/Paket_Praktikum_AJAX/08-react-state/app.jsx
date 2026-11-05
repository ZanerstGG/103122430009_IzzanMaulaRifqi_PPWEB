const { useState, useEffect } = React;

function DaftarUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("success");
  const [percobaan, setPercobaan] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let aktif = true;
    async function ambilData() {
      setLoading(true);
      setError("");
      setUsers([]);
      try {
        const response = await axios.get(`/api/users?mode=${mode}&delay=800`, {
          timeout: 5000, signal: controller.signal
        });
        if (aktif) setUsers(response.data);
      } catch (err) {
        if (aktif && !axios.isCancel(err)) setError("Gagal memuat. Silakan coba lagi.");
      } finally {
        if (aktif) setLoading(false);
      }
    }
    ambilData();
    return () => {
      aktif = false;
      controller.abort();
    };
  }, [mode, percobaan]);

  return (
    <section aria-busy={loading}>
      <label htmlFor="mode-react">Skenario response</label>
      <select id="mode-react" value={mode} onChange={e => setMode(e.target.value)}>
        <option value="success">Berhasil</option>
        <option value="error">Error HTTP 503</option>
        <option value="empty">Data kosong</option>
      </select>
      <button disabled={loading} onClick={() => setPercobaan(n => n + 1)}>
        Muat ulang data
      </button>
      <p role="status" className="result" data-state={error ? "error" : "success"}>
        {loading ? "Memuat data..." : error || (users.length ? "Data siap." : "Data kosong.")}
      </p>
      {!loading && !error && <ul className="users">
        {users.map(user => <li key={user.id}>{user.name} - {user.email}</li>)}
      </ul>}
    </section>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<DaftarUser />);
