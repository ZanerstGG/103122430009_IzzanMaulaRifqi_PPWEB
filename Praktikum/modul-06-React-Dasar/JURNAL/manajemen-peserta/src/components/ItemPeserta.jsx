function ItemPeserta({ peserta, onEdit, onDelete, onToggleAttendance }) {
    const initials = peserta.nama
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("");

    return (
        <article className="participant-card">
            <div className="participant-main">
                <div className="avatar">{initials}</div>

                <div className="participant-info">
                    <h3>{peserta.nama}</h3>
                    <p className="participant-nim">{peserta.nim}</p>
                    <span className="class-badge">{peserta.kelas}</span>
                </div>
            </div>
            <div className="participant-status">
                <span
                    className={`attendance-badge ${
                        peserta.hadir ? "attendance-present" : "attendance-absent"
                    }`}
                >
                    <span className="status-dot" />
                    {peserta.hadir ? "Hadir" : "Belum hadir"}
                </span>
            </div>
            <div className="participant-actions">
                <button
                    type="button"
                    className="button button-small button-secondary"
                    onClick={() => onEdit(peserta)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="button button-small button-attendance"
                    onClick={() => onToggleAttendance(peserta)}
                >
                    {peserta.hadir ? "Batalkan hadir" : "Tandai hadir"}
                </button>
                <button
                    type="button"
                    className="button button-small button-danger"
                    onClick={() => onDelete(peserta)}
                >
                    Hapus
                </button>
            </div>
        </article>
    );
}

export default ItemPeserta;
