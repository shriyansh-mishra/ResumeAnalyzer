// import React from 'react'

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
      <h1 className="text-3xl font-bold text-[rgb(17,24,39)] mb-8">Contact Us</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-[rgb(17,24,39)] mb-4">
          Have questions or feedback? We'd love to hear from you. Please reach out to us using the information below.
        </p>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-[rgb(17,24,39)] mb-2">Email</h2>
            <p className="text-[rgb(17,24,39)]">mishrashriyansh@outlook.com</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(17,24,39)] mb-2">Connect With Me</h2>
            <p className="text-[rgb(17,24,39)]">
              <a 
                href="https://www.linkedin.com/in/shriyansh-mishra-281919225/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[rgb(17,24,39)] hover:text-gray-600 transition-colors"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
