import { AlertCircle, CheckCircle2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

type PhishingResult = {
  score: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  indicators: Array<{ title: string; description: string }>;
  recommendation: string;
};

function PhishingPage() {
  const { token } = useAuth();
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<PhishingResult | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!message.trim()) {
      setError('Enter a suspicious message to analyze.');
      return;
    }

    try {
      setIsSubmitting(true);
      const analysis = await apiFetch<PhishingResult>(
        '/api/security/phishing',
        { method: 'POST', body: JSON.stringify({ message }) },
        token ?? undefined
      );
      setResult(analysis);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to analyze this message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Phishing awareness</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Analyze suspicious messages</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <form className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6" onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-300" />
              <h3 className="text-lg font-semibold text-white">Suspicious message</h3>
            </div>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={8}
              maxLength={5000}
              placeholder="Paste the message here. Do not include passwords or other secrets."
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-slate-200 outline-none focus:border-cyan-400"
            />

            {error ? (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Analyzing...' : 'Analyze message'}
            </button>
          </form>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            {result ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Risk level</p>
                  <span className={`rounded-full border px-2 py-1 text-xs ${result.riskLevel === 'High' ? 'border-red-500/30 bg-red-500/10 text-red-300' : result.riskLevel === 'Medium' ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
                    {result.riskLevel} ({result.score}/100)
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <ShieldAlert className="h-10 w-10 text-amber-300" />
                  <div>
                    <p className="text-2xl font-bold text-white">{result.indicators.length} indicators</p>
                    <p className="text-sm text-slate-400">Common phishing patterns found in the message.</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {result.indicators.length ? result.indicators.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-300" />
                        <p className="font-medium text-white">{item.title}</p>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                    </div>
                  )) : <p className="text-sm text-slate-300">No common indicators were detected.</p>}
                </div>
                <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-200">
                  <div className="flex items-start gap-2 font-medium">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                    {result.recommendation}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-64 items-center justify-center text-center text-sm text-slate-400">
                Submit a message to see its analysis.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PhishingPage;
