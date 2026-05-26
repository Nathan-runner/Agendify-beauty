import { createContext, useState, useContext, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setLogoutCallback } from '@/services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [isLoggedOut, setIsLoggedOut] = useState(false)

  const logout = useCallback(() => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
    setIsLoggedOut(true)
    navigate('/', { replace: true })
  }, [navigate])

  // Registrar o callback de logout na API quando o contexto monta
  useEffect(() => {
    setLogoutCallback(logout)
  }, [logout])

  const value = {
    logout,
    isLoggedOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
