import React, { useEffect, useRef, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Events = () => {
  const cardsRef = useRef([])
  const [events, setEvents] = useState([
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
  ])
  const [activeEvent, setActiveEvent] = useState(null)

  useEffect(() => {
    let unsubscribeContent = null

    if (db) {
      const ref = doc(db, 'siteContent', 'events')
      unsubscribeContent = onSnapshot(
        ref,
        (snap) => {
          if (!snap.exists()) return
          const data = snap.data()
          if (Array.isArray(data.items) && data.items.length) {
            setEvents(data.items)
          }
        },
        () => {
          // fall back to defaults on error
        }
      )
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    cardsRef.current.forEach((card) => {
      if (card) {
        card.style.opacity = '0'
        card.style.transform = 'translateY(20px)'
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        observer.observe(card)
      }
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
      if (unsubscribeContent) unsubscribeContent()
    }
  }, [])

  return (
    <section id="events" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AA15]">
            What's On
          </p>
          <h2 className="heading-font mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto">
            Join us for worship, fellowship, and special gatherings
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const fullDesc = event.description || ''
            const preview =
              fullDesc.length > 180
                ? `${fullDesc.slice(0, 180).trim()}...`
                : fullDesc
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg card-hover"
              >
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AA15]">
                    {event.date}
                  </p>
                  <h3 className="heading-font mt-2 text-xl font-bold text-gray-900">
                    {event.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{preview}</p>
                {fullDesc && (
                  <button
                    type="button"
                    onClick={() => setActiveEvent(event)}
                    className="text-sm font-semibold text-[#29226D] hover:underline"
                  >
                    Learn More →
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
      {activeEvent && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="max-w-lg w-full rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AA15]">
                  {activeEvent.date}
                </p>
                <h3 className="heading-font mt-2 text-xl font-bold text-gray-900">
                  {activeEvent.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveEvent(null)}
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {activeEvent.description}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Events
