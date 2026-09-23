import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  Gauge,
  Lock,
  Mail,
  Network,
  Radar,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { navItems } from '../data/sample';

const howItWorks = [
  {
    id: '01',
    title: 'ASSESS',
    description: 'Measure posture across identity, devices, email, and web exposure.',
  },
  {
    id: '02',
    title: 'ANALYZE',
    description: 'Correlate threats, vulnerabilities, and behavioral indicators in context.',
  },
  {
    id: '03',
    title: 'UNDERSTAND',
    description: 'Translate alerts into education and clear action recommendations.',
  },
  {
    id: '04',
    title: 'IMPROVE',
    description: 'Track progress with practical lessons and stronger daily habits.',
  },
];

const featureCards = [
  {
    title: 'Security Posture',
    description: 'Understand your current risk profile across identity, endpoints, email, and data exposure.',
    icon: Shield,
    accent: 'cyan',
  },
  {
    title: 'Password Intelligence',
    description: 'Review password habits and identify weak patterns without storing your credentials.',
    icon: Lock,
    accent: 'violet',
  },
  {
    title: 'Phishing Defense',
    description: 'Check suspicious messaging patterns and learn how to separate real threats from routine noise.',
    icon: ShieldAlert,
    accent: 'rose',
  },
  {
    title: 'Website Security',
    description: 'Inspect domains and headers for safer browsing and better trust indicators.',
    icon: Search,
    accent: 'blue',
  },
  {
    title: 'Incident Investigation',
    description: 'Follow attack paths from login anomalies to investigation and remediation guidance.',
    icon: Radar,
    accent: 'amber',
  },
  {
    title: 'Security Analytics',
    description: 'Track trends, identify weak spots, and improve long-term cyber awareness with clarity.',
    icon: BarChart3,
    accent: 'emerald',
  },
];

const learningTracks = [
  { title: 'PHISHING', level: 'Beginner', time: '12 min', accent: 'cyan' },
  { title: 'PASSWORDS', level: 'Intermediate', time: '15 min', accent: 'violet' },
  { title: 'MFA', level: 'Beginner', time: '10 min', accent: 'emerald' },
  { title: 'PRIVACY', level: 'Advanced', time: '20 min', accent: 'blue' },
  { title: 'SOCIAL ENGINEERING', level: 'Intermediate', time: '18 min', accent: 'amber' },
  { title: 'WEB SECURITY', level: 'Advanced', time: '22 min', accent: 'rose' },
];

const faqs = [
  {
    question: 'What is CyberShield?',
    answer: 'CyberShield is a security awareness and posture platform that helps users understand digital risk, phishing patterns, password hygiene, and safe online behavior.',
  },
  {
    question: 'Does CyberShield store my passwords?',
    answer: 'No. CyberShield does not store or transmit your passwords for checks, and the platform focuses on secure educational review rather than credential capture.',
  },
  {
    question: 'What does the phishing analyzer check?',
    answer: 'It reviews suspicious content patterns such as urgency, impersonation, urgency language, requests for credentials, and unusual or malformed sender behavior.',
  },
  {
    question: 'What is the security score?',
    answer: 'The score summarizes your current security posture across key categories like identity management, device hygiene, email safety, and web security readiness.',
  },
  {
    question: 'Can I use the website checker on any website?',
    answer: 'The website security checks are designed for educational analysis and safe review of authorized or known domains, not for bypassing protections or testing systems without permission.',
  },
];

const securityNodes = [
  { name: 'IDENTITY', icon: ShieldCheck, x: 50, y: 18 },
  { name: 'NETWORK', icon: Network, x: 82, y: 64 },
  { name: 'EMAIL', icon: Mail, x: 80, y: 82 },
  { name: 'DEVICE', icon: Smartphone, x: 20, y: 82 },
  { name: 'DATA', icon: Database, x: 18, y: 36 },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050b16] text-slate-200">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
            <Shield className="h-5 w-5 text-cyan-300" />
          </div>
          <span className="text-lg font-semibold tracking-[0.2em] text-cyan-200">CYBERSHIELD</span>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <a key={item} href="#" className="transition hover:text-white">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900">
            Login
          </Link>
          <Link to="/register" className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition hover:bg-cyan-300">
            Get Started
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-35" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" />
                Secure by design
              </div>
              <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                Your Digital Security. <span className="text-cyan-300">One Command Center.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-slate-300">
                Understand threats. Strengthen defenses. Build better security habits with a modern, educational cyber defense platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.45)] transition hover:bg-cyan-300">
                  Explore Security Center
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/learning" className="rounded-full border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900">
                  See How It Works
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-400" /> Password hygiene</div>
                <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-400" /> Phishing awareness</div>
                <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-400" /> Incident training</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative z-10">
              <div className="glass cyber-panel relative overflow-hidden rounded-[30px] border border-slate-700/80 p-5 shadow-[0_30px_70px_rgba(8,15,34,0.8)]">
                <div className="absolute inset-0 opacity-80">
                  <div className="scan-ring absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20" />
                  <div className="scan-ring absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10" />
                  <div className="scan-ring absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/10" />
                </div>

                <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full opacity-80">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <path
                      key={index}
                      d={[
                        'M 120 140 L 260 260',
                        'M 150 170 L 260 260',
                        'M 200 400 L 260 260',
                        'M 320 160 L 260 260',
                        'M 360 350 L 260 260',
                      ][index]}
                      stroke="rgba(103,232,249,0.35)"
                      strokeWidth="1.5"
                      strokeDasharray="8 10"
                      fill="none"
                    />
                  ))}
                </svg>

                {Array.from({ length: 18 }).map((_, index) => (
                  <span
                    key={index}
                    className="particle"
                    style={{
                      left: `${(index * 13) % 100}%`,
                      top: `${(index * 17) % 100}%`,
                      animationDelay: `${index * 0.6}s`,
                    }}
                  />
                ))}

                <div className="relative flex h-[540px] items-center justify-center">
                  <div className="relative flex h-[300px] w-[300px] items-center justify-center rounded-full border border-cyan-500/20 bg-slate-950/60 shadow-[0_0_60px_rgba(34,211,238,0.15)]">
                    <div className="absolute inset-6 rounded-full border border-cyan-500/15" />
                    <div className="absolute inset-12 rounded-full border border-cyan-500/15" />
                    <div className="absolute inset-0 rounded-full border border-cyan-500/10" />

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
                      className="absolute inset-4 rounded-full border border-cyan-500/20"
                    />

                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
                      className="absolute inset-10 rounded-full border border-violet-500/20"
                    />

                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_58%)]" />

                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/50 bg-slate-900/90 shadow-[0_0_40px_rgba(34,211,238,0.3)]">
                      <Shield className="h-14 w-14 text-cyan-300" />
                    </div>
                  </div>

                  {securityNodes.map((node) => {
                    const Icon = node.icon;
                    const left = `${node.x}%`;
                    const top = `${node.y}%`;
                    return (
                      <motion.div
                        key={node.name}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left, top }}
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <div className="flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/90 px-2 py-1.5 shadow-[0_0_24px_rgba(34,211,238,0.12)] backdrop-blur-sm">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/12 text-cyan-200">
                            <Icon className="h-3 w-3" />
                          </div>
                          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-200">{node.name}</span>
                        </div>
                      </motion.div>
                    );
                  })}

                  <div className="absolute left-6 top-8 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Secure
                  </div>

                  <div className="absolute bottom-8 right-8 rounded-2xl border border-slate-700 bg-slate-950/80 p-3 shadow-[0_0_24px_rgba(59,130,246,0.12)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Threat Level</p>
                        <p className="mt-1 text-xl font-semibold text-emerald-300">LOW</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
                        <Gauge className="h-5 w-5 text-cyan-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">How CyberShield works</p>
          </div>

          <div className="relative grid gap-6 md:grid-cols-4">
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent md:block" />
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group relative rounded-[24px] border border-slate-800 bg-slate-900/80 p-5 text-left"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-3xl font-bold text-cyan-300">{item.id}</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-200">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold uppercase tracking-[0.16em] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Capabilities</p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Everything you need to understand your digital security.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature, index) => {
              const Icon = feature.icon;
              const accentMap = {
                cyan: 'from-cyan-500/18 via-cyan-500/6 to-transparent',
                violet: 'from-violet-500/18 via-violet-500/6 to-transparent',
                rose: 'from-rose-500/18 via-rose-500/6 to-transparent',
                blue: 'from-blue-500/18 via-blue-500/6 to-transparent',
                amber: 'from-amber-500/18 via-amber-500/6 to-transparent',
                emerald: 'from-emerald-500/18 via-emerald-500/6 to-transparent',
              };

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-[26px] border border-slate-800 bg-slate-900/80 p-6"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[feature.accent as keyof typeof accentMap]}`} />
                  <div className="relative z-10">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/70">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <span className="text-white/60">→</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>

                    <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        <span>Status</span>
                        <span>Live</span>
                      </div>
                      <div className="mt-4 flex items-end gap-2">
                        {[42, 58, 36, 74, 63, 82].map((height, innerIndex) => (
                          <motion.span
                            key={innerIndex}
                            initial={{ height: 8 }}
                            whileInView={{ height }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: innerIndex * 0.05 }}
                            className="w-full rounded-t-md bg-gradient-to-t from-cyan-500/70 to-violet-500/80"
                            style={{ height: `${height}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Operations center</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">See your security posture in real time.</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Security score</p>
                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-5xl font-bold text-white">82</span>
                    <span className="pb-2 text-sm text-slate-400">/100</span>
                  </div>
                </div>
                <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-emerald-300">
                  LOW
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Threat indicators</p>
                  <p className="mt-4 text-3xl font-bold text-white">03</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Checks completed</p>
                  <p className="mt-4 text-3xl font-bold text-white">24</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Risk trend</p>
                  <p className="mt-4 text-3xl font-bold text-emerald-300">-12%</p>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Security activity</p>
                  <span className="text-xs text-slate-400">Last 24 hours</span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <svg viewBox="0 0 500 200" className="h-36 w-full">
                    <defs>
                      <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#67e8f9" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                    <path d="M0,150 L60,142 L120,118 L180,126 L240,96 L300,104 L360,70 L420,84 L500,30" stroke="url(#lineGlow)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M0,150 L60,142 L120,118 L180,126 L240,96 L300,104 L360,70 L420,84 L500,30 L500,200 L0,200 Z" fill="rgba(103,232,249,0.06)" />
                    {[0, 80, 160, 240, 320, 400, 500].map((x) => (
                      <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="rgba(148,163,184,0.12)" />
                    ))}
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recent events</p>
              <div className="mt-5 space-y-4">
                {[
                  { title: 'LOGIN EVENT', time: '02 mins ago', status: 'NORMAL' },
                  { title: 'PHISHING CHECK', time: '09 mins ago', status: 'REVIEWED' },
                  { title: 'SECURITY CHECK', time: '24 mins ago', status: 'COMPLETE' },
                  { title: 'INCIDENT REVIEW', time: '42 mins ago', status: 'OPEN' },
                ].map((event) => (
                  <div key={event.title} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                        {event.title.includes('LOGIN') ? <ShieldCheck className="h-4 w-4" /> : event.title.includes('PHISHING') ? <ShieldAlert className="h-4 w-4" /> : event.title.includes('SECURITY') ? <CheckCircle2 className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{event.title}</p>
                        <p className="text-xs text-slate-400">{event.time}</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Investigation</p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">From alert to understanding.</h2>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-6">
              {[
                'LOGIN',
                'FAILED LOGIN',
                'FAILED LOGIN',
                'SUCCESS',
                'UNUSUAL ACTIVITY',
                'INVESTIGATION',
              ].map((item, index) => (
                <div key={`${item}-${index}`} className="relative flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-cyan-400 bg-cyan-500/20 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
                    <div className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-slate-300">{item}</div>
                  </div>
                  {index < 5 && <div className="absolute left-1/2 top-2 hidden h-px w-14 -translate-x-1/2 bg-gradient-to-r from-cyan-500/30 to-violet-500/30 md:block" />}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link to="/incident-lab" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.28)] transition hover:bg-cyan-300">
                EXPLORE INCIDENT LAB
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Security analytics</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Security Score Trend</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6">
              <div className="flex items-center justify-between pb-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Performance</p>
                <div className="flex items-center gap-2 text-emerald-300">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">+8.2%</span>
                </div>
              </div>

              <svg viewBox="0 0 560 220" className="h-52 w-full">
                <defs>
                  <linearGradient id="trendLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#67e8f9" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                {[0, 120, 240, 360, 480, 560].map((x) => (
                  <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="rgba(148,163,184,0.12)" />
                ))}
                {[0, 50, 100, 150, 200].map((y) => (
                  <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="rgba(148,163,184,0.12)" />
                ))}
                <path d="M0,170 L80,162 L150,145 L220,118 L300,142 L360,110 L430,94 L560,60" fill="none" stroke="url(#trendLine)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="560" cy="60" r="5" fill="#67e8f9" />
              </svg>
            </div>

            <div className="space-y-4 rounded-[28px] border border-slate-800 bg-slate-900/80 p-6">
              {[
                ['Password Health', '84%', 'emerald'],
                ['Phishing Awareness', '91%', 'cyan'],
                ['Web Security', '76%', 'violet'],
                ['Learning Progress', '88%', 'amber'],
              ].map(([label, value, tint]) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800">
                    <div
                      className={`h-2.5 rounded-full ${
                        tint === 'emerald'
                          ? 'bg-gradient-to-r from-emerald-400 to-cyan-400'
                          : tint === 'cyan'
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-400'
                            : tint === 'violet'
                              ? 'bg-gradient-to-r from-violet-400 to-fuchsia-400'
                              : 'bg-gradient-to-r from-amber-400 to-orange-400'
                      }`}
                      style={{ width: value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Learning center</p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Build better security habits.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {learningTracks.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    item.accent === 'cyan'
                      ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                      : item.accent === 'violet'
                        ? 'border-violet-500/40 bg-violet-500/10 text-violet-300'
                        : item.accent === 'emerald'
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                          : item.accent === 'blue'
                            ? 'border-blue-500/40 bg-blue-500/10 text-blue-300'
                            : item.accent === 'amber'
                              ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                              : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                  }`}>
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">{item.level}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                  <Clock3 className="h-4 w-4" />
                  <span>{item.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Report preview</p>
                <h2 className="mt-3 text-3xl font-bold text-white">YOUR SECURITY AWARENESS REPORT</h2>
              </div>
              <Link to="/reports" className="inline-flex items-center gap-2 self-start rounded-full border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-500/40 hover:text-cyan-200">
                VIEW FULL REPORT
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[24px] border border-slate-800 bg-slate-950/70 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Score</p>
                    <h3 className="mt-3 text-5xl font-bold text-white">82 <span className="text-2xl text-slate-400">/100</span></h3>
                  </div>
                  <div className="relative h-20 w-20">
                    <div className="absolute inset-0 rounded-full border-[7px] border-slate-800" />
                    <div className="absolute inset-1 rounded-full border-[7px] border-cyan-400 border-t-transparent rotate-45" />
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Strengths</p>
                    <p className="mt-2 text-3xl font-bold text-emerald-300">3</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recommendations</p>
                    <p className="mt-2 text-3xl font-bold text-amber-300">5</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Checks Completed</p>
                    <p className="mt-2 text-3xl font-bold text-white">24</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-800 bg-slate-950/70 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Key themes</p>
                <div className="mt-5 space-y-4">
                  {[
                    ['Strong phishing recognition', '92%'],
                    ['Password resistance', '85%'],
                    ['Web security awareness', '79%'],
                    ['MFA adoption', '88%'],
                  ].map(([label, value]) => (
                    <div key={label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-slate-300">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800">
                        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: value }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Trust</p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Designed for security awareness.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              ['PRIVACY FIRST', 'Protecting user awareness without collecting sensitive data.'],
              ['DEFENSIVE BY DESIGN', 'Built to clarify risk and support safer decisions across the digital surface.'],
              ['EDUCATION FIRST', 'Turning threat data into understandable action and stronger habits.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-semibold uppercase tracking-[0.18em] text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">FAQ</p>
            <h2 className="mt-4 text-3xl font-bold text-white">Frequently asked questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[22px] border border-slate-800 bg-slate-900/80 p-5">
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
                <Shield className="h-5 w-5 text-cyan-300" />
              </div>
              <span className="text-lg font-semibold tracking-[0.2em] text-cyan-200">CYBERSHIELD</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">Cyber awareness, simplified.</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Platform</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Security</li>
              <li>Learning</li>
              <li>About</li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Legal</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
