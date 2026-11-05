function CardMahasiswa({ nama, nim }) {
    return (
        <div className="card">
            <h3>{nama}</h3>
            <p>NIM: {nim}</p>
        </div>
    );
}

export default CardMahasiswa;
