import { AlertTriangle, ShieldCheck, TimerReset } from 'lucide-react';
import Layout from '../components/Layout';

const events = [
  { time: '09:14:21', type: 'LOGIN_SUCCESS', severity: 'Low', description: 'User signed in from a known device.' },
  { time: '09:15:03', type: 'LOGIN_FAILED', severity: 'Medium', description: 'Several failed access attempts began to cluster.' },
  { time: '09:15:31', type: 'LOGIN_SUCCESS', severity: 'High', description: 'An account logon succeeded from an unusual location.' },
  { time: '09:16:22', type: 'UNUSUAL_LOGIN', severity: 'High', description: 'Second factor mismatch triggered a review workflow.' },
  { time: '09:17:03', type: 'FILE_ACCESS_SPIKE', severity: 'High', description: 'A sudden spike in file access activity was detected.' }
];

function IncidentLabPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Incident lab</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Synthetic investigation environment</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Event timeline</h3>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-xs text-amber-300">Investigating</span>
            </div>

            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={`${event.time}-${index}`} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex flex-col items-center">
                    <div className={`h-3 w-3 rounded-full ${event.severity === 'Low' ? 'bg-emerald-400' : event.severity === 'Medium' ? 'bg-amber-400' : 'bg-red-400'}`} />
                    <div className="mt-2 h-full w-px bg-slate-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-slate-400">{event.time}</p>
                      <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${event.severity === 'Low' ? 'bg-emerald-500/10 text-emerald-300' : event.severity === 'Medium' ? 'bg-amber-500/10 text-amber-300' : 'bg-red-500/10 text-red-300'}`}>{event.severity}</span>
                    </div>
                    <p className="mt-1 font-medium text-white">{event.type}</p>
                    <p className="mt-1 text-sm text-slate-300">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-300" />
                <h3 className="text-lg font-semibold text-white">Investigation notes</h3>
              </div>
              <p className="mt-4 text-sm text-slate-300">The pattern suggests a likely credential abuse sequence followed by unusual file activity. Validate the user context and review access logs.</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-center gap-3">
                <TimerReset className="h-5 w-5 text-cyan-300" />
                <h3 className="text-lg font-semibold text-white">Current status</h3>
              </div>
              <p className="mt-4 text-sm text-slate-300">Status: <span className="font-semibold text-cyan-300">Investigating</span></p>
              <p className="mt-2 text-sm text-slate-300">Recommended next step: validate device trust and review unusual access events.</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
                <h3 className="text-lg font-semibold text-white">Evidence</h3>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-slate-300">
                <p>• Multiple failed logins within 30 seconds</p>
                <p>• Successful login from new region</p>
                <p>• Access spike above normal threshold</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default IncidentLabPage;
