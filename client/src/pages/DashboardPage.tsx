import { Activity, AlertTriangle, CheckCircle2, ShieldCheck, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

type DashboardResponse = {
  score: number;
  metrics: Array<{ label: string; value: string; trend: string }>;
  activity: Array<{ time: string; title: string; status: string }>;
};

function DashboardPage() {
  const { user, token } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await apiFetch<DashboardResponse>('/api/dashboard', {}, token ?? undefined);
        setDashboard(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load dashboard.');
      }
    };

    loadDashboard();
  }, [token]);

  const score = dashboard?.score ?? 82;
  const breakdown = [
    { name: 'Password Hygiene', score: 18, total: 20 },
    { name: 'MFA Awareness', score: 17, total: 20 },
    { name: 'Phishing Awareness', score: 16, total: 20 },
    { name: 'Web Security', score: 15, total: 20 },
    { name: 'Security Practices', score: 16, total: 20 }
  ];

  const metrics = dashboard?.metrics ?? [
    { label: 'Security Score', value: '82', trend: '+6.4%' },
    { label: 'Threat Indicators', value: '24', trend: '-12%' },
    { label: 'Completed Checks', value: '18', trend: '+3' },
    { label: 'Recommendations', value: '7', trend: '2 urgent' }
  ];

  const activity = dashboard?.activity ?? [
    { time: '09:42', title: 'Password security check completed', status: 'success' },
    { time: '10:15', title: 'Phishing awareness exercise completed', status: 'info' },
    { time: '11:04', title: 'Website configuration checked', status: 'warning' }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Overview</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Good morning, {user?.name?.split(' ')[0] || 'Ava'}</h2>
          </div>
          <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200">
            Here’s your current security overview.
          </div>
        </div>

        {error ? <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div> : null}

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Security Awareness Score</p>
                <h3 className="mt-3 text-5xl font-bold text-white">{score} <span className="text-2xl text-slate-400">/100</span></h3>
              </div>
              <div className="relative h-24 w-24">
                <div className="absolute inset-0 rounded-full border-[8px] border-slate-800" />
                <div className="absolute inset-0 rounded-full border-[8px] border-cyan-400 border-t-transparent rotate-45" />
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {breakdown.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{item.name}</span>
                    <span>{item.score}/{item.total}</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-800">
                    <div className="h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${(item.score / item.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                    {metric.label.includes('Score') ? <ShieldCheck className="h-5 w-5" /> : metric.label.includes('Threat') ? <AlertTriangle className="h-5 w-5" /> : metric.label.includes('Checks') ? <CheckCircle2 className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
                  </div>
                  <span className="text-xs text-emerald-300">{metric.trend}</span>
                </div>
                <p className="mt-5 text-3xl font-bold text-white">{metric.value}</p>
                <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="mb-5 flex items-center gap-3">
            <Activity className="h-5 w-5 text-cyan-300" />
            <h3 className="text-xl font-semibold text-white">Security activity timeline</h3>
          </div>

          <div className="space-y-4">
            {activity.map((item) => (
              <div key={`${item.time}-${item.title}`} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex flex-col items-center">
                  <div className={`h-3 w-3 rounded-full ${item.status === 'success' ? 'bg-emerald-400' : item.status === 'warning' ? 'bg-amber-400' : 'bg-cyan-400'}`} />
                  <div className="mt-2 h-full w-px bg-slate-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-300">{item.time}</p>
                    <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.16em] ${item.status === 'success' ? 'bg-emerald-500/10 text-emerald-300' : item.status === 'warning' ? 'bg-amber-500/10 text-amber-300' : 'bg-cyan-500/10 text-cyan-300'}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-white">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;
