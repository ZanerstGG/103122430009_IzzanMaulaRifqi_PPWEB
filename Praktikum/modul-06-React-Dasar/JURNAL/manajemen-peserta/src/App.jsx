
import { useState } from "react";
import "./App.css";

import FormPeserta from "./components/FormPeserta";
import FilterPeserta from "./components/FilterPeserta";
import DaftarPeserta from "./components/DaftarPeserta";
import RingkasanPeserta from "./components/RingkasanPeserta";

const pesertaAwal = [
  {
    id: "m-1",
    nama: "Ani",
    nim: "10121001",
    kelas: "TI-2A",
    hadir: true,
  },
  {
    id: "m-2",
    nama: "Budi",
    nim: "10121002",
    kelas: "TI-2B",
    hadir: false,
  },
  {
    id: "m-3",
    nama: "Citra",
    nim: "10121003",
    kelas: "TI-2A",
    hadir: false,
  },
];

const formKosong = {
  nama: "",
  nim: "",
  kelas: "",
};

function App() {
  const [peserta, setPeserta] = useState(pesertaAwal);
  const [formData, setFormData] = useState(formKosong);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua kelas");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [nextId, setNextId] = useState(4);

  const editing = editingId !== null;

  function handleFormChange(field, value) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setMessage("");
  }

  function clearForm() {
    setFormData(formKosong);
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nama = formData.nama.trim();
    const nim = formData.nim.trim();
    const kelas = formData.kelas;

    if (!nama) {
      setMessage("Nama mahasiswa wajib diisi.");
      setMessageType("error");
      return;
    }

    if (nama.length < 3) {
      setMessage("Nama mahasiswa harus memiliki minimal 3 karakter.");
      setMessageType("error");
      return;
    }

    if (!nim) {
      setMessage("NIM wajib diisi.");
      setMessageType("error");
      return;
    }

    if (!/^\d{8}$/.test(nim)) {
      setMessage("NIM harus terdiri atas tepat 8 digit angka.");
      setMessageType("error");
      return;
    }

    if (!["TI-2A", "TI-2B"].includes(kelas)) {
      setMessage("Silakan pilih kelas yang valid.");
      setMessageType("error");
      return;
    }

    const nimSudahDipakai = peserta.some(
      (item) => item.nim === nim && item.id !== editingId
    );

    if (nimSudahDipakai) {
      setMessage("NIM sudah digunakan oleh peserta lain.");
      setMessageType("error");
      return;
    }

    if (editing) {
      setPeserta((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? { ...item, nama, nim, kelas }
            : item
        )
      );

      clearForm();
      setMessage(`Data ${nama} berhasil diperbarui.`);
      setMessageType("success");
    } else {
      const pesertaBaru = {
        id: `m-${nextId}`,
        nama,
        nim,
        kelas,
        hadir: false,
      };

      setPeserta((previous) => [...previous, pesertaBaru]);
      setNextId((previous) => previous + 1);

      clearForm();
      setMessage(`Peserta ${nama} berhasil ditambahkan.`);
      setMessageType("success");
    }
  }

  function handleEdit(item) {
    setFormData({
      nama: item.nama,
      nim: item.nim,
      kelas: item.kelas,
    });

    setEditingId(item.id);
    setMessage("");
  }

  function handleCancel() {
    clearForm();
    setMessage("");
  }

  function handleDelete(item) {
    setPeserta((previous) =>
      previous.filter((pesertaItem) => pesertaItem.id !== item.id)
    );

    if (editingId === item.id) {
      clearForm();
    }

    setMessage(
      editingId === item.id
        ? `Peserta ${item.nama} dihapus. Mode edit dibatalkan.`
        : `Peserta ${item.nama} berhasil dihapus.`
    );
    setMessageType("success");
  }

  function handleToggleAttendance(item) {
    setPeserta((previous) =>
      previous.map((pesertaItem) =>
        pesertaItem.id === item.id
          ? { ...pesertaItem, hadir: !pesertaItem.hadir }
          : pesertaItem
      )
    );
  }

  const kataKunci = search.trim().toLowerCase();

  const pesertaTerlihat = peserta.filter((item) => {
    const cocokPencarian =
      kataKunci === "" ||
      item.nama.toLowerCase().includes(kataKunci) ||
      item.nim.toLowerCase().includes(kataKunci);

    const cocokKelas =
      filterKelas === "Semua kelas" || item.kelas === filterKelas;

    return cocokPencarian && cocokKelas;
  });

  const total = peserta.length;
  const hadir = peserta.filter((item) => item.hadir).length;
  const belumHadir = total - hadir;
  const hasil = pesertaTerlihat.length;

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#beranda" aria-label="Beranda aplikasi">
          <span className="brand-mark">MP</span>
          <span className="brand-name">Praktikum<span> Manager</span></span>
        </a>

        <span className="topbar-label">
          MODUL 06 <span>·</span> REACT DASAR
        </span>
      </header>

      <main className="app-shell" id="beranda">
        <section className="hero">
          <p className="eyebrow">DASHBOARD PRAKTIKUM</p>
          <h1>
            Manajemen Peserta
            <span> Praktikum.</span>
          </h1>
          <p className="hero-description">
            Kelola data mahasiswa, pantau kehadiran, dan temukan
            peserta dengan lebih mudah.
          </p>
        </section>

        <RingkasanPeserta
          total={total}
          hadir={hadir}
          belumHadir={belumHadir}
          hasil={hasil}
        />

        <div className="workspace">
          <FormPeserta
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
            editing={editing}
            onCancel={handleCancel}
            message={message}
            messageType={messageType}
          />

          <FilterPeserta
            search={search}
            onSearchChange={setSearch}
            filterKelas={filterKelas}
            onFilterChange={setFilterKelas}
          />

          <DaftarPeserta
            peserta={pesertaTerlihat}
            hasAnyParticipants={total > 0}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleAttendance={handleToggleAttendance}
          />
        </div>

        <footer className="app-footer">
          <span>Manajemen Peserta Praktikum</span>
          <span>React · Vite · JavaScript</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
