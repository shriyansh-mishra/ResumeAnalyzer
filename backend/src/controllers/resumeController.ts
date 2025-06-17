import { Request, Response } from 'express';
import { ResumeService } from '../services/resumeService';
import multer from 'multer';
import { Readable } from 'stream';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

const resumeService = new ResumeService();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'));
    }
  },
});

// Helper function to clean extracted text
function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newline
    .replace(/[^\S\n]+/g, ' ') // Replace multiple spaces with single space
    .trim();
}

export class ResumeController {
  // Upload and analyze resume
  async uploadAndAnalyze(req: Request, res: Response) {
    try {
      console.log('Received file upload request');
      
      if (!req.file) {
        console.log('No file in request');
        return res.status(400).json({ error: 'No file uploaded' });
      }

      console.log('File received:', {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });

      // Extract text from file
      let text = '';
      try {
        if (req.file.mimetype === 'application/pdf') {
          console.log('Processing PDF file');
          const data = await pdfParse(req.file.buffer);
          text = data.text;
          console.log('PDF text extracted, length:', text.length);
          console.log('First 100 characters:', text.substring(0, 100));
        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          console.log('Processing DOCX file');
          const result = await mammoth.extractRawText({ buffer: req.file.buffer });
          text = result.value;
          console.log('DOCX text extracted, length:', text.length);
          console.log('First 100 characters:', text.substring(0, 100));
        } else {
          throw new Error(`Unsupported file type: ${req.file.mimetype}`);
        }
      } catch (error) {
        console.error('Error extracting text:', error);
        if (error instanceof Error) {
          console.error('Error details:', {
            message: error.message,
            stack: error.stack
          });
        }
        return res.status(400).json({
          success: false,
          error: 'Error processing file',
          details: error instanceof Error ? error.message : 'Failed to extract text from file'
        });
      }

      // Clean the extracted text
      text = cleanText(text);
      console.log('Text cleaned, new length:', text.length);
      console.log('First 100 characters after cleaning:', text.substring(0, 100));

      if (!text || text.trim().length === 0) {
        console.error('No text content found after extraction and cleaning');
        return res.status(400).json({
          success: false,
          error: 'No text content found in file'
        });
      }

      // Process file
      try {
        const fileName = await resumeService.uploadResume(req.file);
        console.log('File processed:', fileName);

        // Analyze resume
        console.log('Starting resume analysis');
        const analysis = await resumeService.analyzeResume(text);
        console.log('Analysis complete:', JSON.stringify(analysis, null, 2));

        // Save analysis
        const analysisId = await resumeService.saveAnalysis(fileName, analysis);
        console.log('Analysis saved:', analysisId);

        res.json({
          success: true,
          data: {
            resumeId: fileName,
            analysisId,
            analysis,
          },
        });
      } catch (error) {
        console.error('Error in analysis process:', error);
        if (error instanceof Error) {
          console.error('Error details:', {
            message: error.message,
            stack: error.stack
          });
        }
        throw error; // Re-throw to be caught by outer try-catch
      }
    } catch (error) {
      console.error('Error processing resume:', error);
      if (error instanceof Error) {
        console.error('Full error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
      res.status(500).json({
        success: false,
        error: 'Error processing resume',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get analysis results
  async getAnalysis(req: Request, res: Response) {
    try {
      const { resumeId } = req.params;
      const analysis = await resumeService.getAnalysis(resumeId);

      if (!analysis) {
        return res.status(404).json({
          success: false,
          error: 'Analysis not found',
        });
      }

      res.json({
        success: true,
        data: analysis,
      });
    } catch (error) {
      console.error('Error fetching analysis:', error);
      res.status(500).json({
        success: false,
        error: 'Error fetching analysis',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
} 