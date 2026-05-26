function Botao({ texto, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-6 bg-cyan-500 text-white font-semibold py-3 rounded-xl hover:bg-cyan-600 transition-colors"
    >
      {texto}
    </button>
  )
}

export default Botao