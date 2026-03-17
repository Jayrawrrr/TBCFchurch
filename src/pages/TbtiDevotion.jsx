import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const TbtiDevotion = () => {
  const { user, isEnrolled } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    date: '',
    scripture: '',
    notes: '',
  })

  useEffect(() => {
    if (!isEnrolled || !db || !user) {
      setLoading(false)
      return
    }
    const loadEntries = async () => {
      try {
        const q = query(
          collection(db, 'devotionLogs'),
          where('userId', '==', user.uid),
          orderBy('date', 'desc'),
        )
        const snap = await getDocs(q)
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        setEntries(list)
      } catch {
        setEntries([])
      } finally {
        setLoading(false)
      }
    }
    loadEntries()
  }, [isEnrolled, user])

  if (!isEnrolled) {
    return (
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
          Devotion
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">
          Access restricted
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Devotion tracking is only available to enrolled TBTI students. Once an admin marks your
          account as enrolled, you&apos;ll be able to log and review your devotion entries here.
        </p>
      </div>
    )
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!db || !user) return
    if (!form.date || !form.scripture.trim()) return
    setSaving(true)
    try {
      const payload = {
        userId: user.uid,
        date: form.date,
        scripture: form.scripture.trim(),
        notes: form.notes.trim(),
        createdAt: new Date().toISOString(),
      }
      const docRef = await addDoc(collection(db, 'devotionLogs'), payload)
      setEntries((prev) => [{ id: docRef.id, ...payload }, ...prev])
      setForm({
        date: '',
        scripture: '',
        notes: '',
      })
    } catch (err) {
      console.error(err)
      alert('Failed to save devotion entry. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
          Devotion
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">
          Devotion Tracker
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Log your daily devotion to monitor your walk with the Lord. Record your reading, key verse, and reflections.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-md"
      >
        <h2 className="text-lg font-semibold text-gray-900">New devotion entry</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Date *</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#451515]"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Scripture / Passage *
            </label>
            <input
              type="text"
              value={form.scripture}
              onChange={(e) => handleChange('scripture', e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#451515]"
              placeholder="e.g. Psalm 23; John 15:1–11"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Notes / Reflection
          </label>
          <textarea
            rows={4}
            value={form.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#451515]"
            placeholder="What did the Lord impress on your heart today?"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="mt-4 inline-flex items-center rounded-xl bg-[#451515] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6B2425] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save entry'}
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Recent entries</h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading devotion history…</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-gray-500">No devotion entries yet. Start by adding one above.</p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
                  {entry.date}
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {entry.scripture}
                </p>
                {entry.notes && (
                  <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
                    {entry.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TbtiDevotion

