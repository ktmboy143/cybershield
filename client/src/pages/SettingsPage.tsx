import { AlertCircle, Bell, CheckCircle2, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';

function SettingsPage() {
  const { preferences, isLoading, isSaving, error, message, updatePreference, savePreferences } = useTheme();

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await savePreferences();
  };

  return (
    <Layout>
      <form className="space-y-8" onSubmit={handleSave}>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Settings</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Account preferences</h2>
        </div>

        {error ? <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div> : null}
        {message ? <div className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{message}</div> : null}

        <div className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center gap-3"><Moon className="h-5 w-5 text-cyan-300" /><h3 className="text-xl font-semibold text-white">Appearance</h3></div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3"><span>Dark mode</span><input type="checkbox" checked={preferences.darkMode} onChange={(event) => updatePreference('darkMode', event.target.checked)} disabled={isLoading || isSaving} className="h-4 w-4 rounded" /></label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3"><span>Enable accent glow</span><input type="checkbox" checked={preferences.accentGlow} onChange={(event) => updatePreference('accentGlow', event.target.checked)} disabled={isLoading || isSaving} className="h-4 w-4 rounded" /></label>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center gap-3"><Bell className="h-5 w-5 text-emerald-300" /><h3 className="text-xl font-semibold text-white">Notifications</h3></div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3"><span>Risk alerts</span><input type="checkbox" checked={preferences.riskAlerts} onChange={(event) => updatePreference('riskAlerts', event.target.checked)} disabled={isLoading || isSaving} className="h-4 w-4 rounded" /></label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3"><span>Weekly reports</span><input type="checkbox" checked={preferences.weeklyReports} onChange={(event) => updatePreference('weeklyReports', event.target.checked)} disabled={isLoading || isSaving} className="h-4 w-4 rounded" /></label>
            </div>
          </div>
        </div>

        <button type="submit" disabled={isLoading || isSaving} className="rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
          {isSaving ? 'Saving...' : 'Save settings'}
        </button>
      </form>
    </Layout>
  );
}

export default SettingsPage;
