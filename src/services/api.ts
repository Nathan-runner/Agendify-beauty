import axios from 'axios'

let logoutCallback: (() => void) | null = null

export const setLogoutCallback = (callback: () => void) => {
  logoutCallback = callback
}

const api = axios.create({
  baseURL: 'https://projeto-hudosn.onrender.com',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && logoutCallback) {
      logoutCallback()
    }
    return Promise.reject(error)
  }
)

// Auth
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const cadastrarCliente = async (dados: {
  nome: string
  email: string
  password: string
  telefone: string
}) => {
  const response = await api.post('/auth/register/cliente', dados)
  return response.data
}

export const cadastrarFuncionario = async (dados: {
  nome: string
  email: string
  password: string
  telefone: string
  funcao: string
  codigoEmpresa: string
}) => {
  const response = await api.post('/auth/register/funcionario', dados)
  return response.data
}

// Serviços
export const getServices = async () => {
  const response = await api.get('/servicos')
  return response.data
}

export const getServicosByFuncionario = async (funcionarioId: string) => {
  const response = await api.get(`/funcionarios/${funcionarioId}`)
  return response.data.services
}

export const criarServico = async (dados: {
  nome: string
  duracaominutos: number
  preco: number
  descricao?: string
  professionalId: string
}) => {
  const response = await api.post('/servicos', dados)
  return response.data
}

export const createServico = criarServico

export const atualizarServico = async (id: string, dados: {
  nome: string
  duracaominutos: number
  preco: number
  descricao?: string
}) => {
  const response = await api.put(`/servicos/${id}`, dados)
  return response.data
}

export const updateServico = atualizarServico

export const deletarServico = async (id: string) => {
  const response = await api.delete(`/servicos/${id}`)
  return response.data
}

export const deleteServico = deletarServico

// Agendamentos
export const criarAgendamento = async (servicoId: string, dataHoraInicio: string) => {
  const response = await api.post('/api/agendamentos', { servicoId, dataHoraInicio })
  return response.data
}

export const createAgendamento = async (
  funcionarioId: string,
  servicoId: string,
  clienteId: string,
  dataHoraInicio: string
) => {
  const response = await api.post('/api/agendamentos', { servicoId, dataHoraInicio })
  return response.data
}

export const atualizarStatusAgendamento = async (id: string, status: string) => {
  const response = await api.patch(`/api/agendamentos/${id}/status`, { status })
  return response.data
}

export const getHorariosLivres = async (
  profissionalId: string,
  dataIso: string,
  duracaoServicoMinutos: number
) => {
  const response = await api.get('/api/agendamentos/disponibilidade', {
    params: { profissionalId, dataIso, duracaoServicoMinutos }
  })
  return response.data
}

export const getDisponibilidade = async (
  profissionalId: string,
  dataIso: string,
  duracaoServicoMinutos: number
) => {
  const response = await api.get('/api/agendamentos/disponibilidade', {
    params: { profissionalId, dataIso, duracaoServicoMinutos }
  })
  return response.data
}

// Usuário
export const getPerfil = async () => {
  const response = await api.get('/users/me')
  return response.data
}

export const getMeuPerfil = getPerfil

export const getMeusAgendamentos = async () => {
  const response = await api.get('/users/me/agendamentos')
  return response.data
}

export const getMeusAgendamentosDetalhados = getMeusAgendamentos

type PerfilUpdatePayload = {
  nome: string
  email: string
  telefone: string
  foto?: string
}

export const updateMeuPerfil = async (dados: PerfilUpdatePayload) => {
  const response = await api.put('/users/me', dados)
  return response.data
}

// Funcionários
export const getFuncionarios = async () => {
  const response = await api.get('/funcionarios')
  return response.data
}

// Dashboard
export const getDashboardMetricas = async (filters?: any) => {
  const response = await api.get('/api/dashboard/metricas', { params: filters })
  return response.data
}

export const getDashboardAgendamentosReceita = async (filters?: any) => {
  const response = await api.get('/api/dashboard/agendamentos-receita', { params: filters })
  return response.data
}

export const getDashboardServicosPopulares = async (filters?: any) => {
  const response = await api.get('/api/dashboard/servicos-populares', { params: filters })
  return response.data
}

export const getDashboardStatusAgendamentos = async (filters?: any) => {
  const response = await api.get('/api/dashboard/status-agendamentos', { params: filters })
  return response.data
}

export const getDashboardOcupacaoHorarios = async (filters?: any) => {
  const response = await api.get('/api/dashboard/ocupacao-horarios', { params: filters })
  return response.data
}

export default api