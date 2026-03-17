import React, { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const defaultEvents = [
  {
    date: 'March 15',
    title: 'Easter Celebration',
    description:
      'Join us for a special Easter service celebrating the resurrection of our Lord Jesus Christ.',
  },
  {
    date: 'March 22',
    title: 'Youth Retreat',
    description:
      'A weekend retreat for youth ages 13-18 focusing on faith, fellowship, and fun.',
  },
  {
    date: 'April 5',
    title: 'Community Outreach',
    description:
      'Serving our local community through food distribution and fellowship.',
  },
]

const emptyEvent = {
  date: '',
  title: '',
  description: '',
}

const AdminSiteEvents = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [draft, setDraft] = useState(emptyEvent)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return
    }
    getDoc(doc(db, 'siteContent', 'events'))
      .then((snap) => {
        if (snap.exists()) {
          const data = snap.data()
          if (Array.isArray(data.items) && data.items.length) {
            setItems(data.items)
            return
          }
        }
        // if nothing in Firestore yet, seed with site defaults
        setItems(defaultEvents)
      })
      .finally(() => setLoading(false))
  }, [])

  const updateItem = (index, field, value) => {
    setItems((prev) => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: value }
      return copy
    })
  }

  const saveAll = async (nextItems) => {
    if (!db) return
    setSaving(true)
    try {
      await setDoc(doc(db, 'siteContent', 'events'), { items: nextItems })
      setItems(nextItems)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const openEditor = (index) => {
    if (index === null) {
      setDraft(emptyEvent)
      setEditingIndex(items.length)
    } else {
      setDraft(items[index] || emptyEvent)
      setEditingIndex(index)
    }
  }

  const closeEditor = () => {
    setEditingIndex(null)
    setDraft(emptyEvent)
  }

  const saveDraft = async () => {
    const nextItems = [...items]
    if (editingIndex === items.length) {
      nextItems.push(draft)
    } else {
      nextItems[editingIndex] = draft
    }
    await saveAll(nextItems)
    closeEditor()
  }

  const removeItem = async (index) => {
    const nextItems = items.filter((_, i) => i !== index)
    await saveAll(nextItems)
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
          Admin · Website
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">Events</h1>
        <p className="mt-2 text-sm text-gray-600">
          Edit the upcoming events shown on the main church site. Click a card to edit.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => openEditor(index)}
                className="text-left rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AA15]">
                    {item.date || 'Date'}
                  </p>
                  <h3 className="heading-font mt-2 text-xl font-bold text-gray-900">
                    {item.title || 'Untitled event'}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {item.description || 'Add a description'}
                </p>
                <span className="text-xs font-semibold text-[#29226D]">
                  Click to edit →
                </span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => openEditor(null)}
              className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-sm font-medium text-gray-600 hover:border-amber-400 hover:text-amber-600"
            >
              + Add event
            </button>
          </div>

          {editingIndex !== null && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
              <div className="max-w-lg w-full rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {editingIndex === items.length ? 'Add event' : 'Edit event'}
                  </h2>
                  <button
                    type="button"
                    onClick={closeEditor}
                    className="text-sm text-gray-500 hover:text-gray-800"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">Date</label>
                    <input
                      type="text"
                      value={draft.date}
                      onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={draft.title}
                      onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={draft.description}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, description: e.target.value }))
                      }
                      rows={3}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="mt-5 flex justify-between gap-3">
                  {editingIndex < items.length && (
                    <button
                      type="button"
                      onClick={() => removeItem(editingIndex)}
                      className="text-xs font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                  <div className="ml-auto flex gap-3">
                    <button
                      type="button"
                      onClick={closeEditor}
                      className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={saveDraft}
                      disabled={saving}
                      className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
                    >
                      {saving ? 'Saving…' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminSiteEvents

