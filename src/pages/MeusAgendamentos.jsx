import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Calendar, Clock, DollarSign, User, X, Check } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import Toast from '@/components/Toast'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { getMeusAgendamentosDetalhados, atualizarStatusAgendamento } from '@/services/api'

const statusConfig = {
  AGUARDANDO: { label: 'Aguardando', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
  EM_ATENDIMENTO: {
    label: 'Em Atendimento',
    color: 'bg-blue-100 text-blue-800',
    icon: '🔄',
  },
  FINALIZADO: { label: 'Finalizado', color: 'bg-green-100 text-green-800', icon: '✓' },
  CANCELADO: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: '✗' },
}

function MeusAgendamentos() {
  const queryClient = useQueryClient()
  const [toast, setToast] = useState(null)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedAgendamento, setSelectedAgendamento] = useState(null)

  const agendamentosQuery = useQuery({
    queryKey: ['meus-agendamentos-detalhados'],
    queryFn: getMeusAgendamentosDetalhados,
    retry: false,
  })

  const cancelMutation = useMutation({
    mutationFn: (id) => atualizarStatusAgendamento(id, 'CANCELADO'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meus-agendamentos-detalhados'] })
      setCancelDialogOpen(false)
      setSelectedAgendamento(null)
      setToast({ type: 'success', message: 'Agendamento cancelado com sucesso!' })
      setTimeout(() => setToast(null), 3000)
    },
    onError: (error) => {
      setToast({ type: 'error', message: error.message || 'Erro ao cancelar agendamento' })
      setTimeout(() => setToast(null), 3000)
    },
  })

  const handleCancelar = (agendamento) => {
    setSelectedAgendamento(agendamento)
    setCancelDialogOpen(true)
  }

  const handleConfirmCancel = () => {
    if (selectedAgendamento) {
      cancelMutation.mutate(selectedAgendamento.id)
    }
  }

  if (agendamentosQuery.isLoading) {
    return (
      <SidebarProvider
        style={{
          '--sidebar-width': '18rem',
          '--header-height': '4rem',
        }}
      >
        <AppSidebar />
        <SidebarInset className="bg-background">
          <SiteHeader />
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="mt-4 text-muted-foreground">Carregando agendamentos...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  if (agendamentosQuery.isError) {
    const errorMessage =
      agendamentosQuery.error?.message ||
      'Erro ao carregar agendamentos. Tente novamente.'

    return (
      <SidebarProvider
        style={{
          '--sidebar-width': '18rem',
          '--header-height': '4rem',
        }}
      >
        <AppSidebar />
        <SidebarInset className="bg-background">
          <SiteHeader />
          <div className="px-4 py-8">
            <div className="mx-auto w-full max-w-5xl">
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
              <div className="mt-4">
                <Button onClick={() => agendamentosQuery.refetch()}>
                  Tentar novamente
                </Button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const agendamentos = agendamentosQuery.data || []

  return (
    <SidebarProvider
      style={{
        '--sidebar-width': '18rem',
        '--header-height': '4rem',
      }}
    >
      <AppSidebar />
      <SidebarInset className="bg-background">
        <SiteHeader />
        <div className="px-4 py-8">
          <div className="mx-auto w-full max-w-5xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Meus Agendamentos</h1>
              <p className="mt-2 text-muted-foreground">
                Visualize e gerencie todos os seus agendamentos
              </p>
            </div>

            {/* Agendamentos List */}
            {agendamentos.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <h3 className="font-semibold">Nenhum agendamento</h3>
                    <p className="text-sm text-muted-foreground">
                      Você não possui agendamentos no momento
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {agendamentos.map((agendamento) => {
                  const config = statusConfig[agendamento.status]
                  const dataInicio = new Date(agendamento.dataHoraInicio)
                  const dataFim = new Date(agendamento.dataHoraFim)
                  const canCancel =
                    agendamento.status === 'AGUARDANDO' || agendamento.status === 'EM_ATENDIMENTO'

                  return (
                    <Card key={agendamento.id} className="border-border/60 bg-background">
                      <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          {/* Info */}
                          <div className="flex flex-col gap-4 flex-1">
                            {/* Status Badge */}
                            <div className="flex items-center gap-2">
                              <Badge className={config.color}>
                                {config.icon} {config.label}
                              </Badge>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                              {/* Data */}
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Data</p>
                                  <p className="font-medium">
                                    {dataInicio.toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                              </div>

                              {/* Hora */}
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Horário</p>
                                  <p className="font-medium">
                                    {dataInicio.toLocaleTimeString('pt-BR', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}{' '}
                                    -
                                    {dataFim.toLocaleTimeString('pt-BR', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </p>
                                </div>
                              </div>

                              {/* Serviço */}
                              <div className="flex items-center gap-2 text-sm">
                                <div className="rounded-md border bg-muted/30 p-2">
                                  <span>📋</span>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Serviço</p>
                                  <p className="font-medium text-primary">
                                    {agendamento.service?.nome || 'Serviço não informado'}
                                  </p>
                                </div>
                              </div>

                              {/* Preço */}
                              {agendamento.service?.preco && (
                                <div className="flex items-center gap-2 text-sm">
                                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">Preço</p>
                                    <p className="font-medium text-primary">
                                      R$ {agendamento.service.preco}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Profissional */}
                              {agendamento.professional && (
                                <div className="flex items-center gap-2 text-sm">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">Profissional</p>
                                    <p className="font-medium text-foreground">
                                      {agendamento.professional.nome}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* ID Agendamento */}
                              <div className="flex items-center gap-2 text-sm">
                                <div className="rounded-md border bg-muted/30 p-2">
                                  <span>🆔</span>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">ID</p>
                                  <p className="font-mono text-xs text-foreground">
                                    {agendamento.id.slice(0, 8)}...
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 md:flex-col md:items-end">
                            {canCancel && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancelar(agendamento)}
                                disabled={cancelMutation.isPending}
                              >
                                {cancelMutation.isPending ? (
                                  <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                                    Cancelando...
                                  </>
                                ) : (
                                  <>
                                    <X className="h-4 w-4 mr-2" />
                                    Cancelar
                                  </>
                                )}
                              </Button>
                            )}
                            {agendamento.status === 'CANCELADO' && (
                              <Button variant="outline" size="sm" disabled>
                                <X className="h-4 w-4 mr-2" />
                                Cancelado
                              </Button>
                            )}
                            {agendamento.status === 'FINALIZADO' && (
                              <Button variant="outline" size="sm" disabled>
                                <Check className="h-4 w-4 mr-2" />
                                Finalizado
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </SidebarInset>

      {/* Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Agendamento?</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
              disabled={cancelMutation.isPending}
            >
              Voltar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmCancel}
              disabled={cancelMutation.isPending}
            >
              {cancelMutation.isPending ? 'Cancelando...' : 'Confirmar Cancelamento'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {toast && <Toast type={toast.type} message={toast.message} />}
    </SidebarProvider>
  )
}

export default MeusAgendamentos
