import { BadgeCheck, Globe, TriangleAlert } from 'lucide-react';
import Layout from '../components/Layout';

const checks = [
  { name: 'HTTPS', status: 'PASS', detail: 'Secure transfer protocol is enabled.' },
  { name: 'HSTS', status: 'WARNING', detail: 'HTTP Strict Transport Security is not fully configured.' },
  { name: 'Content Security Policy', status: 'WARNING', detail: 'Header is missing or weakly configured.' },
  { name: 'X-Content-Type-Options', status: 'PASS', detail: 'The browser is protected from MIME confusion.' },
  { name: 'Referrer-Policy', status: 'PASS', detail: 'Referrer handling is configured appropriately.' }
];

function WebsiteSecurityPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Website security checker</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Authorized site review</h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-3">
              <Globe className="h-5 w-5 text-slate-400" />
              <input className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" defaultValue="https://example.com" />
            </div>
            <button className="rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">Check configuration</button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {checks.map(({ name, status, detail }) => (
            <div key={name} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between">
                <p className="font-medium text-white">{name}</p>
                <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${status === 'PASS' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300'}`}>
                  {status}
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
      </div>
    </Layout>
  );
}

export default WebsiteSecurityPage;
