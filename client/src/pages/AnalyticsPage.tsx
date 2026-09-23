import { BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

type AnalyticsResponse = {
  scoreHistory: Array<{ name: string; score: number }>;
  securityFocus: Array<{ name: string; value: number; color: string }>;
};

function AnalyticsPage() {
  const { token } = useAuth();
  const [data, setData] = useState<AnalyticsResponse>({
    scoreHistory: [
      { name: 'Jan', score: 68 },
      { name: 'Feb', score: 72 },
      { name: 'Mar', score: 74 },
      { name: 'Apr', score: 81 },
      { name: 'May', score: 76 },
      { name: 'Jun', score: 82 }
    ],
    securityFocus: [
      { name: 'Password', value: 30, color: '#67e8f9' },
      { name: 'MFA', value: 25, color: '#8b5cf6' },
      { name: 'Phishing', value: 22, color: '#34d399' },
      { name: 'Web', value: 23, color: '#fbbf24' }
    ]
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await apiFetch<AnalyticsResponse>('/api/analytics', {}, token ?? undefined);
        setData(response);
      } catch {
        // keep fallback data
      }
    };

    loadData();
  }, [token]);

  const maxScore = 100;
  const chartWidth = 500;
  const chartHeight = 220;
  const padding = 24;

  const path = data.scoreHistory
    .map((point, index) => {
      const x = padding + (index * (chartWidth - padding * 2)) / (Math.max(data.scoreHistory.length - 1, 1));
      const y = chartHeight - padding - (point.score / maxScore) * (chartHeight - padding * 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const donutSegments = data.securityFocus.reduce<{ start: number; end: number; color: string; name: string; value: number }[]>((acc, item) => {
    const total = data.securityFocus.reduce((sum, segment) => sum + segment.value, 0);
    const last = acc[acc.length - 1];
    const start = last ? last.end : 0;
    const end = start + (item.value / total) * 100;
    acc.push({ ...item, start, end });
    return acc;
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Analytics</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Security trends</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-300" />
              <h3 className="text-lg font-semibold text-white">Security score history</h3>
            </div>
            <div className="h-72 w-full">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-full w-full">
                {[0, 25, 50, 75, 100].map((mark) => {
                  const y = chartHeight - padding - (mark / maxScore) * (chartHeight - padding * 2);
                  return (
                    <g key={mark}>
                      <line x1={padding} x2={chartWidth - padding} y1={y} y2={y} stroke="#1e293b" strokeDasharray="4 6" />
                      <text x={8} y={y + 4} fill="#94a3b8" fontSize="10">{mark}</text>
                    </g>
                  );
                })}
                <path d={path} fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
                {data.scoreHistory.map((point, index) => {
                  const x = padding + (index * (chartWidth - padding * 2)) / (Math.max(data.scoreHistory.length - 1, 1));
                  const y = chartHeight - padding - (point.score / maxScore) * (chartHeight - padding * 2);
                  return (
                    <g key={point.name}>
                      <circle cx={x} cy={y} r="4" fill="#67e8f9" />
                      <text x={x - 8} y={chartHeight - 4} fill="#94a3b8" fontSize="10">{point.name}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-violet-300" />
              <h3 className="text-lg font-semibold text-white">Security focus</h3>
            </div>
            <div className="flex h-72 items-center justify-center gap-6">
              <svg viewBox="0 0 180 180" className="h-48 w-48">
                <circle cx="90" cy="90" r="55" fill="none" stroke="#1e293b" strokeWidth="24" />
                {donutSegments.map((segment) => {
                  const circumference = 2 * Math.PI * 55;
                  const dash = (segment.value / data.securityFocus.reduce((sum, item) => sum + item.value, 0)) * circumference;
                  const offset = circumference * (1 - segment.start / 100);
                  return (
                    <circle
                      key={segment.name}
                      cx="90"
                      cy="90"
                      r="55"
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="24"
                      strokeDasharray={`${dash} ${circumference - dash}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                  );
                })}
              </svg>
              <div className="space-y-3 text-sm text-slate-300">
                {data.securityFocus.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name} {item.value}%
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-300" />
            <h3 className="text-lg font-semibold text-white">Recommendation completions</h3>
          </div>
          <div className="h-72 w-full">
            <svg viewBox="0 0 500 220" className="h-full w-full">
              {data.scoreHistory.map((item, index) => {
                const x = 35 + index * 72;
                const h = (item.score / 100) * 130;
                const y = 180 - h;
                return (
                  <g key={item.name}>
                    <rect x={x} y={y} width="40" height={h} rx="8" fill="#34d399" opacity="0.9" />
                    <text x={x + 20} y="200" textAnchor="middle" fill="#94a3b8" fontSize="10">{item.name.slice(0, 3)}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AnalyticsPage;
