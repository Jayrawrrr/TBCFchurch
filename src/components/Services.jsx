import React, { useEffect, useRef, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Services = () => {
  const timelineRefs = useRef([])
  const [services, setServices] = useState([
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
  ])

  useEffect(() => {
    let unsubscribeContent = null
    if (db) {
      const ref = doc(db, 'siteContent', 'services')
      unsubscribeContent = onSnapshot(
        ref,
        (snap) => {
          if (!snap.exists()) return
          const data = snap.data()
          if (Array.isArray(data.items) && data.items.length) {
            setServices(data.items)
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
            entry.target.style.transform = 'translateX(0)'
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    timelineRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.opacity = '0'
        ref.style.transform = 'translateX(-30px)'
        ref.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        observer.observe(ref)
      }
    })

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
      if (unsubscribeContent) unsubscribeContent()
    }
  }, [])

  const getColorClasses = (color) => {
    const colors = {
      gold: {
        bg: 'bg-[#D4AA15]',
        text: 'text-[#D4AA15]',
        light: 'bg-[#F6F4E8]',
        border: 'border-[#D4AA15]'
      },
      indigo: {
        bg: 'bg-indigo-600',
        text: 'text-indigo-600',
        light: 'bg-indigo-50',
        border: 'border-indigo-600'
      },
      blue: {
        bg: 'bg-blue-600',
        text: 'text-blue-600',
        light: 'bg-blue-50',
        border: 'border-blue-600'
      }
    }
    return colors[color] || colors.gold
  }

  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AA15]">
            Service Times
          </p>
          <h2 className="heading-font mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Join Us for Worship
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto">
            Fellowship and teaching from God's Word
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F6F4E8] via-[#D4AA15]/30 to-[#F6F4E8] transform md:-translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {services.map((service, index) => {
              const colors = getColorClasses(service.color)
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  ref={(el) => timelineRefs.current[index] = el}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div className={`w-4 h-4 rounded-full ${colors.bg} border-4 border-white shadow-lg`}></div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                      isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
                      {/* Day Badge */}
                      <div className={`inline-flex items-center gap-2 rounded-full ${colors.light} px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${colors.text} mb-4`}>
                        {service.day}
                      </div>

                      <h3 className="heading-font mb-4 text-xl font-bold text-gray-900">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Time and Location */}
                      <div className="space-y-2 pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-700">
                          <i className={`far fa-clock mr-3 ${colors.text}`}></i>
                          <span className="font-medium">{service.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <i className={`fas fa-map-marker-alt mr-3 ${colors.text}`}></i>
                          <span>{service.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
