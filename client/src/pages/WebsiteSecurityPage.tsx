import { AlertCircle, BadgeCheck, Globe, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

type WebsiteCheck = { name: string; status: 'PASS' | 'WARNING' | 'NOT_CHECKED'; detail: string };
type WebsiteResult = { url: string; hostname: string; checks: WebsiteCheck[]; note: string };

function WebsiteSecurityPage() {
  const { token } = useAuth();
  const [url, setUrl] = useState('https://example.com');
  const [result, setResult] = useState<WebsiteResult | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Enter a website URL to review.');
      return;
    }

    try {
      setIsSubmitting(true);
      const analysis = await apiFetch<WebsiteResult>(
        '/api/security/website',
        { method: 'POST', body: JSON.stringify({ url }) },
        token ?? undefined
      );
      setResult(analysis);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to review this website.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Website security checker</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Authorized site review</h2>
        </div>

        <form className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-3">
              <Globe className="h-5 w-5 text-slate-400" />
              <input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                type="url"
                inputMode="url"
                placeholder="https://example.com"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? 'Checking...' : 'Check configuration'}
            </button>
          </div>
          {error ? (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}
        </form>

        {result ? (
          <>
            <p className="text-sm text-slate-400">Reviewing <span className="font-medium text-slate-200">{result.hostname}</span>. {result.note}</p>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {result.checks.map(({ name, status, detail }) => (
                <div key={name} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{name}</p>
                    <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${status === 'PASS' ? 'bg-emerald-500/10 text-emerald-300' : status === 'WARNING' ? 'bg-amber-500/10 text-amber-300' : 'bg-slate-700/60 text-slate-300'}`}>
                      {status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">{detail}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    {status === 'PASS' ? <BadgeCheck className="h-4 w-4 text-emerald-300" /> : <TriangleAlert className="h-4 w-4 text-amber-300" />}
                    Safe configuration review only
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : <p className="text-sm text-slate-400">Submit an authorized website URL to see its safe configuration review.</p>}
      </div>
    </Layout>
  );
}

export default WebsiteSecurityPage;
