import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, DollarSign } from 'lucide-react'

export default function ServicoCardSimples({ servico, onAgendar }) {
  return (
    <Card className="border-border/60 overflow-hidden transition-all hover:shadow-lg">
      {/* Decorative header */}
      <div className="h-2 bg-gradient-to-r from-primary to-primary/80" />

      <div className="space-y-4 p-6">
        {/* Título */}
        <div>
          <h3 className="text-xl font-bold text-foreground">{servico.nome}</h3>
        </div>

        {/* Descrição */}
        {servico.descricao && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{servico.descricao}</p>
        )}

        {/* Metadata */}
        <div className="space-y-3 border-b border-t border-border py-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Duração</p>
              <p className="text-sm font-semibold text-foreground">{servico.duracaominutos || servico.duracao} min</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Preço</p>
              <p className="text-sm font-semibold text-foreground">R$ {servico.preco}</p>
            </div>
          </div>
        </div>

        {/* Button */}
        <Button onClick={onAgendar} className="w-full">
          Agendar Agora
        </Button>
      </div>
    </Card>
  )
}
