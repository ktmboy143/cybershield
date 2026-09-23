import type { Request, Response } from 'express';
import SecurityReport from '../models/SecurityReport.js';
import Incident from '../models/Incident.js';
import LearningModule from '../models/LearningModule.js';
import QuizResult from '../models/QuizResult.js';
import Recommendation from '../models/Recommendation.js';
import User from '../models/User.js';
import { getDashboardData } from '../services/dashboardService.js';
import { fallbackAnalytics, fallbackIncidents, fallbackLearning, fallbackPosture, fallbackReports, fallbackAdminUsers } from '../utils/demoData.js';

export async function getDashboard(req: Request, res: Response) {
  const data = await getDashboardData();
  return res.json(data);
}

export async function getSecurityPosture(_req: Request, res: Response) {
  const posture = await SecurityReport.find().limit(3).lean();
  if (!posture.length) {
    return res.json(fallbackPosture);
  }

  return res.json({
    score: 82,
    categories: [
      { name: 'Identity', score: 92, status: 'Healthy', note: 'Strong account hygiene and verification controls in place.' },
      { name: 'Passwords', score: 80, status: 'Good', note: 'Password quality is above average, but reuse risk still exists.' },
      { name: 'MFA', score: 88, status: 'Protected', note: 'Multi-factor protections are enabled and reviewed often.' },
      { name: 'Email Security', score: 71, status: 'Watch', note: 'Phishing simulation suggests email verification should be reinforced.' },
      { name: 'Web Security', score: 75, status: 'Moderate', note: 'HTTPS and header posture is generally solid with a few warnings.' },
      { name: 'Device Hygiene', score: 84, status: 'Healthy', note: 'Endpoint practices are well maintained with a few improvement opportunities.' }
    ]
  });
}

export async function createSecurityReport(req: Request, res: Response) {
  const { title, type, score, status, summary } = req.body ?? {};

  if (!title || !type || score === undefined || !summary) {
    return res.status(400).json({ message: 'Title, type, score, and summary are required.' });
  }

  const report = await SecurityReport.create({
    title,
    type,
    score,
    status: status || 'Complete',
    summary,
    generatedBy: (req as any).user?.id || 'unknown'
  });

  return res.status(201).json(report);
}

export async function getReports(_req: Request, res: Response) {
  const reports = await SecurityReport.find().sort({ createdAt: -1 }).lean();
  if (!reports.length) {
    return res.json(fallbackReports);
  }

  return res.json(reports.map((report) => ({
    _id: String(report._id),
    title: report.title,
    type: report.type,
    score: report.score,
    status: report.status,
    summary: report.summary
  })));
}

export async function getIncidents(_req: Request, res: Response) {
  const incidents = await Incident.find().sort({ createdAt: -1 }).lean();
  if (!incidents.length) {
    return res.json(fallbackIncidents);
  }

  return res.json(
    incidents.map((incident) => ({
      _id: String((incident as any)._id),
      title: (incident as any).title,
      type: (incident as any).type,
      severity: (incident as any).severity,
      status: (incident as any).status,
      description: (incident as any).description,
      evidence: (incident as any).evidence || [],
      notes: (incident as any).notes || []
    }))
  );
}

export async function getIncidentById(req: Request, res: Response) {
  const { id } = req.params;
  const incident = await Incident.findById(id).lean();
  if (!incident) {
    const fallback = fallbackIncidents.find((entry) => entry._id === id) ?? fallbackIncidents[0];
    return res.json(fallback);
  }

  return res.json({
    _id: String((incident as any)._id),
    title: (incident as any).title,
    type: (incident as any).type,
    severity: (incident as any).severity,
    status: (incident as any).status,
    description: (incident as any).description,
    evidence: (incident as any).evidence || [],
    notes: (incident as any).notes || []
  });
}

export async function addIncidentNote(req: Request, res: Response) {
  const { id } = req.params;
  const { message } = req.body ?? {};

  if (!message) {
    return res.status(400).json({ message: 'A note message is required.' });
  }

  const incident = await Incident.findById(id);
  if (!incident) {
    return res.status(404).json({ message: 'Incident not found.' });
  }

  const note = {
    author: (req as any).user?.name || 'System',
    message: String(message)
  };

  incident.notes.push(note);
  await incident.save();

  return res.status(201).json(note);
}

export async function getAnalytics(_req: Request, res: Response) {
  const reports = await SecurityReport.find().limit(6).lean();
  if (!reports.length) {
    return res.json(fallbackAnalytics);
  }

  return res.json({
    scoreHistory: reports.slice(0, 6).map((report, index) => ({
      name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index] || `M${index + 1}`,
      score: report.score
    })),
    securityFocus: [
      { name: 'Password', value: 30, color: '#67e8f9' },
      { name: 'MFA', value: 25, color: '#8b5cf6' },
      { name: 'Phishing', value: 22, color: '#34d399' },
      { name: 'Web', value: 23, color: '#fbbf24' }
    ]
  });
}

export async function getLearning(_req: Request, res: Response) {
  const modules = await LearningModule.find().sort({ createdAt: -1 }).lean();
  if (!modules.length) {
    return res.json(fallbackLearning);
  }

  return res.json(modules.map((module) => ({
    _id: String(module._id),
    title: module.title,
    difficulty: module.difficulty,
    durationMinutes: module.durationMinutes,
    description: module.description,
    category: module.category
  })));
}

export async function submitQuizResult(req: Request, res: Response) {
  const { answers, totalQuestions } = req.body ?? {};

  if (!Array.isArray(answers) || !totalQuestions) {
    return res.status(400).json({ message: 'Answers and totalQuestions are required.' });
  }

  const correctAnswers = answers.filter((answer: any) => !!answer.isCorrect).length;
  const score = Math.round((correctAnswers / Number(totalQuestions)) * 100);

  const result = await QuizResult.create({
    user: (req as any).user?.id,
    score,
    totalQuestions: Number(totalQuestions),
    answers: answers.map((answer: any) => ({
      questionId: answer.questionId,
      selectedIndex: answer.selectedIndex,
      isCorrect: !!answer.isCorrect
    }))
  });

  return res.status(201).json(result);
}

export async function getAdminUsers(_req: Request, res: Response) {
  const users = await User.find().select('name email role status').lean();
  if (!users.length) {
    return res.json(fallbackAdminUsers);
  }

  return res.json(users.map((user) => ({
    _id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status || 'active'
  })));
}

export async function getAdminSummary(_req: Request, res: Response) {
  const [totalUsers, activeUsers, reports, exercises] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ status: 'active' }),
    SecurityReport.countDocuments(),
    QuizResult.countDocuments()
  ]);

  return res.json({
    totalUsers: totalUsers || fallbackAdminUsers.length,
    activeUsers: activeUsers || fallbackAdminUsers.length,
    reports: reports || fallbackReports.length,
    exercises: exercises || 0
  });
}
