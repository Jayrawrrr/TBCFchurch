import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import TbtiProtectedRoute from './components/TbtiProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import HomePage from './pages/HomePage'
import TbtiLogin from './pages/TbtiLogin'
import TbtiSignup from './pages/TbtiSignup'
import TbtiForgot from './pages/TbtiForgot'
import TbtiDashboardLayout from './pages/TbtiDashboardLayout'
import TbtiDashboardHome from './pages/TbtiDashboardHome'
import TbtiWhatIsTbti from './pages/TbtiWhatIsTbti'
import TbtiSchoolProgram from './pages/TbtiSchoolProgram'
import TbtiAdmission from './pages/TbtiAdmission'
import TbtiDiscipline from './pages/TbtiDiscipline'
import TbtiProfile from './pages/TbtiProfile'
import TbtiLessons from './pages/TbtiLessons'
import TbtiAssignments from './pages/TbtiAssignments'
import TbtiDevotion from './pages/TbtiDevotion'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminLessons from './pages/admin/AdminLessons'
import AdminAssignments from './pages/admin/AdminAssignments'
import AdminSiteServices from './pages/admin/AdminSiteServices'
import AdminSiteEvents from './pages/admin/AdminSiteEvents'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tbti/login" element={<TbtiLogin />} />
      <Route path="/tbti/signup" element={<TbtiSignup />} />
      <Route path="/tbti/forgot" element={<TbtiForgot />} />
      <Route path="/tbti/dashboard" element={<TbtiProtectedRoute><TbtiDashboardLayout /></TbtiProtectedRoute>}>
        <Route index element={<TbtiDashboardHome />} />
        <Route path="what-is-tbti" element={<TbtiWhatIsTbti />} />
        <Route path="school-program" element={<TbtiSchoolProgram />} />
        <Route path="admission" element={<TbtiAdmission />} />
        <Route path="discipline" element={<TbtiDiscipline />} />
        <Route path="lessons" element={<TbtiLessons />} />
        <Route path="assignments" element={<TbtiAssignments />} />
        <Route path="devotion" element={<TbtiDevotion />} />
        <Route path="profile" element={<TbtiProfile />} />
      </Route>
      <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="lessons" element={<AdminLessons />} />
        <Route path="assignments" element={<AdminAssignments />} />
        <Route path="site-services" element={<AdminSiteServices />} />
        <Route path="site-events" element={<AdminSiteEvents />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
