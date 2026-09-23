const configuredApiBase = import.meta.env.VITE_API_URL?.trim();

if (import.meta.env.PROD && !configuredApiBase) {
  throw new Error('VITE_API_URL must be configured for a production build.');
}

export const API_BASE = configuredApiBase || 'http://localhost:5000';

export async function apiFetch<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json().catch(() => ({})) : {};

  if (!response.ok) {
    if (response.status === 401 && typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cybershield:auth-expired'));
    }
    throw new Error(data?.message || 'Request failed.');
  }

  return data as T;
}
