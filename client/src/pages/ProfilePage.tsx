import { Camera, Mail, ShieldCheck, UserRound } from 'lucide-react';
import Layout from '../components/Layout';

function ProfilePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Profile</p>
          <h2 className="mt-2 text-3xl font-bold text-white">User profile</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex flex-col items-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10 text-2xl font-bold text-cyan-300">
                AT
                <button className="absolute -bottom-2 -right-1 rounded-full border border-slate-800 bg-slate-950 p-2 text-cyan-300">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">Ava Thompson</h3>
              <p className="mt-2 text-sm text-slate-400">Security Analyst</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <UserRound className="h-5 w-5 text-cyan-300" />
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Name</p>
                  <p className="mt-1 text-white">Ava Thompson</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <Mail className="h-5 w-5 text-cyan-300" />
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Email</p>
                  <p className="mt-1 text-white">ava@cybershield.local</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <ShieldCheck className="h-5 w-5 text-cyan-300" />
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Security score</p>
                  <p className="mt-1 text-white">82 / 100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
