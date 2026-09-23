import { KeyRound, ShieldAlert, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import Layout from '../components/Layout';

function PasswordSecurityPage() {
  const [password, setPassword] = useState('');

  const strength = useMemo(() => {
    if (!password) return { label: 'No input', score: 0, color: 'text-slate-400' };
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    if (!/(.)\1{2,}/.test(password) && !/123|password|admin|qwerty/i.test(password)) score += 10;

    if (score < 35) return { label: 'Very Weak', score, color: 'text-red-400' };
    if (score < 55) return { label: 'Weak', score, color: 'text-orange-400' };
    if (score < 70) return { label: 'Fair', score, color: 'text-amber-300' };
    if (score < 85) return { label: 'Strong', score, color: 'text-cyan-300' };
    return { label: 'Very Strong', score, color: 'text-emerald-300' };
  }, [password]);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Password security</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Local password analysis</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Enter a password to analyze</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-3">
                <KeyRound className="h-4 w-4 text-slate-400" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </label>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                <span>Strength</span>
                <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800">
                <div className="h-2.5 rounded-full bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400" style={{ width: `${Math.min(strength.score, 100)}%` }} />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Length</p>
                <p className="mt-2 text-lg font-semibold text-white">{password.length} chars</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Variety</p>
                <p className="mt-2 text-lg font-semibold text-white">{/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? 'High' : 'Mixed'}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Entropy</p>
                <p className="mt-2 text-lg font-semibold text-white">{Math.min(120, Math.max(20, password.length * 4))} bits</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-300" />
              <h3 className="text-lg font-semibold text-white">Educational guidance</h3>
            </div>

            <ul className="space-y-3 text-sm leading-6 text-slate-300">
              <li>• Use a unique password for each account.</li>
              <li>• Prefer a passphrase or password manager.</li>
              <li>• Avoid common sequences, names, or repeated patterns.</li>
              <li>• Enable MFA wherever possible.</li>
            </ul>

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm text-cyan-100">
              <div className="flex items-center gap-2 font-medium">
                <Sparkles className="h-4 w-4" />
                Your password is analyzed locally and is not stored.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PasswordSecurityPage;
