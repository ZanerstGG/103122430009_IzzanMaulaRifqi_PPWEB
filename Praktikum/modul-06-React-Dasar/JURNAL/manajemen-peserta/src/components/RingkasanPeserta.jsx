function RingkasanPeserta({ total, hadir, belumHadir, hasil }) {
    const ringkasan = [
        {
            label: "Total peserta",
            value: total,
            detail: "Seluruh peserta terdaftar",
            className: "stat-total",
        },
        {
            label: "Hadir",
            value: hadir,
            detail: "Peserta sudah hadir",
            className: "stat-present",
        },
        {
            label: "Belum hadir",
            value: belumHadir,
            detail: "Menunggu kehadiran",
            className: "stat-absent",
        },
        {
            label: "Hasil ditampilkan",
            value: hasil,
            detail: "Sesuai pencarian dan filter",
            className: "stat-results",
        },
    ];

    return (
        <section className="summary-grid" aria-label="Ringkasan peserta">
            {ringkasan.map((item) => (
                <article className={`stat-card ${item.className}`} key={item.label}>
                    <p className="stat-label">{item.label}</p>
                    <p className="stat-value">{item.value}</p>
                    <p className="stat-detail">{item.detail}</p>
                </article>
            ))}
        </section>
    );
}

export default RingkasanPeserta;
