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
               <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AA15]">
                Who We Are 
              </p>
              <h3 className="heading-font mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              A New Covenant Church 
              </h3>
              <p className="mt-2 text-sm text-gray-600 mb-8 leading-relaxed">
              We believe that the members of the New Covenant church are those who have been accepted by God through the gift of His Spirit. We are the representation of Jesus Christ—His body—called to continue the life and work He commissioned us to do. We are deeply connected to one another through the unity wrought by the Holy Spirit and the knowledge of His Word. Together, we are predestined to grow into Christlikeness by understanding and living out the commands of Jesus, breaking bread, worshiping, praying, and serving God and one another through the Holy Spirit’s gifts in each individual. (Acts 2:1-4, 38-47; 15:7-9; Eph. 1:13-14; 1 Cor. 12:27; Eph. 4:6-15) 
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AA15]">
                Our Approach 
              </p>
              <p className="mt-2 text-sm text-gray-600 mb-8 leading-relaxed">
              Our mission is to glorify God by proclaiming the Gospel of Jesus Christ, making disciples and molding them in the image of Christ, equipping believers for ministry, and serving our community with the love and truth of Christ. 
              </p>
             
            </div>

            <div className="space-y-6">
              <div
                ref={(el) => cardsRef.current[0] = el}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Pursuing Christlikeness</h4>
                    <p className="text-sm text-gray-600">
                    We believe that everyone who is truly born again is a new creation in Christ. Through the power of the Holy Spirit, the regenerated believer is empowered to grow in the image and likeness of Jesus. We imitate His life by knowing and living out His commands, embracing a new life separated from worldly and sinful practices, pleasures, and compromise. 
                    </p>
                  </div>
                </div>
              </div>
              <div
                ref={(el) => cardsRef.current[1] = el}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Learning the Bible</h4>
                    <p className="text-sm text-gray-600">
                    We prioritize the deep knowledge and understanding of God's Word. Scripture is the foundation of our unity and our ultimate guide for knowing how to faithfully live out the commands of Jesus Christ every single day. 
                    </p>
                  </div>
                </div>
              </div>
              <div
                ref={(el) => cardsRef.current[2] = el}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Living the Commission</h4>
                    <p className="text-sm text-gray-600">
                    As the earthly representation and substitute of Jesus Christ, we are dedicated to continuing the work He commissioned us to do. We are committed to sharing the truth of the New Covenant and inviting others to experience new life in Him. 
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
