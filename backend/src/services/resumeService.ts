  import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
  import { config } from '../config/config';
  import { v4 as uuidv4 } from 'uuid';

  // Initialize Gemini with error handling
  let genAI: GoogleGenerativeAI;
  let model: GenerativeModel;

  try {
    console.log('Initializing Gemini with API key:', config.gemini.apiKey.substring(0, 5) + '...');
    genAI = new GoogleGenerativeAI(config.gemini.apiKey);
    
    // Initialize the model with configuration
    model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });
    
    console.log('Gemini client and model initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Gemini client:', error);
    throw new Error('Gemini initialization failed');
  }

  // In-memory storage for analysis results
  const analysisStore = new Map<string, any>();

  // resumeService.ts
  export class ResumeService {
    // Process resume file
    async uploadResume(file: Express.Multer.File): Promise<string> {
      try {
        const fileName = `${uuidv4()}-${file.originalname}`;
        console.log('File processed successfully:', fileName);
        return fileName;
      } catch (error) {
        console.error('Error processing file:', error);
        throw new Error('Failed to process file');
      }
    }

    // Analyze resume content using Gemini
    async analyzeResume(text: string) {
      try {
        console.log('Starting resume analysis with Gemini');
        console.log('Text length:', text.length);

        if (!text || text.trim().length === 0) {
          throw new Error('Empty text provided for analysis');
        }

        const prompt = `You are a professional resume analyzer. Analyze the following resume text and provide a detailed analysis in JSON format. The resume text is:

  ${text}

  Please analyze the resume and provide the following information in this exact JSON format:
  {
    "skills": ["skill1", "skill2", ...],  // List all technical and soft skills mentioned
    "experience": [
      {
        "company": "company name",
        "role": "job title",
        "duration": "time period"
      }
    ],
    "education": [
      {
        "institution": "school/university name",
        "degree": "degree type",
        "year": "graduation year"
      }
    ],
    "atsScore": number,  // Score between 0-100 based on:
      // - Keyword optimization (20 points)
      // - Format and structure (20 points)
      // - Content clarity (20 points)
      // - Professional presentation (20 points)
      // - Industry standards (20 points)
    "improvements": [
      "suggestion1",
      "suggestion2"
    ],
    "jobRecommendations": [
      {
        "title": "job title",
        "matchPercentage": number  // Percentage between 0-100
      }
    ]
  }

  Important:
  1. Return ONLY the JSON object, no other text
  2. Ensure all arrays are properly formatted
  3. Calculate ATS score based on the criteria above
  4. Provide specific, actionable improvement suggestions
  5. Recommend jobs based on the candidate's skills and experience`;

        console.log('Sending request to Gemini');
        
        try {
          const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
          });
          console.log('Content generated');
          
          const response = await result.response;
          console.log('Response received');
          
          const responseContent = response.text();
          console.log('Response text extracted, length:', responseContent.length);
          
          if (!responseContent) {
            console.error('Empty response from Gemini');
            throw new Error('Empty response from Gemini');
          }

          console.log('Parsing Gemini response');
let analysis;
try {
  const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('Gemini response does not contain valid JSON block');
    console.error('Raw response:', responseContent);
    throw new Error('Failed to extract JSON from Gemini response');
  }

  analysis = JSON.parse(jsonMatch[0]);
  console.log('Response parsed successfully');
} catch (error) {
  console.error('Failed to parse Gemini response:', error);
  console.error('Raw response:', responseContent);
  throw new Error('Failed to parse Gemini response');
}

          
          // Validate the analysis structure
          if (!analysis.atsScore || typeof analysis.atsScore !== 'number') {
            console.log('Calculating ATS score');
            analysis.atsScore = this.calculateATSScore(analysis);
          }

          console.log('Analysis completed successfully');
          return analysis;
        } catch (error) {
          console.error('Error in Gemini API call:', error);
          if (error instanceof Error) {
            console.error('Gemini API error details:', {
              message: error.message,
              stack: error.stack,
              name: error.name
            });
          }
          throw new Error(`Gemini API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error in analyzeResume:', error);
        if (error instanceof Error) {
          console.error('Error details:', {
            message: error.message,
            stack: error.stack
          });
        }
        throw new Error(`Failed to analyze resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Calculate ATS score based on resume content
    private calculateATSScore(analysis: any): number {
      try {
        let score = 0;
        
        // Skills (30 points)
        if (analysis.skills && Array.isArray(analysis.skills)) {
          score += Math.min(analysis.skills.length * 2, 30);
        }

        // Experience (30 points)
        if (analysis.experience && Array.isArray(analysis.experience)) {
          score += Math.min(analysis.experience.length * 10, 30);
        }

        // Education (20 points)
        if (analysis.education && Array.isArray(analysis.education)) {
          score += Math.min(analysis.education.length * 10, 20);
        }

        // Improvements (20 points)
        if (analysis.improvements && Array.isArray(analysis.improvements)) {
          // Fewer improvements means better score
          score += Math.max(20 - (analysis.improvements.length * 2), 0);
        }

        return Math.min(Math.max(score, 0), 100);
      } catch (error) {
        console.error('Error calculating ATS score:', error);
        return 0;
      }
    }

    // Save analysis results in memory
    async saveAnalysis(resumeId: string, analysis: any) {
      try {
        const analysisData = {
          analysis,
          createdAt: new Date().toISOString(),
        };
        analysisStore.set(resumeId, analysisData);
        console.log('Analysis saved successfully:', resumeId);
        return resumeId;
      } catch (error) {
        console.error('Error saving analysis:', error);
        throw new Error('Failed to save analysis');
      }
    }

    // Get analysis results from memory
    async getAnalysis(resumeId: string) {
      try {
        const analysis = analysisStore.get(resumeId);
        if (!analysis) {
          console.log('Analysis not found:', resumeId);
          return null;
        }
        console.log('Analysis retrieved successfully:', resumeId);
        return analysis;
      } catch (error) {
        console.error('Error retrieving analysis:', error);
        throw new Error('Failed to retrieve analysis');
      }
    }
  }
