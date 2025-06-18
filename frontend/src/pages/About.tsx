import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[rgb(17,24,39)] mb-4">About AI Resume Analyzer</h1>
          <p className="text-xl text-[rgb(17,24,39)]">
            Empowering job seekers with AI-powered resume analysis and career guidance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-[rgb(17,24,39)] mb-4">Our Mission</h2>
            <p className="text-[rgb(17,24,39)]">
              We're on a mission to help job seekers optimize their resumes and prepare for interviews
              using the power of artificial intelligence. Our platform provides personalized insights
              and recommendations to help you land your dream job.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-[rgb(17,24,39)] mb-4">How It Works</h2>
            <p className="text-[rgb(17,24,39)]">
              Our AI-powered system analyzes your resume, identifies key skills and experiences,
              and provides tailored recommendations for job roles, interview preparation, and
              resume improvements.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-semibold text-[rgb(17,24,39)] mb-4">Ready to Get Started?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700"
          >
            Try It Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default About 