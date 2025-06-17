import React from 'react'

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600 mb-4">
          Have questions or feedback? We'd love to hear from you. Please reach out to us using the information below.
        </p>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Email</h2>
            <p className="text-gray-600">support@airesumeanalyzer.com</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Office Hours</h2>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
