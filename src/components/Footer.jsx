import React from 'react'

const Footer = () => {
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
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              <span className="heading-font text-lg font-bold">
                True Bread Christian Fellowship
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Lifting up Jesus, the true Bread of life, to our city and the nations.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-purple-200 hover:text-white hover:underline transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-purple-200 hover:text-white hover:underline transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="text-purple-200 hover:text-white hover:underline transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#bible-school" onClick={(e) => handleNavClick(e, '#bible-school')} className="text-purple-200 hover:text-white hover:underline transition-colors">
                  Bible School
                </a>
              </li>
              <li>
                <a href="#events" onClick={(e) => handleNavClick(e, '#events')} className="text-purple-200 hover:text-white hover:underline transition-colors">
                  Events
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400 mb-4">Ministries</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="text-purple-200 hover:text-white hover:underline transition-colors">Youth</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white hover:underline transition-colors">Children</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white hover:underline transition-colors">Women</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white hover:underline transition-colors">Men</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="text-purple-200 hover:text-white hover:underline transition-colors">Sermons</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white hover:underline transition-colors">Bible Study</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white hover:underline transition-colors">Prayer Requests</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white hover:underline transition-colors">Give Online</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 True Bread Christian Fellowship. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
