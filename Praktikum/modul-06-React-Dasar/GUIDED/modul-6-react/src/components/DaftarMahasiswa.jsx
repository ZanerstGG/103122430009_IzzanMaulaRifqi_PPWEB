import React from "react";
import CardMahasiswa from "./CardMahasiswa";

function DaftarMahasiswa() {
    const dataMahasiswa = [
        { id: 1, nama: "Ivan Hengker", nim: "21234567" },
        { id: 2, nama: "Ivan Imo", nim: "10312435" },
        { id: 3, nama: "Ivan Valo", nim: "224553436" },
        { id: 4, nama: "Ivan Karbu", nim: "11412143" }
    ];

    return (
        <div>
            {dataMahasiswa.map(mhs => (
                <CardMahasiswa
                    key={mhs.id}
                    nama={mhs.nama}
                    nim={mhs.nim}
                />
            ))}
        </div>
    )
}

export default DaftarMahasiswa