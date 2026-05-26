
# Agendify Beauty

O **Agendify Beauty** é uma solução digital desenvolvida para centralizar o agendamento e a gestão operacional de estabelecimentos de estética e beleza. O foco principal é otimizar a experiência do cliente e facilitar o controle administrativo do profissional, permitindo uma gestão de tempo mais eficiente.

## 🚀 Sobre o Projeto

Este projeto nasceu da necessidade de organizar fluxos de trabalho em estúdios de estética, substituindo agendas manuais por um sistema dinâmico. Ele permite o gerenciamento de serviços, horários e profissionais em uma interface intuitiva.

## 🛠️ Tecnologias Utilizadas

O projeto utiliza uma stack moderna para garantir performance e escalabilidade:

*   **Frontend:** React.js com CSS modular (ou Tailwind) para uma interface responsiva.
*   **Backend:** Node.js com Express para a construção da API.
*   **Banco de Dados:** PostgreSQL.
*   **Versionamento:** Git & GitHub.

## 📋 Funcionalidades

*   **Gestão de Agendamentos:** Criação, edição e cancelamento de horários.
*   **Catálogo de Serviços:** Listagem detalhada de procedimentos estéticos oferecidos.
*   **Painel Administrativo:** Visualização clara das demandas diárias e semanais.
*   **Interface Amigável:** Design focado na usabilidade, garantindo que o foco seja o atendimento ao cliente.

## 🔧 Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Nathan-runner/Agendify-beauty.git](https://github.com/Nathan-runner/Agendify-beauty.git)
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd Agendify-beauty
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione as credenciais do seu banco de dados e outras chaves necessárias (baseie-se no `.env.example`, se disponível).

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    ```

## 🏗️ Estrutura de Pastas
```text
src/
├── components/     # Componentes reutilizáveis
├── pages/          # Páginas principais da aplicação
├── services/       # Integrações com API e Banco de Dados
├── styles/         # Arquivos de estilização (CSS/SASS)
└── utils/          # Funções auxiliares e constantes
