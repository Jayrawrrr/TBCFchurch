import React, { useEffect, useRef, useState } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const AdminLessons = () => {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({
    title: '',
    year: 1,
    semester: 1,
    description: '',
    pdfUrl: '',
    youtubeUrl: '',
    order: 0,
  })

  const loadAllLessons = () => {
    if (!db) return
    setLoading(true)
    getDocs(collection(db, 'lessons'))
      .then((snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || (a.year ?? 1) - (b.year ?? 1) || (a.semester ?? 1) - (b.semester ?? 1))
        setLessons(list)
      })
      .catch(() => setLessons([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadAllLessons()
  }, [])

  const resetForm = () => {
    setForm({
      title: '',
      year: 1,
      semester: 1,
      description: '',
      pdfUrl: '',
      youtubeUrl: '',
      order: lessons.length,
    })
    setEditing(null)
  }

  const saveLesson = async (e) => {
    e.preventDefault()
    if (!db || !form.title.trim()) return
    try {
      if (editing) {
        await updateDoc(doc(db, 'lessons', editing.id), {
          title: form.title.trim(),
          year: Number(form.year) || 1,
          semester: Number(form.semester) || 1,
          description: (form.description || '').trim(),
          pdfUrl: (form.pdfUrl || '').trim(),
          youtubeUrl: (form.youtubeUrl || '').trim(),
          order: Number(form.order) || 0,
        })
      } else {
        await addDoc(collection(db, 'lessons'), {
          title: form.title.trim(),
          year: Number(form.year) || 1,
          semester: Number(form.semester) || 1,
          description: (form.description || '').trim(),
          pdfUrl: (form.pdfUrl || '').trim(),
          youtubeUrl: (form.youtubeUrl || '').trim(),
          order: Number(form.order) ?? lessons.length,
        })
      }
      resetForm()
      loadAllLessons()
    } catch (err) {
      console.error(err)
    }
  }

  const handlePdfFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!storage) {
      alert('File uploads are not available because Firebase storage is not configured.')
      return
    }
    setUploadingPdf(true)
    try {
      const fileRef = ref(storage, `lessons/${Date.now()}_${file.name}`)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      setForm((f) => ({ ...f, pdfUrl: url }))
    } catch (err) {
      console.error(err)
      alert('Failed to upload PDF. Please try again.')
    } finally {
      setUploadingPdf(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const deleteLesson = async (id) => {
    if (!db || !window.confirm('Delete this lesson?')) return
    try {
      await deleteDoc(doc(db, 'lessons', id))
      loadAllLessons()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading && lessons.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-gray-500">Loading lessons...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Admin</p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">Lessons</h1>
        <p className="mt-2 text-sm text-gray-600">
          Add or edit handouts. Set PDF link and YouTube URL; enrolled students will see these on the Lessons page.
        </p>
      </div>

      <form onSubmit={saveLesson} className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-900">{editing ? 'Edit lesson' : 'Add lesson'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. Bibliology"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">Year</label>
              <select
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: Number(e.target.value) }))}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">Semester</label>
              <select
                value={form.semester}
                onChange={(e) => setForm((f) => ({ ...f, semester: Number(e.target.value) }))}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500"
              placeholder="Short description"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">PDF</label>
            <input
              type="url"
              value={form.pdfUrl}
              onChange={(e) => setForm((f) => ({ ...f, pdfUrl: e.target.value }))}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500"
              placeholder="Paste PDF URL or upload below"
            />
            <div className="mt-2 flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handlePdfFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPdf}
                className="rounded-xl border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
              >
                {uploadingPdf ? 'Uploading…' : 'Upload PDF'}
              </button>
              {form.pdfUrl && (
                <span className="text-xs text-emerald-600">PDF attached</span>
              )}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">YouTube URL</label>
            <input
              type="url"
              value={form.youtubeUrl}
              onChange={(e) => setForm((f) => ({ ...f, youtubeUrl: e.target.value }))}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500"
              placeholder="https://youtube.com/..."
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Order</label>
            <input
              type="number"
              min={0}
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
          >
            {editing ? 'Update' : 'Add lesson'}
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
        <h2 className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-900">All lessons</h2>
        <ul className="divide-y divide-gray-100">
          {lessons.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-gray-500">No lessons yet. Add one above.</li>
          ) : (
            lessons.map((l) => (
              <li key={l.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <div>
                  <span className="font-medium text-gray-900">{l.title}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    Year {l.year} · Sem {l.semester}
                  </span>
                  {(l.pdfUrl || l.youtubeUrl) && (
                    <span className="ml-2 text-xs text-green-600">Has links</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(l)
                      setForm({
                        title: l.title || '',
                        year: l.year ?? 1,
                        semester: l.semester ?? 1,
                        description: l.description || '',
                        pdfUrl: l.pdfUrl || '',
                        youtubeUrl: l.youtubeUrl || '',
                        order: l.order ?? 0,
                      })
                    }}
                    className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteLesson(l.id)}
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
    </div>
  )
}

export default AdminLessons
