import { AlertCircle, KeyRound, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = useMemo(() => {
    const value = form.password;
    if (!value) return { score: 0, label: 'No password', tone: 'text-slate-400' };

    let score = 0;
    if (value.length >= 8) score += 25;
    if (value.length >= 12) score += 15;
    if (/[A-Z]/.test(value)) score += 15;
    if (/[0-9]/.test(value)) score += 15;
    if (/[^A-Za-z0-9]/.test(value)) score += 20;
    if (!/(.)\1{2,}/.test(value) && !/password|123|admin|qwerty/i.test(value)) score += 10;

    if (score < 35) return { score, label: 'Very weak', tone: 'text-red-400' };
    if (score < 55) return { score, label: 'Weak', tone: 'text-orange-400' };
    if (score < 70) return { score, label: 'Fair', tone: 'text-amber-300' };
    if (score < 85) return { score, label: 'Strong', tone: 'text-cyan-300' };
    return { score, label: 'Very strong', tone: 'text-emerald-300' };
  }, [form.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Please complete all fields.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (passwordStrength.score < 55) {
      setError('Choose a stronger password to continue.');
      return;
    }

    try {
      setIsSubmitting(true);
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/dashboard', { replace: true });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050b16] p-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
            <ShieldCheck className="h-6 w-6 text-cyan-300" />
          </div>
          <p className="text-2xl font-bold tracking-[0.2em] text-cyan-200">CYBERSHIELD</p>
        </div>

        <h1 className="text-3xl font-semibold text-white">Create account</h1>
        <p className="mt-2 text-sm text-slate-400">Start protecting your digital habits and security awareness.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Full name</span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3">
              <UserRound className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Your full name"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Email</span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="you@example.com"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3">
              <KeyRound className="h-4 w-4 text-slate-400" />
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder="Create a strong password"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
            <div className="mt-3">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                <span>Strength</span>
                <span className={passwordStrength.tone}>{passwordStrength.label}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div className="h-2 rounded-full bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400" style={{ width: `${Math.min(passwordStrength.score, 100)}%` }} />
              </div>
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Confirm password</span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3">
              <KeyRound className="h-4 w-4 text-slate-400" />
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                placeholder="Confirm your password"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </label>

          {error ? (
            <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;
