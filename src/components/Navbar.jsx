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
    ? 'text-gray-800 hover:text-[#29226D]'
    : 'text-white hover:text-[#D4AA15]'

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
                  ? 'bg-[#D4AA15] text-[#29226D] hover:bg-[#b8920f]'
                  : 'bg-white text-[#29226D] hover:bg-[#F6F4E8]'
              }`}
            >
              TBTI Login
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden absolute right-0 ${
              scrolled ? 'text-gray-700 hover:text-[#29226D]' : 'text-white hover:text-[#D4AA15]'
            }`}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t transition-all`}>
        <div className="px-4 py-4 space-y-4">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="block text-gray-700 hover:text-[#29226D] transition-colors font-medium py-2">
            Home
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="block text-gray-700 hover:text-[#29226D] transition-colors font-medium py-2">
            About
          </a>
          <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="block text-gray-700 hover:text-[#29226D] transition-colors font-medium py-2">
            Services
          </a>
          <a href="#bible-school" onClick={(e) => handleNavClick(e, '#bible-school')} className="block text-gray-700 hover:text-[#29226D] transition-colors font-medium py-2">
            Bible School
          </a>
          <a href="#events" onClick={(e) => handleNavClick(e, '#events')} className="block text-gray-700 hover:text-[#29226D] transition-colors font-medium py-2">
            Events
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block text-gray-700 hover:text-[#29226D] transition-colors font-medium py-2">
            Contact
          </a>
          <Link
            to="/tbti/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 block w-full rounded-lg bg-[#D4AA15] px-4 py-2 text-center text-sm font-semibold text-[#29226D] shadow-md transition hover:bg-[#b8920f]"
          >
            TBTI LOGIN
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
