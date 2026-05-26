import { FaUser, FaCut, FaClock, FaDollarSign } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function ResumoAgendamento({
  funcionario,
  servico,
  horario,
  etapa,
  onConfirmar,
  isLoading,
  isOpen,
  onClose,
}) {
  if (!isOpen && etapa < 3) {
    return (
      <Card className="sticky top-8 hidden lg:block">
        <CardHeader>
          <CardTitle>Resumo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <FaUser /> Funcionário
            </p>
            <p className="text-lg font-semibold text-foreground">{funcionario?.nome || '—'}</p>
          </div>

          {etapa >= 2 && (
            <div className="flex flex-col gap-2 border-t pt-4">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaCut /> Serviço
              </p>
              <p className="text-lg font-semibold text-foreground">{servico?.nome || '—'}</p>
            </div>
          )}

          {servico && (
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div className="flex flex-col gap-1">
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <FaClock /> Duração
                </p>
                <p className="font-semibold text-foreground">{servico?.duracaominutos || servico?.duracao} min</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <FaDollarSign /> Preço
                </p>
                <p className="font-semibold text-primary">R$ {servico.preco}</p>
              </div>
            </div>
          )}

          {etapa >= 3 && (
            <div className="flex flex-col gap-2 border-t pt-4">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaClock /> Horário
              </p>
              <p className="text-lg font-semibold text-foreground">{horario || '—'}</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) onClose()
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Agendamento</DialogTitle>
          <DialogDescription>
            Revise os dados abaixo antes de concluir o agendamento.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <FaUser /> Funcionário
            </p>
            <p className="text-lg font-semibold text-foreground">{funcionario?.nome}</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <FaCut /> Serviço
            </p>
            <p className="text-lg font-semibold text-foreground">{servico?.nome}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-y py-4">
            <div className="flex flex-col gap-1">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <FaClock /> Duração
              </p>
              <p className="font-semibold text-foreground">{servico?.duracaominutos} min</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <FaDollarSign /> Preço
              </p>
              <p className="font-semibold text-primary">R$ {servico?.preco}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <FaClock /> Horário
            </p>
            <p className="text-lg font-semibold text-foreground">{horario}</p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} disabled={isLoading} variant="outline">
            Cancelar
          </Button>
          <Button onClick={onConfirmar} disabled={isLoading}>
            {isLoading ? 'Confirmando...' : 'Confirmar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
