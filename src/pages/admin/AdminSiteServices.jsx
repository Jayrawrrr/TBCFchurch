import React, { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const defaultServices = [
  {
    title: 'Sunday Morning',
    description: 'Traditional worship service with hymns and message',
    time: '9:00 AM - 10:30 AM',
    location: 'Main Sanctuary',
    day: 'Sunday',
    color: 'gold',
  },
  {
    title: 'Sunday Evening',
    description: 'Contemporary worship with modern music and teaching',
    time: '6:00 PM - 7:30 PM',
    location: 'Main Sanctuary',
    day: 'Sunday',
    color: 'indigo',
  },
  {
    title: 'Wednesday Prayer',
    description: 'Mid-week prayer meeting and Bible study',
    time: '7:00 PM - 8:30 PM',
    location: 'Fellowship Hall',
    day: 'Wednesday',
    color: 'blue',
  },
]

const emptyService = {
  title: '',
  description: '',
  time: '',
  location: '',
  day: '',
  color: 'gold',
}

const AdminSiteServices = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [draft, setDraft] = useState(emptyService)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return
    }
    getDoc(doc(db, 'siteContent', 'services'))
      .then((snap) => {
        if (snap.exists()) {
          const data = snap.data()
          if (Array.isArray(data.items) && data.items.length) {
            setItems(data.items)
            return
          }
        }
        // if nothing in Firestore yet, seed with the public site defaults
        setItems(defaultServices)
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

  const addItem = () => {
    setItems((prev) => [...prev, { ...emptyService }])
  }

  const saveAll = async (nextItems) => {
    if (!db) return
    setSaving(true)
    try {
      await setDoc(doc(db, 'siteContent', 'services'), { items: nextItems })
      setItems(nextItems)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const openEditor = (index) => {
    if (index === null) {
      setDraft(emptyService)
      setEditingIndex(items.length)
    } else {
      setDraft(items[index] || emptyService)
      setEditingIndex(index)
    }
  }

  const closeEditor = () => {
    setEditingIndex(null)
    setDraft(emptyService)
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
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">Service times</h1>
        <p className="mt-2 text-sm text-gray-600">
          Edit the services shown on the main church site services section. Click a card to edit.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <>
          <div className="space-y-8">
            {items.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => openEditor(index)}
                className="w-full text-left"
              >
                <div className="relative max-w-4xl mx-auto">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#F6F4E8]" />
                  <div className="relative flex items-center">
                    <div className="absolute left-8 z-10">
                      <div className="w-4 h-4 rounded-full bg-[#D4AA15] border-4 border-white shadow-lg" />
                    </div>
                    <div className="w-full ml-16">
                      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#F6F4E8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AA15] mb-4">
                          {item.day || 'Day'}
                        </div>
                        <h3 className="heading-font mb-4 text-xl font-bold text-gray-900">
                          {item.title || 'Untitled service'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                          {item.description || 'Add a description'}
                        </p>
                        <div className="space-y-2 pt-4 border-top border-gray-100">
                          <div className="flex items-center text-sm text-gray-700">
                            <i className="far fa-clock mr-3 text-[#D4AA15]"></i>
                            <span className="font-medium">
                              {item.time || 'Time'}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <i className="fas fa-map-marker-alt mr-3 text-[#D4AA15]"></i>
                            <span>{item.location || 'Location'}</span>
                          </div>
                        </div>
                        <p className="mt-3 text-xs font-semibold text-[#29226D]">
                          Click to edit →
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}

            <button
              type="button"
              onClick={() => openEditor(null)}
              className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-sm font-medium text-gray-600 hover:border-amber-400 hover:text-amber-600"
            >
              + Add service
            </button>
          </div>

          {editingIndex !== null && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
              <div className="max-w-lg w-full rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {editingIndex === items.length ? 'Add service' : 'Edit service'}
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
                    <label className="mb-1 block text-xs font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={draft.title}
                      onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">Day</label>
                    <input
                      type="text"
                      value={draft.day}
                      onChange={(e) => setDraft((d) => ({ ...d, day: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">Time</label>
                    <input
                      type="text"
                      value={draft.time}
                      onChange={(e) => setDraft((d) => ({ ...d, time: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={draft.location}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, location: e.target.value }))
                      }
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
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Color key
                    </label>
                    <select
                      value={draft.color}
                      onChange={(e) => setDraft((d) => ({ ...d, color: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="gold">Gold</option>
                      <option value="indigo">Indigo</option>
                      <option value="blue">Blue</option>
                    </select>
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

export default AdminSiteServices

