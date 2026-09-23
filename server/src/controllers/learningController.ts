import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.js';
import LearningModule from '../models/LearningModule.js';
import LearningProgress from '../models/LearningProgress.js';
import { fallbackLearning } from '../utils/demoData.js';
import { getLearningContent } from '../data/learningContent.js';

function serializeModule(module: { _id?: unknown; title: string; difficulty: string; durationMinutes: number; description: string; category: string }) {
  return {
    _id: String(module._id ?? module.title.toLowerCase().replace(/\s+/g, '-')),
    title: module.title,
    difficulty: module.difficulty,
    durationMinutes: module.durationMinutes,
    description: module.description,
    category: module.category,
    content: getLearningContent(module.title)
  };
}

export async function getLearningModules(_req: AuthenticatedRequest, res: Response) {
  const modules = await LearningModule.find().sort({ createdAt: -1 }).lean();
  return res.json((modules.length ? modules : fallbackLearning).map(serializeModule));
}

export async function getLearningProgress(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Authentication required.' });
  if (!/^[a-f\d]{24}$/i.test(userId)) return res.json({ completedLessons: [] });

  const progress = await LearningProgress.findOne({ user: userId }).select('completedLessons').lean<{ completedLessons?: string[] }>();
  return res.json({ completedLessons: progress?.completedLessons || [] });
}

export async function updateLearningProgress(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  const lessonId = typeof req.body?.lessonId === 'string' ? req.body.lessonId.trim() : '';
  if (!userId) return res.status(401).json({ message: 'Authentication required.' });
  if (!/^[a-f\d]{24}$/i.test(userId)) return res.status(503).json({ message: 'Learning progress persistence requires a connected account database.' });
  if (!lessonId || lessonId.length > 160) return res.status(400).json({ message: 'A valid lesson is required.' });

  const progress = await LearningProgress.findOneAndUpdate(
    { user: userId },
    { $addToSet: { completedLessons: lessonId } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).select('completedLessons').lean<{ completedLessons?: string[] }>();

  return res.json({ completedLessons: progress?.completedLessons || [] });
}
