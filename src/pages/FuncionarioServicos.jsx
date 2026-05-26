import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { createServico, updateServico, deleteServico, getServicosByFuncionario, getMeuPerfil } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import ServicoCardComAcoes from '@/components/ServicoCardComAcoes'
import ServicoFormModal from '@/components/ServicoFormModal'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import Toast from '@/components/Toast'

export default function FuncionarioServicos() {
  const queryClient = useQueryClient()
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [servicoEditando, setServicoEditando] = useState(null)
  const [servicoDeletando, setServicoDeletando] = useState(null)

  const perfilQuery = useQuery({
    queryKey: ['meu-perfil'],
    queryFn: getMeuPerfil,
  })

  const user = perfilQuery.data;
  const professionalId = user?.professional?.id || user?.id;

  // Queries
  const servicosQuery = useQuery({
    queryKey: ['meus-servicos', professionalId],
    queryFn: () => getServicosByFuncionario(professionalId),
    enabled: !!professionalId,
  })

  // Mutations
  const createMutation = useMutation({
    mutationFn: createServico,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meus-servicos'] })
      setFormOpen(false)
      setToast({ type: 'success', message: 'Serviço criado com sucesso!' })
      setTimeout(() => setToast(null), 3000)
    },
    onError: (error) => {
      setToast({ type: 'error', message: error.message || 'Erro ao criar serviço' })
      setTimeout(() => setToast(null), 3000)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, dados }) => updateServico(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meus-servicos'] })
      setFormOpen(false)
      setServicoEditando(null)
      setToast({ type: 'success', message: 'Serviço atualizado com sucesso!' })
      setTimeout(() => setToast(null), 3000)
    },
    onError: (error) => {
      setToast({ type: 'error', message: error.message || 'Erro ao atualizar serviço' })
      setTimeout(() => setToast(null), 3000)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteServico,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meus-servicos'] })
      setDeleteOpen(false)
      setServicoDeletando(null)
      setToast({ type: 'success', message: 'Serviço deletado com sucesso!' })
      setTimeout(() => setToast(null), 3000)
    },
    onError: (error) => {
      setToast({ type: 'error', message: error.message || 'Erro ao deletar serviço' })
      setTimeout(() => setToast(null), 3000)
    },
  })

  // Handlers
  const handleNovoServico = () => {
    setServicoEditando(null)
    setFormOpen(true)
  }

  const handleEditar = (servico) => {
    setServicoEditando(servico)
    setFormOpen(true)
  }

  const handleDeletar = (servico) => {
    setServicoDeletando(servico)
    setDeleteOpen(true)
  }

  const handleFormSubmit = (dados) => {
    if (!professionalId) {
      setToast({ type: 'error', message: 'Erro: ID do profissional não encontrado.' })
      return;
    }

    const payload = {
      nome: dados.nome,
      descricao: dados.descricao,
      duracaominutos: dados.duracao,
      preco: dados.preco,
      professionalId: professionalId
    };

    if (servicoEditando) {
      updateMutation.mutate({ id: servicoEditando.id, dados: payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  const handleConfirmarDelete = () => {
    deleteMutation.mutate(servicoDeletando.id)
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
          <div className="mx-auto w-full max-w-6xl space-y-8">
            {/* Header Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-3xl">Meus Serviços</CardTitle>
                  <CardDescription>Gerenciar seus serviços e preços</CardDescription>
                </div>
                <Button
                  onClick={handleNovoServico}
                  className="gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Novo Serviço
                </Button>
              </CardHeader>
            </Card>

            {/* Serviços */}
            {servicosQuery.isLoading && <LoadingSpinner />}
            {servicosQuery.isError && <ErrorMessage error={servicosQuery.error} />}

            {servicosQuery.data && servicosQuery.data.length === 0 && (
              <Card className="text-center">
                <CardContent className="py-16">
                  <p className="mb-4 text-lg text-gray-600">Você ainda não tem serviços cadastrados</p>
                  <Button
                    onClick={handleNovoServico}
                    className="gap-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Criar Primeiro Serviço
                  </Button>
                </CardContent>
              </Card>
            )}

            {servicosQuery.data && servicosQuery.data.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicosQuery.data.map(servico => (
                  <ServicoCardComAcoes
                    key={servico.id}
                    servico={servico}
                    onEditar={handleEditar}
                    onDeletar={handleDeletar}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal de Formulário */}
      <ServicoFormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false)
          setServicoEditando(null)
        }}
        onSubmit={handleFormSubmit}
        servico={servicoEditando}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Dialog de Confirmação de Deleção */}
      <ConfirmDeleteDialog
        isOpen={deleteOpen}
        onClose={() => {
          setDeleteOpen(false)
          setServicoDeletando(null)
        }}
        onConfirm={handleConfirmarDelete}
        title="Deletar Serviço"
        message={`Tem certeza que deseja deletar o serviço "${servicoDeletando?.nome}"? Esta ação não pode ser desfeita.`}
        isLoading={deleteMutation.isPending}
      />

        {/* Toast */}
        {toast && <Toast type={toast.type} message={toast.message} />}
      </SidebarInset>
    </SidebarProvider>
  )
}
