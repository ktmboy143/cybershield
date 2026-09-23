import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { HydratedDocument } from 'mongoose';
import env from '../config/env.js';
import User from '../models/User.js';
import type { UserDocument } from '../models/User.js';
import { fallbackUsers } from '../utils/demoData.js';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
};

export type AuthenticatedRequest = Request & {
  user?: AuthUser;
};

const getUserFromFallback = (userIdOrEmail: string) =>
  fallbackUsers.find((user) => user.id === userIdOrEmail || user.email === userIdOrEmail);

const toAuthUser = (user: Partial<UserDocument> & { _id?: unknown; id?: unknown; email?: string; name?: string; role?: 'admin' | 'user' }): AuthUser => ({
  id: String(user._id ?? user.id ?? ''),
  email: user.email || '',
  name: user.name || '',
  role: user.role || 'user'
});

export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, env.jwtSecret) as { sub?: string; email?: string; role?: string; name?: string };

    if (payload.sub) {
      const fallbackUser = env.nodeEnv === 'production' ? undefined : getUserFromFallback(payload.sub);
      if (fallbackUser) {
        req.user = {
          id: fallbackUser.id,
          email: fallbackUser.email,
          name: fallbackUser.name,
          role: fallbackUser.role
        };
        return next();
      }
      const mongoUser = await User.findById(payload.sub).lean();
      if (!mongoUser) {
        return res.status(401).json({ message: 'Invalid or expired session.' });
      }
      req.user = toAuthUser(mongoUser as Partial<UserDocument> & { _id?: unknown; email?: string; name?: string; role?: 'admin' | 'user' });
      return next();
    }

    if (payload.email) {
      const fallbackUser = env.nodeEnv === 'production' ? undefined : getUserFromFallback(payload.email);
      if (fallbackUser) {
        req.user = {
          id: fallbackUser.id,
          email: fallbackUser.email,
          name: fallbackUser.name,
          role: fallbackUser.role
        };
        return next();
      }
      const mongoUser = await User.findOne({ email: payload.email }).lean();
      if (!mongoUser) {
        return res.status(401).json({ message: 'Invalid or expired session.' });
      }
      req.user = toAuthUser(mongoUser as Partial<UserDocument> & { _id?: unknown; email?: string; name?: string; role?: 'admin' | 'user' });
      return next();
    }

    return res.status(401).json({ message: 'Invalid token payload.' });
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

export function authorizeAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }

  return next();
}
