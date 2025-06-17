import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { ResumeUpload } from '../components/ResumeUpload'
import { AnalysisResults } from '../components/AnalysisResults'
import { AnalysisResponse } from '../services/api'

const Home = () => {
  const [analysis, setAnalysis] = useState<AnalysisResponse['data'] | null>(null)

  const handleAnalysisComplete = (response: AnalysisResponse) => {
    setAnalysis(response.data)
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 animate-gradient-xy">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 text-white" data-aos="fade-up">
              Transform Your Resume with AI
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Get personalized job recommendations, interview questions, and resume improvements powered by advanced AI technology
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Upload Your Resume
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Upload Your Resume
            </h2>
            <p className="text-lg text-gray-600">
              Get instant feedback and recommendations to improve your resume
            </p>
          </div>
          <ResumeUpload onAnalysisComplete={handleAnalysisComplete} />
        </div>
      </section>

      {/* Analysis Results Section */}
      {analysis && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Your Resume Analysis
              </h2>
              <p className="text-lg text-gray-600">
                Here's what our AI found in your resume
              </p>
            </div>
            <AnalysisResults analysis={analysis.analysis} />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold text-center mb-16 text-gray-900" data-aos="fade-up">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-5xl mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">{feature.icon}</div>
                <h3 className="text-2xl font-display font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 mb-6 text-lg">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="text-primary-500 mr-3">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold text-center mb-16 text-gray-900" data-aos="fade-up">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {index + 1}
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 pt-12">
                  <div className="text-5xl mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">{step.icon}</div>
                  <h3 className="text-2xl font-display font-semibold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600 animate-gradient-x">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-bold mb-8 text-white" data-aos="fade-up">Ready to Transform Your Career?</h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Join thousands of professionals who have already improved their resumes and landed their dream jobs
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Get Started Now
          </motion.button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2" data-aos="fade-up">
              <h3 className="text-2xl font-display font-bold mb-6">AI Resume Analyzer</h3>
              <p className="text-gray-400 mb-6 text-lg">
                Empowering job seekers with AI-powered resume analysis and career guidance.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-display font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors text-lg">Features</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-lg">About</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-lg">Contact</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-lg">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-display font-semibold mb-6">Contact Me</h3>
              <ul className="space-y-4">
                <li className="text-gray-400 text-lg">Email: mishrashriyansh@outlook.com</li>
                <li className="text-gray-400 text-lg">Phone: +91 7303655093</li>
                <li className="text-gray-400 text-lg">Address: Greater Noida, Uttar Pradesh</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400" data-aos="fade-up">
            <p className="text-lg">&copy; {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.</p>
          </div>
        </div>
      </footer>
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

const steps = [
  {
    icon: "📤",
    title: "Upload Resume",
    description: "Simply upload your resume in PDF or DOCX format"
  },
  {
    icon: "🤖",
    title: "AI Analysis",
    description: "Our AI analyzes your skills, experience, and qualifications"
  },
  {
    icon: "✨",
    title: "Get Results",
    description: "Receive personalized recommendations and improvements"
  }
]

export default Home 