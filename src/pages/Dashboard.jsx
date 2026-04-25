import Navbar from "../components/Navbar"

function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div
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
          <button className="mt-6 bg-cyan-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-cyan-600 transition-colors">
            Agendar Horário
          </button>
        </div>
      </div>

      {/* Seção de Serviços */}
      <section className="px-16 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Nossos Serviços</h2>
        <p className="text-gray-500 text-center text-sm mb-10">Escolha o serviço ideal para você</p>
      </section>

    </div>
  )
}

export default Dashboard