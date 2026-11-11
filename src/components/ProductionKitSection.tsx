import React, { useState } from 'react';
import { FileText, Copy, Check, Printer, DollarSign, Calculator, Shield, BatteryCharging, Mic, Sun } from 'lucide-react';
import { BUDGET_DEFAULT_ITEMS } from '../data/campaignData.ts';

export const ProductionKitSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'autorisation' | 'checklist' | 'budget'>('autorisation');
  const [copied, setCopied] = useState(false);

  // Authorization Form State
  const [prodName, setProdName] = useState('Équipe de Production Kin-Sécurité');
  const [directorName, setDirectorName] = useState('Mehola Ngoy');
  const [phone, setPhone] = useState('+243 81 000 0000');
  const [filmDates, setFilmDates] = useState('Du 15 au 18 du mois en cours');
  const [locations, setLocations] = useState('Rond-Point Victoire (Kalamu) & Avenue Poids Lourds (Barumbu)');

  // Budget State
  const [exchangeRate, setExchangeRate] = useState<number>(2850);
  const [budgetItems, setBudgetItems] = useState(BUDGET_DEFAULT_ITEMS);

  const handleCopyLetter = () => {
    const letter = `A l'attention de Monsieur le Commissaire Provincial de la Police de Circulation Routière (PCR)
Ville-Province de Kinshasa, RDC

Objet : Demande d'autorisation de tournage pour une campagne de sensibilisation à la sécurité routière

Monsieur le Commissaire Provincial,

Nous venons par la présente solliciter votre haute bienveillance afin de nous accorder l'autorisation de tournage d'une capsule vidéo d'intérêt public dédiée à la sensibilisation routière des conducteurs de motos (Wewa), chauffeurs de taxis-bus 207 et conducteurs de poids lourds.

Détails de la production :
- Structure organisatrice : ${prodName}
- Responsable de tournage / Réalisateur : ${directorName}
- Téléphone de contact : ${phone}
- Période de tournage sollicitée : ${filmDates}
- Lieux ciblés : ${locations}
- Équipe technique : 4 techniciens équipés de gilets de sécurité fluorescents, 3 comédiens locaux.

Cette démarche s'inscrit en parfait accord avec les objectifs de la Commission Nationale de Prévention Routière (CNPR) pour la réduction des accidents et la protection des vies humaines dans notre capitale.

Dans l'attente d'une suite favorable, nous vous prions d'agréer, Monsieur le Commissaire Provincial, l'expression de notre très haute considération.

Fait à Kinshasa, le ${new Date().toLocaleDateString('fr-FR')}

Pour l'équipe de production,
${directorName}`;

    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const updateCost = (id: string, newCost: number) => {
    setBudgetItems(prev => prev.map(item => item.id === id ? { ...item, costUSD: newCost } : item));
  };

  const totalUSD = budgetItems.reduce((acc, curr) => acc + curr.costUSD, 0);
  const totalCDF = totalUSD * exchangeRate;

  return (
    <section className="py-12 bg-neutral-950 text-neutral-100 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>BOÎTE À OUTILS TECHNIQUE & BUDGET KINSHASA</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>KIT COMPLET</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-2 font-display">
            Kit de Tournage & Estimation Budgétaire
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 leading-relaxed">
            Tout le nécessaire administratif et logistique pour tourner en toute légalité et sécurité dans les rues de Kinshasa.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 pb-6 border-b border-neutral-800">
          <button
            onClick={() => setActiveTab('autorisation')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'autorisation'
                ? 'bg-amber-400 text-neutral-950'
                : 'text-neutral-400 hover:text-neutral-200 bg-neutral-900'
            }`}
          >
            Modèle Lettre Autorisation PCR
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'checklist'
                ? 'bg-amber-400 text-neutral-950'
                : 'text-neutral-400 hover:text-neutral-200 bg-neutral-900'
            }`}
          >
            Matériel Recommandé Kinshasa
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'budget'
                ? 'bg-amber-400 text-neutral-950'
                : 'text-neutral-400 hover:text-neutral-200 bg-neutral-900'
            }`}
          >
            Calculateur de Budget (USD & CDF)
          </button>
        </div>

        {/* Tab 1: Official Authorization Letter */}
        {activeTab === 'autorisation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-5 rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-4">
              <h3 className="text-base font-bold text-neutral-100 pb-3 border-b border-neutral-800">
                Personnaliser la demande officielle
              </h3>

              <div className="text-xs space-y-3">
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Nom de votre collectif / structure :</label>
                  <input
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Nom du réalisateur / responsable :</label>
                  <input
                    type="text"
                    value={directorName}
                    onChange={(e) => setDirectorName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Téléphone de contact à Kinshasa :</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Dates prévues de tournage :</label>
                  <input
                    type="text"
                    value={filmDates}
                    onChange={(e) => setFilmDates(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Carrefours / Avenues ciblées :</label>
                  <input
                    type="text"
                    value={locations}
                    onChange={(e) => setLocations(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-100"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCopyLetter}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-neutral-950" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Lettre copiée dans le presse-papier !' : 'Copier la lettre officielle'}</span>
                </button>
              </div>
            </div>

            {/* Letter Preview */}
            <div className="lg:col-span-7 rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 font-serif text-neutral-300 text-xs sm:text-sm leading-relaxed space-y-4">
              <div className="text-right text-xs font-sans text-neutral-400">
                Kinshasa, le {new Date().toLocaleDateString('fr-FR')}
              </div>

              <div className="font-sans text-xs font-bold text-neutral-200">
                À l'attention de Monsieur le Commissaire Provincial de la Police de Circulation Routière (PCR)<br />
                Ville-Province de Kinshasa, RDC
              </div>

              <div className="font-bold underline text-neutral-100">
                Objet : Demande d'autorisation de tournage pour une campagne de sensibilisation à la sécurité routière
              </div>

              <p>Monsieur le Commissaire Provincial,</p>

              <p>
                Nous venons par la présente solliciter votre haute bienveillance afin de nous accorder l'autorisation de tournage d'une capsule vidéo d'intérêt public dédiée à la sensibilisation routière des conducteurs de motos (Wewa), chauffeurs de taxis-bus 207 et conducteurs de poids lourds.
              </p>

              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 font-sans text-xs space-y-1">
                <div><strong>Structure :</strong> {prodName}</div>
                <div><strong>Responsable :</strong> {directorName} ({phone})</div>
                <div><strong>Dates :</strong> {filmDates}</div>
                <div><strong>Lieux :</strong> {locations}</div>
              </div>

              <p>
                Cette démarche s'inscrit en parfait accord avec les objectifs de la Commission Nationale de Prévention Routière (CNPR) pour la réduction des accidents et la protection des vies humaines dans notre capitale.
              </p>

              <p>
                Dans l'attente d'une suite favorable, nous vous prions d'agréer, Monsieur le Commissaire Provincial, l'expression de notre très haute considération.
              </p>

              <div className="pt-4 font-sans text-xs font-bold text-right text-amber-400">
                {directorName}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Material checklist */}
        {activeTab === 'checklist' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-100">
                1. Son & Gestion du Vacarme
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Le bruit des avertisseurs, motos déchicanées et haut-parleurs ambulants est le piège n°1 à Kinshasa.
              </p>
              <ul className="text-xs text-neutral-400 space-y-2 pt-2 border-t border-neutral-800">
                <li>• 2 micros-cravates sans fil HF (ex: DJI Mic / Rode Wireless Go II)</li>
                <li>• Bonnettes anti-vent à poils longs ("Deadcat") indispensables</li>
                <li>• Enregistreur externe ou retour casque pour contrôler la saturation</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-100">
                2. Lumière Équatoriale
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Le soleil de midi à Kinshasa brûle les visages et crée des ombres dures sous la visière des casques.
              </p>
              <ul className="text-xs text-neutral-400 space-y-2 pt-2 border-t border-neutral-800">
                <li>• Réflecteur pliable 5-en-1 argent/blanc (pour déboucher les visages)</li>
                <li>• Filtre ND variable sur l'objectif pour filmer à f/2.8 en plein soleil</li>
                <li>• Horaires d'or : 6h30 à 8h30 le matin ou 16h30 à 18h le soir</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-100">
                3. Sécurité & Énergie
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Assurer la sécurité physique de l'équipe face aux véhicules lancés à pleine vitesse.
              </p>
              <ul className="text-xs text-neutral-400 space-y-2 pt-2 border-t border-neutral-800">
                <li>• Gilets fluorescents jaunes obligatoires pour tous les techniciens</li>
                <li>• 2 grosses batteries externes (Powerbanks 20 000 mAh) pour les téléphones</li>
                <li>• Cônes de signalisation pour créer une zone tampon de sécurité</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Budget Calculator */}
        {activeTab === 'budget' && (
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
              <div>
                <h3 className="text-xl font-bold text-neutral-100 font-display">
                  Budget Prévisionnel de Production Vidéo
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Estimation réaliste des coûts de production pour une capsule de 45 secondes tournée à Kinshasa.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Taux de change (1 USD en CDF) :</span>
                <input
                  type="number"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(Number(e.target.value) || 2850)}
                  className="w-24 bg-neutral-950 border border-neutral-700 rounded p-1.5 text-xs text-amber-300 font-mono text-right"
                />
              </div>
            </div>

            {/* Budget Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 font-semibold uppercase">
                    <th className="py-2.5">Poste de dépense</th>
                    <th className="py-2.5">Catégorie</th>
                    <th className="py-2.5 text-right">Coût (USD)</th>
                    <th className="py-2.5 text-right">Équivalent (CDF)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {budgetItems.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-950/40">
                      <td className="py-2.5 font-medium text-neutral-200">{item.label}</td>
                      <td className="py-2.5 text-neutral-400">{item.category}</td>
                      <td className="py-2.5 text-right font-mono">
                        <input
                          type="number"
                          value={item.costUSD}
                          onChange={(e) => updateCost(item.id, Number(e.target.value) || 0)}
                          className="w-20 bg-neutral-950 border border-neutral-800 rounded p-1 text-right text-neutral-200"
                        />
                      </td>
                      <td className="py-2.5 text-right font-mono text-neutral-400 tabular-nums">
                        {(item.costUSD * exchangeRate).toLocaleString('fr-FR')} CDF
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-neutral-700 text-sm font-bold">
                    <td colSpan={2} className="py-4 text-neutral-100">TOTAL ESTIMÉ :</td>
                    <td className="py-4 text-right text-amber-400 font-mono tabular-nums text-base">
                      ${totalUSD.toLocaleString('fr-FR')} USD
                    </td>
                    <td className="py-4 text-right text-amber-300 font-mono tabular-nums text-base">
                      {totalCDF.toLocaleString('fr-FR')} CDF
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
