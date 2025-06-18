import { motion } from 'framer-motion';
import { FiAward, FiBriefcase, FiBook, FiTarget, FiTrendingUp, FiCheck, FiExternalLink } from 'react-icons/fi';
import { AnalysisResponse } from '../services/api';
import React from 'react';

const categorizeSkills = (skills: string[]) => { 
  const softSkillsKeywords = [
    'communication', 'leadership', 'teamwork', 'problem solving',
    'time management', 'adaptability', 'creativity', 'interpersonal',
    'organization', 'critical thinking', 'collaboration', 'flexibility',
    'management', 'presentation', 'analytical', 'planning',
    'negotiation', 'decision making', 'emotional intelligence'
  ];

  return {
    technical: skills.filter(skill => 
      !softSkillsKeywords.some(keyword => 
        skill.toLowerCase().includes(keyword.toLowerCase())
      )
    ),
    soft: skills.filter(skill => 
      softSkillsKeywords.some(keyword => 
        skill.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  };
};

interface AnalysisResultsProps {
  analysis: AnalysisResponse['data']['analysis'];
  resumeFile?: File;
}

export const AnalysisResults = ({ analysis, resumeFile }: AnalysisResultsProps) => {
  const [previewUrl, setPreviewUrl] = React.useState<string>('');

  React.useEffect(() => {
    if (resumeFile) {
      const url = URL.createObjectURL(resumeFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [resumeFile]);

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
        <div className="flex items-center space-x-4 mb-6">
          <FiAward className="h-8 w-8 text-navy-600" />
          <h3 className="text-xl font-semibold">ATS Score</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* ATS Score Circle */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  className="text-gray-200"
                  strokeWidth="12"
                  stroke="currentColor"
                  fill="transparent"
                  r="84"
                  cx="96"
                  cy="96"
                />
                <circle
                  className="text-navy-600"
                  strokeWidth="12"
                  strokeDasharray={528}
                  strokeDashoffset={528 - (528 * analysis.atsScore) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="84"
                  cx="96"
                  cy="96"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-5xl font-bold text-navy-700">{analysis.atsScore}%</span>
                <p className="text-base text-gray-500 mt-2">ATS Score</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                {analysis.atsScore >= 70 ? 'Excellent ATS Compatibility!' :
                 analysis.atsScore >= 50 ? 'Good ATS Score, some improvements possible.' :
                 'Consider improving your resume for better ATS compatibility.'}
              </p>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm bg-gray-50 rounded-lg overflow-hidden shadow-md">
              {previewUrl && (
                <div className="p-2 bg-white border-b flex justify-end">
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-navy-600 hover:text-navy-700 hover:bg-navy-50 rounded-md transition-colors duration-200"
                  >
                    <FiExternalLink className="w-4 h-4 mr-1" />
                    Open in New Tab
                  </a>
                </div>
              )}
              {previewUrl ? (
                resumeFile?.type === 'application/pdf' ? (
                  <iframe
                    src={previewUrl}
                    className="w-full h-[400px]"
                    title="Resume Preview"
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt="Resume Preview"
                    className="w-full h-[400px] object-contain"
                  />
                )
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">Resume preview not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <FiTarget className="h-8 w-8 text-navy-600" />
          <h3 className="text-xl font-semibold">Skills</h3>
        </div>
        {Array.isArray(analysis.skills) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Skills */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-700">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {categorizeSkills(analysis.skills as string[]).technical.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-navy-100 text-navy-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {/* Soft Skills */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-700">Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {categorizeSkills(analysis.skills as string[]).soft.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Experience */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <FiBriefcase className="h-8 w-8 text-navy-600" />
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
          <FiBook className="h-8 w-8 text-navy-600" />
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
          <FiTrendingUp className="h-8 w-8 text-navy-600" />
          <h3 className="text-xl font-semibold">Job Recommendations</h3>
        </div>
        <div className="space-y-4">
          {analysis.jobRecommendations.map((job, index) => (
            <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{job.title}</span>
                <span className="text-primary-500 font-semibold">{job.matchPercentage}% match</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    job.matchPercentage >= 70 
                      ? 'bg-green-500' 
                      : job.matchPercentage >= 50 
                      ? 'bg-yellow-500'
                      : 'bg-orange-500'
                  }`}
                  style={{ width: `${job.matchPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Improvement Suggestions */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <FiCheck className="h-8 w-8 text-navy-600" />
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