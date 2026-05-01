import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { BsCalendar2Week, BsGear, BsBriefcase, BsPerson } from 'react-icons/bs'

function DashboardFuncionario() {
  const navigate = useNavigate()

  const cards = [
    {
      icon: <BsCalendar2Week size={36} className="text-white" />,
      titulo: 'Abrir Agenda',
      descricao: 'Visualize seus compromissos do dia e próximos.',
      botao: 'Abrir agenda',
      rota: '/agenda',
    },
    {
      icon: <BsGear size={36} className="text-white" />,
      titulo: 'Configurar Agenda',
      descricao: 'Defina horários de atendimento, intervalos e preferências.',
      botao: 'Configurar agenda',
      rota: '/configurar-agenda',
    },
    {
      icon: <BsBriefcase size={36} className="text-white" />,
      titulo: 'Abrir Serviços',
      descricao: 'Gerencie seus serviços, durações e preços.',
      botao: 'Abrir serviços',
      rota: '/servicos',
    },
    {
      icon: <BsPerson size={36} className="text-white" />,
      titulo: 'Seu Perfil',
      descricao: 'Veja e edite suas informações pessoais e de contato.',
      botao: 'Ver meu perfil',
      rota: '/perfil',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="px-16 py-12">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Olá, Funcionário! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Confira sua agenda e gerencie seus serviços.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl px-6 py-4 text-right shadow-sm">
            <p className="text-gray-500 text-sm">Hoje é</p>
            <p className="text-cyan-500 font-bold text-lg">
              {new Date().toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="text-gray-500 text-sm capitalize">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long' })}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h2 className="text-gray-800 font-bold text-lg mb-3">
                  {card.titulo}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {card.descricao}
                </p>
              </div>

              <button
                onClick={() => navigate(card.rota)}
                className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-between transition-colors"
              >
                {card.botao}
                <span>›</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardFuncionario