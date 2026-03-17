import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const TbtiLessons = () => {
  const { isEnrolled } = useAuth()
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isEnrolled || !db) {
      setLoading(false)
      return
    }
    getDocs(collection(db, 'lessons'))
      .then((snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || (a.year ?? 1) - (b.year ?? 1) || (a.semester ?? 1) - (b.semester ?? 1))
        setLessons(list)
      })
      .catch(() => setLessons([]))
      .finally(() => setLoading(false))
  }, [isEnrolled])

  if (!isEnrolled) {
    return (
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
          Lessons
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">
          Access restricted
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          These modules are only available to enrolled TBTI students. Once an admin marks your
          account as enrolled, you&apos;ll be able to access the PDF lessons and YouTube video links here.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          For now, please contact the TBTI team or your coordinator to complete enrollment.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
          Lessons
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">
          Your TBTI Modules
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          PDF handouts and YouTube links for enrolled students.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading lessons…</p>
      ) : lessons.length === 0 ? (
        <p className="text-sm text-gray-500">No lessons published yet. Check back later.</p>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#451515]">
                  Year {lesson.year ?? 1} · Semester {lesson.semester ?? 1}
                </span>
              </div>
              <h2 className="mt-1 text-lg font-semibold text-gray-900">{lesson.title}</h2>
              {lesson.description && (
                <p className="mt-2 text-sm text-gray-600">{lesson.description}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-3">
                {lesson.pdfUrl && (
                  <a
                    href={lesson.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-[#451515] px-3 py-2 text-sm font-medium text-white hover:bg-[#6B2425]"
                  >
                    PDF handout
                  </a>
                )}
                {lesson.youtubeUrl && (
                  <a
                    href={lesson.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    YouTube video
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TbtiLessons

