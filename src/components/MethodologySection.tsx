import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, AlertTriangle, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { METHODOLOGY_STEPS, StepGuide } from '../data/campaignData.ts';

export const MethodologySection: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const activeStep: StepGuide = METHODOLOGY_STEPS.find((s) => s.id === activeStepId) || METHODOLOGY_STEPS[0];

  const toggleCheck = (item: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <section className="py-12 bg-neutral-950 text-neutral-100 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>MÉTHODOLOGIE DE CAMPAGNE AUDIOVISUELLE KINOISE</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>6 ÉTAPES CLÉS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-2 font-display">
            Comment Réussir sa Campagne Vidéo à Kinshasa
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 leading-relaxed">
            De la préparation administrative avec la PCR jusqu'à la diffusion virale sur les téléphones des chauffeurs dans les parkings de Victoire, Pascal ou Gambela.
          </p>
        </div>

        {/* 6 Steps Navigation Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {METHODOLOGY_STEPS.map((step) => {
            const isCurrent = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-neutral-900 border-amber-400 shadow-md ring-1 ring-amber-400/20'
                    : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-400 font-bold">
                  ÉTAPE 0{step.id}
                </div>
                <div className="text-xs font-bold text-neutral-100 truncate mt-1">
                  {step.title}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  {step.timeframe}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep Dive Card */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div>
              <div className="text-xs font-mono font-bold text-amber-400">
                ÉTAPE 0{activeStep.id} · {activeStep.timeframe}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 mt-1 font-display">
                {activeStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                {activeStep.subtitle}
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
              {activeStep.steps.length} actions opérationnelles
            </div>
          </div>

          <p className="text-sm text-neutral-200 mt-5 leading-relaxed bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80 font-medium">
            {activeStep.summary}
          </p>

          {/* Sub-steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            {activeStep.steps.map((st, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-neutral-950 p-5 border border-neutral-800/90 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-amber-400 mb-1">
                    0{idx + 1}. {st.label}
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed mt-2">
                    {st.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80">
                  <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Réalité Kinoise de Terrain :</span>
                  </div>
                  <p className="text-xs text-neutral-400 italic">
                    {st.kinshasaTip}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checklist Area */}
          <div className="mt-8 pt-6 border-t border-neutral-800">
            <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Checklist de validation pour cette étape :</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeStep.checklist.map((item, idx) => {
                const checked = !!completedItems[item];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCheck(item)}
                    className={`flex items-start gap-2.5 p-3 rounded-lg text-left text-xs transition-colors border ${
                      checked
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                        checked
                          ? 'bg-emerald-500 border-emerald-500 text-neutral-950'
                          : 'border-neutral-600 bg-neutral-900'
                      }`}
                    >
                      {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className={checked ? 'line-through opacity-80' : ''}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
