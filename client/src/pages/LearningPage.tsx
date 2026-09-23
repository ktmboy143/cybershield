import { AlertCircle, BookOpen, CheckCircle2, Clock3, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

type LessonContent = {
  introduction: string;
  explanation: string;
  importantPoints: string[];
  examples: string[];
  safetyTips: string[];
  quiz: Array<{ question: string; options: string[]; answer: number }>;
};

type LearningModule = {
  _id: string;
  title: string;
  difficulty: string;
  durationMinutes: number;
  description: string;
  category: string;
  content: LessonContent;
};

const fallbackModules: LearningModule[] = [];

function LearningPage() {
  const { token } = useAuth();
  const [modules, setModules] = useState<LearningModule[]>(fallbackModules);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [moduleResponse, progressResponse] = await Promise.all([
          apiFetch<LearningModule[]>('/api/learning', {}, token ?? undefined),
          apiFetch<{ completedLessons: string[] }>('/api/learning/progress', {}, token ?? undefined)
        ]);
        setModules(moduleResponse);
        setCompleted(progressResponse.completedLessons);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load learning content.');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) load();
  }, [token]);

  const categories = useMemo(() => ['All', ...new Set(modules.map((lesson) => lesson.category))], [modules]);
  const filteredModules = modules.filter((lesson) =>
    (category === 'All' || lesson.category === category) &&
    `${lesson.title} ${lesson.description}`.toLowerCase().includes(search.toLowerCase())
  );
  const activeModule = activeIndex === null ? null : filteredModules[activeIndex] || null;
  const progress = modules.length ? Math.round((completed.filter((id) => modules.some((lesson) => lesson._id === id)).length / modules.length) * 100) : 0;

  const openLesson = (index: number) => {
    setActiveIndex(index);
    setQuizAnswer(null);
    setError('');
  };

  const markComplete = async () => {
    if (!activeModule || !activeModule.content.quiz.every((question) => quizAnswer === question.answer)) {
      setError('Answer the knowledge check correctly before completing this lesson.');
      return;
    }

    try {
      setIsSaving(true);
      const response = await apiFetch<{ completedLessons: string[] }>(
        '/api/learning/progress',
        { method: 'PATCH', body: JSON.stringify({ lessonId: activeModule._id }) },
        token ?? undefined
      );
      setCompleted(response.completedLessons);
      setActiveIndex(null);
      setQuizAnswer(null);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save lesson progress.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Learning center</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Security education</h2>
          </div>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
            Progress: {completed.length}/{modules.length} lessons ({progress}%)
          </div>
        </div>

        {error ? <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div> : null}
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-3"><Search className="h-5 w-5 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses" className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" /></div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-200 outline-none">{categories.map((item) => <option key={item}>{item}</option>)}</select>
        </div>

        {isLoading ? <p className="text-sm text-slate-400">Loading courses...</p> : null}
        {!isLoading && !filteredModules.length ? <p className="text-sm text-slate-400">No courses match your search.</p> : null}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {filteredModules.map((lesson, index) => {
            const isComplete = completed.includes(lesson._id);
            return <div key={lesson._id} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300"><BookOpen className="h-5 w-5" /></div>{isComplete ? <span className="flex items-center gap-1 text-xs text-emerald-300"><CheckCircle2 className="h-4 w-4" />Complete</span> : <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">{lesson.difficulty}</span>}</div>
              <h3 className="mt-4 text-xl font-semibold text-white">{lesson.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{lesson.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400"><Clock3 className="h-3.5 w-3.5" />{lesson.durationMinutes} min</div>
              <button type="button" onClick={() => openLesson(index)} className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/15">{isComplete ? 'Review lesson' : 'Start learning'}</button>
            </div>;
          })}
        </div>

        {activeModule ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4" role="dialog" aria-modal="true">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4"><div><p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{activeModule.category}</p><h3 className="mt-2 text-2xl font-semibold text-white">{activeModule.title}</h3></div><button type="button" onClick={() => setActiveIndex(null)} aria-label="Close lesson" className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button></div>
            <p className="mt-5 text-lg text-cyan-100">{activeModule.content.introduction}</p>
            <h4 className="mt-6 font-semibold text-white">Understand the concept</h4><p className="mt-2 text-slate-300">{activeModule.content.explanation}</p>
            <h4 className="mt-6 font-semibold text-white">Important points</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-slate-300">{activeModule.content.importantPoints.map((point) => <li key={point}>{point}</li>)}</ul>
            <h4 className="mt-6 font-semibold text-white">Example scenarios</h4><div className="mt-2 space-y-2">{activeModule.content.examples.map((example) => <div key={example} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-100">{example}</div>)}</div>
            <h4 className="mt-6 font-semibold text-white">How to stay safe</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-slate-300">{activeModule.content.safetyTips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
            {activeModule.content.quiz.map((question) => <div key={question.question} className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4"><p className="font-medium text-white">Knowledge check: {question.question}</p><div className="mt-3 grid gap-2">{question.options.map((option, optionIndex) => <button type="button" key={option} onClick={() => setQuizAnswer(optionIndex)} className={`rounded-xl border px-3 py-2 text-left text-sm ${quizAnswer === optionIndex ? 'border-cyan-400 bg-cyan-500/10 text-cyan-100' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`}>{option}</button>)}</div></div>)}
            <div className="mt-6 flex flex-wrap justify-between gap-3"><button type="button" onClick={() => openLesson(Math.max(0, (activeIndex || 0) - 1))} disabled={activeIndex === 0} className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-300 disabled:opacity-40">Previous</button><div className="flex gap-3"><button type="button" onClick={() => setActiveIndex(null)} className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-300">Close</button><button type="button" onClick={markComplete} disabled={isSaving || quizAnswer === null} className="rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">{isSaving ? 'Saving...' : 'Complete lesson'}</button><button type="button" onClick={() => openLesson(Math.min(filteredModules.length - 1, (activeIndex || 0) + 1))} disabled={activeIndex === filteredModules.length - 1} className="rounded-xl border border-cyan-500/30 px-4 py-3 text-sm text-cyan-200 disabled:opacity-40">Next</button></div></div>
          </div>
        </div> : null}
      </div>
    </Layout>
  );
}

export default LearningPage;
