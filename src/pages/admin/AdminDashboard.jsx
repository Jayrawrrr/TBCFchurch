import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Admin</p>
      <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-sm text-gray-600">
        Manage students, enrollment, and lesson handouts.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          to="/admin/students"
          className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <i className="fas fa-users text-xl" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Students</h2>
            <p className="text-sm text-gray-600">View users and enroll students</p>
          </div>
        </Link>
        <Link
          to="/admin/lessons"
          className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <i className="fas fa-book-open text-xl" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Lessons</h2>
            <p className="text-sm text-gray-600">Add PDF handouts and YouTube links</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard
