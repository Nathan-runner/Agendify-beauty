import { Link } from 'react-router-dom'

function CardServico({ imagem, nome, descricao, link }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img src={imagem} alt={nome} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-gray-800 font-bold text-lg">{nome}</h3>
        <p className="text-gray-500 text-sm mt-1">{descricao}</p>
        <Link to={link} className="mt-4 inline-block bg-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-cyan-600 transition-colors text-center">
          Saber Mais
        </Link>
      </div>
    </div>
  )
}

export default CardServico