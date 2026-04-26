import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom'
import CardServico from '../components/CardServico'
import { IoLogoInstagram } from 'react-icons/io'

function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar  />

      {/* Hero Section */}
      <section 
        className="h-[530px] flex items-center px-16 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/src/assets/Studio-Siqueira.png')" }}
      >
        <div className="relative z-10">
          <h2 className="text-gray-900 text-4xl font-bold leading-tight">
            Transformando sua <br /> autoestima
          </h2>
          <p className="text-gray-700 text-sm mt-4 max-w-md">
            Referência em beleza e bem estar. Agende seu horário e venha nos visitar!
          </p>
        </div>
        
        <div className="absolute bottom-6 left-16 flex items-center gap-4">
          <span className="text-gray-700 text-sm">📞 (11) 99999-9999</span>
          <a href="https://instagram.com/studiosiqueiras" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-cyan-500 transition-colors">
          <IoLogoInstagram size={24} />
          </a>
        </div>

      </section>

      {/* Seção de Serviços */}
      <section id="servicos" className="px-16 py-16  ">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Nossos Serviços</h2>
        <p className="text-gray-500 text-center text-sm mb-10">Escolha o serviço ideal para você</p>
        
        <div className="grid grid-cols-3 gap-6">

          <CardServico
          imagem="/src/assets/Maquiagem.png"
          nome="Maquiagem"
          descricao="Realce sua beleza com nossa maquiagem profissional."
          link="/maquiagem"
          />

          <CardServico
          imagem="/src/assets/Cabelo.png"
          nome="Cabelo"
          descricao="Corte, penteados e tratamento capilar especialmente para você."
          link="/cabelo"
          />
          
          <CardServico
          imagem="/src/assets/EsteticaFacial.png"
          nome="Estética Facial"
          descricao="Cuide da sua pele com nossos tratamentos faciais."
          link="/estetica-facial"
          />
        </div>
      </section>

      {/* Seção Nossa Equipe */}
      <section id="equipe" className="px-16 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Nossa Equipe</h2>
        <p className="text-gray-500 text-center text-sm mb-10">Conheça os profissionais por trás do Studio Siqueira's</p>
        <div className="grid grid-cols-3 gap-6">

<div className="bg-white rounded-2xl shadow-md text-center p-6">
            <div className="w-24 h-24 bg-cyan-500 rounded-full mx-auto mb-4"></div>
            <h3 className="text-gray-800 font-bold text-lg">Ingrid</h3>
            <p className="text-cyan-500 text-sm font-medium">Designer de Beleza</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md text-center p-6">
            <div className="w-24 h-24 bg-cyan-500 rounded-full mx-auto mb-4"></div>
            <h3 className="text-gray-800 font-bold text-lg">Nathan</h3>
            <p className="text-cyan-500 text-sm font-medium">Especialista em Estrutura</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md text-center p-6">
            <div className="w-24 h-24 bg-cyan-500 rounded-full mx-auto mb-4"></div>
            <h3 className="text-gray-800 font-bold text-lg">Guilherme</h3>
            <p className="text-cyan-500 text-sm font-medium">Gestor de Serviços</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md text-center p-6">
            <div className="w-24 h-24 bg-cyan-500 rounded-full mx-auto mb-4"></div>
            <h3 className="text-gray-800 font-bold text-lg">Ana Beatriz</h3>
            <p className="text-cyan-500 text-sm font-medium">Coordenadora de Agenda</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md text-center p-6">
            <div className="w-24 h-24 bg-cyan-500 rounded-full mx-auto mb-4"></div>
            <h3 className="text-gray-800 font-bold text-lg">Poliana</h3>
            <p className="text-cyan-500 text-sm font-medium">Especialista em Reservas</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md text-center p-6">
            <div className="w-24 h-24 bg-cyan-500 rounded-full mx-auto mb-4"></div>
            <h3 className="text-gray-800 font-bold text-lg">Hudson</h3>
            <p className="text-cyan-500 text-sm font-medium">Mestre do Fluxo</p>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Dashboard