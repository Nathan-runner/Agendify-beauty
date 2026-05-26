import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaClock, FaDollarSign, FaEdit, FaTrash } from 'react-icons/fa'

export default function ServicoCardComAcoes({ servico, onEditar, onDeletar }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      {/* Decorative header */}
      <div className="h-2 bg-primary/80" />

      <div className="p-6">
        {/* Título */}
        <h3 className="mb-2 text-xl font-bold text-gray-900">{servico.nome}</h3>

        {/* Descrição */}
        {servico.descricao && (
          <p className="mb-4 line-clamp-2 text-sm text-gray-600">{servico.descricao}</p>
        )}

        {/* Metadata */}
        <div className="mb-4 flex gap-6 border-b border-t border-gray-200 py-4">
          <div className="flex items-center gap-2">
            <FaClock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-gray-500">Duração</p>
              <p className="text-sm font-semibold text-gray-900">{servico.duracaominutos || servico.duracao} min</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaDollarSign className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-gray-500">Preço</p>
              <p className="text-sm font-semibold text-gray-900">R$ {servico.preco}</p>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <Button
            onClick={() => onEditar(servico)}
            variant="outline"
            className="flex-1 gap-2"
          >
            <FaEdit className="h-4 w-4" />
            Editar
          </Button>
          <Button
            onClick={() => onDeletar(servico)}
            variant="destructive"
            className="flex-1 gap-2"
          >
            <FaTrash className="h-4 w-4" />
            Deletar
          </Button>
        </div>
      </div>
    </Card>
  )
}
