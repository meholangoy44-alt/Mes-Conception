import React from 'react';
import { ShieldAlert, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-neutral-900">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-neutral-100 font-impact text-lg uppercase tracking-wide">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>KIN-SÉCURITÉ ROUTIÈRE</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Guide pratique et studio de création de campagnes vidéo de sensibilisation routière adaptées aux réalités de Kinshasa (Motos Wewa, Chauffeurs 207, Ketch et Poids Lourds).
            </p>
          </div>

          {/* Numéros d'urgence Kinshasa */}
          <div>
            <h4 className="text-neutral-200 font-semibold uppercase tracking-wider text-[11px] mb-3">
              Urgences & Assistance Kinshasa
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Police de Circulation (PCR) : <strong>112 / 118</strong></span>
              </li>
              <li className="flex items-center gap-1.5 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-rose-400" />
                <span>SAMU Urgences Médicales : <strong>+243 81 890 0000</strong></span>
              </li>
              <li className="text-neutral-400">
                Cliniques Universitaires de Kinshasa (CUK - Mont Amba)
              </li>
              <li className="text-neutral-400">
                Hôpital Général de Référence de Kinshasa (Ex-Mama Yemo)
              </li>
            </ul>
          </div>

          {/* Partenaires institutionnels */}
          <div>
            <h4 className="text-neutral-200 font-semibold uppercase tracking-wider text-[11px] mb-3">
              Institutions & Syndicats
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>• CNPR (Commission Nationale de Prévention Routière)</li>
              <li>• Division Provinciale des Transports de Kinshasa</li>
              <li>• ACCO (Association des Chauffeurs du Congo)</li>
              <li>• Syndicats des Conducteurs de Mototaxis Wewa</li>
            </ul>
          </div>

          {/* Message civique */}
          <div>
            <h4 className="text-neutral-200 font-semibold uppercase tracking-wider text-[11px] mb-3">
              Slogan Fondateur
            </h4>
            <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="text-amber-300 font-bold italic">
                "Kobima na ndako malamu, kozonga na libota malamu !"
              </div>
              <div className="text-neutral-400 text-[11px]">
                Partir de chez soi dans la paix, revenir auprès des siens sain et sauf.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
          <div>
            Projet citoyen d'intérêt public pour la réduction des accidents routiers à Kinshasa.
          </div>
          <div className="flex items-center gap-1">
            <span>Fait pour sauver des vies sur les routes de Kinshasa</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
