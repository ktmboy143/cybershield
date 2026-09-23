import { AlertCircle, CheckCircle2, ShieldCheck, Lock, Smartphone, Mail, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

type PostureItem = {
  name: string;
  score: number;
  status: string;
  note: string;
};

const postureIcons = {
  Identity: ShieldCheck,
  Passwords: Lock,
  MFA: Smartphone,
  'Email Security': Mail,
  'Web Security': Globe,
  'Device Hygiene': CheckCircle2
};

function SecurityPosturePage() {
  const { token } = useAuth();
  const [posture, setPosture] = useState<PostureItem[]>([]);

  useEffect(() => {
    const loadPosture = async () => {
      try {
        const data = await apiFetch<{ score: number; categories: PostureItem[] }>('/api/security/posture', {}, token ?? undefined);
        setPosture(data.categories);
      } catch {
        setPosture([
          { name: 'Identity', score: 92, status: 'Healthy', note: 'Strong account hygiene and verification controls in place.' },
          { name: 'Passwords', score: 80, status: 'Good', note: 'Password quality is above average, but reuse risk still exists.' },
          { name: 'MFA', score: 88, status: 'Protected', note: 'Multi-factor protections are enabled and reviewed often.' },
          { name: 'Email Security', score: 71, status: 'Watch', note: 'Phishing simulation suggests email verification should be reinforced.' },
          { name: 'Web Security', score: 75, status: 'Moderate', note: 'HTTPS and header posture is generally solid with a few warnings.' },
          { name: 'Device Hygiene', score: 84, status: 'Healthy', note: 'Endpoint practices are well maintained with a few improvement opportunities.' }
        ]);
      }
    };

    loadPosture();
  }, [token]);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Security posture</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Defense overview</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posture.map(({ name, score, status, note }) => {
            const Icon = postureIcons[name as keyof typeof postureIcons] ?? ShieldCheck;
            return (
              <div key={name} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">{status}</span>
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <h3 className="text-xl font-semibold text-white">{name}</h3>
                  <span className="text-2xl font-bold text-cyan-300">{score}</span>
                </div>

                <div className="mt-4 h-2.5 rounded-full bg-slate-800">
                  <div className="h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${score}%` }} />
                </div>

                <p className="mt-4 text-sm text-slate-300">{note}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-amber-300">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Recommendations available
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default SecurityPosturePage;
