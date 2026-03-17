import React from 'react'
import { Link } from 'react-router-dom'
import tbtiLogo from '../image/tbti.png'

const TbtiAuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left brand panel (hidden on small screens) */}
        <div className="relative hidden lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              // Optional: put an image at public/tbti-auth.jpg
              backgroundImage: "url('/tbti-auth.jpg')",
            }}
          />
          {/* Gradient overlay – TBTI maroon & antique gold */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(69, 21, 21, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(184, 149, 88, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(69, 21, 21, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 60% 20%, rgba(184, 149, 88, 0.2) 0%, transparent 50%),
                linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6))
              `
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
            <div>
              <h1 className="heading-font mt-6 text-4xl font-bold leading-tight">
                True Bread Training Institute
              </h1>
              <p className="mt-4 max-w-md text-white/80">
                Learn the Word. Live the Word. Serve with humility.
              </p>
            </div>

            <div className="text-sm text-white/60">
              <p>True Bread Christian Fellowship</p>
            </div>
          </div>
        </div>

        {/* Right auth panel */}
        <div className="relative flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <i className="fas fa-arrow-left" />
                Back to church site
              </Link>

              <div className="mt-6 flex items-center gap-3">
                <img
                  src={tbtiLogo}
                  alt="True Bread Training Institute logo"
                  className="h-10 w-10 rounded-full object-contain"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
                    TBTI Portal
                  </p>
                  <h2 className="heading-font mt-1 text-3xl font-bold text-[#2B2B2B]">
                    {title}
                  </h2>
                </div>
              </div>
              {subtitle ? (
                <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
              ) : null}
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TbtiAuthLayout

