import { useState } from 'react'
import { Link } from 'react-router-dom'
import Botao from '../components/Botao'
import Input from '../components/Input'

function Cadastro() {
  const [tipo, setTipo] = useState('cliente')

  return (
    <div className="min-h-screen bg-cyan-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-sm">

        <div className="flex items-center justify-center gap-2 mb-6">
          <img src="/src/assets/Logo_Studio-Siqueira.png" alt="Logo Studio Siqueira's" className="w-12 h-12 rounded-full object-cover" />
          <h2 className="text-cyan-500 text-xl font-bold tracking-wide">Studio Siqueira's</h2>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">Crie sua conta!</h1>
        <p className="text-gray-500 text-sm mt-1">Cadastre-se para acessar nossa plataforma</p>

        {/* Botões de seleção de tipo */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setTipo('cliente')}
            className={`flex-1 py-2 rounded-xl font-medium text-sm transition-colors ${
              tipo === 'cliente'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            Cliente
          </button>
          <button
            onClick={() => setTipo('funcionario')}
            className={`flex-1 py-2 rounded-xl font-medium text-sm transition-colors ${
              tipo === 'funcionario'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            Funcionário
          </button>
        </div>

        {/* Campos base */}
        <div className="mt-6">
          <Input label="Nome Completo" type="text" placeholder="seu nome" />
        </div>

        <div className="mt-4">
          <Input label="E-mail" type="email" placeholder="seu@email.com" />
        </div>

        <div className="mt-4">
          <Input label="Senha" type="password" placeholder="••••••••" />
        </div>

        <div className="mt-4">
            <Input label="Telefone" type="tel" placeholder="(00) 00000-0000" />
        </div>

        {/* Campos extras só para funcionário */}
        {tipo === 'funcionario' && (
          <>
            <div className="mt-4">
              <Input label="Função" type="text" placeholder="Ex: Cabeleireiro, Manicure..." />
            </div>

            <div className="mt-4">
                <Input label="Código da Empresa" type="text" placeholder="Código fornecido pelo salão" />
            </div>
          </>
        )}

        <Botao texto="Criar Conta" />

        <p className="text-center text-sm text-gray-500 mt-4">
          Já tem conta?{' '}
          <Link to="/" className="text-cyan-500 font-medium hover:underline">
            Entrar
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Cadastro