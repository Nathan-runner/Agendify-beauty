import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getFuncionarios, getServicosByFuncionario } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import ServicoCardSimples from '@/components/ServicoCardSimples'

export default function Servicos() {
  const navigate = useNavigate()
  const [funcionarioId, setFuncionarioId] = useState(null)

  const funcionariosQuery = useQuery({
    queryKey: ['funcionarios'],
    queryFn: getFuncionarios,
  })

  const servicosQuery = useQuery({
    queryKey: ['servicos', funcionarioId],
    queryFn: () => getServicosByFuncionario(funcionarioId),
    enabled: !!funcionarioId,
  })

  const handleAgendar = (funcionario) => {
    navigate(`/agendar?funcionario=${funcionario.id}`)
  }

  return (
    <SidebarProvider
      style={{
        '--sidebar-width': '18rem',
        '--header-height': '4rem',
      }}
    >
      <AppSidebar />
      <SidebarInset className="bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <SiteHeader />
        <div className="flex flex-col gap-8 px-4 py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            <Card className="border-border/60 bg-background/95">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Nossos Serviços</CardTitle>
                <CardDescription className="text-base">
                  Conheça os serviços oferecidos por nossos profissionais
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/60 bg-background/95">
              <CardHeader>
                <CardTitle className="text-lg">Filtrar por Profissional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {funcionariosQuery.isLoading && <LoadingSpinner />}
                {funcionariosQuery.isError && (
                  <ErrorMessage error={funcionariosQuery.error} />
                )}

                {funcionariosQuery.data && (
                  <TooltipProvider>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                      <Button
                        onClick={() => setFuncionarioId(null)}
                        variant={funcionarioId === null ? 'default' : 'outline'}
                      >
                        Todos
                      </Button>

                      {funcionariosQuery.data.map((func) => (
                        <Tooltip key={func.id}>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => setFuncionarioId(func.id)}
                              variant={funcionarioId === func.id ? 'default' : 'outline'}
                            >
                              {func.user?.nome ?? func.nome}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{func.funcao}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TooltipProvider>
                )}
              </CardContent>
            </Card>

            {!funcionarioId ? (
              <Card className="border-border/60 bg-background/95 py-16">
                <CardContent className="text-center">
                  <p className="text-lg text-muted-foreground">
                    Selecione um profissional para ver seus serviços
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {servicosQuery.isLoading && <LoadingSpinner />}
                {servicosQuery.isError && (
                  <ErrorMessage error={servicosQuery.error} />
                )}

                {servicosQuery.data && servicosQuery.data.length === 0 && (
                  <Card className="border-border/60 bg-background/95 py-16">
                    <CardContent className="text-center">
                      <p className="text-lg text-muted-foreground">
                        Este profissional não possui serviços cadastrados
                      </p>
                    </CardContent>
                  </Card>
                )}

                {servicosQuery.data && servicosQuery.data.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {servicosQuery.data.map((servico) => (
                      <ServicoCardSimples
                        key={servico.id}
                        servico={servico}
                        onAgendar={() => {
                          const funcionario = funcionariosQuery.data.find((f) => f.id === funcionarioId)
                          handleAgendar(funcionario)
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
