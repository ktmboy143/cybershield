import { AlertCircle, Camera, CheckCircle2, Mail, ShieldCheck, UserRound, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth, type AppUser } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

function ProfilePage() {
  const { token, user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [avatarData, setAvatarData] = useState(user?.avatarData || '');
  const [pendingAvatar, setPendingAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await apiFetch<{ user: AppUser }>('/api/profile', {}, token ?? undefined);
        setForm({ name: response.user.name, email: response.user.email });
        setAvatarData(response.user.avatarData || '');
        updateUser(response.user);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load your profile.');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) loadProfile();
    else setIsLoading(false);
  }, [token]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setError('');
    setMessage('');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Choose a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Profile photos must be 2 MB or smaller.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        if (image.width < 64 || image.height < 64) {
          setError('Profile photo must be at least 64 by 64 pixels.');
          return;
        }
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, 512 / Math.max(image.width, image.height));
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/webp', 0.82);
        if (compressed.length > 280000) {
          setError('That image could not be compressed below the storage limit. Choose a smaller image.');
          return;
        }
        setPendingAvatar(compressed);
      };
      image.onerror = () => setError('The selected file is not a readable image.');
      image.src = String(reader.result);
    };
    reader.onerror = () => setError('Unable to read the selected image.');
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }

    try {
      setIsSaving(true);
      const response = await apiFetch<{ user: AppUser }>(
        '/api/profile',
        { method: 'PATCH', body: JSON.stringify({ ...form, ...(pendingAvatar !== null ? { avatarData: pendingAvatar } : {}) }) },
        token ?? undefined
      );
      setForm({ name: response.user.name, email: response.user.email });
      setAvatarData(response.user.avatarData || '');
      setPendingAvatar(null);
      updateUser(response.user);
      setMessage('Profile updated successfully.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to update your profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const initials = (form.name || 'User').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
  const displayedAvatar = pendingAvatar || avatarData;

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Profile</p>
          <h2 className="mt-2 text-3xl font-bold text-white">User profile</h2>
        </div>

        {error ? <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div> : null}
        {message ? <div className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{message}</div> : null}

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex flex-col items-center">
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-cyan-500/10 text-2xl font-bold text-cyan-300">
                {displayedAvatar ? <img src={displayedAvatar} alt="Profile preview" className="h-full w-full object-cover" /> : initials}
                <button type="button" onClick={() => fileInputRef.current?.click()} aria-label="Choose profile photo" className="absolute -bottom-2 -right-1 rounded-full border border-slate-800 bg-slate-950 p-2 text-cyan-300"><Camera className="h-4 w-4" /></button>
              </div>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className="hidden" />
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-lg border border-cyan-500/30 px-3 py-2 text-xs text-cyan-200">Change photo</button>
                {displayedAvatar ? <button type="button" onClick={() => { setPendingAvatar(''); setAvatarData(''); }} className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300"><X className="h-3 w-3" />Remove</button> : null}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{form.name || 'User'}</h3>
              <p className="mt-2 text-sm text-slate-400">{user?.role === 'admin' ? 'Administrator' : 'Security Analyst'}</p>
            </div>
          </div>

          <form className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <label className="block"><span className="mb-2 block text-xs uppercase tracking-[0.18em] text-slate-400">Name</span><div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"><UserRound className="h-5 w-5 text-cyan-300" /><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} disabled={isLoading || isSaving} className="w-full bg-transparent text-white outline-none disabled:opacity-60" /></div></label>
              <label className="block"><span className="mb-2 block text-xs uppercase tracking-[0.18em] text-slate-400">Email</span><div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"><Mail className="h-5 w-5 text-cyan-300" /><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} disabled={isLoading || isSaving} className="w-full bg-transparent text-white outline-none disabled:opacity-60" /></div></label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"><ShieldCheck className="h-5 w-5 text-cyan-300" /><div><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Security score</p><p className="mt-1 text-white">82 / 100</p></div></div>
              <button type="submit" disabled={isLoading || isSaving} className="rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? 'Saving...' : 'Save profile'}</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
