import { AlertTriangle, CheckCircle2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';

const indicators = [
  { title: 'Urgency language', description: 'The message pushes a fast action without reasonable justification.' },
  { title: 'Credential request', description: 'The sender asks for confidential information or login verification.' },
  { title: 'Suspicious link', description: 'A shortened or unfamiliar domain could be a phishing lure.' }
];

function PhishingPage() {
  const [message, setMessage] = useState('Urgent action required! Your account has been locked. Verify your password immediately to avoid suspension.');

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Phishing awareness</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Analyze suspicious messages</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="mb-4 flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-300" />
              <h3 className="text-lg font-semibold text-white">Suspicious message</h3>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-slate-200 outline-none focus:border-cyan-400"
            />

            <button className="mt-4 rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Analyze message
            </button>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Risk level</p>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-xs text-amber-300">High</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <AlertTriangle className="h-10 w-10 text-amber-300" />
              <div>
                <p className="text-2xl font-bold text-white">3 indicators</p>
                <p className="text-sm text-slate-400">Potential phishing indicators detected.</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {indicators.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-300" />
                    <p className="font-medium text-white">{item.title}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-200">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="h-4 w-4" />
                Recommended safe action: verify directly through a trusted channel before acting.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PhishingPage;
