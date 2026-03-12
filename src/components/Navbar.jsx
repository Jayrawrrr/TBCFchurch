import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const target = document.querySelector(targetId)
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const linkBaseClasses = scrolled
    ? 'text-gray-800 hover:text-purple-600'
    : 'text-white hover:text-purple-200'

  return (
    <nav
      className={`fixed w-full z-50 backdrop-blur-sm transition-all ${
        scrolled ? 'bg-white/95 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20 relative">
          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm uppercase tracking-wide">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className={`${linkBaseClasses} transition-colors font-medium`}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className={`${linkBaseClasses} transition-colors font-medium`}
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
              className={`${linkBaseClasses} transition-colors font-medium`}
            >
              Services
            </a>
            <a
              href="#bible-school"
              onClick={(e) => handleNavClick(e, '#bible-school')}
              className={`${linkBaseClasses} transition-colors font-medium`}
            >
              Bible School
            </a>
            <a
              href="#events"
              onClick={(e) => handleNavClick(e, '#events')}
              className={`${linkBaseClasses} transition-colors font-medium`}
            >
              Events
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`${linkBaseClasses} transition-colors font-medium`}
            >
              Contact
            </a>
            <Link
              to="/tbti/login"
              className={`rounded-full px-5 py-2 text-sm font-semibold shadow-md transition ml-4 ${
                scrolled
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-white text-purple-700 hover:bg-purple-100'
              }`}
            >
              TBTI Login
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden absolute right-0 ${
              scrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-purple-200'
            }`}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t transition-all`}>
        <div className="px-4 py-4 space-y-4">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="block text-gray-700 hover:text-purple-600 transition-colors font-medium py-2">
            Home
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="block text-gray-700 hover:text-purple-600 transition-colors font-medium py-2">
            About
          </a>
          <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="block text-gray-700 hover:text-purple-600 transition-colors font-medium py-2">
            Services
          </a>
          <a href="#bible-school" onClick={(e) => handleNavClick(e, '#bible-school')} className="block text-gray-700 hover:text-purple-600 transition-colors font-medium py-2">
            Bible School
          </a>
          <a href="#events" onClick={(e) => handleNavClick(e, '#events')} className="block text-gray-700 hover:text-purple-600 transition-colors font-medium py-2">
            Events
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block text-gray-700 hover:text-purple-600 transition-colors font-medium py-2">
            Contact
          </a>
          <Link
            to="/tbti/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 block w-full rounded-lg bg-purple-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition hover:bg-purple-700"
          >
            Bible School Login / Sign up
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
