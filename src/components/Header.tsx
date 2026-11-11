import React from 'react';
import { Video, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand wordmark (single line, no subtitle pill) */}
        <button
          onClick={() => setActiveTab('temoignages')}
          className="flex items-center gap-2.5 text-left text-amber-500 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="font-impact text-xl tracking-wide uppercase text-neutral-100">
            Kin-Sécurité Routière
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <button
            onClick={() => setActiveTab('temoignages')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-100 ${
              activeTab === 'temoignages' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : ''
            }`}
          >
            Témoignages & Experts
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-100 ${
              activeTab === 'guide' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : ''
            }`}
          >
            Guide en 6 Étapes
          </button>
          <button
            onClick={() => setActiveTab('studio')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-100 ${
              activeTab === 'studio' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : ''
            }`}
          >
            Studio de Scénarios
          </button>
          <button
            onClick={() => setActiveTab('storyboard')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-100 ${
              activeTab === 'storyboard' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : ''
            }`}
          >
            Lecteur Storyboard
          </button>
          <button
            onClick={() => setActiveTab('kit')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-100 ${
              activeTab === 'kit' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : ''
            }`}
          >
            Kit Tournage & Budget
          </button>
          <button
            onClick={() => setActiveTab('affiches')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-100 ${
              activeTab === 'affiches' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : ''
            }`}
          >
            Affiches & Slogans
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('studio')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Nouveau Scénario</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex overflow-x-auto gap-2 px-4 py-2 border-t border-neutral-800 text-xs no-scrollbar">
        {[
          { id: 'temoignages', label: 'Témoignages & Experts' },
          { id: 'guide', label: 'Guide en 6 Étapes' },
          { id: 'studio', label: 'Studio Scénarios' },
          { id: 'storyboard', label: 'Storyboard' },
          { id: 'kit', label: 'Kit & Budget' },
          { id: 'affiches', label: 'Affiches' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === item.id
                ? 'bg-amber-500/20 text-amber-300 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
