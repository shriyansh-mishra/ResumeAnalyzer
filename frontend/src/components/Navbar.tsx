import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section')
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="bg-white/20 backdrop-blur-sm border-b border-white/20 shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold text-[#03A6A1]">
            AI Resume Analyzer
          </Link>
          <div className="flex items-center space-x-8">
            <Link to="/features" className="text-gray-800 hover:text-[#03A6A1] font-medium transition-colors duration-300">
              Features
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-[#03A6A1] font-medium transition-colors duration-300">
              About
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={scrollToUpload}
                className="px-6 py-2.5 bg-[#03A6A1]/90 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-[#03A6A1] hover:shadow-lg transition-all duration-300 border border-white/20"
              >
                Try Now
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 