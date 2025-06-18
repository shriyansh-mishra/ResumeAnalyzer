import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUpload, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { resumeService, AnalysisResponse } from '../services/api';

interface ResumeUploadProps {
  onAnalysisComplete: (analysis: AnalysisResponse, file: File) => void;
}

export const ResumeUpload = ({ onAnalysisComplete }: ResumeUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      toast.error('Please upload a PDF or DOCX file');
      return;
    }

    setUploadedFile(file);
    setIsUploading(true);

    try {
      const response = await resumeService.uploadAndAnalyzeResume(file);
      onAnalysisComplete(response, file);
      toast.success('Resume analyzed successfully!');
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast.error('Failed to analyze resume. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [onAnalysisComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        {...getRootProps({ refKey: 'ref' })}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center space-y-4">
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <p className="text-gray-600">Analyzing your resume...</p>
            </>
          ) : uploadedFile ? (
            <>
              <FiCheck className="h-12 w-12 text-green-500" />
              <p className="text-gray-600">{uploadedFile.name}</p>
              <p className="text-sm text-gray-500">Click or drag to upload a different file</p>
            </>
          ) : (
            <>
              <FiUpload className="h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Drag and drop your resume, or click to select
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Supported formats: PDF, DOCX
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
