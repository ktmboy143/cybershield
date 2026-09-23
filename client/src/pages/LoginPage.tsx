import { AlertCircle, KeyRound, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email, password });
      const from = (location.state as { from?: string } | null)?.from || '/dashboard';
      navigate(from, { replace: true });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050b16] p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
            <ShieldCheck className="h-6 w-6 text-cyan-300" />
          </div>
          <p className="text-2xl font-bold tracking-[0.2em] text-cyan-200">CYBERSHIELD</p>
        </div>

        <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to access your security center.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Email</span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </label>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-slate-700 bg-slate-950" />
              Remember me
            </label>
            <button type="button" className="text-cyan-300 hover:text-cyan-200">Forgot password?</button>
          </div>

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
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don’t have an account? <Link to="/register" className="font-medium text-cyan-300 hover:text-cyan-200">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
