import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Smartphone, Monitor, ChevronLeft, ChevronRight, Music, AlertTriangle } from 'lucide-react';
import { CampaignScript, ScriptScene } from '../data/campaignData.ts';
import { CAMPAIGN_IMAGES } from '../utils/imageMap.ts';
import { playKinshasaHorn, playPoliceWhistle, playMotoRev, playTruckBrake, speakText, stopSpeaking } from '../utils/audioSynth.ts';

interface StoryboardPlayerProps {
  script: CampaignScript;
}

export const StoryboardPlayer: React.FC<StoryboardPlayerProps> = ({ script }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [isVoiceOverActive, setIsVoiceOverActive] = useState(false);

  const currentScene: ScriptScene = script.scenes[currentSceneIndex] || script.scenes[0];

  // Auto-play through scenes
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentSceneIndex < script.scenes.length - 1) {
          setCurrentSceneIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentSceneIndex, script.scenes.length]);

  const handleNext = () => {
    if (currentSceneIndex < script.scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    stopSpeaking();
    setIsPlaying(false);
    setIsVoiceOverActive(false);
    setCurrentSceneIndex(0);
  };

  const triggerVoiceOver = () => {
    if (isVoiceOverActive) {
      stopSpeaking();
      setIsVoiceOverActive(false);
    } else {
      setIsVoiceOverActive(true);
      const textToSpeak = `Scène ${currentScene.sceneNumber}. ${currentScene.visualAction}. Dialogue : ${currentScene.dialogueFrench}. Note du réalisateur : ${currentScene.directorNote}`;
      speakText(textToSpeak, 'fr-FR', () => setIsVoiceOverActive(false));
    }
  };

  const getSceneImage = () => {
    if (script.targetCategory === 'moto') return CAMPAIGN_IMAGES.moto;
    if (script.targetCategory === 'camion') return CAMPAIGN_IMAGES.camion;
    return CAMPAIGN_IMAGES.hero;
  };

  return (
    <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 md:p-8">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>LECTEUR DE STORYBOARD INTERACTIF</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>SIMULATION DE CAPSULE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 mt-1 font-display">
            {script.title}
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Lieu de tournage : {script.location} · Durée estimée : {script.durationSeconds}s
          </p>
        </div>

        {/* Aspect Ratio Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">Format :</span>
          <div className="flex items-center p-1 bg-neutral-950 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => setAspectRatio('9:16')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                aspectRatio === '9:16'
                  ? 'bg-amber-400 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 TikTok / Status</span>
            </button>
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                aspectRatio === '16:9'
                  ? 'bg-amber-400 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>16:9 TV / Écrans</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Player Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Screen Container */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            className={`relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col transition-all ${
              aspectRatio === '9:16'
                ? 'w-full max-w-[340px] aspect-[9/16]'
                : 'w-full aspect-[16/9]'
            }`}
          >
            {/* Visual Background */}
            <img
              src={getSceneImage()}
              alt="Décor de la scène"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

            {/* Top Scene Badge */}
            <div className="relative z-10 p-4 flex items-center justify-between text-xs">
              <span className="px-2.5 py-1 rounded bg-neutral-950/80 border border-neutral-700 text-amber-300 font-mono font-semibold">
                PLAN {currentScene.sceneNumber} / {script.scenes.length}
              </span>
              <span className="px-2.5 py-1 rounded bg-neutral-950/80 border border-neutral-700 text-neutral-300 font-mono">
                {currentScene.timeCode}
              </span>
            </div>

            {/* Middle Shot Type Watermark */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-4 text-center">
              <div className="bg-neutral-950/70 backdrop-blur-xs border border-neutral-700/60 p-3 rounded-xl max-w-xs">
                <div className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold">
                  Cadrage Caméra
                </div>
                <div className="text-sm font-bold text-neutral-100">
                  {currentScene.shotType}
                </div>
              </div>
            </div>

            {/* Bottom Subtitles & Action Overlay */}
            <div className="relative z-10 p-4 space-y-2 bg-gradient-to-t from-neutral-950 to-transparent">
              {/* Lingala Subtitle */}
              <div className="bg-amber-400 text-neutral-950 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold text-center shadow-lg">
                "{currentScene.dialogueLingala}"
              </div>

              {/* French Translation Subtitle */}
              <div className="bg-neutral-900/90 text-neutral-200 px-3 py-1 rounded text-xs text-center border border-neutral-700 font-medium">
                "{currentScene.dialogueFrench}"
              </div>
            </div>
          </div>

          {/* Timeline & Playback Buttons */}
          <div className="w-full max-w-md mt-6 flex items-center justify-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentSceneIndex === 0}
              className="p-2.5 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Plan précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm transition-colors shadow-sm"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-neutral-950" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-neutral-950" />
                  <span>Lire la vidéo ({currentSceneIndex + 1}/{script.scenes.length})</span>
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={currentSceneIndex === script.scenes.length - 1}
              className="p-2.5 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Plan suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
              title="Recommencer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={triggerVoiceOver}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors border ${
                isVoiceOverActive
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-neutral-800 text-amber-400 border-neutral-700 hover:bg-neutral-700'
              }`}
              title="Voix-off de répétition (Synthèse vocale)"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Voix-Off</span>
            </button>
          </div>

          {/* Scene Scrubber Indicators */}
          <div className="flex items-center gap-2 mt-4">
            {script.scenes.map((sc, i) => (
              <button
                key={i}
                onClick={() => setCurrentSceneIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  currentSceneIndex === i
                    ? 'w-8 bg-amber-400'
                    : 'w-2.5 bg-neutral-700 hover:bg-neutral-600'
                }`}
                title={`Aller au Plan ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Technical Directing Notes & Kinshasa Sound Effects Panel */}
        <div className="lg:col-span-5 space-y-5">
          {/* Detailed Shot Instructions */}
          <div className="rounded-xl bg-neutral-950 p-5 border border-neutral-800 space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
                Action Visuelle & Décor Kinois :
              </div>
              <p className="text-sm text-neutral-200 leading-relaxed font-medium">
                {currentScene.visualAction}
              </p>
            </div>

            <div className="border-t border-neutral-800/80 pt-3">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                Ambiance & Bruitages prévus :
              </div>
              <p className="text-xs text-neutral-300">
                {currentScene.soundEffects}
              </p>
            </div>

            <div className="border-t border-neutral-800/80 pt-3">
              <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                Note de Réalisation pour l'Équipe :
              </div>
              <p className="text-xs text-neutral-300 italic bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                {currentScene.directorNote}
              </p>
            </div>
          </div>

          {/* Kinshasa Soundboard (Web Audio API) */}
          <div className="rounded-xl bg-neutral-950 p-5 border border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
              <Music className="w-4 h-4 text-amber-400" />
              <span>Boîte à Sons Kinois (Tester en direct) :</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={playKinshasaHorn}
                className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-medium transition-colors text-left flex items-center justify-between"
              >
                <span>Klaxon Kinois (Pon-Pon)</span>
                <span className="text-amber-400 text-[10px]">▶</span>
              </button>
              <button
                onClick={playPoliceWhistle}
                className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-medium transition-colors text-left flex items-center justify-between"
              >
                <span>Sifflet PCR (Roulage)</span>
                <span className="text-amber-400 text-[10px]">▶</span>
              </button>
              <button
                onClick={playMotoRev}
                className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-medium transition-colors text-left flex items-center justify-between"
              >
                <span>Moteur Moto Wewa</span>
                <span className="text-amber-400 text-[10px]">▶</span>
              </button>
              <button
                onClick={playTruckBrake}
                className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-medium transition-colors text-left flex items-center justify-between"
              >
                <span>Freinage Camion</span>
                <span className="text-amber-400 text-[10px]">▶</span>
              </button>
            </div>
          </div>

          {/* Slogan Card */}
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4">
            <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
              Slogan Clôture de la capsule :
            </div>
            <div className="text-base font-extrabold text-amber-300 font-display">
              "{script.slogan}"
            </div>
            <div className="text-xs text-neutral-300 mt-1">
              Traduction : "{script.sloganTranslation}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
