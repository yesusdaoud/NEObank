import { useState } from 'react';
import {
  ArrowDownLeft,
  Bell,
  CircleHelp,
  CreditCard,
  Home,
  LogOut,
  Plus,
  Send,
  Settings,
  X,
} from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface DashboardProps {
  user: SupabaseUser;
  onLogout: () => void;
}

interface Transaction {
  id: string;
  label: string;
  detail: string;
  amount: string;
  type: 'in' | 'out';
  initials: string;
}

const transactions: Transaction[] = [
  { id: '1', label: 'Marché Atelier', detail: "Aujourd'hui • 09:42", amount: '- €68.40', type: 'out', initials: 'C' },
  { id: '2', label: 'Northstar Studio', detail: '24 septembre • 14:10', amount: '+ €4,820.00', type: 'in', initials: '+' },
  { id: '3', label: 'NEO Protect', detail: '22 septembre • Abonnement', amount: '- €18.99', type: 'out', initials: 'N' },
];

const sidebarItems = [
  { label: "Vue d'ensemble", icon: Home },
  { label: 'Mes cartes', icon: CreditCard },
  { label: 'Virements', icon: Send },
  { label: 'Réglages', icon: Settings },
];

const quickActions = [
  { label: 'Nouveau virement', icon: Send },
  { label: "Demander de l'argent", icon: ArrowDownLeft },
  { label: 'Ajouter des fonds', icon: Plus },
];

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeSidebar, setActiveSidebar] = useState("Vue d'ensemble");
  const [modalOpen, setModalOpen] = useState(false);
  const email = user.email ?? 'shelseabenjamin57@gmail.com';
  const fullName = 'Shelsea Benjamin';

  const openAction = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[var(--color-ink)]">
      <div className="mx-auto flex min-h-screen max-w-[1440px] gap-0 p-4 lg:p-6">
        <aside className="hidden w-[224px] shrink-0 flex-col rounded-[14px] bg-[#081d3d] p-4 text-white md:flex lg:w-[256px]">
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[var(--color-lime)] text-sm font-bold text-[var(--color-navy)]">N</div>
            <span className="text-[13px] font-bold tracking-tight">NÉO BANK</span>
          </div>

          <nav className="mt-7 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = activeSidebar === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveSidebar(item.label)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[11px] font-medium transition-colors ${active ? 'bg-[#193459] text-white' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}
                >
                  <Icon size={14} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 rounded-lg bg-[#17384a] px-3 py-2.5 text-[10px] font-semibold text-[var(--color-lime)]">
            NÉO BANK GOLD
          </div>

          <button onClick={onLogout} className="mt-auto flex items-center gap-3 px-3 py-2 text-[11px] text-white/55 hover:text-white">
            <LogOut size={14} />
            Se déconnecter
          </button>
        </aside>

        <main className="min-w-0 flex-1 px-0 md:px-5 lg:px-6">
          <header className="flex items-start justify-between pb-5">
            <div>
              <h1 className="text-[21px] font-bold tracking-tight text-[#0c2245] sm:text-[25px]">Bonjour, Shelsea</h1>
              <p className="mt-1 text-[10px] text-[#71809a]">Jeudi 26 septembre 2026</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#d8e0ed] bg-white px-2 py-1.5">
              <Bell size={12} className="text-[#667792]" />
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-blue)] text-[9px] font-bold text-white">SB</div>
            </div>
          </header>

          <section className="grid gap-3 lg:grid-cols-[1fr_1fr]">
            <div className="flex min-h-[134px] flex-col justify-between rounded-[12px] bg-[#081d3d] p-4 text-white shadow-sm">
              <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-wide text-white/65">
                <span>Solde disponible</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-lime)]" />
              </div>
              <p className="text-[25px] font-bold tracking-tight">32,650.80 €</p>
              <p className="text-[9px] text-white/55">Compte courant • **** 3487</p>
            </div>

            <div className="flex min-h-[134px] flex-col justify-between rounded-[12px] bg-gradient-to-br from-[#2e5df0] to-[#2048c5] p-4 text-white shadow-sm">
              <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-wide text-white/80">
                <span>Neo virtual card</span>
                <CreditCard size={14} />
              </div>
              <p className="text-[13px] font-semibold tracking-[0.12em]">5278 •••• •••• 1048</p>
              <div className="flex justify-between text-[8px] uppercase text-white/75"><span>{fullName}</span><span>12/30</span></div>
            </div>
          </section>

          <section className="mt-4">
            <h2 className="mb-2 text-[16px] font-bold text-[#122849]">Actions rapides</h2>
            <div className="grid gap-2 sm:grid-cols-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button key={action.label} onClick={openAction} className="flex items-center gap-2 rounded-lg border border-[#d8e0ed] bg-white px-3 py-2 text-left text-[10px] font-semibold text-[#1b3154] transition hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]">
                    <Icon size={13} />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-4 overflow-hidden rounded-[12px] border border-[#d8e0ed] bg-white">
            <div className="flex items-center justify-between border-b border-[#e5eaf2] px-4 py-3">
              <h2 className="text-[16px] font-bold text-[#122849]">Transactions récentes</h2>
              <button onClick={openAction} className="text-[9px] font-semibold text-[#1b3154] hover:text-[var(--color-blue)]">Voir tout</button>
            </div>
            <div className="divide-y divide-[#e5eaf2] px-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${transaction.type === 'in' ? 'bg-[#e6f7ed] text-[#1aa463]' : transaction.initials === 'N' ? 'bg-[#eaf0ff] text-[var(--color-blue)]' : 'bg-[#fff0e9] text-[#e27a43]'}`}>
                      {transaction.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-bold text-[#193051]">{transaction.label}</p>
                      <p className="mt-0.5 truncate text-[8px] text-[#8390a7]">{transaction.detail}</p>
                    </div>
                  </div>
                  <p className={`shrink-0 text-[10px] font-bold ${transaction.type === 'in' ? 'text-[#15965a]' : 'text-[#193051]'}`}>{transaction.amount}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-4 flex items-center justify-between rounded-[12px] border border-[#d8e0ed] bg-white px-4 py-3">
            <div>
              <h2 className="text-[15px] font-bold text-[#122849]">Récapitulatif des virements</h2>
              <p className="mt-1 text-[9px] text-[#8390a7]">Ce mois-ci, vous avez envoyé 3 virements pour un total de €1,245.00.</p>
            </div>
            <div className="rounded-lg bg-[#f1f5fb] px-4 py-2 text-right">
              <p className="text-[8px] uppercase text-[#91a0b8]">À venir</p>
              <p className="text-[13px] font-bold text-[#193051]">€840.00</p>
            </div>
          </section>

          <section className="mt-4 flex items-center justify-between rounded-[12px] bg-gradient-to-r from-[#153970] to-[#1f4c9a] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2e6a64]"><CircleHelp size={16} className="text-[var(--color-lime)]" /></div>
              <div><p className="text-[11px] font-bold">Besoin d'aide ?</p><p className="text-[8px] text-white/65">Centre d'assistance disponible 24h/24 pour répondre à vos préoccupations.</p></div>
            </div>
            <button onClick={openAction} className="rounded-md bg-[#4c8e7b] px-2 py-1 text-[8px] font-bold text-[var(--color-lime)]">FONCTIONNEL</button>
          </section>

          <section className="mt-4 grid gap-3 rounded-[12px] border border-[#d8e0ed] bg-white p-3 sm:grid-cols-2">
            <div className="rounded-lg bg-[#f1f5fb] p-3">
              <h2 className="text-[16px] font-bold text-[#122849]">Mon profil</h2>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-blue)] text-[10px] font-bold text-white">SB</div>
                <div><p className="text-[9px] font-bold text-[#193051]">{fullName}</p><p className="text-[7px] text-[#8390a7]">{email}</p></div>
              </div>
              <p className="mt-2 text-[7px] font-semibold text-[#1ca668]">Compte vérifié • bénéficiaire autorisé pour un usage social</p>
            </div>
            <div className="p-1 sm:pl-2">
              <h2 className="text-[16px] font-bold text-[#122849]">Transfert</h2>
              <p className="mt-1 text-[9px] text-[#8390a7]">Choisissez une action pour effectuer une opération.</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={openAction} className="rounded-md bg-[var(--color-blue)] py-2 text-[9px] font-bold text-white transition hover:bg-[#1f52de]">Envoyer</button>
                <button onClick={openAction} className="rounded-md bg-[var(--color-blue)] py-2 text-[9px] font-bold text-white transition hover:bg-[#1f52de]">Recevoir</button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071a38]/65 px-5 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="next-step-title">
          <div className="relative w-full max-w-[416px] rounded-[24px] bg-white px-8 pb-8 pt-8 text-center shadow-2xl sm:px-9">
            <button onClick={() => setModalOpen(false)} aria-label="Fermer" className="absolute right-5 top-5 text-[#9aa8bd] transition hover:text-[#122849]"><X size={18} /></button>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f6fb]"><Settings size={27} className="text-[var(--color-blue)]" /></div>
            <h2 id="next-step-title" className="mt-5 text-[26px] font-bold tracking-tight text-[#102340]">Prochaine étape</h2>
            <p className="mx-auto mt-3 max-w-[280px] text-[17px] leading-6 text-[#8190aa]">Contact the account debugger for the next steps. Thank you.</p>
            <button onClick={() => setModalOpen(false)} className="mt-5 w-full rounded-[14px] bg-[var(--color-blue)] py-3 text-[17px] font-bold text-white transition hover:bg-[#1f52de]">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
