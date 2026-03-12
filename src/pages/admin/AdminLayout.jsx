import React, { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const AdminLayout = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { to: '/admin', label: 'Admin Home', icon: 'fa-home' },
    { to: '/admin/students', label: 'Students', icon: 'fa-users' },
    { to: '/admin/lessons', label: 'Lessons', icon: 'fa-book-open' },
    { to: '/admin/site-services', label: 'Site · Services', icon: 'fa-clock' },
    { to: '/admin/site-events', label: 'Site · Events', icon: 'fa-calendar' },
  ]

  const handleSignOut = () => {
    signOut()
    navigate('/tbti/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm lg:px-6">
        <button
          type="button"
          onClick={() => setSidebarOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>
        <Link to="/admin" className="flex items-center gap-2 text-gray-900">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="heading-font text-lg font-bold">TBTI Admin</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/tbti/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-purple-700 hover:underline"
          >
            Student portal
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 transform border-r border-gray-200 bg-white pt-14 shadow-lg transition-transform duration-200 ease-out lg:static lg:z-auto lg:pt-0 lg:shadow-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/admin'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive ? 'bg-amber-50 text-amber-800' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <i className={`fas ${icon} w-5 text-center`} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-10 bg-black/20 lg:hidden"
            aria-label="Close sidebar"
          />
        )}

        <main className="min-h-[calc(100vh-3.5rem)] flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
