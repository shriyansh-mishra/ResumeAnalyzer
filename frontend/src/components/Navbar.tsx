import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => (
  <nav className="bg-white/80 backdrop-blur-md shadow-sm w-full fixed top-0 left-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          AI Resume Analyzer
        </Link>
        <div className="flex items-center space-x-8">
          <Link to="/features" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">
            Features
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">
            About
          </Link>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Try Now
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  </nav>
)

export default Navbar 