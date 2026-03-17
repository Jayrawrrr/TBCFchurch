import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'

const AdminAssignments = () => {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [submissionsLoading, setSubmissionsLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    order: 0,
  })

  const loadAssignments = () => {
    if (!db) return
    setLoading(true)
    getDocs(collection(db, 'assignments'))
      .then((snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setAssignments(list)
      })
      .catch(() => setAssignments([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadAssignments()
  }, [])

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      dueDate: '',
      order: assignments.length,
    })
    setEditing(null)
  }

  const saveAssignment = async (e) => {
    e.preventDefault()
    if (!db || !form.title.trim()) return
    try {
      if (editing) {
        await updateDoc(doc(db, 'assignments', editing.id), {
          title: form.title.trim(),
          description: (form.description || '').trim(),
          dueDate: (form.dueDate || '').trim(),
          order: Number(form.order) || 0,
        })
      } else {
        await addDoc(collection(db, 'assignments'), {
          title: form.title.trim(),
          description: (form.description || '').trim(),
          dueDate: (form.dueDate || '').trim(),
          order: Number(form.order) ?? assignments.length,
        })
      }
      resetForm()
      loadAssignments()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteAssignment = async (id) => {
    if (!db || !window.confirm('Delete this assignment?')) return
    try {
      await deleteDoc(doc(db, 'assignments', id))
      if (selectedAssignment && selectedAssignment.id === id) {
        setSelectedAssignment(null)
        setSubmissions([])
      }
      loadAssignments()
    } catch (err) {
      console.error(err)
    }
  }

  const loadSubmissions = async (assignment) => {
    if (!db) return
    setSelectedAssignment(assignment)
    setSubmissions([])
    setSubmissionsLoading(true)
    try {
      const q = query(
        collection(db, 'assignmentSubmissions'),
        where('assignmentId', '==', assignment.id),
        orderBy('createdAt', 'desc'),
      )
      const snap = await getDocs(q)
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setSubmissions(list)
    } catch (err) {
      console.error(err)
      setSubmissions([])
    } finally {
      setSubmissionsLoading(false)
    }
  }

  if (loading && assignments.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-gray-500">Loading assignments...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
          Admin · Assignments
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">Assignments</h1>
        <p className="mt-2 text-sm text-gray-600">
          Create assignments for enrolled students and review their submissions.
        </p>
      </div>

      <form
        onSubmit={saveAssignment}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-md"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          {editing ? 'Edit assignment' : 'Add assignment'}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. Assignment 1 – Gospel of John"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Instructions / Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500"
              placeholder="Describe what students should do for this assignment."
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Due date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Order</label>
            <input
              type="number"
              min={0}
              value={form.order}
              onChange={(e) =>
                setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
          >
            {editing ? 'Update' : 'Add assignment'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="rounded-xl border border-gray-200 bg-white shadow-md">
        <h2 className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-900">
          All assignments
        </h2>
        <ul className="divide-y divide-gray-100">
          {assignments.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-gray-500">
              No assignments yet. Add one above.
            </li>
          ) : (
            assignments.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
              >
                <div>
                  <span className="font-medium text-gray-900">{a.title}</span>
                  {a.dueDate && (
                    <span className="ml-2 text-xs text-gray-500">Due {a.dueDate}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(a)
                      setForm({
                        title: a.title || '',
                        description: a.description || '',
                        dueDate: a.dueDate || '',
                        order: a.order ?? 0,
                      })
                    }}
                    className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSubmissions(a)}
                    className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    View submissions
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteAssignment(a.id)}
                    className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {selectedAssignment && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Submissions · {selectedAssignment.title}
            </h2>
            <button
              type="button"
              onClick={() => {
                setSelectedAssignment(null)
                setSubmissions([])
              }}
              className="text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          <div className="max-h-[360px] divide-y divide-gray-100 overflow-y-auto">
            {submissionsLoading ? (
              <p className="px-4 py-4 text-sm text-gray-500">Loading submissions…</p>
            ) : submissions.length === 0 ? (
              <p className="px-4 py-4 text-sm text-gray-500">
                No submissions yet for this assignment.
              </p>
            ) : (
              submissions.map((s) => (
                <div key={s.id} className="px-4 py-3 text-sm">
                  <p className="font-semibold text-gray-900">
                    {s.userEmail || s.userId || 'Unknown student'}
                  </p>
                  {s.createdAt && (
                    <p className="text-xs text-gray-500">
                      Submitted:{' '}
                      {typeof s.createdAt.toDate === 'function'
                        ? s.createdAt.toDate().toLocaleString()
                        : String(s.createdAt)}
                    </p>
                  )}
                  {s.answer && (
                    <p className="mt-2 whitespace-pre-line text-gray-700">{s.answer}</p>
                  )}
                  {s.link && (
                    <p className="mt-1">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-[#451515] hover:underline"
                      >
                        View attached link
                      </a>
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminAssignments

