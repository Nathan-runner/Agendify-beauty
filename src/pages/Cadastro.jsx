import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import { cadastrarCliente, cadastrarFuncionario } from '../services/api.ts'
import Toast from '@/components/Toast'

function Cadastro() {
  const navigate = useNavigate()
  const [tipo, setTipo] = useState('cliente')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telefone, setTelefone] = useState('')
  const [funcao, setFuncao] = useState('')
  const [codigoEmpresa, setCodigoEmpresa] = useState('')
  const [toast, setToast] = useState(null)

  const registerMutation = useMutation({
    mutationFn: () => {
      if (tipo === 'cliente') {
        return cadastrarCliente({ nome, email, password, telefone })
      } else {
        return cadastrarFuncionario({ nome, email, password, telefone, funcao, codigoEmpresa })
      }
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Conta criada com sucesso! Redirecionando para login...',
      })
      setTimeout(() => {
        navigate('/')
      }, 1500)
    },
    onError: (error) => {
      setToast({
        type: 'error',
        message: error.message || 'Erro ao criar conta. Tente novamente.',
      })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!nome || !email || !password || !telefone) {
      setToast({ type: 'error', message: 'Preencha todos os campos obrigatórios' })
      return
    }

    if (tipo === 'funcionario' && (!funcao || !codigoEmpresa)) {
      setToast({ type: 'error', message: 'Preencha função e código da empresa' })
      return
    }

    if (password.length < 6) {
      setToast({ type: 'error', message: 'Senha deve ter pelo menos 6 caracteres' })
      return
    }

    registerMutation.mutate()
  }

  return (
    <div className="min-h-screen bg-primary/5 flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="src/assets/Logo_Studio-Siqueira.png" alt="Logo Studio Siqueira's" className="w-12 h-12 rounded-full object-cover border border-primary/20" />
            <h2 className="text-primary text-xl font-bold tracking-wide">Studio Siqueira's</h2>
          </div>
          <CardTitle className="text-2xl font-bold">Crie sua conta!</CardTitle>
          <CardDescription>Cadastre-se para acessar nossa plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-6">
            <Button type="button" onClick={() => setTipo('cliente')} variant={tipo === 'cliente' ? 'default' : 'outline'} className="flex-1">
              Cliente
            </Button>
            <Button type="button" onClick={() => setTipo('funcionario')} variant={tipo === 'funcionario' ? 'default' : 'outline'} className="flex-1">
              Funcionário
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {registerMutation.isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{registerMutation.error?.message}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" type="text" placeholder="seu nome" value={nome} onChange={(e) => setNome(e.target.value)} disabled={registerMutation.isPending} required />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={registerMutation.isPending} required />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={registerMutation.isPending} required />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" type="tel" placeholder="(00) 00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} disabled={registerMutation.isPending} required />
            </div>

            {tipo === 'funcionario' && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="funcao">Função</Label>
                  <Input id="funcao" type="text" placeholder="Ex: Cabeleireiro, Manicure..." value={funcao} onChange={(e) => setFuncao(e.target.value)} disabled={registerMutation.isPending} required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="codigoEmpresa">Código da Empresa</Label>
                  <Input id="codigoEmpresa" type="text" placeholder="Código fornecido pelo salão" value={codigoEmpresa} onChange={(e) => setCodigoEmpresa(e.target.value)} disabled={registerMutation.isPending} required />
                </div>
              </>
            )}

            <Button type="submit" className="w-full mt-2" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Criando conta...</>
              ) : 'Criar Conta'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Já tem conta?{' '}
            <Link to="/" className="text-primary font-medium hover:underline">Entrar</Link>
          </p>
        </CardContent>
      </Card>

      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  )
}

export default Cadastro