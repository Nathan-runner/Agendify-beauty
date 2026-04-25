function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <img src="/src/assets/Logo_Studio-Siqueira.png" alt="Logo Studio Siqueira's" className="w-12 h-12 rounded-full" />
        <h1 className="text-cyan-500 font-bold text-xl">Studio Siqueira's</h1>
        </div>
      <div className="flex items-center gap-8">
        <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">Início</a>
        <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">Serviços</a>
        <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">Nossa Equipe</a>
        <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">Contato</a>
        <button className="bg-cyan-500 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-cyan-600 transition-colors">
          Agendar Horário
        </button>
      </div>
    </nav>
  )
}

export default Navbar