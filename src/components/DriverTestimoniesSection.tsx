import React, { useState } from 'react';
import { Volume2, VolumeX, Quote, AlertCircle, Camera, CheckCircle2, ChevronRight, UserCheck, Stethoscope, ShieldCheck } from 'lucide-react';
import { DRIVER_TESTIMONIES, EXPERT_INSIGHTS, DriverTestimony, ExpertInsight } from '../data/campaignData.ts';
import { CAMPAIGN_IMAGES } from '../utils/imageMap.ts';
import { speakText, stopSpeaking } from '../utils/audioSynth.ts';

export const DriverTestimoniesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'moto' | 'camion' | 'taxi' | 'experts'>('all');
  const [activeTestimony, setActiveTestimony] = useState<DriverTestimony>(DRIVER_TESTIMONIES[0]);
  const [activeExpert, setActiveExpert] = useState<ExpertInsight>(EXPERT_INSIGHTS[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [viewMode, setViewMode] = useState<'conducteurs' | 'experts'>('conducteurs');

  const filteredTestimonies = selectedCategory === 'all' || selectedCategory === 'experts'
    ? DRIVER_TESTIMONIES
    : DRIVER_TESTIMONIES.filter(t => t.category === selectedCategory);

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(text, 'fr-FR', () => setIsSpeaking(false));
    }
  };

  const getTestimonyImage = (key: string) => {
    if (key === 'testimony_moto') return CAMPAIGN_IMAGES.testimony_moto;
    if (key === 'testimony_truck') return CAMPAIGN_IMAGES.testimony_truck;
    if (key === 'hero') return CAMPAIGN_IMAGES.hero;
    return CAMPAIGN_IMAGES.moto;
  };

  const getExpertImage = (key: string) => {
    if (key === 'expert_safety') return CAMPAIGN_IMAGES.expert_safety;
    return CAMPAIGN_IMAGES.studio;
  };

  return (
    <section className="py-12 bg-neutral-950 text-neutral-100 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>RÉCITS VÉCUS & PAROLES D'EXPERTS KINOIS</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>KINSHASA VÉRITÉ ROUTIÈRE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-2 font-display">
            Témoignages Poignants de Conducteurs & Éclairages d'Experts
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 leading-relaxed">
            Pour toucher le cœur des conducteurs de Kinshasa, rien ne remplace la voix de ceux qui ont frôlé la mort ou qui sauvent des vies chaque jour sur le bitume kinois.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
            <button
              onClick={() => { setViewMode('conducteurs'); }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                viewMode === 'conducteurs'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Témoignages de Conducteurs ({DRIVER_TESTIMONIES.length})
            </button>
            <button
              onClick={() => { setViewMode('experts'); }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                viewMode === 'experts'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Points de Vue d'Experts Locaux ({EXPERT_INSIGHTS.length})
            </button>
          </div>

          {viewMode === 'conducteurs' && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-500 mr-1 hidden sm:inline">Filtrer par engin :</span>
              {[
                { id: 'all', label: 'Tous' },
                { id: 'moto', label: 'Wewa (Motos)' },
                { id: 'camion', label: 'Camions Poids Lourds' },
                { id: 'taxi', label: 'Taxis & 207' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedCategory(f.id as any)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === f.id
                      ? 'bg-neutral-800 text-amber-300 border border-neutral-700'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DRIVERS VIEW */}
        {viewMode === 'conducteurs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* List of Driver Testimonies */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                Sélectionner un conducteur témoin :
              </div>
              {filteredTestimonies.map((item) => {
                const isSelected = activeTestimony.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveTestimony(item);
                      if (isSpeaking) {
                        stopSpeaking();
                        setIsSpeaking(false);
                      }
                    }}
                    className={`cursor-pointer rounded-xl p-4 border transition-all ${
                      isSelected
                        ? 'bg-neutral-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-neutral-700">
                        <img
                          src={getTestimonyImage(item.imageKey)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-neutral-100 truncate">
                            {item.name}
                          </h4>
                          <span className="text-xs text-amber-400/90 font-mono">
                            {item.experienceYears} ans de métier
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5 truncate">
                          {item.role}
                        </div>
                        <p className="text-xs text-neutral-300 mt-2 line-clamp-2 italic">
                          "{item.quoteLingala}"
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Documentary filming tip callout */}
              <div className="mt-6 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400">
                <div className="flex items-center gap-2 font-semibold text-neutral-200 mb-1">
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Conseil de réalisation vidéo pour interviews :</span>
                </div>
                <p>
                  Pour donner un impact maximal au témoignage, filmez le conducteur sur son lieu de travail réel (au parking de taxis ou à côté de sa moto/camion), en plan serré à hauteur des yeux avec un micro-cravate pour isoler sa voix du vacarme de la route.
                </p>
              </div>
            </div>

            {/* Detailed Selected Driver Testimony Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
                {/* Visual Header with Real Kinshasa Portrait */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={getTestimonyImage(activeTestimony.imageKey)}
                    alt={activeTestimony.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                  
                  {/* Overlay Meta */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                        {activeTestimony.location}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-100 font-display">
                        {activeTestimony.name}
                      </h3>
                      <div className="text-xs text-neutral-300">
                        {activeTestimony.role} · {activeTestimony.age} ans
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeak(`${activeTestimony.name}. ${activeTestimony.fullStory}`)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-700 text-xs font-semibold text-amber-300 transition-colors shadow-lg"
                      title="Écouter la lecture audio du témoignage"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-4 h-4 text-rose-400" />
                          <span>Arrêter l'audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-amber-400" />
                          <span>Écouter le récit</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-6">
                  {/* Lingala & French Quotes */}
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-start gap-3">
                      <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm sm:text-base font-bold text-amber-300 italic">
                          "{activeTestimony.quoteLingala}"
                        </p>
                        <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                          Traduction : "{activeTestimony.quoteFrench}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Context of the Accident */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                      <span>Contexte de l'accident / L'expérience limite :</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-950/60 p-3 rounded-lg border border-neutral-800">
                      {activeTestimony.accidentContext}
                    </p>
                  </div>

                  {/* Full Story Narrative */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                      Récit intégral du conducteur :
                    </h4>
                    <p className="text-sm text-neutral-200 leading-relaxed">
                      {activeTestimony.fullStory}
                    </p>
                  </div>

                  {/* Lesson Learned */}
                  <div className="border-t border-neutral-800 pt-4">
                    <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>La leçon retenue pour la sécurité routière :</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-200 font-medium">
                      {activeTestimony.lessonLearned}
                    </p>
                  </div>

                  {/* Director's Video Hook Recommendation */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Idée d'accroche vidéo pour votre campagne (Hook 3 secondes) :</span>
                    </div>
                    <p className="text-xs text-neutral-300">
                      {activeTestimony.recommendedVideoHook}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EXPERTS VIEW */}
        {viewMode === 'experts' && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EXPERT_INSIGHTS.map((expert) => {
                const isSelected = activeExpert.id === expert.id;
                return (
                  <div
                    key={expert.id}
                    onClick={() => setActiveExpert(expert)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                      isSelected
                        ? 'bg-neutral-900 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-amber-400/40">
                        <img
                          src={getExpertImage(expert.imageKey)}
                          alt={expert.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-100">{expert.name}</h4>
                        <div className="text-xs text-amber-400 font-medium">{expert.institution}</div>
                        <div className="text-xs text-neutral-400">{expert.title}</div>
                      </div>
                    </div>

                    <div className="text-xs font-impact text-amber-300 mb-2">
                      CHIFFRE CLÉ KINSHASA :
                    </div>
                    <p className="text-xs text-neutral-300 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 mb-3 font-mono">
                      {expert.keyStatistic}
                    </p>

                    <p className="text-xs text-neutral-300 line-clamp-3 italic">
                      "{expert.quote}"
                    </p>

                    <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-amber-400 font-medium">
                      <span>Consulter les conseils de production</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* In-depth Expert Strategy Panel */}
            <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-neutral-700">
                    <img
                      src={getExpertImage(activeExpert.imageKey)}
                      alt={activeExpert.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Point de vue officiel de l'expert
                    </div>
                    <h3 className="text-xl font-bold text-neutral-100">
                      {activeExpert.name}
                    </h3>
                    <div className="text-xs text-neutral-400">
                      {activeExpert.title} · <strong className="text-neutral-300">{activeExpert.institution}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
                    <span className="text-neutral-500">Spécialité :</span> <span className="text-amber-300 font-semibold">{activeExpert.focusArea}</span>
                  </div>
                </div>
              </div>

              {/* Main Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                      Recommandation fondamentale pour la campagne :
                    </h4>
                    <p className="text-sm text-neutral-200 leading-relaxed font-medium bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                      {activeExpert.mainRecommendation}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="text-xs font-impact text-amber-400 uppercase tracking-wider mb-1">
                      Citation de référence :
                    </div>
                    <blockquote className="text-sm font-semibold text-amber-200 italic">
                      "{activeExpert.quote}"
                    </blockquote>
                  </div>
                </div>

                {/* Video Strategy Directives */}
                <div>
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                    Directives concrètes pour votre réalisation vidéo :
                  </h4>
                  <ul className="space-y-3">
                    {activeExpert.videoStrategyAdvice.map((advice, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 bg-neutral-950/60 p-3 rounded-lg border border-neutral-800">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
