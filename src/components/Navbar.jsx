function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <img src="/src/assets/Logo_Studio-Siqueira.png" alt="Logo Studio Siqueira's" className="w-12 h-12 rounded-full" />
        <h1 className="text-cyan-500 font-bold text-xl">Studio Siqueira's</h1>
        </div>
      <div className="flex items-center gap-8">
        <a href="#" className="text-cyan-600 text-sm hover:text-cyan-500 transition-colors">Início</a>
        <a href="#servicos" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">Serviços</a>
        <a href="#equipe" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">Nossa Equipe</a>
      </div>
    </nav>
  )
}

export default Navbar