import ItemPeserta from "./ItemPeserta";

function DaftarPeserta({
    peserta,
    hasAnyParticipants,
    onEdit,
    onDelete,
    onToggleAttendance,
}) {
    return (
        <section className="panel">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">DAFTAR MAHASISWA</p>
                    <h2>Peserta praktikum</h2>
                </div>

                <span className="result-badge">{peserta.length} hasil</span>
            </div>

            {peserta.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-symbol">—</div>
                    <h3>
                        {hasAnyParticipants
                            ? "Peserta tidak ditemukan"
                            : "Belum ada peserta."}
                    </h3>
                    <p>
                        {hasAnyParticipants
                            ? "Coba ubah kata pencarian atau pilih kelas lainnya."
                            : "Belum ada data peserta yang tersimpan."}
                    </p>
                </div>
            ) : (
                <div className="participant-list">
                    {peserta.map((item) => (
                        <ItemPeserta
                            key={item.id}
                            peserta={item}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleAttendance={onToggleAttendance}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default DaftarPeserta;
