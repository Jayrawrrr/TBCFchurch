import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TbtiAuthLayout from './TbtiAuthLayout'

const TbtiForgot = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      alert('Please enter your email.')
      return
    }
    alert('Password reset link sent (demo).')
  }

  return (
    <TbtiAuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we’ll send a reset link."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800"
        >
          Send reset link
        </button>

        <p className="pt-2 text-center text-sm text-gray-600">
          <Link to="/tbti/login" className="font-semibold text-purple-700 hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </TbtiAuthLayout>
  )
}

export default TbtiForgot

