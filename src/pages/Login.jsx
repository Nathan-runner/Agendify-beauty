import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import { login } from '@/services/api'
import { setCurrentUser } from '@/config/env'
import Toast from '@/components/Toast'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toast, setToast] = useState(null)

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (response) => {
      localStorage.setItem('token', response.token)
      setCurrentUser({
        nome: response.nome,
        role: response.role,
        id: response.id,
      })

      setToast({
        type: 'success',
        message: `Bem-vindo, ${response.nome}!`,
      })

      const destino = response.role === 'FUNCIONARIO' ? '/dashboard' : '/perfil'
      setTimeout(() => {
        navigate(destino)
      }, 1000)
    },
    onError: (error) => {
      setToast({
        type: 'error',
        message: error.message || 'Erro ao fazer login. Verifique suas credenciais.',
      })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setToast({
        type: 'error',
        message: 'Preencha todos os campos',
      })
      return
    }

    loginMutation.mutate()
  }

  return (
    <div className="min-h-screen bg-primary/5 flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-sm shadow-xl border-border/60 bg-background/95">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src="src/assets/Logo_Studio-Siqueira.png"
              alt="Logo_Studio-Siqueira.png"
              className="w-12 h-12 rounded-full object-cover border border-primary/20"
            />
            <h2 className="text-primary text-xl font-bold tracking-wide">Studio Siqueira's</h2>
          </div>
          <CardTitle className="text-2xl font-bold">Bem-vindo de volta!</CardTitle>
          <CardDescription>Entre na sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {loginMutation.isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{loginMutation.error?.message}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loginMutation.isPending}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loginMutation.isPending}
                required
              />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Não tem conta?{' '}
            <Link to="/cadastro" className="text-primary font-medium hover:underline">
              Cadastre-se
            </Link>
          </p>
        </CardContent>
      </Card>

      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  )
}

export default Login