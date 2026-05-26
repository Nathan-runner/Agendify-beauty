# Documentação da API - Agenda (Completa)

> **Contexto para Agentes de IA:** Esta API gerencia agendamentos de serviços. Os usuários podem ser `CLIENTE` ou `FUNCIONARIO`. A autenticação é via JWT Bearer Token.

---

## 🤖 Instruções para Agentes de IA

Ao consumir esta API, siga estas diretrizes para evitar erros:

1.  **Fluxo de Agendamento:** Antes de chamar `POST /api/agendamentos`, você **deve** verificar a disponibilidade via `GET /api/agendamentos/disponibilidade` para garantir que o horário está livre.
2.  **Identificadores:** Todos os IDs são strings no formato `UUID`.
3.  **Datas:** Sempre use o formato ISO 8601 (ex: `2026-05-10T09:00:00Z`).
4.  **Tratamento de Erros:**
    *   `401 Unauthorized`: O token expirou ou é inválido. Realize o login novamente.
    *   `403 Forbidden`: O usuário não tem permissão (ex: cliente tentando criar serviço).
    *   `404 Not Found`: Recurso não encontrado.
    *   `409 Conflict`: Horário já ocupado ou email já cadastrado.

---

## 🔐 Autenticação (`/auth`)

### Registrar Cliente
- **Endpoint:** `POST /auth/register/cliente`
- **Payload:** `{ "nome": "string", "email": "email", "password": "min 6", "telefone": "string" }`

### Registrar Funcionário
- **Endpoint:** `POST /auth/register/funcionario`
- **Payload:** `{ "nome": "string", "email": "email", "password": "min 6", "telefone": "string", "funcao": "string", "codigoEmpresa": "string" }`

### Login
- **Endpoint:** `POST /auth/login`
- **Retorno:** `{ "token": "jwt", "role": "CLIENTE|FUNCIONARIO", "nome": "string" }`

---

## 👥 Funcionários (`/funcionarios`)

### Listar Funcionários
- **Endpoint:** `GET /funcionarios`
- **Segurança:** Requer Auth.
- **Filtros (Query):** `nome`, `funcao`.

### Buscar Funcionário por ID
- **Endpoint:** `GET /funcionarios/:id`
- **Segurança:** Requer Auth.

### Atualizar Funcionário
- **Endpoint:** `PUT /funcionarios/:id`
- **Segurança:** Requer Auth + Role FUNCIONARIO.
- **Payload:** `{ "funcao": "string" }`

### Deletar Funcionário
- **Endpoint:** `DELETE /funcionarios/:id`
- **Segurança:** Requer Auth + Role FUNCIONARIO.

---

## 🛠 Serviços (`/servicos`)

### Listar Serviços
- **Endpoint:** `GET /servicos`
- **Filtros (Query):** `nome`.

### Buscar Serviço por ID
- **Endpoint:** `GET /servicos/:id`

### Criar Serviço
- **Endpoint:** `POST /servicos`
- **Segurança:** Requer Auth + Role FUNCIONARIO.
- **Payload:** `{ "nome": "string", "duracaominutos": 30, "preco": 50.0, "descricao": "string", "professionalId": "uuid" }`

### Atualizar Serviço
- **Endpoint:** `PUT /servicos/:id`
- **Segurança:** Requer Auth + Role FUNCIONARIO.
- **Payload:** `{ "nome": "string", "duracaominutos": 30, "preco": 50.0, "descricao": "string" }`

### Deletar Serviço
- **Endpoint:** `DELETE /servicos/:id`
- **Segurança:** Requer Auth + Role FUNCIONARIO.

---

## 📅 Agendamentos (`/api/agendamentos`)

### Consultar Disponibilidade
- **Endpoint:** `GET /api/agendamentos/disponibilidade`
- **Params Obrigatórios:** `profissionalId`, `dataIso` (YYYY-MM-DD), `duracaoServicoMinutos`.

### Criar Agendamento
- **Endpoint:** `POST /api/agendamentos`
- **Segurança:** Requer Auth.
- **Payload:** `{ "profissionalId": "uuid", "servicoId": "uuid", "clienteId": "uuid", "dataHoraInicio": "ISO-DATETIME" }`

### Atualizar Status
- **Endpoint:** `PATCH /api/agendamentos/:id/status`
- **Segurança:** Requer Auth.
- **Payload:** `{ "status": "AGUARDANDO|EM_ATENDIMENTO|FINALIZADO|CANCELADO" }`

---

## 🛠 Especificação Técnica
Para uma integração programática rigorosa, consulte o arquivo [openapi.yaml](./openapi.yaml).
