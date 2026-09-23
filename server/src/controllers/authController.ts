import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import User from '../models/User.js';
import env from '../config/env.js';
import { fallbackUsers } from '../utils/demoData.js';

const getFallbackUser = (email: string) => fallbackUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());

const signToken = (user: { id: string; email: string; name: string; role: 'admin' | 'user' }) =>
  jwt.sign({ sub: user.id, email: user.email, name: user.name, role: user.role }, env.jwtSecret, { expiresIn: '7d' });

export async function registerUser(req: Request, res: Response) {
  const { name, email, password } = req.body ?? {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const fallbackMatch = env.enableDemoAuth ? getFallbackUser(normalizedEmail) : undefined;
  if (fallbackMatch) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const existingUser = await User.findOne({ email: normalizedEmail }).lean();
  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(String(password), 10);
  const newUser = await User.create({
    name: String(name).trim(),
    email: normalizedEmail,
    passwordHash,
    role: 'user'
  });

  const token = signToken({
    id: String(newUser._id),
    email: newUser.email,
    name: newUser.name,
    role: newUser.role
  });

  return res.status(201).json({
    token,
    user: {
      id: String(newUser._id),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  });
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  const fallbackMatch = env.enableDemoAuth ? getFallbackUser(normalizedEmail) : undefined;
  if (fallbackMatch) {
    const isValid = fallbackMatch.email === normalizedEmail && await bcrypt.compare(String(password), fallbackMatch.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = signToken({
      id: fallbackMatch.id,
      email: fallbackMatch.email,
      name: fallbackMatch.name,
      role: fallbackMatch.role
    });

    return res.json({
      token,
      user: {
        id: fallbackMatch.id,
        name: fallbackMatch.name,
        email: fallbackMatch.email,
        role: fallbackMatch.role
      }
    });
  }

  const dbUser = await User.findOne({ email: normalizedEmail });
  if (!dbUser) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const validPassword = await bcrypt.compare(String(password), dbUser.passwordHash);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = signToken({
    id: String(dbUser._id),
    email: dbUser.email,
    name: dbUser.name,
    role: dbUser.role
  });

  return res.json({
    token,
    user: {
      id: String(dbUser._id),
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role
    }
  });
}

export async function getCurrentUser(req: Request, res: Response) {
  return res.json({ user: (req as any).user ?? null });
}
