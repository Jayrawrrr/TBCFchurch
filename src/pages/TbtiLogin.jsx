import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../firebase'
import TbtiAuthLayout from './TbtiAuthLayout'

const TbtiLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const ensureUserDoc = async (user) => {
    if (!db) return
    const ref = doc(db, 'users', user.uid)
    const snap = await getDoc(ref)
    if (!snap.exists()) {
      await setDoc(ref, {
        email: user.email || '',
        displayName: user.displayName || '',
        phone: '',
        isEnrolled: false,
        role: 'student',
      })
    }
  }

  const redirectAfterLogin = async (user) => {
    if (!db || !user) {
      navigate(location.state?.from?.pathname || '/tbti/dashboard', { replace: true })
      return
    }
    try {
      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)
      const data = snap.exists() ? snap.data() : null
      const role =
        data?.role === 'admin' || data?.role === 'superadmin'
          ? data.role
          : 'student'
      if (role === 'admin' || role === 'superadmin') {
        navigate('/admin', { replace: true })
      } else {
        navigate(location.state?.from?.pathname || '/tbti/dashboard', { replace: true })
      }
    } catch {
      navigate(location.state?.from?.pathname || '/tbti/dashboard', { replace: true })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!auth) {
      setError('Firebase is not configured. Add your config to .env.local (see .env.example).')
      return
    }
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setBusy(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      await redirectAfterLogin(cred.user)
    } catch (err) {
      setError(err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found'
        ? 'Invalid email or password.'
        : err.message || 'Sign in failed.')
    } finally {
      setBusy(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    if (!auth || !googleProvider) {
      setError('Firebase is not configured. Add your config to .env.local.')
      return
    }
    setBusy(true)
    try {
      const { user } = await signInWithPopup(auth, googleProvider)
      await ensureUserDoc(user)
      await redirectAfterLogin(user)
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') return
      setError(err.message || 'Google sign-in failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <TbtiAuthLayout
      title="Log in"
      subtitle="Sign in to access your courses, resources, and schedule."
    >
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or sign in with email</span>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-2 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600" />
            Remember me
          </label>
          <Link to="/tbti/forgot" className="text-sm font-semibold text-purple-700 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800 disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Log in'}
        </button>

        <p className="pt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/tbti/signup" className="font-semibold text-purple-700 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </TbtiAuthLayout>
  )
}

export default TbtiLogin

