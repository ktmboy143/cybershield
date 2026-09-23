import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.js';
import IncidentLabProgress from '../models/IncidentLabProgress.js';
import { getIncidentLabScenario, incidentLabScenarios } from '../data/incidentLabData.js';

function publicScenario(scenario: (typeof incidentLabScenarios)[number]) {
  return {
    id: scenario.id,
    title: scenario.title,
    type: scenario.type,
    difficulty: scenario.difficulty,
    summary: scenario.summary,
    incident: scenario.incident,
    evidence: scenario.evidence,
    questions: scenario.questions.map(({ correctIndex: _correctIndex, ...question }) => question)
  };
}

function isMongoUser(userId: string) {
  return /^[a-f\d]{24}$/i.test(userId);
}

export function getIncidentLabScenarios(_req: AuthenticatedRequest, res: Response) {
  return res.json(incidentLabScenarios.map(publicScenario));
}

export async function getIncidentLabProgress(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Authentication required.' });
  if (!isMongoUser(userId)) return res.json({ completedScenarios: [], scores: {} });

  const progress = await IncidentLabProgress.findOne({ user: userId }).lean();
  return res.json({ completedScenarios: progress?.completedScenarios || [], scores: progress?.scores || {} });
}

export async function submitIncidentLab(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  const scenarioId = typeof req.params.id === 'string' ? req.params.id : '';
  const scenario = getIncidentLabScenario(scenarioId);
  const answers = req.body?.answers;
  if (!userId) return res.status(401).json({ message: 'Authentication required.' });
  if (!scenario) return res.status(404).json({ message: 'Incident Lab scenario not found.' });
  if (!Array.isArray(answers)) return res.status(400).json({ message: 'Answers are required.' });

  const answerMap = new Map(answers.filter((answer) => answer && typeof answer.questionId === 'string').map((answer) => [answer.questionId, answer.selectedIndex]));
  const results = scenario.questions.map((question) => {
    const selectedIndex = answerMap.get(question.id);
    const correct = selectedIndex === question.correctIndex;
    return {
      questionId: question.id,
      selectedIndex: typeof selectedIndex === 'number' ? selectedIndex : null,
      correct,
      explanation: scenario.questions.find((item) => item.id === question.id)?.options[question.correctIndex].explanation || ''
    };
  });
  const score = Math.round((results.filter((result) => result.correct).length / scenario.questions.length) * 100);
  const completed = true;

  if (isMongoUser(userId)) {
    await IncidentLabProgress.findOneAndUpdate(
      { user: userId },
      {
        $addToSet: { completedScenarios: scenario.id },
        $max: { [`scores.${scenario.id}`]: score }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  return res.json({ scenarioId: scenario.id, score, completed, results, persistence: isMongoUser(userId) ? 'database' : 'session-demo' });
}
