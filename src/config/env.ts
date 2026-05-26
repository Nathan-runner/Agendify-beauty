// Configuração de ambiente

export const API_CONFIG = {
  // URL da API backend
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',

  // Timeout padrão para requisições (ms)
  TIMEOUT: 30000,

  // Chave do localStorage para token JWT
  TOKEN_KEY: 'authToken',

  // Chave do localStorage para dados do usuário
  USER_KEY: 'currentUser',
}

// Função helper para verificar se está autenticado
export function isAuthenticated(): boolean {
  return !!localStorage.getItem(API_CONFIG.TOKEN_KEY)
}

// Função helper para obter o token
export function getAuthToken(): string | null {
  return localStorage.getItem(API_CONFIG.TOKEN_KEY)
}

// Função helper para obter usuário armazenado
export function getCurrentUser() {
  const user = localStorage.getItem(API_CONFIG.USER_KEY)
  return user ? JSON.parse(user) : null
}

// Função helper para salvar usuário
export function setCurrentUser(user: any) {
  localStorage.setItem(API_CONFIG.USER_KEY, JSON.stringify(user))
}

// Função helper para limpar dados de autenticação
export function clearAuthData() {
  localStorage.removeItem(API_CONFIG.TOKEN_KEY)
  localStorage.removeItem(API_CONFIG.USER_KEY)
}
