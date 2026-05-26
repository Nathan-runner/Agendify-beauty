# 🚀 Guia Rápido - Integração da API Real

## Arquivos Criados

✅ `src/services/api.ts` - Cliente HTTP com todas as funções
✅ `src/config/env.ts` - Configurações e helpers
✅ `PLANO_INTEGRACAO_API.md` - Documentação detalhada

---

## ⚡ Como Começar (3 passos)

### **Passo 1: Verificar que a API está rodando**
```bash
# No terminal, verifique se o backend está em http://localhost:3000
curl http://localhost:3000/health  # ou qualquer endpoint público
```

### **Passo 2: Importar funções do serviço**
Antes (usando mock):
```typescript
import { getFuncionarios } from '@/mocks/api'
```

Depois (usando API real):
```typescript
import { getFuncionarios } from '@/services/api'
```

### **Passo 3: Usar normalmente (sem mudanças)**
```typescript
const funcionariosQuery = useQuery({
  queryKey: ['funcionarios'],
  queryFn: getFuncionarios,  // ← Funciona igual!
})
```

---

## 📦 Exemplo: Integrar Login

**Arquivo:** `src/pages/Login.jsx`

```typescript
import { login, setCurrentUser } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

export default function Login() {
  const loginMutation = useMutation({
    mutationFn: (credentials) => login(credentials.email, credentials.password),
    onSuccess: (response) => {
      // Salvar dados do usuário
      setCurrentUser({
        nome: response.nome,
        role: response.role,
        id: response.id
      })
      // Redirecionar
      navigate('/dashboard')
    },
    onError: (error) => {
      console.error('Erro ao fazer login:', error.message)
    },
  })

  const handleSubmit = (email, password) => {
    loginMutation.mutate({ email, password })
  }

  return (
    // seu JSX aqui
  )
}
```

---

## 🔄 Exemplo: Integrar Listar Funcionários

**Arquivo:** `src/pages/Servicos.jsx` (já está pronto!)

```typescript
import { getFuncionarios, getServicosByFuncionario } from '@/services/api'

const funcionariosQuery = useQuery({
  queryKey: ['funcionarios'],
  queryFn: getFuncionarios,  // ← Muda automático de mock para API real
})
```

---

## 🎯 Checklist de Integração por Página

### **Dashboard**
- [x] Importar `getFuncionarios` do novo serviço
- [ ] Testar se os dados vêm da API real

### **Servicos.jsx**
- [x] Importar `getFuncionarios`, `getServicosByFuncionario`
- [ ] Testar listagem
- [ ] Testar tooltip

### **Agendar.jsx**
- [x] Importar `getDisponibilidade`, `createAgendamento`
- [ ] Testar fluxo completo

### **FuncionarioServicos.jsx**
- [x] Importar `getServicosByFuncionario`, `createServico`
- [ ] Testar CRUD

### **Perfil.jsx**
- [x] Importar `getMeuPerfil`, `updateMeuPerfil`
- [ ] Testar edição

### **Login.jsx** (não criado ainda)
- [ ] Criar página
- [ ] Importar `login`
- [ ] Integrar autenticação

### **Cadastro.jsx** (não criado ainda)
- [ ] Criar página
- [ ] Importar `registerCliente`, `registerFuncionario`

---

## 🛡️ Error Handling

O serviço já trata automaticamente:

✅ **401 Unauthorized** → Redireciona para `/login` e limpa token
✅ **Outros erros** → Lança exception com mensagem clara

No seu componente:
```typescript
onError: (error: Error) => {
  setToast({
    type: 'error',
    message: error.message
  })
}
```

---

## 🔐 Gestão de Token

O token JWT é automaticamente:
- ✅ Salvo em `localStorage` após login
- ✅ Incluído em cada requisição no header `Authorization`
- ✅ Removido se expirar (401)

---

## 🧪 Testando Manualmente

```bash
# Terminal 1: Rode o backend
cd seu-backend-folder
npm run dev  # ou yarn dev (porta 3000)

# Terminal 2: Rode o frontend
cd projeto/gg\ teste
npm run dev  # (porta 5173)

# Abra http://localhost:5173
```

---

## 🚨 Próximas Ações Necessárias

1. **Criar página de Login** - Use `login()` do serviço
2. **Criar página de Cadastro** - Use `registerCliente()` ou `registerFuncionario()`
3. **Testar cada página** - Verificar se os dados vêm da API
4. **Ajustar tipos** - Se a API retorna estrutura diferente, adapte em `src/services/api.ts`
5. **Configurar variáveis de ambiente** - Criar `.env.local` com `REACT_APP_API_URL`

---

## 📋 Estrutura Esperada da Resposta de Login

```typescript
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "CLIENTE",  // ou "FUNCIONARIO"
  "nome": "João Silva",
  "id": "uuid-string"
}
```

Se sua API retorna estrutura diferente, adapte em:
```typescript
// src/services/api.ts - Linha ~35
export interface LoginResponse {
  token: string
  role: 'CLIENTE' | 'FUNCIONARIO'
  nome: string
  id: string
  // ← Adicione campos extras aqui
}
```

---

## 💡 Dica: Variável de Ambiente

Para facilitar testes com múltiplos ambientes:

```bash
# .env.local (não commit)
REACT_APP_API_URL=http://localhost:3000

# .env.production (commit)
REACT_APP_API_URL=https://api.seu-dominio.com
```

---

**Tudo pronto! Você pode começar a integração em qualquer página. Recomendo começar por Login/Cadastro primeiro, pois as outras dependem de autenticação.**
