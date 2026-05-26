import { Card } from '@/components/ui/card'
import { FaClock, FaDollarSign } from 'react-icons/fa'

export default function ServicoCard({ servico, onClick }) {
  return (
    <button onClick={onClick} className="w-full text-left">
      <Card className="group w-full border border-border p-4 transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg sm:p-6">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-foreground transition group-hover:text-primary sm:text-lg">
              {servico.nome}
            </h3>

            {servico.descricao && (
              <p className="mt-1 text-sm text-muted-foreground">{servico.descricao}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4 sm:gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FaClock className="h-4 w-4" />
                <span className="text-sm">{servico.duracaominutos || servico.duracao} min</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-primary">
                <FaDollarSign className="h-4 w-4" />
                <span className="text-sm">R$ {servico.preco}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 text-primary transition group-hover:translate-x-1">
            →
          </div>
        </div>
      </Card>
    </button>
  )
}
