// Mock data e simulação de API

export const mockFuncionarios = [
  {
    id: '1',
    nome: 'Marina Silva',
    especialidade: 'Maquiagem',
    foto: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    nome: 'Ana Costa',
    especialidade: 'Cabelo',
    foto: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    nome: 'Julia Santos',
    especialidade: 'Estética Facial',
    foto: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    nome: 'Carla Oliveira',
    especialidade: 'Maquiagem',
    foto: 'https://i.pravatar.cc/150?img=4',
  },
]

export const mockServicosByFuncionario = {
  '1': [
    { id: 's1', nome: 'Maquiagem Básica', descricao: 'Maquiagem para o dia a dia', duracao: 30, preco: 50 },
    { id: 's2', nome: 'Maquiagem Festa', descricao: 'Maquiagem completa para eventos', duracao: 45, preco: 80 },
    { id: 's3', nome: 'Maquiagem Noiva', descricao: 'Maquiagem especial para noivas', duracao: 60, preco: 150 },
  ],
  '2': [
    { id: 's4', nome: 'Corte Básico', descricao: 'Corte e modelagem', duracao: 30, preco: 40 },
    { id: 's5', nome: 'Coloração', descricao: 'Tingimento completo', duracao: 90, preco: 120 },
    { id: 's6', nome: 'Escova Progressiva', descricao: 'Escova progressiva profissional', duracao: 120, preco: 200 },
  ],
  '3': [
    { id: 's7', nome: 'Limpeza Facial', descricao: 'Limpeza profunda de pele', duracao: 45, preco: 60 },
    { id: 's8', nome: 'Peeling', descricao: 'Peeling químico', duracao: 60, preco: 100 },
    { id: 's9', nome: 'Hidratação Facial', descricao: 'Hidratação intensiva', duracao: 30, preco: 70 },
  ],
  '4': [
    { id: 's10', nome: 'Maquiagem Básica', descricao: 'Maquiagem para o dia a dia', duracao: 30, preco: 45 },
    { id: 's11', nome: 'Design de Sobrancelhas', descricao: 'Design e tingimento', duracao: 20, preco: 35 },
  ],
}

export const mockHorarios = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
]

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getFuncionarios = async () => {
  await delay(800)
  return mockFuncionarios
}

export const getServicosByFuncionario = async (funcionarioId) => {
  await delay(600)
  return mockServicosByFuncionario[funcionarioId] || []
}

export const getHorariosDisponiveis = async (funcionarioId, servicoId) => {
  await delay(500)
  // Simula alguns horários indisponíveis
  const indisponiveis = ['09:00', '10:30', '15:00']
  return mockHorarios.filter(h => !indisponiveis.includes(h))
}

export const criarAgendamento = async (data) => {
  await delay(1000)
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    status: 'confirmado',
  }
}

// Meus Agendamentos do Cliente
export const getMeusAgendamentos = async () => {
  await delay(700)
  return [
    {
      id: '1',
      funcionario: 'Marina Silva',
      servico: 'Maquiagem Festa',
      data: '2025-05-10',
      horario: '14:00',
      status: 'confirmado',
    },
    {
      id: '2',
      funcionario: 'Ana Costa',
      servico: 'Corte Básico',
      data: '2025-05-15',
      horario: '10:00',
      status: 'confirmado',
    },
  ]
}

// Serviços do Funcionário
export const getMeusServicos = async () => {
  await delay(600)
  return mockServicosByFuncionario['1']
}

export const createServico = async (servico) => {
  await delay(800)
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...servico,
  }
}

export const updateServico = async (id, servico) => {
  await delay(800)
  return { id, ...servico }
}

export const deleteServico = async (id) => {
  await delay(600)
  return { id }
}

// Perfil
export const getMeuPerfil = async () => {
  await delay(600)
  return {
    id: '1',
    nome: 'Marina Silva',
    email: 'marina@example.com',
    telefone: '(11) 99999-9999',
    especialidade: 'Maquiagem',
    foto: 'https://i.pravatar.cc/150?img=1',
  }
}

export const updatePerfil = async (dados) => {
  await delay(800)
  return dados
}

// Atendimentos para Kanban
export const getAtendimentos = async () => {
  await delay(700)
  return [
    {
      id: '1',
      clienteNome: 'João Silva',
      servico: 'Maquiagem Básica',
      horario: '2025-05-05T08:00:00',
      status: 'pendente',
    },
    {
      id: '2',
      clienteNome: 'Maria Santos',
      servico: 'Maquiagem Festa',
      horario: '2025-05-05T09:30:00',
      status: 'em_andamento',
    },
    {
      id: '3',
      clienteNome: 'Ana Costa',
      servico: 'Design de Sobrancelhas',
      horario: '2025-05-05T11:00:00',
      status: 'concluido',
    },
    {
      id: '4',
      clienteNome: 'Pedro Oliveira',
      servico: 'Maquiagem Noiva',
      horario: '2025-05-05T14:00:00',
      status: 'pendente',
    },
  ]
}

export const updateAtendimentoStatus = async (id, status) => {
  await delay(500)
  return { id, status }
}
