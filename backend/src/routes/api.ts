import { Router } from 'express';
import { ResumeController } from '../controllers/resumeController';
import multer from 'multer';

const router = Router();
const resumeController = new ResumeController();

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

// Resume routes
router.post('/resume/analyze', upload.single('resume'), resumeController.uploadAndAnalyze);
router.get('/resume/analysis/:resumeId', resumeController.getAnalysis);

export default router; 