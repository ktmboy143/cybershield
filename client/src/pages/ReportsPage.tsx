import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

type ReportRow = {
  _id: string;
  title: string;
  type: string;
  score: number;
  status: string;
  summary: string;
};

function ReportsPage() {
  const { token } = useAuth();
  const [rows, setRows] = useState<ReportRow[]>([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await apiFetch<ReportRow[]>('/api/reports', {}, token ?? undefined);
        setRows(data);
      } catch {
        setRows([
          { _id: 'report-1', title: 'Quarterly posture', type: 'quarterly', score: 82, status: 'Complete', summary: 'Overall posture remains strong.' },
          { _id: 'report-2', title: 'Phishing review', type: 'phishing', score: 89, status: 'Complete', summary: 'Campaign detection improved by 12%.' },
          { _id: 'report-3', title: 'Password health', type: 'password', score: 76, status: 'Needs review', summary: 'One shared password pattern still requires remediation.' }
        ]);
      }
    };

    loadReports();
  }, [token]);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Reports</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Security report archive</h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-300">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">View</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._id} className="border-b border-slate-800 text-slate-200">
                  <td className="px-4 py-4">{row.title}</td>
                  <td className="px-4 py-4 capitalize">{row.type}</td>
                  <td className="px-4 py-4">{row.score}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${row.status === 'Complete' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-cyan-300 hover:bg-slate-800">
                      <Eye className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default ReportsPage;
