import React from 'react';
import { Play, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';
import { CAMPAIGN_IMAGES } from '../utils/imageMap.ts';

interface HeroSectionProps {
  onNavigateTab: (tab: string) => void;
  onOpenQuickScript: (scriptId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateTab, onOpenQuickScript }) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950">
      {/* Background with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={CAMPAIGN_IMAGES.hero}
          alt="Circulation routière intense à Kinshasa sur le Boulevard du 30 Juin"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 filter saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/60 to-neutral-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24">
        <div className="max-w-3xl space-y-6">
          {/* Subtle editorial kicker without pill box */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <span>RÉPUBLIQUE DÉMOCRATIQUE DU CONGO</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>VILLE-PROVINCE DE KINSHASA</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>CNPR & PCR</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-100 font-display leading-[1.1] [text-wrap:balance]">
            Sensibiliser les Conducteurs de Kinshasa : De la Rue au Format Vidéo Percutant
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
            Comment concevoir, tourner et diffuser des vidéos de sécurité routière qui changent réellement les comportements des motards <strong className="text-amber-300 font-semibold">Wewa</strong>, des chauffeurs de taxi-bus <strong className="text-amber-300 font-semibold">207 / Ketch</strong> et des conducteurs de <strong className="text-amber-300 font-semibold">Poids Lourds</strong> à Kinshasa.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('temoignages')}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/10 whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-neutral-950" />
              <span>Témoignages & Points de Vue d'Experts</span>
            </button>

            <button
              onClick={() => onNavigateTab('studio')}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold text-sm transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Générateur de Scénarios Vidéo</span>
            </button>

            <button
              onClick={() => onNavigateTab('guide')}
              className="flex items-center gap-1.5 px-4 py-3 text-neutral-400 hover:text-neutral-100 text-sm font-medium transition-colors"
            >
              <span>Guide en 6 Étapes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Key data strip without pills */}
          <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <div className="text-2xl font-impact text-amber-400 tabular-nums">400 000+</div>
              <div className="text-xs text-neutral-400 mt-0.5">Motos Wewa actives</div>
            </div>
            <div>
              <div className="text-2xl font-impact text-neutral-200 tabular-nums">70%</div>
              <div className="text-xs text-neutral-400 mt-0.5">Traumatismes évitables</div>
            </div>
            <div>
              <div className="text-2xl font-impact text-amber-400 tabular-nums">3 Cibles</div>
              <div className="text-xs text-neutral-400 mt-0.5">Wewa, 207 & Poids Lourds</div>
            </div>
            <div>
              <div className="text-2xl font-impact text-neutral-200 tabular-nums">100% Kinois</div>
              <div className="text-xs text-neutral-400 mt-0.5">Lingala & Français urbain</div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Focus Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => onOpenQuickScript('script-wewa-casque')}
            className="group cursor-pointer rounded-xl bg-neutral-900/80 border border-neutral-800 p-5 hover:border-amber-500/50 transition-all hover:bg-neutral-900"
          >
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-semibold text-amber-400 uppercase tracking-wider">Cible n°1</span>
              <span>45 sec · TikTok / WhatsApp</span>
            </div>
            <h3 className="text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
              Mototaxis "Wewa" & Passagers
            </h3>
            <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2">
              Le casque obligatoire ("Casque ezali bomoi"), arrêt des slaloms mortels et fin de la surcharge à 3 passagers.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
              <span>Voir le scénario & le découpage</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onOpenQuickScript('script-taxi207-vitesse')}
            className="group cursor-pointer rounded-xl bg-neutral-900/80 border border-neutral-800 p-5 hover:border-amber-500/50 transition-all hover:bg-neutral-900"
          >
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-semibold text-amber-400 uppercase tracking-wider">Cible n°2</span>
              <span>45 sec · Réseaux & TV</span>
            </div>
            <h3 className="text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
              Chauffeurs de 207 & Taxis Ketch
            </h3>
            <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2">
              L'arrêt des "demi-terrains" meurtriers, gestion de la panique du versement quotidien et respect des arrêts réguliers.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
              <span>Voir le scénario & le découpage</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onOpenQuickScript('script-camion-angle-mort')}
            className="group cursor-pointer rounded-xl bg-neutral-900/80 border border-neutral-800 p-5 hover:border-amber-500/50 transition-all hover:bg-neutral-900"
          >
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-semibold text-amber-400 uppercase tracking-wider">Cible n°3</span>
              <span>50 sec · Écrans carrefours</span>
            </div>
            <h3 className="text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
              Camions Poids Lourds & Remorques
            </h3>
            <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2">
              Sensibilisation aux angles morts sur Poids Lourds et By-Pass : "Soki omoni chauffeur te, ye mpe azali komona yo te".
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
              <span>Voir le scénario & le découpage</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
