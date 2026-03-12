import React, { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'

const AdminStudents = () => {
  const { user, role: currentRole } = useAuth()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  const loadStudents = () => {
    if (!db) {
      setLoading(false)
      return
    }
    setLoading(true)
    getDocs(collection(db, 'users'))
      .then((snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        list.sort((a, b) => (a.email || '').localeCompare(b.email || ''))
        setStudents(list)
      })
      .catch(() => setStudents([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadStudents()
  }, [])

  const toggleEnrollment = async (student) => {
    if (!db) return
    if (student.role === 'admin' || student.role === 'superadmin') return
    setUpdatingId(student.id)
    try {
      await updateDoc(doc(db, 'users', student.id), {
        isEnrolled: !student.isEnrolled,
      })
      loadStudents()
    } catch (err) {
      console.error(err)
      setUpdatingId(null)
    }
  }

  const toggleRole = async (student) => {
    if (!db || !user) return
    if (student.id === user.uid) {
      // never change your own role from here
      return
    }
    if (student.role === 'superadmin') {
      // superadmin role is managed directly in Firestore
      return
    }
    if (currentRole !== 'superadmin') {
      // only superadmin can change roles
      return
    }
    const nextRole = student.role === 'admin' ? 'student' : 'admin'
    setUpdatingId(student.id)
    try {
      await updateDoc(doc(db, 'users', student.id), {
        role: nextRole,
      })
      loadStudents()
    } catch (err) {
      console.error(err)
      setUpdatingId(null)
    }
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
          Admin · Students
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">
          Registered users
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          View all accounts, enroll students into TBTI, and assign admin roles.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading students…</p>
      ) : students.length === 0 ? (
        <p className="text-sm text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Enrollment</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Role</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((s) => {
                const isCurrentUser = user && s.id === user.uid
                const isAdminRole = s.role === 'admin' || s.role === 'superadmin'
                const effectiveEnrolled = isAdminRole ? true : !!s.isEnrolled
                return (
                  <tr key={s.id}>
                    <td className="px-4 py-3 text-gray-900">
                      {s.name || s.fullName || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{s.email || '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          effectiveEnrolled
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-gray-50 text-gray-500'
                        }`}
                      >
                        {effectiveEnrolled ? 'Enrolled' : 'Not enrolled'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          s.role === 'admin' || s.role === 'superadmin'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-indigo-50 text-indigo-700'
                        }`}
                      >
                        {s.role === 'superadmin'
                          ? 'Superadmin'
                          : isCurrentUser && (currentRole === 'admin' || currentRole === 'superadmin')
                          ? 'You (admin)'
                          : s.role === 'admin'
                          ? 'Admin'
                          : 'Student'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {!isAdminRole && (
                          <button
                            type="button"
                            onClick={() => toggleEnrollment(s)}
                            disabled={updatingId === s.id}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {s.isEnrolled ? 'Unenroll' : 'Enroll'}
                          </button>
                        )}
                        {currentRole === 'superadmin' && !isCurrentUser && s.role !== 'superadmin' && (
                          <button
                            type="button"
                            onClick={() => toggleRole(s)}
                            disabled={updatingId === s.id}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {s.role === 'admin' ? 'Remove admin' : 'Make admin'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminStudents

