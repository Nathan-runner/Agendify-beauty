import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '@/config/env'

function ClienteRoute({ children }) {
  const user = getCurrentUser()

  if (user?.role !== 'CLIENTE') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ClienteRoute
