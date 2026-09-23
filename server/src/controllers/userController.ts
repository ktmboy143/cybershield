import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.js';
import User from '../models/User.js';
import { fallbackUsers } from '../utils/demoData.js';

const defaultPreferences = {
  darkMode: true,
  accentGlow: true,
  riskAlerts: true,
  weeklyReports: true
};

type ProfileRecord = {
  _id?: unknown;
  id?: unknown;
  name?: string;
  email?: string;
  role?: string;
  preferences?: Partial<typeof defaultPreferences>;
};

function safeUser(user: { _id?: unknown; id?: unknown; name?: string; email?: string; role?: string }) {
  return {
    id: String(user._id ?? user.id ?? ''),
    name: user.name || '',
    email: user.email || '',
    role: user.role || 'user'
  };
}

export async function getProfile(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const fallbackUser = fallbackUsers.find((user) => user.id === userId);
  if (fallbackUser) {
    return res.json({ user: safeUser(fallbackUser) });
  }

  const user = await User.findById(userId).select('name email role').lean<ProfileRecord>();
  if (!user) {
    return res.status(404).json({ message: 'Profile not found.' });
  }

  return res.json({ user: safeUser(user) });
}

export async function updateProfile(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';

  if (!userId) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  if (!name || name.length > 100) {
    return res.status(400).json({ message: 'Name is required and must be 100 characters or fewer.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Enter a valid email address.' });
  }
  if (fallbackUsers.some((user) => user.id === userId)) {
    return res.status(503).json({ message: 'Profile updates require a connected account database.' });
  }

  const duplicate = await User.findOne({ email, _id: { $ne: userId } }).select('_id').lean();
  if (duplicate) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .select('name email role')
    .lean<ProfileRecord>();
  if (!user) {
    return res.status(404).json({ message: 'Profile not found.' });
  }

  return res.json({ user: safeUser(user) });
}

export async function getSettings(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  if (fallbackUsers.some((user) => user.id === userId)) {
    return res.json({ preferences: defaultPreferences });
  }

  const user = await User.findById(userId).select('preferences').lean<ProfileRecord>();
  return res.json({ preferences: { ...defaultPreferences, ...(user?.preferences || {}) } });
}

export async function updateSettings(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const allowedKeys = Object.keys(defaultPreferences) as Array<keyof typeof defaultPreferences>;
  const updates = Object.fromEntries(
    allowedKeys
      .filter((key) => typeof req.body?.[key] === 'boolean')
      .map((key) => [`preferences.${key}`, req.body[key]])
  );

  if (!Object.keys(updates).length) {
    return res.status(400).json({ message: 'At least one valid preference is required.' });
  }
  if (fallbackUsers.some((user) => user.id === userId)) {
    return res.status(503).json({ message: 'Settings persistence requires a connected account database.' });
  }

  const user = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true })
    .select('preferences')
    .lean<ProfileRecord>();
  if (!user) {
    return res.status(404).json({ message: 'Account not found.' });
  }

  return res.json({ preferences: { ...defaultPreferences, ...(user.preferences || {}) } });
}
