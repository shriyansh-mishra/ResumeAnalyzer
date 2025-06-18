// import React from 'react'

const Privacy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
      <h1 className="text-3xl font-bold text-[rgb(17,24,39)] mb-8">Privacy Policy</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[rgb(17,24,39)] mb-3">Information We Collect</h2>
            <p className="text-[rgb(17,24,39)]">
              We collect information that you provide directly to us, including your name, email address, and resume data.
              This information is used to provide and improve our services.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[rgb(17,24,39)] mb-3">How We Use Your Information</h2>
            <p className="text-[rgb(17,24,39)]">
              We use the information we collect to provide, maintain, and improve our services, to communicate with you,
              and to personalize your experience.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-[rgb(17,24,39)] mb-3">Data Security</h2>
            <p className="text-[rgb(17,24,39)]">
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Privacy 