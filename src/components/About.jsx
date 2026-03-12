import React, { useEffect, useRef } from 'react'

const About = () => {
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

    cardsRef.current.forEach((ref) => {
      if (ref) {
        ref.style.opacity = '0'
        ref.style.transform = 'translateY(20px)'
        ref.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        observer.observe(ref)
      }
    })

    return () => {
      cardsRef.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <section id="about" className="relative overflow-hidden">
      {/* Our Approach - TBTI design language */}
      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
                Our Approach
              </p>
              <h3 className="heading-font mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Growing Together in Faith
              </h3>
              <p className="mt-2 text-sm text-gray-600 mb-8 leading-relaxed">
                We believe in the power of prayer, the importance of authentic fellowship, and the
                transformative work of the Holy Spirit. Whether you're exploring faith for the first
                time or have been walking with Christ for years, you'll find a place to belong here.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <i className="fas fa-check text-purple-600"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Welcoming Community</h4>
                    <p className="text-sm text-gray-600">A place where everyone is valued and included</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <i className="fas fa-check text-purple-600"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Biblical Teaching</h4>
                    <p className="text-sm text-gray-600">Rooted in Scripture and relevant to daily life</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <i className="fas fa-check text-purple-600"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Serving Others</h4>
                    <p className="text-sm text-gray-600">Actively reaching out to our community and beyond</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div
                ref={(el) => cardsRef.current[0] = el}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-md"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-white">
                    <i className="fas fa-hands-helping text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Compassionate Service</h4>
                    <p className="text-sm text-gray-600">
                      We seek to serve others with humility and love, following the example of
                      Christ who came not to be served but to serve.
                    </p>
                  </div>
                </div>
              </div>
              <div
                ref={(el) => cardsRef.current[1] = el}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-md"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-white">
                    <i className="fas fa-seedling text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Spiritual Growth</h4>
                    <p className="text-sm text-gray-600">
                      We are committed to helping each person grow deeper in their relationship with
                      God through prayer, study, and community.
                    </p>
                  </div>
                </div>
              </div>
              <div
                ref={(el) => cardsRef.current[2] = el}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-md"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-white">
                    <i className="fas fa-globe-americas text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Global Mission</h4>
                    <p className="text-sm text-gray-600">
                      We support and participate in sharing the Gospel locally and globally, making
                      disciples of all nations as Jesus commanded.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
