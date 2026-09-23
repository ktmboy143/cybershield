import { Bell, Moon } from 'lucide-react';
import Layout from '../components/Layout';

function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Settings</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Account preferences</h2>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-cyan-300" />
              <h3 className="text-xl font-semibold text-white">Appearance</h3>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <span>Dark mode</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <span>Enable accent glow</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-emerald-300" />
              <h3 className="text-xl font-semibold text-white">Notifications</h3>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <span>Risk alerts</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <span>Weekly reports</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SettingsPage;
