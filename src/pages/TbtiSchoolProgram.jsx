import React from 'react'

const TbtiSchoolProgram = () => {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
          Section 2
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">
          School Program
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Institutional overview, academic structure, calendar, graduation, and curriculum.
        </p>
      </div>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="heading-font text-xl font-bold text-gray-900">2.1 Institutional Overview</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li><strong className="text-gray-700">Name of Institution:</strong> True Bread Training Institute (TBTI)</li>
          <li><strong className="text-gray-700">Nature:</strong> Church-based Ministry and Biblical Training School</li>
          <li><strong className="text-gray-700">Program Type:</strong> Certificate, Diploma, and Advanced Diploma Programs</li>
          <li><strong className="text-gray-700">Academic Duration:</strong> Three (3) Academic Years</li>
          <li><strong className="text-gray-700">Academic Calendar:</strong> Trimester per Academic Year</li>
          <li><strong className="text-gray-700">Mode of Study:</strong> Part-Time (Evening Classes)</li>
        </ul>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="heading-font text-xl font-bold text-gray-900">2.2 Academic Program Structure</h2>
        <p className="mt-3 text-sm text-gray-600">
          TBTI follows a progressive academic ladder allowing clear completion points:
        </p>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li><strong className="text-gray-900">Year 1:</strong> Certificate in Biblical Foundations</li>
          <li><strong className="text-gray-900">Year 2:</strong> Diploma in Biblical Studies</li>
          <li><strong className="text-gray-900">Year 3:</strong> Advanced Diploma in Theology and Ministry</li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          Each level is awarded upon successful completion of all required subjects, units, and academic requirements.
        </p>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="heading-font text-xl font-bold text-gray-900">2.3 Academic Calendar and Units</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>Trimester per academic year</li>
          <li>Each subject carries assigned academic units</li>
          <li>One (1) unit equals fifteen (12) instructional hours</li>
          <li>Students must complete all required units for their academic level to be eligible for graduation.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="heading-font text-xl font-bold text-gray-900">2.4 Graduation and Credentials</h2>
        <p className="mt-3 text-sm text-gray-600">
          Graduation is granted upon:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>Completion of all required subjects and units.</li>
          <li>Fulfillment of attendance and academic requirements.</li>
          <li>Clearance of financial obligations.</li>
          <li>Approval by the Academic Committee.</li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          Certificates and diplomas are officially awarded during designated graduation ceremonies.
        </p>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="heading-font text-xl font-bold text-gray-900">2.5 Curriculum Overview</h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#451515]">Year 1 – Certificate in Biblical Foundations</h3>
            <p className="mt-1 text-sm text-gray-600">Focus: Foundational Christian doctrine and Scripture</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li><strong>Semester 1:</strong> Bibliology, Soteriology, Identity in Christ, Book of Genesis, Bible Survey</li>
              <li><strong>Semester 2:</strong> Christian Growth, Covenants, The Grace of God, New Covenant Pieties, Books of Exodus to Deuteronomy</li>
              <li><strong>Semester 3:</strong> Book of Acts, Hermeneutics I, II, III</li>
            </ul>
            <p className="mt-2 text-sm font-medium text-gray-700">Credential Awarded: Certificate in Biblical Foundations</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#451515]">Year 2 – Diploma in Biblical Studies</h3>
            <p className="mt-1 text-sm text-gray-600">Focus: Christology, Ministry, Theology, and Church</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li><strong>Semester 1:</strong> Christology I, Book of Hebrews, Homiletics I & II, The Great Commission</li>
              <li><strong>Semester 2:</strong> Christology II, Theology I & II, Book of Galatians, Pneumatology I</li>
              <li><strong>Semester 3:</strong> Christology III, Pneumatology II, Satanology, Books of 1 & 2 Timothy, Ecclesiology I</li>
            </ul>
            <p className="mt-2 text-sm font-medium text-gray-700">Credential Awarded: Diploma in Biblical Studies</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#451515]">Year 3 – Advanced Diploma in Theology and Ministry</h3>
            <p className="mt-1 text-sm text-gray-600">Focus: Theology, Interpretation, Leadership, and Eschatology</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li><strong>Semester 1:</strong> Ecclesiology II, Angelology, Book of Romans, Book of 1 Peter, The Kingdom of God I</li>
              <li><strong>Semester 2:</strong> The Kingdom of God II, Biblical Anthropology, Book of Ephesians, Books of 1 & 2 Thessalonians, The Laws of Jesus Christ I</li>
              <li><strong>Semester 3:</strong> The Laws of Jesus Christ II & III, Eschatology (Revelation), Book of 1 John, The Security of the Believers</li>
            </ul>
            <p className="mt-2 text-sm font-medium text-gray-700">Credential Awarded: Advanced Diploma in Theology and Ministry</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TbtiSchoolProgram
