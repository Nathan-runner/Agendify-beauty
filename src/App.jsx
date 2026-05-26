import { Routes, Route } from 'react-router-dom'
import Login from '@/pages/Login'
import Cadastro from '@/pages/Cadastro'
import Dashboard from '@/pages/Dashboard'
import Agendar from '@/pages/Agendar'
import Servicos from '@/pages/Servicos'
import FuncionarioServicos from '@/pages/FuncionarioServicos'
import Perfil from '@/pages/Perfil'
import MeusAgendamentos from '@/pages/MeusAgendamentos'
import Maquiagem from '@/pages/Maquiagem'
import Cabelo from '@/pages/Cabelo'
import EsteticaFacial from '@/pages/EsteticaFacial'
import ClienteRoute from '@/components/cliente-route'
import FuncionarioRoute from '@/components/funcionario-route'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashboard" element={<FuncionarioRoute><Dashboard /></FuncionarioRoute>} />
      <Route path="/agendar" element={<ClienteRoute><Agendar /></ClienteRoute>} />
      <Route path="/servicos" element={<ClienteRoute><Servicos /></ClienteRoute>} />
      <Route path="/funcionario/servicos" element={<FuncionarioRoute><FuncionarioServicos /></FuncionarioRoute>} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/meus-agendamentos" element={<FuncionarioRoute><MeusAgendamentos /></FuncionarioRoute>} />
      <Route path="/maquiagem" element={<Maquiagem/>} />
      <Route path="/cabelo" element={<Cabelo />} />
      <Route path="/estetica-facial" element={<EsteticaFacial />} />
    </Routes>
  )
}

export default App