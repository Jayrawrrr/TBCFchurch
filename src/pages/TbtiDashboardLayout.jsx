import React, { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const TbtiDashboardLayout = () => {
  const navigate = useNavigate()
  const { signOut, isEnrolled, role } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = () => {
    signOut()
    navigate('/tbti/login', { replace: true })
  }

  const navItems = [
    { to: '/tbti/dashboard', label: 'Dashboard', icon: 'fa-home' },
    { to: '/tbti/dashboard/what-is-tbti', label: 'What is TBTI', icon: 'fa-info-circle' },
    { to: '/tbti/dashboard/school-program', label: 'School Program', icon: 'fa-graduation-cap' },
    { to: '/tbti/dashboard/admission', label: 'Registration & Admission', icon: 'fa-file-alt' },
    { to: '/tbti/dashboard/discipline', label: 'School Discipline', icon: 'fa-book' },
    { to: '/tbti/dashboard/lessons', label: 'Lessons (Enrolled)', icon: 'fa-book-open' },
    { to: '/tbti/dashboard/profile', label: 'Profile', icon: 'fa-user' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar - mobile menu + brand */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm lg:px-6">
        <button
          type="button"
          onClick={() => setSidebarOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>
        <Link
          to="/tbti/dashboard"
          className="flex items-center gap-2 text-gray-900"
        >
          <span className="h-2 w-2 rounded-full bg-purple-500" />
          <span className="heading-font text-lg font-bold">TBTI Portal</span>
        </Link>
        <div className="flex items-center gap-3">
          {role === 'admin' && (
            <Link
              to="/admin"
              className="text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline"
            >
              Admin
            </Link>
          )}
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-purple-700 hover:underline"
          >
            Church site
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 transform border-r border-gray-200 bg-white pt-14 shadow-lg transition-transform duration-200 ease-out lg:static lg:z-auto lg:pt-0 lg:shadow-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map(({ to, label, icon }) => {
              const isLessons = to === '/tbti/dashboard/lessons'
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/tbti/dashboard'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => {
                    const base =
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors'
                    if (isLessons && !isEnrolled) {
                      return `${base} text-gray-400 cursor-pointer ${
                        isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
                      }`
                    }
                    return `${base} ${
                      isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }}
                >
                  <i className={`fas ${icon} w-5 text-center`} />
                  <span className="flex-1">{label}</span>
                  {isLessons && !isEnrolled && (
                    <i className="fas fa-lock text-xs text-gray-400" aria-hidden="true" />
                  )}
                </NavLink>
              )
            })}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <i className="fas fa-sign-out-alt w-5 text-center" />
                Log out
              </button>
            </div>
          </nav>
        </aside>

        {/* Overlay when sidebar open on mobile */}
        {sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-10 bg-black/20 lg:hidden"
            aria-label="Close sidebar"
          />
        )}

        {/* Main content */}
        <main className="min-h-[calc(100vh-3.5rem)] flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default TbtiDashboardLayout
