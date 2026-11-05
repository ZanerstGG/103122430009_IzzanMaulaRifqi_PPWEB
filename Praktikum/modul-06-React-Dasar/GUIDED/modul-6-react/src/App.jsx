import './App.css'
import CardMahasiswa from './components/CardMahasiswa'
import Counter from './components/Counter'
import DaftarMahasiswa from './components/DaftarMahasiswa'

function App() {

  return (
    <>
      <h2>Selamat Datang di Praktikum React</h2>
      <p>Ini adalah component pertama kita.</p>
      <CardMahasiswa nama="Furina" nim="28102026" />
      <CardMahasiswa nama="Elyms" nim="28102026" />
      <CardMahasiswa nama="Yuki" nim="28102026" />
      <CardMahasiswa nama="Luthfi Halimawan" nim="28102026" />
      <hr />
      <Counter />
      <DaftarMahasiswa />
    </>
  )
}

export default App
