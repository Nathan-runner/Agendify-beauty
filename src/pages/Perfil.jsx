import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  AlertCircleIcon,
  EyeIcon,
  EditIcon,
  MailIcon,
  PhoneIcon,
  SparklesIcon,
  TrashIcon,
  UserRoundIcon,
} from 'lucide-react'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import ErrorMessage from '@/components/ErrorMessage'
import LoadingSpinner from '@/components/LoadingSpinner'
import PerfilFormModal from '@/components/PerfilFormModal'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import Toast from '@/components/Toast'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getMeuPerfil, updateMeuPerfil as updatePerfil } from '@/services/api'

function ProfileInfoItem({ icon: Icon, label, value, tone = 'default' }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
      <div className="rounded-md border bg-background p-2 text-muted-foreground">
        <Icon />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={tone === 'primary' ? 'font-medium text-primary' : 'font-medium text-foreground'}>
          {value}
        </span>
      </div>
    </div>
  )
}

export default function Perfil() {
  const queryClient = useQueryClient()
  const [formOpen, setFormOpen] = useState(false)
  const [viewMode, setViewMode] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const perfilQuery = useQuery({
    queryKey: ['meu-perfil'],
    queryFn: getMeuPerfil,
  })

  const updateMutation = useMutation({
    mutationFn: updatePerfil,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meu-perfil'] })
      setFormOpen(false)
      setToast({ type: 'success', message: 'Perfil atualizado com sucesso!' })
      setTimeout(() => setToast(null), 3000)
    },
    onError: (error) => {
      setToast({ type: 'error', message: error.message || 'Erro ao atualizar perfil' })
      setTimeout(() => setToast(null), 3000)
    },
  })

  const handleEditar = () => {
    setViewMode(false)
    setFormOpen(true)
  }

  const handleVisualizar = () => {
    setViewMode(true)
    setFormOpen(true)
  }

  const handleFormSubmit = (dados) => {
    updateMutation.mutate(dados)
  }

  const perfil = perfilQuery.data
  const initials = perfil?.nome
    ? perfil.nome
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'MP'

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
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
            <Card className="border-border/60 bg-background">
              <CardHeader>
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline">
                      <SparklesIcon data-icon="inline-start" />
                      Área do profissional
                    </Badge>
                    <div className="flex flex-col gap-1">
                      <CardTitle>Meu Perfil</CardTitle>
                      <CardDescription>
                        Visualize e atualize seus dados profissionais usando os padrões do painel.
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {perfilQuery.isLoading && <LoadingSpinner />}
            {perfilQuery.isError && <ErrorMessage error={perfilQuery.error} />}

            {perfil && (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
                <Card className="border-border/60 bg-background">
                  <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar size="lg" className="size-20">
                          <AvatarImage src={perfil.foto} alt={perfil.nome} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-1">
                            <CardTitle>{perfil.nome}</CardTitle>
                            <CardDescription>{perfil.especialidade || 'Especialidade não informada'}</CardDescription>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge>{perfil.especialidade || 'Profissional'}</Badge>
                            <Badge variant="secondary">Perfil ativo</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={handleEditar}>
                          <EditIcon data-icon="inline-start" />
                          Editar Dados
                        </Button>
                        <Button onClick={handleVisualizar} variant="outline">
                          <EyeIcon data-icon="inline-start" />
                          Visualizar
                        </Button>
                        <Button onClick={() => setDeleteOpen(true)} variant="destructive">
                          <TrashIcon data-icon="inline-start" />
                          Deletar Conta
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <Separator />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <ProfileInfoItem icon={MailIcon} label="Email" value={perfil.email} />
                      <ProfileInfoItem
                        icon={PhoneIcon}
                        label="Telefone"
                        value={perfil.telefone || 'Não informado'}
                      />
                      <ProfileInfoItem
                        icon={UserRoundIcon}
                        label="Especialidade"
                        value={perfil.especialidade || 'Não informada'}
                        tone="primary"
                      />
                      <ProfileInfoItem
                        icon={SparklesIcon}
                        label="Status"
                        value="Disponível para atendimento"
                        tone="primary"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-6">
                  <Card className="border-border/60 bg-background">
                    <CardHeader>
                      <CardTitle>Resumo Rápido</CardTitle>
                      <CardDescription>Informações principais do seu cadastro atual.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <p className="text-sm text-muted-foreground">Nome cadastrado</p>
                        <p className="mt-1 font-medium text-foreground">{perfil.nome}</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <p className="text-sm text-muted-foreground">Contato principal</p>
                        <p className="mt-1 font-medium text-foreground">{perfil.email}</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <p className="text-sm text-muted-foreground">Especialidade destacada</p>
                        <p className="mt-1 font-medium text-primary">{perfil.especialidade || 'Defina uma especialidade'}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Alert>
                    <AlertCircleIcon />
                    <AlertDescription>
                      Mantenha seus dados atualizados para facilitar o contato com clientes e organizar melhor o seu atendimento.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            )}
          </div>
        </div>

        <PerfilFormModal
          isOpen={formOpen}
          onClose={() => {
            setFormOpen(false)
            setViewMode(false)
          }}
          onSubmit={handleFormSubmit}
          perfil={perfil}
          isLoading={updateMutation.isPending}
          viewMode={viewMode}
        />

        <ConfirmDeleteDialog
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={() => {
            setDeleteOpen(false)
            setToast({ type: 'success', message: 'Conta deletada com sucesso!' })
          }}
          title="Deletar Conta"
          message="Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita e você perderá todos os seus dados."
          isLoading={false}
        />

        {toast && <Toast type={toast.type} message={toast.message} />}
      </SidebarInset>
    </SidebarProvider>
  )
}
