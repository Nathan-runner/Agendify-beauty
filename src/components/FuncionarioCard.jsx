import { Card } from '@/components/ui/card'

export default function FuncionarioCard({ funcionario, onClick }) {
  const nome = funcionario.user?.nome ?? funcionario.nome ?? ''
  const foto = funcionario.user?.foto ?? funcionario.foto

  return (
    <button onClick={onClick} className="w-full text-left">
      <Card className="group relative w-full overflow-hidden p-4 transition-all hover:shadow-xl sm:p-6">
        <div className="absolute inset-0 bg-primary/5 opacity-0 transition group-hover:opacity-100" />

        <div className="relative z-10 flex flex-col items-center gap-4">
          {foto ? (
            <img
              src={foto}
              alt={nome}
              className="size-18 rounded-full border-4 border-primary/20 object-cover transition group-hover:border-primary/50 sm:size-20"
            />
          ) : (
            <div className="size-18 rounded-full border-4 border-primary/20 bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary sm:size-20">
              {nome
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
          )}

          <div className="text-center">
            <h3 className="text-base font-bold text-foreground sm:text-lg">{nome}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{funcionario.funcao}</p>
          </div>

          <div className="w-full border-t border-border pt-4 transition group-hover:border-primary/20">
            <p className="text-center text-sm font-semibold text-primary group-hover:text-primary/80">
              Selecionar →
            </p>
          </div>
        </div>
      </Card>
    </button>
  )
}
