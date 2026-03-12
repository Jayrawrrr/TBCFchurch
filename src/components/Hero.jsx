import React from 'react'

const Hero = () => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background image + dark overlay with violet specks */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          // Place your hero image in public/hero-tbcf.jpg or update this path
          backgroundImage: "url('/hero-tbcf.jpg')",
          filter: 'grayscale(100%)',
        }}
      >
        {/* Gradient overlay with violet specks effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(139, 92, 246, 0.4) 0%, transparent 40%),
              radial-gradient(circle at 85% 75%, rgba(124, 58, 237, 0.35) 0%, transparent 40%),
              radial-gradient(circle at 45% 85%, rgba(168, 85, 247, 0.3) 0%, transparent 40%),
              radial-gradient(circle at 65% 15%, rgba(147, 51, 234, 0.35) 0%, transparent 40%),
              radial-gradient(circle at 30% 60%, rgba(139, 92, 246, 0.25) 0%, transparent 35%),
              radial-gradient(circle at 70% 40%, rgba(124, 58, 237, 0.3) 0%, transparent 35%),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.55))
            `
          }}
        />
      </div>

      {/* Centered content - TBTI design language */}
      <div className="relative z-10 max-w-4xl px-4 text-center text-white">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          True Bread Christian Fellowship
        </div>
        <h1 className="heading-font mt-2 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Jesus, the True Bread of Life
        </h1>
        <p className="mt-4 max-w-md mx-auto text-sm text-white/80 sm:text-base">
          A Christ-centered family pursuing His presence, His Word, and His mission in our city
          and to the nations.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, '#services')}
            className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800"
          >
            Join Us This Sunday
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="rounded-xl border border-white/70 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Learn More About Us
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
