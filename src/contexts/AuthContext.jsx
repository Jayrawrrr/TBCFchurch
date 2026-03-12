import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [role, setRole] = useState('student')

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      if (!firebaseUser) {
        setIsEnrolled(false)
        setRole('student')
        setLoading(false)
        return
      }
      const uid = firebaseUser.uid
      if (!db) {
        setLoading(false)
        return
      }
      getDoc(doc(db, 'users', uid))
        .then((snap) => {
          if (!snap.exists()) {
            setIsEnrolled(false)
            setRole('student')
            return
          }
          const d = snap.data()
          const docRole =
            d.role === 'admin' || d.role === 'superadmin' ? d.role : 'student'
          setRole(docRole)
          const enrolledFromRole =
            docRole === 'admin' || docRole === 'superadmin'
          setIsEnrolled(enrolledFromRole || !!d.isEnrolled)
        })
        .catch(() => {
          setIsEnrolled(false)
          setRole('student')
        })
        .finally(() => setLoading(false))
    })
    return () => unsubscribe()
  }, [])

  const setEnrolled = async (value) => {
    if (!user || !db) return
    try {
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, { isEnrolled: !!value })
      setIsEnrolled(!!value)
    } catch (err) {
      console.error('Failed to update enrollment', err)
    }
  }

  const signOut = () => {
    if (auth) firebaseSignOut(auth)
  }

  const value = {
    user,
    loading,
    isEnrolled,
    role,
    setEnrolled,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
