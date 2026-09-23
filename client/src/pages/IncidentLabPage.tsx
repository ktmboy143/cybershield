import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, FileSearch, ShieldCheck, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

type Option = { label: string; explanation: string };
type Question = { id: string; prompt: string; kind: 'investigation' | 'decision'; options: Option[] };
type Scenario = {
  id: string;
  title: string;
  type: string;
  difficulty: string;
  summary: string;
  incident: string;
  evidence: Array<{ id: string; label: string; detail: string; clue: string }>;
  questions: Question[];
};
type Submission = {
  scenarioId: string;
  score: number;
  completed: boolean;
  persistence: string;
  results: Array<{ questionId: string; selectedIndex: number | null; correct: boolean; explanation: string }>;
};

const progressKey = (userId: string) => `cybershield-incident-lab-progress:${userId}`;

function IncidentLabPage() {
  const { token, user } = useAuth();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [evidenceOpen, setEvidenceOpen] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || !user) return;
    const load = async () => {
      try {
        const [scenarioResponse, progressResponse] = await Promise.all([
          apiFetch<Scenario[]>('/api/incident-lab/scenarios', {}, token),
          apiFetch<{ completedScenarios: string[]; scores: Record<string, number> }>('/api/incident-lab/progress', {}, token)
        ]);
        let localProgress: { completedScenarios?: string[]; scores?: Record<string, number> } = {};
        try {
          localProgress = JSON.parse(localStorage.getItem(progressKey(user.id)) || '{}');
        } catch {
          localStorage.removeItem(progressKey(user.id));
        }
        setScenarios(scenarioResponse);
        setCompleted([...new Set([...(progressResponse.completedScenarios || []), ...(localProgress.completedScenarios || [])])]);
        setScores({ ...(localProgress.scores || {}), ...(progressResponse.scores || {}) });
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load Incident Lab scenarios.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [token, user]);

  const currentIndex = selected ? scenarios.findIndex((scenario) => scenario.id === selected.id) : -1;
  const answeredCount = selected ? selected.questions.filter((question) => answers[question.id] !== undefined).length : 0;
  const labProgress = scenarios.length ? Math.round((completed.filter((id) => scenarios.some((scenario) => scenario.id === id)).length / scenarios.length) * 100) : 0;
  const feedbackByQuestion = useMemo(() => new Map((submission?.results || []).map((result) => [result.questionId, result])), [submission]);

  const openScenario = (scenario: Scenario) => {
    setSelected(scenario);
    setEvidenceOpen([]);
    setAnswers({});
    setSubmission(null);
    setError('');
  };

  const submit = async () => {
    if (!selected || answeredCount !== selected.questions.length) {
      setError('Answer every investigation question before submitting.');
      return;
    }
    try {
      setIsSubmitting(true);
      setError('');
      const result = await apiFetch<Submission>(
        `/api/incident-lab/scenarios/${selected.id}/submit`,
        { method: 'POST', body: JSON.stringify({ answers: selected.questions.map((question) => ({ questionId: question.id, selectedIndex: answers[question.id] })) }) },
        token ?? undefined
      );
      setSubmission(result);
      const nextCompleted = [...new Set([...completed, selected.id])];
      const nextScores = { ...scores, [selected.id]: Math.max(scores[selected.id] || 0, result.score) };
      setCompleted(nextCompleted);
      setScores(nextScores);
      localStorage.setItem(progressKey(user?.id || 'anonymous'), JSON.stringify({ completedScenarios: nextCompleted, scores: nextScores }));
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to submit the investigation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div><p className="text-sm uppercase tracking-[0.2em] text-slate-400">Incident lab</p><h2 className="mt-2 text-3xl font-bold text-white">Practice defensive investigations</h2><p className="mt-3 max-w-2xl text-slate-300">Work through fictional incidents, inspect the evidence, and practice safe response decisions.</p></div>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">Completed: {completed.length}/{scenarios.length} ({labProgress}%)</div>
        </div>
        {error ? <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div> : null}
        {isLoading ? <p className="text-sm text-slate-400">Loading scenarios...</p> : null}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {scenarios.map((scenario) => <button type="button" key={scenario.id} onClick={() => openScenario(scenario)} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-left transition hover:border-cyan-500/50 hover:bg-slate-900">
            <div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300"><FileSearch className="h-5 w-5" /></div>{completed.includes(scenario.id) ? <span className="flex items-center gap-1 text-xs text-emerald-300"><CheckCircle2 className="h-4 w-4" />Complete</span> : <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">{scenario.difficulty}</span>}</div>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cyan-300">{scenario.type}</p><h3 className="mt-2 text-xl font-semibold text-white">{scenario.title}</h3><p className="mt-3 text-sm text-slate-300">{scenario.summary}</p>{scores[scenario.id] !== undefined ? <p className="mt-4 text-sm text-slate-400">Best score: <span className="font-semibold text-cyan-200">{scores[scenario.id]}%</span></p> : null}
          </button>)}
        </div>

        {selected ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4" role="dialog" aria-modal="true">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.18em] text-cyan-300">{selected.type}</p><h3 className="mt-2 text-2xl font-semibold text-white">{selected.title}</h3></div><button type="button" onClick={() => setSelected(null)} aria-label="Close scenario" className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button></div>
            <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4"><h4 className="font-semibold text-amber-100">Incident briefing</h4><p className="mt-2 text-sm leading-6 text-slate-300">{selected.incident}</p></div>
            <h4 className="mt-6 flex items-center gap-2 font-semibold text-white"><ShieldCheck className="h-5 w-5 text-cyan-300" />Inspect evidence</h4>
            <div className="mt-3 grid gap-3">{selected.evidence.map((item) => { const open = evidenceOpen.includes(item.id); return <button type="button" key={item.id} onClick={() => setEvidenceOpen((current) => open ? current.filter((id) => id !== item.id) : [...current, item.id])} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-left"><div className="flex items-center justify-between"><span className="font-medium text-white">{item.label}</span><span className="text-xs text-cyan-300">{open ? 'Hide' : 'Inspect'}</span></div>{open ? <div className="mt-3 space-y-2 text-sm text-slate-300"><p>{item.detail}</p><p className="text-cyan-100">Clue: {item.clue}</p></div> : null}</button>; })}</div>
            <h4 className="mt-6 font-semibold text-white">Make your investigation decisions</h4>
            <div className="mt-3 space-y-4">{selected.questions.map((question, questionIndex) => { const feedback = feedbackByQuestion.get(question.id); return <div key={question.id} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4"><p className="text-sm font-medium text-white">{questionIndex + 1}. {question.prompt}</p><div className="mt-3 grid gap-2">{question.options.map((option, optionIndex) => <button type="button" key={option.label} disabled={Boolean(submission)} onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))} className={`rounded-xl border px-3 py-3 text-left text-sm ${answers[question.id] === optionIndex ? 'border-cyan-400 bg-cyan-500/10 text-cyan-100' : 'border-slate-700 text-slate-300 hover:bg-slate-800'} ${feedback && feedback.selectedIndex === optionIndex && !feedback.correct ? 'border-red-400 bg-red-500/10' : ''}`}>{option.label}</button>)}</div>{feedback ? <p className={`mt-3 text-sm ${feedback.correct ? 'text-emerald-300' : 'text-amber-200'}`}>{feedback.correct ? 'Correct. ' : 'Review this decision. '}{feedback.explanation}</p> : null}</div>; })}</div>
            {submission ? <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4"><p className="text-lg font-semibold text-emerald-200">Investigation complete: {submission.score}%</p><p className="mt-1 text-sm text-emerald-100">Your result and completion status are saved for this account.</p></div> : null}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><button type="button" onClick={() => currentIndex > 0 && openScenario(scenarios[currentIndex - 1])} disabled={currentIndex <= 0} className="inline-flex items-center gap-1 rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 disabled:opacity-40"><ChevronLeft className="h-4 w-4" />Previous</button><div className="flex gap-2"><button type="button" onClick={() => setSelected(null)} className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-300">Close</button>{!submission ? <button type="button" onClick={submit} disabled={isSubmitting || answeredCount !== selected.questions.length} className="rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? 'Submitting...' : `Submit investigation (${answeredCount}/${selected.questions.length})`}</button> : <button type="button" onClick={() => currentIndex < scenarios.length - 1 && openScenario(scenarios[currentIndex + 1])} disabled={currentIndex >= scenarios.length - 1} className="inline-flex items-center gap-1 rounded-xl border border-cyan-500/30 px-3 py-2 text-sm text-cyan-200 disabled:opacity-40">Next<ChevronRight className="h-4 w-4" /></button>}</div></div>
          </div>
        </div> : null}
      </div>
    </Layout>
  );
}

export default IncidentLabPage;
