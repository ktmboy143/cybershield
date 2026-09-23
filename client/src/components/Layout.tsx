import { motion } from 'framer-motion';
import { ShieldCheck, LayoutDashboard, KeyRound, ShieldAlert, Globe, FileSearch, BarChart3, FileText, BookOpen, Settings, UserCircle, LogOut, Menu, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const items = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Security Posture', to: '/security-posture', icon: ShieldCheck },
  { label: 'Password Security', to: '/password-security', icon: KeyRound },
  { label: 'Phishing Analyzer', to: '/phishing', icon: ShieldAlert },
  { label: 'Website Security', to: '/website-security', icon: Globe },
  { label: 'Incident Lab', to: '/incident-lab', icon: FileSearch },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'Reports', to: '/reports', icon: FileText },
  { label: 'Learning Center', to: '/learning', icon: BookOpen },
  { label: 'Settings', to: '/settings', icon: Settings },
  { label: 'Profile', to: '/profile', icon: UserCircle },
  { label: 'Admin', to: '/admin', icon: ArrowRight }
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const visibleItems = isAdmin ? items : items.filter((item) => item.label !== 'Admin');

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const initials = (user?.name || 'Ava Thompson')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#050b16] text-slate-200">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-72 border-r border-slate-800 bg-slate-950/80 p-5 lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 shadow-glow">
              <ShieldCheck className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[0.2em] text-cyan-200">CYBERSHIELD</p>
            </div>
          </div>

          <nav className="space-y-2">
            {visibleItems.map(({ label, to, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={label}
                  to={to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${
                    active
                      ? 'border border-cyan-500/40 bg-cyan-500/10 text-cyan-100 shadow-glow'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Security status</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-2xl font-bold text-emerald-300">82</span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">Strong</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-label="Toggle navigation menu" className="rounded-xl border border-slate-700 p-2 lg:hidden">
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Security overview</p>
                  <h1 className="text-xl font-semibold text-white">CYBERSHIELD</h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 md:block">
                  Security Score: <span className="font-semibold text-cyan-300">82/100</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-2 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">{initials}</div>
                  <div className="hidden text-left text-sm sm:block">
                    <p className="font-medium text-white">{user?.name || 'Ava Thompson'}</p>
                    <p className="text-xs text-slate-400">{user?.role === 'admin' ? 'Administrator' : 'Analyst'}</p>
                  </div>
                </div>
              </div>
            </div>
            {isMenuOpen ? (
              <nav className="border-t border-slate-800 px-4 py-3 lg:hidden">
                <div className="grid gap-2 sm:grid-cols-2">
                  {visibleItems.map(({ label, to, icon: Icon }) => (
                    <Link key={label} to={to} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-white">
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                  <button type="button" onClick={handleLogout} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-300 hover:bg-slate-800/80 hover:text-white">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </nav>
            ) : null}
          </header>

          <motion.main
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="p-4 sm:p-6 lg:p-8"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
