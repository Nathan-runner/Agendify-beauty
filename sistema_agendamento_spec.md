# Sistema de Agendamento — Especificação de Telas (React)

## Stack e Ferramentas

- **Framework**: React (com React Router para navegação)
- **Gerenciamento de dados**: TanStack Query (`@tanstack/react-query`)
- **Drag and drop (Kanban)**: `dnd-kit` (`@dnd-kit/core`, `@dnd-kit/sortable`)
- **Estilização**: Tailwind CSS (ou CSS Modules — manter consistência em todo o projeto)
- **Ícones**: Lucide React

---

## Estrutura de Rotas

```
/                          → Redireciona para /dashboard
/dashboard                 → Dashboard (cliente ou funcionário, baseado em role)
/agendar                   → Tela de Seleção (Funcionário → Serviço → Horário)
/servicos                  → Página de Serviços (visão do cliente)
/funcionario/servicos      → Abrir Serviços (visão do funcionário, com CRUD)
/funcionario/agenda        → Abrir Agenda (Kanban de atendimentos)
/perfil                    → Meu Perfil (funcionário)
```

---

## Telas

---

### 1. Tela de Seleção — `/agendar`

**Papel**: Cliente

**Descrição**: Fluxo guiado em 3 etapas sequenciais. O cliente primeiro escolhe o funcionário, depois o serviço (filtrado pelo funcionário selecionado) e por fim um horário disponível.

**Componentes**:

- `StepIndicator` — Indicador visual das 3 etapas (ex: breadcrumb ou stepper)
- `FuncionarioCard` — Card clicável com foto, nome e especialidade do funcionário
- `ServicoCard` — Card com nome do serviço, duração e preço
- `HorarioGrid` — Grade de horários disponíveis (botões clicáveis), desabilitados se ocupados
- `ResumoAgendamento` — Painel lateral ou modal de confirmação com os dados selecionados

**Estado local**:

```ts
const [etapa, setEtapa] = useState<1 | 2 | 3>(1);
const [funcionarioId, setFuncionarioId] = useState<string | null>(null);
const [servicoId, setServicoId] = useState<string | null>(null);
const [horario, setHorario] = useState<string | null>(null);
```

**Requisições (TanStack Query)**:

```ts
// Etapa 1
useQuery({ queryKey: ['funcionarios'], queryFn: getFuncionarios })

// Etapa 2 — só executa após funcionário selecionado
useQuery({
  queryKey: ['servicos', funcionarioId],
  queryFn: () => getServicosByFuncionario(funcionarioId),
  enabled: !!funcionarioId,
})

// Etapa 3 — só executa após serviço selecionado
useQuery({
  queryKey: ['horarios', funcionarioId, servicoId],
  queryFn: () => getHorariosDisponiveis(funcionarioId, servicoId),
  enabled: !!funcionarioId && !!servicoId,
})
```

**Ação final**: botão "Confirmar Agendamento" que dispara `useMutation` para `POST /agendamentos`.

**UX**:
- Interface simples e direta
- Navegação entre etapas com botões "Voltar" e "Próximo"
- Loading state em cada etapa durante a busca

---

### 2. Página de Serviços (Cliente) — `/servicos`

**Papel**: Cliente

**Descrição**: Lista os serviços disponíveis de um funcionário específico (o funcionário pode ser passado via query param ou contexto). Somente leitura.

**Componentes**:

- `ServicoList` — Lista ou grid de cards de serviços
- `ServicoCard` — Nome, descrição, duração (ex: "45 min") e preço
- `FiltroFuncionario` — Dropdown ou tabs para filtrar serviços por funcionário

**Requisição (TanStack Query)**:

```ts
useQuery({
  queryKey: ['servicos', funcionarioId],
  queryFn: () => getServicosByFuncionario(funcionarioId),
})
```

**UX**:
- Não há ações de edição nessa página
- Botão "Agendar" em cada card navega para `/agendar` com o funcionário pré-selecionado

---

### 3. Abrir Serviços (Funcionário) — `/funcionario/servicos`

**Papel**: Funcionário

**Descrição**: Reutiliza a interface da Página de Serviços, mas adiciona funcionalidades de CRUD. O funcionário gerencia apenas os seus próprios serviços.

**Componentes**:

- `ServicoList` — Mesma base do cliente, com ações adicionais
- `ServicoCard` — Com botões de editar e deletar
- `ServicoFormModal` — Modal com formulário para criar ou editar serviço
- `ConfirmDeleteDialog` — Dialog de confirmação de exclusão

**Campos do formulário**:

```ts
interface ServicoForm {
  nome: string;
  descricao?: string;
  duracao: number; // em minutos
  preco: number;
}
```

**Requisições (TanStack Query)**:

```ts
// Listagem
useQuery({ queryKey: ['meus-servicos'], queryFn: getMeusServicos })

// Criar
useMutation({ mutationFn: createServico, onSuccess: () => queryClient.invalidateQueries(['meus-servicos']) })

// Editar
useMutation({ mutationFn: updateServico, onSuccess: () => queryClient.invalidateQueries(['meus-servicos']) })

// Deletar
useMutation({ mutationFn: deleteServico, onSuccess: () => queryClient.invalidateQueries(['meus-servicos']) })
```

**UX**:
- Botão "Novo Serviço" no topo abre o `ServicoFormModal`
- Edição e exclusão acessíveis diretamente no card
- Feedback visual (toast/snackbar) após cada operação

---

### 4. Dashboard — `/dashboard`

**Papel**: Cliente e Funcionário (conteúdo adaptado por role)

**Descrição**: Tela central de navegação. Exibe atalhos para as principais funcionalidades conforme o papel do usuário logado.

**Componentes**:

- `WelcomeBanner` — Saudação com nome do usuário e papel
- `QuickAccessCard` — Card de acesso rápido com ícone, título e descrição

**Cards por role**:

```
Cliente:
- "Agendar Horário"     → /agendar
- "Meus Agendamentos"   → /meus-agendamentos (se existir)

Funcionário:
- "Minha Agenda"        → /funcionario/agenda
- "Meus Serviços"       → /funcionario/servicos
- "Meu Perfil"          → /perfil
```

**UX**:
- Layout em grid responsivo (2 colunas em mobile, 3+ em desktop)
- Navegação por clique direto nos cards

---

### 5. Meu Perfil (Funcionário) — `/perfil`

**Papel**: Funcionário

**Descrição**: Gerenciamento dos dados pessoais do funcionário. Interface simples com dropdown de ações.

**Componentes**:

- `PerfilCard` — Exibe foto, nome, e-mail e especialidade
- `AcoesDropdown` — Menu suspenso com as opções de CRUD
- `EditarPerfilModal` — Modal com formulário de edição de dados
- `ConfirmDeleteAccountDialog` — Confirmação para exclusão de conta

**Opções do dropdown**:
- Editar dados
- Visualizar perfil (modo somente leitura)
- Excluir conta (com confirmação obrigatória)

**Campos editáveis**:

```ts
interface PerfilForm {
  nome: string;
  email: string;
  telefone?: string;
  especialidade?: string;
  fotoPerfil?: File;
}
```

**Requisições (TanStack Query)**:

```ts
useQuery({ queryKey: ['meu-perfil'], queryFn: getMeuPerfil })

useMutation({ mutationFn: updatePerfil, onSuccess: () => queryClient.invalidateQueries(['meu-perfil']) })

useMutation({ mutationFn: deleteConta }) // redireciona para logout após sucesso
```

---

### 6. Abrir Agenda — `/funcionario/agenda`

**Papel**: Funcionário

**Descrição**: Exibe todos os atendimentos do funcionário no formato Kanban. Os cards podem ser arrastados entre colunas para atualizar o status do atendimento.

**Componentes**:

- `KanbanBoard` — Wrapper do `dnd-kit` com as colunas
- `KanbanColumn` — Coluna individual com título e lista de cards
- `AtendimentoCard` — Card arrastável com dados do agendamento
- `AgendamentoDetailModal` — Modal ao clicar no card (detalhes completos)

**Colunas padrão**:

```ts
const colunas = [
  { id: 'pendente',     label: 'Pendente' },
  { id: 'em_andamento', label: 'Em Andamento' },
  { id: 'concluido',    label: 'Concluído' },
];
```

**Dados do card**:

```ts
interface Atendimento {
  id: string;
  clienteNome: string;
  servico: string;
  horario: string; // ISO 8601
  status: 'pendente' | 'em_andamento' | 'concluido';
}
```

**Requisições (TanStack Query)**:

```ts
// Busca atendimentos do dia ou semana
useQuery({ queryKey: ['atendimentos'], queryFn: getAtendimentos })

// Atualiza status ao mover card
useMutation({
  mutationFn: ({ id, status }) => updateAtendimentoStatus(id, status),
  onSuccess: () => queryClient.invalidateQueries(['atendimentos']),
})
```

**Implementação com dnd-kit** (estrutura base):

```tsx
import { DndContext, closestCenter } from '@dnd-kit/core';

<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
  {colunas.map(coluna => (
    <KanbanColumn key={coluna.id} coluna={coluna} atendimentos={filtrados(coluna.id)} />
  ))}
</DndContext>
```

**UX**:
- Ao soltar o card em outra coluna, o status é atualizado via mutation
- Feedback visual durante o arrastar (overlay do card)
- Loading skeleton nas colunas durante a busca inicial

---

### 7. Quadro Kanban — (sub-componente de `/funcionario/agenda`)

> Implementado como parte da tela "Abrir Agenda". Ver seção 6.

**Detalhes adicionais**:

- Cada coluna deve exibir o contador de atendimentos (ex: `Pendente (3)`)
- Cards com horário passado e status `pendente` devem ter destaque visual de alerta
- Suporte a scroll horizontal em mobile

---

## Observações Gerais

### Autenticação e Role

- Utilize contexto de autenticação (`AuthContext`) para expor `user.role` (`'cliente' | 'funcionario'`)
- Proteja rotas de funcionário com um `PrivateRoute` que verifica o role
- Exemplo:

```tsx
<Route path="/funcionario/*" element={<PrivateRoute role="funcionario"><FuncionarioRoutes /></PrivateRoute>} />
```

### Tratamento de Estados

Para cada requisição TanStack Query, trate os três estados:

```tsx
if (isLoading) return <Skeleton />;
if (isError) return <ErrorMessage error={error} />;
return <ComponenteReal data={data} />;
```

### Invalidação de Cache

Após qualquer mutation que altere dados listados, invalide a query correspondente:

```ts
onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chave-da-query'] })
```

### Configuração do QueryClient

```tsx
// main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minuto
      retry: 1,
    },
  },
});

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```
