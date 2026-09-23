import { AlertCircle, BookOpen, CheckCircle2, Clock3, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

type LearningModule = {
  _id: string;
  title: string;
  difficulty: string;
  durationMinutes: number;
  description: string;
  category: string;
};

const fallbackModules: LearningModule[] = [
  { _id: 'lesson-1', title: 'Password Security', difficulty: 'Beginner', durationMinutes: 12, description: 'Learn unique password principles and safe habits.', category: 'Password' },
  { _id: 'lesson-2', title: 'Phishing Basics', difficulty: 'Intermediate', durationMinutes: 15, description: 'Recognize urgency, impersonation, and suspicious asks.', category: 'Phishing' },
  { _id: 'lesson-3', title: 'MFA Essentials', difficulty: 'Beginner', durationMinutes: 10, description: 'Understand how MFA blocks many account takeover attempts.', category: 'Identity' },
  { _id: 'lesson-4', title: 'Web Security', difficulty: 'Intermediate', durationMinutes: 18, description: 'Review HTTPS, headers, and safe browsing patterns.', category: 'Web' }
];

const PROGRESS_KEY = 'cybershield-learning-progress';

function LearningPage() {
  const { token } = useAuth();
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]');
      if (Array.isArray(stored)) setCompleted(stored.filter((id): id is string => typeof id === 'string'));
    } catch {
      localStorage.removeItem(PROGRESS_KEY);
    }

    const loadModules = async () => {
      try {
        setModules(await apiFetch<LearningModule[]>('/api/learning', {}, token ?? undefined));
      } catch (loadError) {
        setModules(fallbackModules);
        setError(loadError instanceof Error ? `Learning service unavailable. Showing saved course catalog: ${loadError.message}` : 'Learning service unavailable. Showing saved course catalog.');
      } finally {
        setIsLoading(false);
      }
    };

    loadModules();
  }, [token]);

  const categories = useMemo(() => ['All', ...new Set(modules.map((lesson) => lesson.category))], [modules]);
  const filteredModules = modules.filter((lesson) =>
    (category === 'All' || lesson.category === category) &&
    `${lesson.title} ${lesson.description}`.toLowerCase().includes(search.toLowerCase())
  );

  const markComplete = (moduleId: string) => {
    const next = completed.includes(moduleId) ? completed : [...completed, moduleId];
    setCompleted(next);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    setActiveModule(null);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Learning center</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Security education</h2>
        </div>

        {error ? <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div> : null}
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-3">
            <Search className="h-5 w-5 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses" className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" />
          </div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-200 outline-none">
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        {isLoading ? <p className="text-sm text-slate-400">Loading courses...</p> : null}
        {!isLoading && !filteredModules.length ? <p className="text-sm text-slate-400">No courses match your search.</p> : null}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {filteredModules.map((lesson) => {
            const isComplete = completed.includes(lesson._id);
            return (
              <div key={lesson._id} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300"><BookOpen className="h-5 w-5" /></div>
                  {isComplete ? <span className="flex items-center gap-1 text-xs text-emerald-300"><CheckCircle2 className="h-4 w-4" />Complete</span> : <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">{lesson.difficulty}</span>}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{lesson.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{lesson.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400"><Clock3 className="h-3.5 w-3.5" />{lesson.durationMinutes} min</div>
                <button type="button" onClick={() => setActiveModule(lesson)} className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/15">{isComplete ? 'Review lesson' : 'Start learning'}</button>
              </div>
            );
          })}
        </div>

        {activeModule ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4" role="dialog" aria-modal="true">
            <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{activeModule.category}</p><h3 className="mt-2 text-2xl font-semibold text-white">{activeModule.title}</h3></div>
                <button type="button" onClick={() => setActiveModule(null)} aria-label="Close lesson" className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <p className="mt-5 text-slate-300">{activeModule.description}</p>
              <p className="mt-3 text-sm text-slate-400">This educational module takes approximately {activeModule.durationMinutes} minutes. Review the guidance and mark it complete when finished.</p>
              <button type="button" onClick={() => markComplete(activeModule._id)} className="mt-6 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-300">Mark as complete</button>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export default LearningPage;
