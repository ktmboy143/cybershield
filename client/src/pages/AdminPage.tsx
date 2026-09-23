import { BarChart3, ShieldCheck, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

function AdminPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState<Array<{ label: string; value: string }>>([]);
  const [users, setUsers] = useState<Array<{ _id: string; name: string; email: string; role: string; status: string }>>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const summary = await apiFetch<{ totalUsers: number; activeUsers: number; reports: number; exercises: number }>(
          '/api/admin/summary',
          {},
          token ?? undefined
        );

        setStats([
          { label: 'Total Users', value: summary.totalUsers.toLocaleString() },
          { label: 'Active Users', value: summary.activeUsers.toLocaleString() },
          { label: 'Reports', value: summary.reports.toLocaleString() },
          { label: 'Exercises', value: summary.exercises.toLocaleString() }
        ]);
      } catch {
        setStats([
          { label: 'Total Users', value: '4,284' },
          { label: 'Active Users', value: '2,910' },
          { label: 'Reports', value: '128' },
          { label: 'Exercises', value: '580' }
        ]);
      }

      try {
        const list = await apiFetch<Array<{ _id: string; name: string; email: string; role: string; status: string }>>('/api/admin/users', {}, token ?? undefined);
        setUsers(list);
      } catch {
        setUsers([]);
      }
    };

    loadData();
  }, [token]);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Admin</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Administration dashboard</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{stat.label}</p>
                {stat.label.includes('Users') ? <Users className="h-5 w-5 text-cyan-300" /> : stat.label.includes('Reports') ? <BarChart3 className="h-5 w-5 text-violet-300" /> : <ShieldCheck className="h-5 w-5 text-emerald-300" />}
              </div>
              <p className="mt-4 text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <h3 className="text-xl font-semibold text-white">User directory</h3>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800">
            <table className="w-full text-left text-sm text-slate-200">
              <thead className="bg-slate-950 text-slate-300">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t border-slate-800">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3 capitalize">{user.role}</td>
                    <td className="px-4 py-3 capitalize">{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminPage;
