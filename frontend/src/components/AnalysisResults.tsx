import { motion } from 'framer-motion';
import { FiAward, FiBriefcase, FiBook, FiTarget, FiTrendingUp, FiCheck } from 'react-icons/fi';
import { AnalysisResponse } from '../services/api';

interface AnalysisResultsProps {
  analysis: AnalysisResponse['data']['analysis'];
}

export const AnalysisResults = ({ analysis }: AnalysisResultsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* ATS Score */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <FiAward className="h-8 w-8 text-primary-500" />
          <h3 className="text-xl font-semibold">ATS Score</h3>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg className="w-32 h-32">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
              />
              <circle
                className="text-primary-500"
                strokeWidth="8"
                strokeDasharray={352}
                strokeDashoffset={352 - (352 * analysis.atsScore) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
              />
            </svg>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
              {analysis.atsScore}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <FiTarget className="h-8 w-8 text-primary-500" />
          <h3 className="text-xl font-semibold">Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {analysis.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <FiBriefcase className="h-8 w-8 text-primary-500" />
          <h3 className="text-xl font-semibold">Experience</h3>
        </div>
        <div className="space-y-4">
          {analysis.experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-primary-500 pl-4">
              <h4 className="font-semibold">{exp.role}</h4>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.duration}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <FiBook className="h-8 w-8 text-primary-500" />
          <h3 className="text-xl font-semibold">Education</h3>
        </div>
        <div className="space-y-4">
          {analysis.education.map((edu, index) => (
            <div key={index} className="border-l-2 border-primary-500 pl-4">
              <h4 className="font-semibold">{edu.degree}</h4>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.year}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Job Recommendations */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <FiTrendingUp className="h-8 w-8 text-primary-500" />
          <h3 className="text-xl font-semibold">Job Recommendations</h3>
        </div>
        <div className="space-y-4">
          {analysis.jobRecommendations.map((job, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">{job.title}</span>
              <span className="text-primary-500 font-semibold">{job.matchPercentage}% match</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Improvement Suggestions */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <FiCheck className="h-8 w-8 text-primary-500" />
          <h3 className="text-xl font-semibold">Improvement Suggestions</h3>
        </div>
        <ul className="space-y-2">
          {analysis.improvements.map((suggestion, index) => (
            <li key={index} className="flex items-start space-x-2">
              <FiCheck className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{suggestion}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}; 