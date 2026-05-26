import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '@/config/env'

function FuncionarioRoute({ children }) {
  const user = getCurrentUser()

  if (user?.role !== 'FUNCIONARIO') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default FuncionarioRoute
