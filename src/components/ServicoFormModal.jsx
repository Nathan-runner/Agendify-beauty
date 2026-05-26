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

export default function ServicoFormModal({
  isOpen,
  onClose,
  onSubmit,
  servico,
  isLoading,
}) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    duracao: '',
    preco: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (servico) {
      setFormData({
        nome: servico.nome || '',
        descricao: servico.descricao || '',
        duracao: (servico.duracaominutos || servico.duracao)?.toString() || '',
        preco: servico.preco?.toString() || '',
      })
    } else {
      setFormData({
        nome: '',
        descricao: '',
        duracao: '',
        preco: '',
      })
    }
    setErrors({})
  }, [servico, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório'
    if (!formData.duracao) newErrors.duracao = 'Duração é obrigatória'
    else if (isNaN(formData.duracao) || Number(formData.duracao) <= 0) {
      newErrors.duracao = 'Duração deve ser um número maior que 0'
    }
    if (!formData.preco) newErrors.preco = 'Preço é obrigatório'
    else if (isNaN(formData.preco) || Number(formData.preco) <= 0) {
      newErrors.preco = 'Preço deve ser um número maior que 0'
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
        descricao: formData.descricao.trim(),
        duracao: parseInt(formData.duracao, 10),
        preco: parseFloat(formData.preco),
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
          <DialogTitle>{servico ? 'Editar Serviço' : 'Novo Serviço'}</DialogTitle>
          <DialogDescription>
            {servico
              ? 'Atualize as informações do serviço selecionado.'
              : 'Preencha os dados para cadastrar um novo serviço.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome">Nome do Serviço *</Label>
            <Input
              id="nome"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Maquiagem Básica"
              disabled={isLoading}
              aria-invalid={!!errors.nome}
            />
            {errors.nome && <p className="text-sm text-destructive">{errors.nome}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="descricao">Descrição</Label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Descreva o serviço..."
              rows="3"
              className="min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="duracao">Duração (minutos) *</Label>
            <Input
              id="duracao"
              type="number"
              name="duracao"
              value={formData.duracao}
              onChange={handleChange}
              placeholder="Ex: 30"
              min="1"
              disabled={isLoading}
              aria-invalid={!!errors.duracao}
            />
            {errors.duracao && <p className="text-sm text-destructive">{errors.duracao}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="preco">Preço (R$) *</Label>
            <Input
              id="preco"
              type="number"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              placeholder="Ex: 50.00"
              min="0.01"
              step="0.01"
              disabled={isLoading}
              aria-invalid={!!errors.preco}
            />
            {errors.preco && <p className="text-sm text-destructive">{errors.preco}</p>}
          </div>
        </form>

        <DialogFooter>
          <Button onClick={onClose} disabled={isLoading} variant="outline">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Salvando...' : servico ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
