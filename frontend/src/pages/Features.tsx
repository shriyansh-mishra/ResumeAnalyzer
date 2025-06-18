// import React from 'react'
import { motion } from 'framer-motion'

const Features = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[rgb(17,24,39)] mb-4">Features</h1>
          <p className="text-xl text-[rgb(17,24,39)]">
            Discover how our AI-powered platform can help you advance your career
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="text-[rgb(17,24,39)] text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-2xl font-semibold text-[rgb(17,24,39)] mb-4">{feature.title}</h2>
              <p className="text-[rgb(17,24,39)] mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-[rgb(17,24,39)]">
                    <span className="text-[rgb(17,24,39)] mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    icon: "📄",
    title: "Resume Analysis",
    description: "Get detailed insights about your resume's strengths and areas for improvement.",
    benefits: [
      "Skill extraction and matching",
      "Experience level assessment",
      "Format and structure analysis",
      "ATS compatibility check"
    ]
  },
  {
    icon: "💼",
    title: "Job Recommendations",
    description: "Discover job roles that match your skills and experience.",
    benefits: [
      "Personalized job matches",
      "Skill gap analysis",
      "Career path suggestions",
      "Industry trends insights"
    ]
  },
  {
    icon: "🎯",
    title: "Interview Preparation",
    description: "Get personalized interview questions and preparation tips.",
    benefits: [
      "Role-specific questions",
      "Sample answers",
      "Behavioral questions",
      "Technical assessment"
    ]
  },
  {
    icon: "📈",
    title: "Resume Improvement",
    description: "Get actionable suggestions to enhance your resume.",
    benefits: [
      "Keyword optimization",
      "Formatting suggestions",
      "Content enhancement",
      "Professional templates"
    ]
  }
]

export default Features 