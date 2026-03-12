import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import BibleSchool from '../components/BibleSchool'
import Events from '../components/Events'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className="smooth-scroll min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <BibleSchool />
      <Events />
      <Contact />
      <Footer />
    </div>
  )
}

export default HomePage

