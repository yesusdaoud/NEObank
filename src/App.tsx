import { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import Button from '@/components/Button';
import Dashboard from '@/components/Dashboard';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setSessionChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Identifiants incorrects. Vérifiez votre e-mail et mot de passe.');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setEmail('');
    setPassword('');
  };

  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-[var(--color-navy)] flex items-center justify-center">
        <Loader2 size={24} className="text-[var(--color-lime)] animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  const loginForm = () => (
    <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full max-w-[360px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-heading text-[var(--color-ink)]">Bon retour, Shelsea</h2>
        <p className="text-body text-[var(--color-muted)]">Connectez-vous à votre espace bancaire.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
          <Shield size={14} className="text-red-600" />
          <p className="text-[13px] text-red-700 font-medium">{error}</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-label text-[var(--color-ink)]">Adresse e-mail</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="shelsea@neobank.fr"
            required
            className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] pl-10 pr-4 py-3 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 outline-none transition-all duration-200 focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/15"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-label text-[var(--color-ink)]">Mot de passe</label>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] pl-10 pr-11 py-3 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 outline-none transition-all duration-200 focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/15"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <p className="text-[13px] text-[var(--color-muted)] leading-relaxed">
        Identifiants de connexion uniquement. Aucune donnée n'est transmise.
      </p>

      <div className="w-full">
        <Button label={loading ? 'Connexion...' : 'Accéder au tableau de bord'} onClick={() => {}} />
      </div>
    </form>
  );

  return (
    <div className="min-h-screen w-full bg-[var(--color-navy)] flex flex-col items-center justify-center px-4 py-8 md:p-8">
      {/* Desktop card */}
      <div className="hidden md:flex w-full max-w-[1120px] min-h-[640px] rounded-3xl overflow-hidden bg-[var(--color-navy)] shadow-2xl shadow-black/40">
        <div className="brand-gradient flex-1 flex flex-col justify-between p-11">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[10px] bg-[var(--color-lime)] flex items-center justify-center text-[var(--color-navy)] font-bold text-sm">
              N
            </div>
            <span className="text-white font-semibold text-[15px] tracking-wide">NÉO BANK</span>
          </div>
          <div className="flex flex-col gap-[18px]">
            <p className="text-[var(--color-lime)] font-semibold text-[13px] tracking-[0.15em] uppercase">
              Banking, Reimagined
            </p>
            <h1 className="text-display text-white">La finance à votre rythme.</h1>
            <p className="text-body text-white/60 max-w-[340px]">
              Une expérience bancaire automatisée, conçue pour une utilisation moderne et sereine.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Shield size={16} className="text-[var(--color-lime)]" />
            <p className="text-white/50 text-[13px]">Sécurisé — Centre d'aide 24/7</p>
          </div>
        </div>
        <div className="flex-1 bg-[var(--color-surface)] flex flex-col justify-center items-center p-11">
          {loginForm()}
        </div>
      </div>

      {/* Mobile card */}
      <div className="flex md:hidden w-full max-w-[390px] flex-col rounded-[18px] overflow-hidden bg-[var(--color-navy)] shadow-2xl shadow-black/40">
        <div className="brand-gradient flex flex-col gap-10 p-7">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[10px] bg-[var(--color-lime)] flex items-center justify-center text-[var(--color-navy)] font-bold text-sm">
              N
            </div>
            <span className="text-white font-semibold text-[15px] tracking-wide">NÉO BANK</span>
          </div>
          <div className="flex flex-col gap-[18px]">
            <p className="text-[var(--color-lime)] font-semibold text-[13px] tracking-[0.15em] uppercase">
              Banking, Reimagined
            </p>
            <h1 className="text-display text-white">La finance à votre rythme.</h1>
            <p className="text-body text-white/60">
              Une expérience bancaire automatisée, conçue pour une utilisation moderne et sereine.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Shield size={16} className="text-[var(--color-lime)]" />
            <p className="text-white/50 text-[13px]">Sécurisé — Centre d'aide 24/7</p>
          </div>
        </div>
        <div className="bg-[var(--color-surface)] flex flex-col justify-center items-center p-7">
          {loginForm()}
        </div>
      </div>
    </div>
  );
}
