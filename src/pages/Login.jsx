import { Link } from 'react-router-dom'
import Botao from '../components/Botao'
import Input from '../components/Input'

function Login() {
  return (
    <div className="min-h-screen bg-cyan-500 flex flex-col items-center justify-center p-6">

      <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-sm">

        <div className="flex items-center justify-center gap-2 mb-6">
          <img src="/src/assets/Logo_Studio-Siqueira.png" alt="Logo Studio Siqueira's" className="w-12 h-12 rounded-full object-cover" />
          <h2 className="text-cyan-500 text-xl font-bold tracking-wide">Studio Siqueira's</h2>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">Bem-vindo de volta!</h1>
        <p className="text-gray-500 text-sm mt-1">Entre na sua conta para continuar</p>

        <div className="mt-6">
          <Input label="E-mail" type="email" placeholder="seu@email.com" />
        </div>

        <div className="mt-4">
          <Input label="Senha" type="password" placeholder="••••••••" />
        </div>

        <Botao texto="Entrar" />

        <p className="text-center text-sm text-gray-500 mt-4">
          Não tem conta?{' '}
          <Link to="/cadastro" className="text-cyan-500 font-medium hover:underline">
            Cadastre-se
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login