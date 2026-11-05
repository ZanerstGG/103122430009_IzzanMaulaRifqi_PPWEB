import React from "react";
import { useState } from "react";

function Counter() {
    const [jumlah, setJumlah] = useState(0);

    return (
        <div>z
            <p>Jumlah Klik: {jumlah}</p>
            <button onClick={() => setJumlah(jumlah + 1)}>Tambah</button>
            <button onClick={() => setJumlah(jumlah - 1)}>Kurang</button>
        </div>
    )
}

export default Counter