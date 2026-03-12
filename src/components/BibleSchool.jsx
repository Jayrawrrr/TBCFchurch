import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const BibleSchool = () => {
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

  return (
    <section id="bible-school" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
            True Bread Training Institute
          </p>
          <h2 className="heading-font mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            TBTI Bible School
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-3xl mx-auto">
            True Bread Training Institute exists to equip believers to be grounded in the Word of God,
            sound biblical doctrine, and Christ-centered living, preparing them for faithful service and
            leadership in the Church and the Kingdom of God.
          </p>
        </div>

        {/* Vision & Mission from handout */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div
            ref={(el) => cardsRef.current[0] = el}
            className="rounded-xl border border-gray-100 bg-white p-6 shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white">
                <i className="fas fa-eye text-xl" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Vision</h3>
            </div>
            <p className="text-sm text-gray-600">
              Believers returning fully to the Scriptures, united in the message of the New Covenant,
              living the Kingdom Life, relying on God&apos;s grace.
            </p>
          </div>
          <div
            ref={(el) => cardsRef.current[1] = el}
            className="rounded-xl border border-gray-100 bg-white p-6 shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white">
                <i className="fas fa-bullseye text-xl" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Mission</h3>
            </div>
            <p className="text-sm text-gray-600">
              To equip believers to be grounded in the Word of God, sound biblical doctrine, and
              Christ-centered living, preparing them for faithful service and leadership in the Church
              and the Kingdom of God.
            </p>
          </div>
        </div>

        {/* About TBTI - from handout 1.1 */}
        <div
          ref={(el) => cardsRef.current[2] = el}
          className="rounded-xl border border-gray-100 bg-white p-8 shadow-md mb-8"
        >
          <h3 className="text-sm font-semibold text-gray-900 mb-4">About TBTI</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>We fully rely on balanced Bible teaching (Apostles&apos; Doctrine) and the whole counsel of God—Christ-centered, apostolic truth.</li>
            <li>We teach Kingdom life toward Christlikeness: not mere information but transformation under the rule of Christ.</li>
            <li>We depend on the grace of God alone for salvation, growth, ministry, and endurance.</li>
            <li>We emphasize discipleship and lifelong obedience to Christ&apos;s commands.</li>
            <li>We uphold the New Covenant life through the Holy Spirit—no legalism.</li>
            <li>We pursue inward transformation (character, holiness, renewed mind) before outward ministry.</li>
            <li>We train believers for biblical ministry and sound doctrine, to rightly divide the Word and serve the Church faithfully.</li>
            <li>We maintain simplicity, purity, and faithfulness to Christ and His Word over popularity or trends.</li>
          </ul>
        </div>

        {/* Core Values - from handout 1.4 */}
        <div
          ref={(el) => cardsRef.current[3] = el}
          className="rounded-xl border border-gray-100 bg-white p-8 shadow-md mb-8"
        >
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Core Values</h3>
          <p className="text-sm text-gray-600 mb-4">Our core values are aligned to the character, attitude, motive, and work of Christ.</p>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm text-gray-600">
            <li><strong className="text-gray-800">Biblical Authority</strong> – Scriptures as final authority in faith and life.</li>
            <li><strong className="text-gray-800">Christ-Centered Transformation</strong> – Transformation into Christlikeness over information alone.</li>
            <li><strong className="text-gray-800">Grace-Dependent Living</strong> – Full reliance on God&apos;s grace for salvation, growth, and ministry.</li>
            <li><strong className="text-gray-800">Discipleship and Obedience</strong> – Lifelong discipleship leading to obedience to Christ.</li>
            <li><strong className="text-gray-800">New Covenant Life</strong> – Teaching and living the New Covenant through the Holy Spirit.</li>
            <li><strong className="text-gray-800">Character Before Ministry</strong> – Holiness, humility, and renewed mind first.</li>
            <li><strong className="text-gray-800">Faithfulness and Simplicity</strong> – Faithfulness to Christ over popularity or trends.</li>
          </ul>
        </div>

        {/* School Program - from handout 2.1 & 2.2 */}
        <div className="rounded-xl border border-gray-200 bg-neutral-900 p-8 md:p-12 text-white mb-16 shadow-lg">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
              School Program
            </p>
            <h3 className="heading-font mt-2 text-3xl font-bold text-white">
              Academic Structure
            </h3>
            <p className="mt-2 text-sm text-gray-300 max-w-2xl mx-auto">
              Church-based biblical training. Part-time evening classes; trimester per academic year.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4">
                <i className="fas fa-certificate text-white text-xl" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-2">Year 1</h4>
              <p className="text-sm text-gray-300">Certificate in Biblical Foundations</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4">
                <i className="fas fa-graduation-cap text-white text-xl" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-2">Year 2</h4>
              <p className="text-sm text-gray-300">Diploma in Biblical Studies</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4">
                <i className="fas fa-book-open text-white text-xl" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-2">Year 3</h4>
              <p className="text-sm text-gray-300">Advanced Diploma in Theology and Ministry</p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Classes: Monday, Wednesday, Friday • 7:00 PM – 9:30 PM • Zoom link opens 6:45 PM
          </p>
        </div>

        {/* Call to Action - TBTI buttons */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
            Get Started
          </p>
          <h3 className="heading-font mt-2 text-3xl font-bold text-gray-900">
            Ready to Begin Your Journey?
          </h3>
          <p className="mt-2 text-sm text-gray-600 mb-8 max-w-2xl mx-auto">
            Join TBTI today and take the next step in your ministry training and biblical
            education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tbti/login"
              className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800 text-center"
            >
              Sign In to TBTI Portal
            </Link>
            <Link
              to="/tbti/signup"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-purple-700 transition hover:bg-gray-50 text-center"
            >
              Create TBTI Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BibleSchool
