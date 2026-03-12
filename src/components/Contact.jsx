import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.')
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.')
      return
    }
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      message: ''
    })
  }

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
    <section id="contact" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
            Contact
          </p>
          <h2 className="heading-font mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="mb-1 block text-sm font-medium text-gray-700">Address</h4>
                  <p className="text-sm text-gray-600">
                    True Bread Christian Fellowship<br />
                    123 Faith Street, Grace City, GC 12345
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-phone text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="mb-1 block text-sm font-medium text-gray-700">Phone</h4>
                  <p className="text-sm text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-envelope text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="mb-1 block text-sm font-medium text-gray-700">Email</h4>
                  <p className="text-sm text-gray-600">info@truebreadcf.org</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="mb-4 text-sm font-medium text-gray-700">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white transition hover:bg-neutral-800">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white transition hover:bg-neutral-800">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white transition hover:bg-neutral-800">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white transition hover:bg-neutral-800">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-md">
            <h3 className="heading-font text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600" 
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600" 
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  rows="5" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600" 
                  placeholder="Your message"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
