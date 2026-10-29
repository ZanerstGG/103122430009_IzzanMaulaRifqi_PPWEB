function FilterPeserta({
  search,
  onSearchChange,
  filterKelas,
  onFilterChange,
}) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PENCARIAN & FILTER</p>
          <h2>Temukan peserta</h2>
        </div>
        <span className="section-number">02</span>
      </div>

      <div className="filter-grid">
        <label className="field">
          <span>Cari peserta</span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Cari nama atau NIM"
          />
        </label>

        <label className="field">
          <span>Filter kelas</span>
          <select
            value={filterKelas}
            onChange={(event) => onFilterChange(event.target.value)}
          >
            <option value="Semua kelas">Semua kelas</option>
            <option value="TI-2A">TI-2A</option>
            <option value="TI-2B">TI-2B</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default FilterPeserta;
