function FormPeserta({
    formData,
    onFormChange,
    onSubmit,
    editing,
    onCancel,
    message,
    messageType,
}) {
    return (
        <section className="panel">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">DATA PESERTA</p>
                    <h2>{editing ? "Edit peserta" : "Tambah peserta"}</h2>
                </div>
                <span className="section-number">01</span>
            </div>

            <form onSubmit={onSubmit} className="participant-form">
                <div className="form-grid">
                    <label className="field">
                        <span>Nama mahasiswa</span>
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={(event) =>
                                onFormChange("nama", event.target.value)
                            }
                            placeholder="Contoh: Dina Putri"
                            autoComplete="off"
                        />
                    </label>
                    <label className="field">
                        <span>NIM</span>
                        <input
                            type="text"
                            name="nim"
                            value={formData.nim}
                            onChange={(event) =>
                                onFormChange("nim", event.target.value)
                            }
                            placeholder="Masukkan 8 digit NIM"
                            inputMode="numeric"
                            autoComplete="off"
                        />
                    </label>
                    <label className="field field-full">
                        <span>Kelas</span>
                        <select
                            name="kelas"
                            value={formData.kelas}
                            onChange={(event) =>
                                onFormChange("kelas", event.target.value)
                            }
                        >
                            <option value="">Pilih kelas</option>
                            <option value="TI-2A">TI-2A</option>
                            <option value="TI-2B">TI-2B</option>
                        </select>
                    </label>
                </div>
                <div className="form-actions">
                    <button type="submit" className="button button-primary">
                        {editing ? "Simpan perubahan" : "Tambah peserta"}
                    </button>
                    {editing && (
                        <button
                            type="button"
                            className="button button-secondary"
                            onClick={onCancel}
                        >
                            Batal
                        </button>
                    )}
                </div>
                {message && (
                    <p
                        className={`form-message ${messageType === "error" ? "is-error" : "is-success"}`}
                        role="status"
                    >
                        {message}
                    </p>
                )}
            </form>
        </section>
    );
}

export default FormPeserta;
