import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import ErrorMessage from '@/components/ErrorMessage'
import FuncionarioCard from '@/components/FuncionarioCard'
import HorarioGrid from '@/components/HorarioGrid'
import LoadingSpinner from '@/components/LoadingSpinner'
import ResumoAgendamento from '@/components/ResumoAgendamento'
import ServicoCard from '@/components/ServicoCard'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import StepIndicator from '@/components/StepIndicator'
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
  createAgendamento,
  getFuncionarios,
  getDisponibilidade,
  getServicosByFuncionario,
} from '@/services/api'
import { getCurrentUser } from '@/config/env'

export default function Agendar() {
  const [etapa, setEtapa] = useState(1)
  const [funcionarioId, setFuncionarioId] = useState(null)
  const [servicoId, setServicoId] = useState(null)
  const [horario, setHorario] = useState(null)
  const [confirmarOpen, setConfirmarOpen] = useState(false)

  const user = getCurrentUser();

  const funcionariosQuery = useQuery({
    queryKey: ['funcionarios'],
    queryFn: getFuncionarios,
  })

  const servicosQuery = useQuery({
    queryKey: ['servicos', funcionarioId],
    queryFn: () => getServicosByFuncionario(funcionarioId),
    enabled: !!funcionarioId,
  })

  const servicoSelecionado = servicosQuery.data?.find(s => s.id === servicoId);
  const duracao = servicoSelecionado?.duracaominutos || servicoSelecionado?.duracao || 30;

  const horariosQuery = useQuery({
    queryKey: ['horarios', funcionarioId, servicoId],
    queryFn: () => getDisponibilidade(funcionarioId, new Date().toISOString().split('T')[0], duracao),
    enabled: !!funcionarioId && !!servicoId && !!servicoSelecionado,
  })

  const criarMutation = useMutation({
    mutationFn: (variables) => createAgendamento(
      variables.funcionarioId, 
      variables.servicoId, 
      user?.id || 'cliente-anonimo', 
      variables.dataHoraInicio
    ),
    onSuccess: (_, variables) => {
      setConfirmarOpen(false)
      toast.success('Agendamento realizado com sucesso!', {
        description: `${variables.servicoNome} com ${variables.funcionarioNome} às ${variables.horario}.`,
      })
      setEtapa(1)
      setFuncionarioId(null)
      setServicoId(null)
      setHorario(null)
    },
    onError: () => {
      toast.error('Não foi possível concluir o agendamento.', {
        description: 'Tente novamente em alguns instantes.',
      })
    },
  })

  const handleSelecionarFuncionario = (id) => {
    setFuncionarioId(id)
    setServicoId(null)
    setHorario(null)
    setEtapa(2)
  }

  const handleSelecionarServico = (id) => {
    setServicoId(id)
    setHorario(null)
    setEtapa(3)
  }

  const handleVoltarEtapa = () => {
    if (etapa === 2) {
      setFuncionarioId(null)
      setServicoId(null)
      setEtapa(1)
    } else if (etapa === 3) {
      setServicoId(null)
      setHorario(null)
      setEtapa(2)
    }
  }

  const handleConfirmarAgendamento = () => {
    const funcionario = funcionariosQuery.data?.find((f) => f.id === funcionarioId)
    const servico = servicosQuery.data?.find((s) => s.id === servicoId)

    // horario agora é o dataHoraIso completo (ISO 8601)
    const dataHoraInicio = horario;

    // Extrai a hora formatada para exibição
    const dataObj = new Date(horario);
    const horaFormatada = dataObj.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    criarMutation.mutate({
      funcionarioId,
      servicoId,
      horario: horaFormatada,
      dataHoraInicio,
      funcionarioNome: funcionario?.nome,
      servicoNome: servico?.nome,
      servicoPreco: servico?.preco,
      servicoDuracao: servico?.duracao,
    })
  }

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
        <div className="px-4 py-6 sm:py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
            <Card className="border-border/60 bg-background">
              <CardHeader className="text-center">
                <CardTitle>Agende seu Horário</CardTitle>
                <CardDescription>
                  Escolha um funcionário, serviço e horário disponível para concluir seu atendimento.
                </CardDescription>
              </CardHeader>
            </Card>

            <StepIndicator etapa={etapa} />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_320px] xl:items-start">
              <Card className="border-border/60 bg-background">
                <CardContent className="p-4 sm:p-6">
                  {etapa === 1 && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                          Escolha um Funcionário
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Selecione o profissional para seguir com o agendamento.
                        </p>
                      </div>

                      {funcionariosQuery.isLoading && <LoadingSpinner />}
                      {funcionariosQuery.isError && (
                        <ErrorMessage error={funcionariosQuery.error} />
                      )}

                      {funcionariosQuery.data && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {funcionariosQuery.data.map((funcionario) => (
                            <FuncionarioCard
                              key={funcionario.id}
                              funcionario={funcionario}
                              onClick={() => handleSelecionarFuncionario(funcionario.id)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {etapa === 2 && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                          Escolha um Serviço
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Veja os serviços disponíveis para o profissional selecionado.
                        </p>
                      </div>

                      {servicosQuery.isLoading && <LoadingSpinner />}
                      {servicosQuery.isError && (
                        <ErrorMessage error={servicosQuery.error} />
                      )}

                      {servicosQuery.data && (
                        <div className="flex flex-col gap-4">
                          {servicosQuery.data.map((servico) => (
                            <ServicoCard
                              key={servico.id}
                              servico={servico}
                              onClick={() => handleSelecionarServico(servico.id)}
                            />
                          ))}
                        </div>
                      )}

                      <Button
                        onClick={handleVoltarEtapa}
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        ← Voltar
                      </Button>
                    </div>
                  )}

                  {etapa === 3 && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                          Escolha um Horário
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Selecione o horário disponível que melhor atende você.
                        </p>
                      </div>

                      {horariosQuery.isLoading && <LoadingSpinner />}
                      {horariosQuery.isError && (
                        <ErrorMessage error={horariosQuery.error} />
                      )}

                      {horariosQuery.data && (
                        <div className="flex flex-col gap-6">
                          <HorarioGrid
                            horarios={horariosQuery.data}
                            horarioSelecionado={horario}
                            onSelect={setHorario}
                          />

                          <div className="flex flex-col gap-3 sm:flex-row">
                            <Button
                              onClick={handleVoltarEtapa}
                              variant="outline"
                              className="w-full sm:flex-1"
                            >
                              ← Voltar
                            </Button>
                            <Button
                              onClick={() => setConfirmarOpen(true)}
                              disabled={!horario}
                              className="w-full sm:flex-1"
                            >
                              Confirmar →
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <ResumoAgendamento
                funcionario={funcionariosQuery.data?.find((f) => f.id === funcionarioId)}
                servico={servicosQuery.data?.find((s) => s.id === servicoId)}
                horario={horario}
                etapa={etapa}
                onConfirmar={handleConfirmarAgendamento}
                isLoading={criarMutation.isPending}
                isOpen={confirmarOpen}
                onClose={() => setConfirmarOpen(false)}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
