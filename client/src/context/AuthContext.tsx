import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { API_BASE } from '../lib/api';

export type UserRole = 'admin' | 'user';

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextValue = {
  user: AppUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: { email: string; password: string }) => Promise<AppUser>;
  register: (payload: { name: string; email: string; password: string }) => Promise<AppUser>;
  updateUser: (nextUser: AppUser) => void;
  logout: () => void;
};

const STORAGE_KEY = 'cybershield-auth';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredAuth() {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as { token: string; user: AppUser };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedAuth = readStoredAuth();
  const [user, setUser] = useState<AppUser | null>(storedAuth?.user ?? null);
  const [token, setToken] = useState<string | null>(storedAuth?.token ?? null);

  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
      setToken(null);
      window.localStorage.removeItem(STORAGE_KEY);
    };

    window.addEventListener('cybershield:auth-expired', handleAuthExpired);
    return () => window.removeEventListener('cybershield:auth-expired', handleAuthExpired);
  }, []);

  const persistSession = (nextToken: string, nextUser: AppUser) => {
    setToken(nextToken);
    setUser(nextUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: nextToken, user: nextUser }));
  };

  const login = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'Unable to sign in.');
    }

    persistSession(data.token, data.user);
    return data.user as AppUser;
  };

  const register = async (payload: { name: string; email: string; password: string }) => {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'Unable to create account.');
    }

    persistSession(data.token, data.user);
    return data.user as AppUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (nextUser: AppUser) => {
    setUser(nextUser);
    if (token) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user: nextUser }));
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isAdmin: user?.role === 'admin',
      login,
      register,
      updateUser,
      logout
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
