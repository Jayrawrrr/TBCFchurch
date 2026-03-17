import React from 'react'

const TbtiAdmission = () => {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#451515]">
          Section 3
        </p>
        <h1 className="heading-font mt-2 text-3xl font-bold text-gray-900">
          Registration and Admission
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Admission requirements, fees, enrollment procedures, and financial assistance.
        </p>
      </div>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="heading-font text-xl font-bold text-gray-900">3.1 Admission Requirements</h2>
        <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>Completion of required orientation or prerequisite seminar (as announced).</li>
          <li>Completed enrollment form.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="heading-font text-xl font-bold text-gray-900">3.2 Enrollment Procedures</h2>
        <ol className="mt-4 list-decimal list-inside space-y-2 text-sm text-gray-600">
          <li>Scan the official registration QR Code.</li>
          <li>Complete the Google Form registration.</li>
          <li>Pay the registration fee and submit proof of payment to TBTI Messenger.</li>
          <li>TBTI Admin will send an email confirmation of your enrollment.</li>
        </ol>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="heading-font text-xl font-bold text-gray-900">3.3 Fees and Financial Policies</h2>

        <h3 className="mt-4 text-sm font-semibold text-gray-900">3.3.1 Purpose of Fees</h3>
        <p className="mt-1 text-sm text-gray-600">
          Fees support the administration, facilities, materials, and operational costs of the training program. Fees do not constitute payment for the Word of God.
        </p>

        <h3 className="mt-4 text-sm font-semibold text-gray-900">3.3.2 Types of Fees</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>Registration Fee (one-time per academic year)</li>
          <li>Training Fee (per semester)</li>
          <li>Materials Fee (as applicable)</li>
        </ul>

        <h3 className="mt-4 text-sm font-semibold text-gray-900">3.3.3 Payment Methods</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>Official training center bank account for payments</li>
          <li>Approved digital payment channels</li>
          <li>Cash payments with acknowledgement receipt</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600">
          Note: After successful payment, kindly email the official proof of payment to tbti.program@gmail.com for verification.
        </p>

        <h3 className="mt-4 text-sm font-semibold text-gray-900">3.3.4 Refund Policy</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>Registration fees are non-refundable.</li>
          <li>Training fees may be partially refundable prior to semester start after staff evaluation.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="heading-font text-xl font-bold text-gray-900">3.4 Scholarships and Financial Assistance</h2>
        <p className="mt-3 text-sm text-gray-600">
          TBTI offers limited financial assistance to qualified students based on need, availability of funds, and commitment to complete the program. Applications are reviewed by the administration.
        </p>
      </section>
    </div>
  )
}

export default TbtiAdmission
