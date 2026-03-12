import React, { useEffect, useRef } from 'react'

const Events = () => {
  const cardsRef = useRef([])

  useEffect(() => {
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
    }
  }, [])

  const events = [
    {
      date: 'March 15',
      title: 'Easter Celebration',
      description: 'Join us for a special Easter service celebrating the resurrection of our Lord Jesus Christ.',
      icon: 'fa-egg',
      color: 'purple',
      link: '#'
    },
    {
      date: 'March 22',
      title: 'Youth Retreat',
      description: 'A weekend retreat for youth ages 13-18 focusing on faith, fellowship, and fun.',
      icon: 'fa-mountain',
      color: 'blue',
      link: '#'
    },
    {
      date: 'April 5',
      title: 'Community Outreach',
      description: 'Serving our local community through food distribution and fellowship.',
      icon: 'fa-hands-helping',
      color: 'green',
      link: '#'
    }
  ]

  return (
    <section id="events" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
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
          {events.map((event, index) => (
            <div 
              key={index}
              ref={(el) => cardsRef.current[index] = el}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">{event.date}</p>
                  <h3 className="heading-font mt-2 text-xl font-bold text-gray-900">{event.title}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-white">
                  <i className={`fas ${event.icon} text-xl`}></i>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{event.description}</p>
              <a href={event.link} className="text-sm font-semibold text-purple-700 hover:underline">
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
