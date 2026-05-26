import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function PerfilFormModal({
  isOpen,
  onClose,
  onSubmit,
  perfil,
  isLoading,
  viewMode,
}) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (perfil) {
      setFormData({
        nome: perfil.nome || '',
        email: perfil.email || '',
        telefone: perfil.telefone || '',
        especialidade: perfil.especialidade || '',
      })
    }
    setErrors({})
  }, [perfil, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório'
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    if (validateForm()) {
      onSubmit({
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        telefone: formData.telefone.trim(),
        especialidade: formData.especialidade.trim(),
      })
    }
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
          <DialogTitle>{viewMode ? 'Visualizar Perfil' : 'Editar Perfil'}</DialogTitle>
          <DialogDescription>
            {viewMode
              ? 'Confira as informações do perfil selecionado.'
              : 'Atualize os dados do perfil e salve as alterações.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Seu nome completo"
              disabled={viewMode || isLoading}
              aria-invalid={!!errors.nome}
            />
            {errors.nome && <p className="text-sm text-destructive">{errors.nome}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu.email@example.com"
              disabled={viewMode || isLoading}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              disabled={viewMode || isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="especialidade">Especialidade</Label>
            <Input
              id="especialidade"
              name="especialidade"
              value={formData.especialidade}
              onChange={handleChange}
              placeholder="Sua especialidade"
              disabled={viewMode || isLoading}
            />
          </div>
        </form>

        <DialogFooter>
          <Button onClick={onClose} disabled={isLoading} variant="outline">
            {viewMode ? 'Fechar' : 'Cancelar'}
          </Button>
          {!viewMode && (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
