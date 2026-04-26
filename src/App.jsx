import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Dashboard from './pages/Dashboard'
import Maquiagem from './pages/Maquiagem'
import Cabelo from './pages/Cabelo'
import EsteticaFacial from './pages/EsteticaFacial'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/maquiagem" element={<Maquiagem/>} />
      <Route path="/cabelo" element={<Cabelo />} />
      <Route path="/estetica-facial" element={<EsteticaFacial />} />
    </Routes>
  )
}

export default App