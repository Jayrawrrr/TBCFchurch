import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AdminProtectedRoute = ({ children }) => {
  const { user, loading, role } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/tbti/login" state={{ from: location }} replace />
  }

  if (role !== 'admin' && role !== 'superadmin') {
    return <Navigate to="/tbti/dashboard" replace />
  }

  return children
}

export default AdminProtectedRoute
