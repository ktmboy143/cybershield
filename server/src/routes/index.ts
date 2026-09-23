import { Router } from 'express';
import { loginUser, registerUser, getCurrentUser } from '../controllers/authController.js';
import {
  getDashboard,
  getSecurityPosture,
  createSecurityReport,
  getReports,
  getIncidents,
  getIncidentById,
  addIncidentNote,
  getAnalytics,
  getLearning,
  submitQuizResult,
  getAdminUsers,
  getAdminSummary
} from '../controllers/productController.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import { analyzePhishingMessage, analyzeWebsite } from '../controllers/securityController.js';
import { getProfile, updateProfile, getSettings, updateSettings } from '../controllers/userController.js';
import { getLearningModules, getLearningProgress, updateLearningProgress } from '../controllers/learningController.js';

const router = Router();

router.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'CYBERSHIELD backend is running' });
});

router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);
router.get('/api/auth/me', authenticate, getCurrentUser);
router.get('/api/profile', authenticate, getProfile);
router.patch('/api/profile', authenticate, updateProfile);
router.get('/api/settings', authenticate, getSettings);
router.patch('/api/settings', authenticate, updateSettings);

router.get('/api/dashboard', authenticate, getDashboard);
router.get('/api/security/posture', authenticate, getSecurityPosture);
router.post('/api/security/phishing', authenticate, analyzePhishingMessage);
router.post('/api/security/website', authenticate, analyzeWebsite);
router.post('/api/security/reports', authenticate, createSecurityReport);
router.get('/api/reports', authenticate, getReports);
router.get('/api/incidents', authenticate, getIncidents);
router.get('/api/incidents/:id', authenticate, getIncidentById);
router.post('/api/incidents/:id/notes', authenticate, addIncidentNote);
router.get('/api/analytics', authenticate, getAnalytics);
router.get('/api/learning', authenticate, getLearningModules);
router.get('/api/learning/progress', authenticate, getLearningProgress);
router.patch('/api/learning/progress', authenticate, updateLearningProgress);
router.post('/api/quiz/results', authenticate, submitQuizResult);
router.get('/api/admin/users', authenticate, authorizeAdmin, getAdminUsers);
router.get('/api/admin/summary', authenticate, authorizeAdmin, getAdminSummary);

export default router;
