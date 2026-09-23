import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { apiFetch } from '../lib/api';

export type Preferences = {
  darkMode: boolean;
  accentGlow: boolean;
  riskAlerts: boolean;
  weeklyReports: boolean;
};

const defaultPreferences: Preferences = { darkMode: true, accentGlow: true, riskAlerts: true, weeklyReports: true };
const STORAGE_KEY = 'cybershield-preferences';

type ThemeContextValue = {
  preferences: Preferences;
  isLoading: boolean;
  isSaving: boolean;
  error: string;
  message: string;
  updatePreference: (key: keyof Preferences, value: boolean) => void;
  savePreferences: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readLocalPreferences(): Preferences {
  try {
    return { ...defaultPreferences, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return defaultPreferences;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [preferences, setPreferences] = useState<Preferences>(readLocalPreferences);
  const [isLoading, setIsLoading] = useState(Boolean(token));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = preferences.darkMode ? 'dark' : 'light';
    document.documentElement.classList.toggle('accent-glow-disabled', !preferences.accentGlow);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const loadPreferences = async () => {
      try {
        setIsLoading(true);
        const response = await apiFetch<{ preferences: Preferences }>('/api/settings', {}, token);
        setPreferences({ ...defaultPreferences, ...response.preferences });
        setError('');
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load your settings.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, [token]);

  const updatePreference = (key: keyof Preferences, value: boolean) => {
    setMessage('');
    setError('');
    setPreferences((current) => ({ ...current, [key]: value }));
  };

  const savePreferences = async () => {
    if (!token) {
      setError('Sign in to save settings.');
      return;
    }

    try {
      setIsSaving(true);
      setMessage('');
      setError('');
      const response = await apiFetch<{ preferences: Preferences }>(
        '/api/settings',
        { method: 'PATCH', body: JSON.stringify(preferences) },
        token
      );
      setPreferences({ ...defaultPreferences, ...response.preferences });
      setMessage('Settings saved successfully.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save your settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const value = useMemo(() => ({ preferences, isLoading, isSaving, error, message, updatePreference, savePreferences }), [preferences, isLoading, isSaving, error, message]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}
