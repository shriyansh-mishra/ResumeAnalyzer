import axios from 'axios';

// Make sure this points to the backend server port
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 30000, // 30 seconds timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.message);
    if (error.response) {
      console.error('Error data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export interface ResumeAnalysis {
  skills: string[];
  experience: Array<{
    company: string;
    role: string;
    duration: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  atsScore: number;
  improvements: string[];
  jobRecommendations: Array<{
    title: string;
    matchPercentage: number;
  }>;
}

export interface AnalysisResponse {
  success: boolean;
  data: {
    resumeId: string;
    analysisId: string;
    analysis: ResumeAnalysis;
  };
}

export const resumeService = {
  // Upload and analyze resume
  async uploadAndAnalyzeResume(file: File): Promise<AnalysisResponse> {
    const formData = new FormData();
    formData.append('resume', file);

    try {
      console.log('Uploading to:', `${API_BASE_URL}/resume/analyze`);
      const response = await api.post('/resume/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },

  // Get analysis results
  async getAnalysis(resumeId: string) {
    try {
      const response = await api.get(`/resume/analysis/${resumeId}`);
      return response.data;
    } catch (error) {
      console.error('Get analysis error:', error);
      throw error;
    }
  },
}; 