import { ChartBarIcon, DocumentTextIcon, QuestionMarkCircleIcon, SparklesIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Smart Job Matching',
    description: 'Get personalized job recommendations based on your skills, experience, and career goals.',
    icon: ChartBarIcon,
  },
  {
    name: 'Resume Analysis',
    description: 'Receive detailed feedback and suggestions to improve your resume and increase your chances of getting hired.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Interview Preparation',
    description: 'Practice with AI-generated interview questions tailored to your target roles and industry.',
    icon: QuestionMarkCircleIcon,
  },
  {
    name: 'AI-Powered Insights',
    description: 'Gain valuable insights about industry trends and required skills for your desired positions.',
    icon: SparklesIcon,
  },
]

const Features = () => (
  <section className="bg-white py-16">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <div key={feature.name} className="flex items-start gap-4 bg-gray-50 rounded-lg p-6 shadow-sm">
            <feature.icon className="h-10 w-10 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{feature.name}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Features 