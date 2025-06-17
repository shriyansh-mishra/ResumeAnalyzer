import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 mt-12">
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <Link to="/" className="text-xl font-bold text-[#03A6A1]">AI Resume Analyzer</Link>
        <p className="text-gray-500 mt-2">Transform your career with AI-powered resume analysis, job matching, and interview preparation.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Features</h4>
          <ul className="space-y-1">
            <li><Link to="/features" className="text-gray-600 hover:text-[#03A6A1]">Job Matching</Link></li>
            <li><Link to="/features" className="text-gray-600 hover:text-[#03A6A1]">Resume Analysis</Link></li>
            <li><Link to="/features" className="text-gray-600 hover:text-[#03A6A1]">Interview Prep</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Company</h4>
          <ul className="space-y-1">
            <li><Link to="/about" className="text-gray-600 hover:text-[#03A6A1]">About</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-[#03A6A1]">Contact</Link></li>
            <li><Link to="/privacy" className="text-gray-600 hover:text-[#03A6A1]">Privacy</Link></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="text-center text-gray-400 text-sm py-4 border-t border-gray-100">&copy; {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.</div>
  </footer>
)

export default Footer 