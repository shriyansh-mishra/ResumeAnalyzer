import { Link } from 'react-router-dom'

const Hero = () => (
  <section className="bg-white pt-32 pb-16 text-center">
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Transform Your Career with <span className="text-blue-600">AI-Powered Resume Analysis</span></h1>
      <p className="text-lg text-gray-600 mb-8">Get personalized job recommendations, interview preparation, and resume improvements powered by advanced AI technology.</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/analyze" className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition">Get Started</Link>
        <Link to="/features" className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-md font-semibold hover:bg-blue-50 transition">Learn More</Link>
      </div>
    </div>
  </section>
)

export default Hero 