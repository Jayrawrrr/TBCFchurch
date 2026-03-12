import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const TbtiProfile = () => {
  const { user, isEnrolled, setEnrolled } = useAuth()
  const [profile, setProfile] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    program: 'Certificate in Biblical Foundations',
    year: 'Year 1',
    phone: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // Sync profile from auth and Firestore when user loads
  useEffect(() => {
    if (!user) return
    setProfile((p) => ({
      ...p,
      name: user.displayName || p.name,
      email: user.email || p.email,
    }))
    if (!db) return
    getDoc(doc(db, 'users', user.uid))
      .then((snap) => {
        if (snap.exists()) {
          const d = snap.data()
          setProfile((p) => ({ ...p, phone: d.phone || '' }))
        }
      })
      .catch(() => {})
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!user || !db || !auth.currentUser) return
    setSaving(true)
    try {
      await updateProfile(auth.currentUser, { displayName: profile.name.trim() })
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: profile.name.trim(),
        phone: (profile.phone || '').trim(),
      })
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to save profile', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
          Account
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">
          Profile
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Your TBTI student profile and contact information.
        </p>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Personal information</h2>
          <button
            type="button"
            onClick={() => setIsEditing((v) => !v)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold">
          <span
            className={`h-2 w-2 rounded-full ${
              isEnrolled ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
          <span className={isEnrolled ? 'text-green-700' : 'text-gray-600'}>
            {isEnrolled ? 'Enrolled student (lessons unlocked)' : 'Not enrolled (lessons locked)'}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Phone (optional)</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Your phone number"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Program</label>
            <input
              type="text"
              value={profile.program}
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              value={profile.year}
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600"
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
            <button
              type="button"
              onClick={() => setEnrolled(!isEnrolled)}
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              {isEnrolled ? 'Mark as not enrolled (demo)' : 'Mark as enrolled (demo)'}
            </button>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick links</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link to="/tbti/dashboard/what-is-tbti" className="font-semibold text-purple-700 hover:underline">
              What is TBTI
            </Link>
          </li>
          <li>
            <Link to="/tbti/dashboard/school-program" className="font-semibold text-purple-700 hover:underline">
              School Program &amp; Curriculum
            </Link>
          </li>
          <li>
            <Link to="/tbti/dashboard/admission" className="font-semibold text-purple-700 hover:underline">
              Registration &amp; Admission
            </Link>
          </li>
          <li>
            <Link to="/tbti/dashboard/discipline" className="font-semibold text-purple-700 hover:underline">
              School Discipline &amp; Grading
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TbtiProfile
