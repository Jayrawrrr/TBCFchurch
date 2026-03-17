import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, query, where, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const TbtiAssignments = () => {
  const { user, isEnrolled } = useAuth()
  const [assignments, setAssignments] = useState([])
  const [submissions, setSubmissions] = useState({})
  const [loading, setLoading] = useState(true)
  const [submittingId, setSubmittingId] = useState(null)
  const [formState, setFormState] = useState({})

  useEffect(() => {
    if (!isEnrolled || !db) {
      setLoading(false)
      return
    }
    const loadAssignments = async () => {
      try {
        const snap = await getDocs(collection(db, 'assignments'))
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setAssignments(list)
      } catch {
        setAssignments([])
      } finally {
        setLoading(false)
      }
    }
    loadAssignments()
  }, [isEnrolled])

  useEffect(() => {
    if (!isEnrolled || !db || !user) return
    const loadMySubmissions = async () => {
      try {
        const q = query(
          collection(db, 'assignmentSubmissions'),
          where('userId', '==', user.uid),
        )
        const snap = await getDocs(q)
        const byAssignment = {}
        snap.forEach((docSnap) => {
          const data = docSnap.data()
          if (data.assignmentId) {
            byAssignment[data.assignmentId] = { id: docSnap.id, ...data }
          }
        })
        setSubmissions(byAssignment)
      } catch {
        setSubmissions({})
      }
    }
    loadMySubmissions()
  }, [isEnrolled, user])

  if (!isEnrolled) {
    return (
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
          Assignments
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">
          Access restricted
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Assignments are only available to enrolled TBTI students. Once an admin marks your
          account as enrolled, you&apos;ll be able to view and submit assignments here.
        </p>
      </div>
    )
  }

  const handleChange = (assignmentId, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [assignmentId]: {
        ...(prev[assignmentId] || {}),
        [field]: value,
      },
    }))
  }

  const handleSubmit = async (assignment) => {
    if (!db || !user) return
    const current = formState[assignment.id] || {}
    const answer = (current.answer || '').trim()
    const link = (current.link || '').trim()
    if (!answer && !link) return
    setSubmittingId(assignment.id)
    try {
      const payload = {
        assignmentId: assignment.id,
        assignmentTitle: assignment.title || '',
        userId: user.uid,
        userEmail: user.email || '',
        answer,
        link,
        createdAt: serverTimestamp(),
      }
      const docRef = await addDoc(collection(db, 'assignmentSubmissions'), payload)
      setSubmissions((prev) => ({
        ...prev,
        [assignment.id]: { id: docRef.id, ...payload },
      }))
      setFormState((prev) => ({
        ...prev,
        [assignment.id]: { answer: '', link: '' },
      }))
    } catch (err) {
      console.error(err)
      alert('Failed to submit assignment. Please try again.')
    } finally {
      setSubmittingId(null)
    }
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
          Assignments
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">
          Your TBTI Assignments
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          View assignments from admin and submit your responses. You can include written answers and an optional link (e.g. Google Doc).
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading assignments…</p>
      ) : assignments.length === 0 ? (
        <p className="text-sm text-gray-500">No assignments published yet. Check back later.</p>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => {
            const existing = submissions[assignment.id]
            const form = formState[assignment.id] || { answer: '', link: '' }
            return (
              <div
                key={assignment.id}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
                      Assignment
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-gray-900">
                      {assignment.title}
                    </h2>
                    {assignment.dueDate && (
                      <p className="mt-1 text-xs text-gray-500">
                        Due: {assignment.dueDate}
                      </p>
                    )}
                  </div>
                  {existing && (
                    <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Submitted
                    </span>
                  )}
                </div>
                {assignment.description && (
                  <p className="mt-3 text-sm text-gray-700">{assignment.description}</p>
                )}

                <div className="mt-4 space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Your answer
                    </label>
                    <textarea
                      value={form.answer}
                      onChange={(e) =>
                        handleChange(assignment.id, 'answer', e.target.value)
                      }
                      rows={4}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#451515]"
                      placeholder="Type your response here…"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Optional link (Google Doc, PDF, etc.)
                    </label>
                    <input
                      type="url"
                      value={form.link}
                      onChange={(e) =>
                        handleChange(assignment.id, 'link', e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#451515]"
                      placeholder="https://..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSubmit(assignment)}
                    disabled={submittingId === assignment.id}
                    className="inline-flex items-center rounded-xl bg-[#451515] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6B2425] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submittingId === assignment.id ? 'Submitting…' : 'Submit assignment'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TbtiAssignments

