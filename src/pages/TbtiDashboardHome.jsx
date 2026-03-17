import React from 'react'
import { Link } from 'react-router-dom'

const TbtiDashboardHome = () => {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
        Welcome
      </p>
      <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">
        TBTI Student Portal
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Use the sidebar to open the student handbook: What is TBTI, School Program,
        Registration and Admission, and School Discipline. You can also manage your
        profile from the sidebar.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          to="/tbti/dashboard/what-is-tbti"
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white">
            <i className="fas fa-info-circle text-xl" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-gray-900">What is TBTI</h3>
          <p className="mt-1 text-sm text-gray-600">
            About, vision, mission, core values, and statement of faith.
          </p>
        </Link>
        <Link
          to="/tbti/dashboard/school-program"
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white">
            <i className="fas fa-graduation-cap text-xl" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-gray-900">School Program</h3>
          <p className="mt-1 text-sm text-gray-600">
            Academic structure, calendar, graduation, and curriculum.
          </p>
        </Link>
        <Link
          to="/tbti/dashboard/admission"
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white">
            <i className="fas fa-file-alt text-xl" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-gray-900">Registration and Admission</h3>
          <p className="mt-1 text-sm text-gray-600">
            Requirements, fees, enrollment, and financial assistance.
          </p>
        </Link>
        <Link
          to="/tbti/dashboard/discipline"
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white">
            <i className="fas fa-book text-xl" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-gray-900">School Discipline</h3>
          <p className="mt-1 text-sm text-gray-600">
            Attendance, conduct, grading, and policies.
          </p>
        </Link>
      </div>
    </div>
  )
}

export default TbtiDashboardHome
