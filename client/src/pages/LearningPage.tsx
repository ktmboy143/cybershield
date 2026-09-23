import { BookOpen, Clock3 } from 'lucide-react';
import { useEffect, useState } from 'react';
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

function LearningPage() {
  const { token } = useAuth();
  const [modules, setModules] = useState<LearningModule[]>([]);

  useEffect(() => {
    const loadModules = async () => {
      try {
        const data = await apiFetch<LearningModule[]>('/api/learning', {}, token ?? undefined);
        setModules(data);
      } catch {
        setModules([
          { _id: 'lesson-1', title: 'Password Security', difficulty: 'Beginner', durationMinutes: 12, description: 'Learn unique password principles and safe habits.', category: 'Password' },
          { _id: 'lesson-2', title: 'Phishing Basics', difficulty: 'Intermediate', durationMinutes: 15, description: 'Recognize urgency, impersonation, and suspicious asks.', category: 'Phishing' },
          { _id: 'lesson-3', title: 'MFA Essentials', difficulty: 'Beginner', durationMinutes: 10, description: 'Understand how MFA blocks many account takeover attempts.', category: 'Identity' },
          { _id: 'lesson-4', title: 'Web Security', difficulty: 'Intermediate', durationMinutes: 18, description: 'Review HTTPS, headers, and safe browsing patterns.', category: 'Web' }
        ]);
      }
    };

    loadModules();
  }, [token]);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Learning center</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Security education</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((lesson) => (
            <div key={lesson._id} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">{lesson.difficulty}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{lesson.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{lesson.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <Clock3 className="h-3.5 w-3.5" />
                {lesson.durationMinutes} min
              </div>
              <button className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/15">Start learning</button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default LearningPage;
