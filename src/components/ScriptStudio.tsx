import React, { useState } from 'react';
import { Sparkles, Loader2, Download, Printer, Play, Plus, Trash2, Edit3, Check, RefreshCw } from 'lucide-react';
import { PRESET_SCRIPTS, CampaignScript, ScriptScene } from '../data/campaignData.ts';

interface ScriptStudioProps {
  currentScript: CampaignScript;
  onSelectScript: (script: CampaignScript) => void;
  onNavigateToPlayer: () => void;
}

export const ScriptStudio: React.FC<ScriptStudioProps> = ({
  currentScript,
  onSelectScript,
  onNavigateToPlayer,
}) => {
  const [target, setTarget] = useState('Conducteurs de mototaxis (Wewa)');
  const [theme, setTheme] = useState('Port obligatoire du casque et refus de surcharge');
  const [tone, setTone] = useState('Émotionnel et Responsabilisant (Amour de la famille)');
  const [roadAxis, setRoadAxis] = useState('Rond-point Victoire & Avenue By-Pass');
  const [language, setLanguage] = useState('Bilingue Lingala et Français');
  const [duration, setDuration] = useState('45 secondes (Format vertical TikTok/WhatsApp)');
  const [isLoading, setIsLoading] = useState(false);
  const [generationSource, setGenerationSource] = useState<string | null>(null);

  // Editable scenes state
  const [scenes, setScenes] = useState<ScriptScene[]>(currentScript.scenes);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Sync scenes when currentScript changes externally
  React.useEffect(() => {
    setScenes(currentScript.scenes);
  }, [currentScript]);

  const handleGenerateAIScript = async () => {
    setIsLoading(true);
    setGenerationSource(null);

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target,
          theme,
          tone,
          roadAxis,
          language,
          duration,
        }),
      });

      const data = await response.json();
      if (data.success && data.script) {
        const generated: CampaignScript = {
          id: `custom-${Date.now()}`,
          title: data.script.title || 'Campagne Kin-Sécurité',
          subtitle: `Cible : ${target} · ${roadAxis}`,
          targetCategory: target.toLowerCase().includes('moto') ? 'moto' : target.toLowerCase().includes('camion') ? 'camion' : 'taxi',
          slogan: data.script.slogan || 'Batela bomoi !',
          sloganTranslation: data.script.sloganTranslation || 'Protège la vie !',
          durationSeconds: data.script.durationSeconds || 45,
          format: 'vertical_tiktok',
          location: data.script.recommendedLocation || roadAxis,
          tone,
          summary: data.script.pitch || 'Capsule de sensibilisation pour Kinshasa',
          keyAdvice: data.script.keyAdvice || ['Respecter le code de la route.'],
          imageKey: target.toLowerCase().includes('moto') ? 'moto' : target.toLowerCase().includes('camion') ? 'camion' : 'hero',
          scenes: data.script.scenes || currentScript.scenes,
        };

        onSelectScript(generated);
        setScenes(generated.scenes);
        setGenerationSource(data.source === 'gemini' ? 'Généré avec Gemini AI' : 'Généré via Modèle Kinois');
      }
    } catch (err) {
      console.error('Failed to generate script via API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateScene = (index: number, field: keyof ScriptScene, value: string) => {
    const updated = [...scenes];
    (updated[index] as any)[field] = value;
    setScenes(updated);
    onSelectScript({
      ...currentScript,
      scenes: updated,
    });
  };

  const handleAddScene = () => {
    const newScene: ScriptScene = {
      sceneNumber: scenes.length + 1,
      timeCode: `00:${(scenes.length * 15).toString().padStart(2, '0')} - 00:${((scenes.length + 1) * 15).toString().padStart(2, '0')}`,
      shotType: 'Plan moyen',
      visualAction: 'Nouvelle scène dans la rue de Kinshasa...',
      soundEffects: 'Klaxons et rumeur urbaine',
      dialogueLingala: 'Dialogue en Lingala...',
      dialogueFrench: 'Traduction en Français...',
      directorNote: 'Conseil de prise de vue...',
    };
    const updated = [...scenes, newScene];
    setScenes(updated);
    onSelectScript({
      ...currentScript,
      scenes: updated,
    });
  };

  const handleDeleteScene = (index: number) => {
    if (scenes.length <= 1) return;
    const updated = scenes.filter((_, i) => i !== index).map((s, idx) => ({
      ...s,
      sceneNumber: idx + 1,
    }));
    setScenes(updated);
    onSelectScript({
      ...currentScript,
      scenes: updated,
    });
  };

  const handleExportText = () => {
    let scriptText = `========================================================\n`;
    scriptText += `KIN-SÉCURITÉ ROUTIÈRE : SCÉNARIO DE TOURNAGE KINSHASA\n`;
    scriptText += `Titre : ${currentScript.title}\n`;
    scriptText += `Sous-titre : ${currentScript.subtitle}\n`;
    scriptText += `Lieu : ${currentScript.location}\n`;
    scriptText += `Durée : ${currentScript.durationSeconds} secondes\n`;
    scriptText += `Slogan : ${currentScript.slogan}\n`;
    scriptText += `Traduction Slogan : ${currentScript.sloganTranslation}\n`;
    scriptText += `========================================================\n\n`;

    currentScript.scenes.forEach((sc) => {
      scriptText += `--- PLAN ${sc.sceneNumber} (${sc.timeCode}) ---\n`;
      scriptText += `Cadrage : ${sc.shotType}\n`;
      scriptText += `Action Visuelle : ${sc.visualAction}\n`;
      scriptText += `Bruitages : ${sc.soundEffects}\n`;
      scriptText += `Dialogue Lingala : ${sc.dialogueLingala}\n`;
      scriptText += `Traduction Française : ${sc.dialogueFrench}\n`;
      scriptText += `Note Réalisateur : ${sc.directorNote}\n\n`;
    });

    const blob = new Blob([scriptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scenario-kinshasa-${currentScript.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-10 bg-neutral-950 text-neutral-100 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span>ATELIER D'ÉCRITURE AUDIOVISUELLE</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>SCRIPTS PRÊTS À TOURNER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-1 font-display">
              Studio de Création de Scénarios
            </h2>
            <p className="text-neutral-400 text-sm mt-1 max-w-2xl">
              Choisissez parmi nos modèles éprouvés pour Kinshasa ou générez un scénario sur-mesure adapté à votre cible et votre axe routier.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportText}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter TXT</span>
            </button>
            <button
              onClick={onNavigateToPlayer}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-neutral-950" />
              <span>Prévisualiser en Storyboard</span>
            </button>
          </div>
        </div>

        {/* Preset Selector Strip */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
            Scénarios de Référence Pré-conçus :
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_SCRIPTS.map((ps) => {
              const isSelected = currentScript.id === ps.id;
              return (
                <button
                  key={ps.id}
                  onClick={() => onSelectScript(ps)}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-neutral-900 border-amber-400 ring-1 ring-amber-400/30'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                    {ps.targetCategory === 'moto' ? 'Motards Wewa' : ps.targetCategory === 'camion' ? 'Poids Lourds' : ps.targetCategory === 'taxi' ? 'Taxi 207' : 'Tous Conducteurs'}
                  </div>
                  <div className="text-sm font-bold text-neutral-100 truncate mt-1">
                    {ps.title}
                  </div>
                  <div className="text-xs text-neutral-400 truncate mt-0.5">
                    {ps.location}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI & Custom Script Generator Configurator */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold text-neutral-100">
                Générateur Personnalisé de Capsule Vidéo Kinoise
              </h3>
            </div>
            {generationSource && (
              <span className="text-xs text-amber-400 font-mono">
                {generationSource}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 text-xs">
            {/* Target */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1.5">
                Conducteur ciblé :
              </label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="Conducteurs de mototaxis (Wewa)">Conducteurs de mototaxis (Wewa)</option>
                <option value="Chauffeurs de taxi-bus 207 et Ketch">Chauffeurs de taxi-bus 207 et Ketch</option>
                <option value="Conducteurs de Camions & Semi-remorques">Conducteurs de Camions & Semi-remorques</option>
                <option value="Conducteurs de voitures particulières & Jeunes">Conducteurs de voitures particulières & Jeunes</option>
                <option value="Piétons et Passagers complices">Piétons et Passagers complices</option>
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1.5">
                Thématique prioritaire :
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="Port obligatoire du casque et refus de surcharge">Port du casque & interdiction surcharge</option>
                <option value="Angles morts des camions et distance de sécurité">Angles morts des camions (Avenue Poids Lourds)</option>
                <option value="Arrêts brutaux en demi-terrain et versement">Arrêts en demi-terrain & pression versement</option>
                <option value="Alcool, chanvre (bangi) et sorties nocturnes">Alcool au volant & drogues en soirée</option>
                <option value="Téléphone portable et messages vocaux au volant">Téléphone au volant sur grands boulevards</option>
                <option value="Respect des agents de la PCR et robots roulants">Respect de la Police de Circulation (PCR)</option>
              </select>
            </div>

            {/* Road Axis */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1.5">
                Axe routier / Carrefour kinois :
              </label>
              <select
                value={roadAxis}
                onChange={(e) => setRoadAxis(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="Boulevard du 30 Juin (Gombe)">Boulevard du 30 Juin (Gombe)</option>
                <option value="Boulevard Lumumba (Échangeur de Limete)">Boulevard Lumumba (Échangeur de Limete)</option>
                <option value="Boulevard Lumumba (Entrée, sortie Ndjoko Mikondo jusqu'à Nsele Maluku)">Boulevard Lumumba (Entrée, sortie Ndjoko Mikondo jusqu'à Nsele Maluku)</option>
                <option value="Avenue By-Pass (Rond-point Ngaba - Triangle)">Avenue By-Pass (Ngaba - Triangle)</option>
                <option value="Avenue Poids Lourds (Barumbu - Kingabwa)">Avenue Poids Lourds (Barumbu - Kingabwa)</option>
                <option value="Route de Matadi (Kinsuka - Pompage)">Route de Matadi (Kinsuka - Pompage)</option>
                <option value="Carrefour Rond-Point Victoire (Kalamu)">Carrefour Rond-Point Victoire (Kalamu)</option>
              </select>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1.5">
                Ton de la vidéo :
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="Émotionnel et Responsabilisant (Amour de la famille)">Émotionnel & Famille ("Bana bazali kozela yo")</option>
                <option value="Choc et Réaliste (Prise de conscience crue)">Choc & Réaliste (Crash évité de justesse)</option>
                <option value="Comédie et Dérision kinoise populaire">Comédie & Dérision (Sketch kinois percutant)</option>
                <option value="Démonstratif et Didactique (Angle mort expliqué)">Démonstration pratique & explicative</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1.5">
                Langue des dialogues :
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="Bilingue Lingala et Français">Bilingue Lingala & Français (Recommandé)</option>
                <option value="Lingala populaire urbain exclusif">Lingala populaire urbain exclusif</option>
                <option value="Français avec expressions locales kinoises">Français avec expressions locales kinoises</option>
              </select>
            </div>

            {/* Duration / Format */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1.5">
                Format de diffusion :
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="45 secondes (Format vertical TikTok/WhatsApp)">45 sec · Vertical TikTok / Statuts WhatsApp</option>
                <option value="30 secondes (Format ultra-court percutant)">30 sec · Capsule éclair Réseaux Sociaux</option>
                <option value="60 secondes (Spot officiel TV et écrans urbains)">60 sec · Spot TV & Écrans Carrefours</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleGenerateAIScript}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 font-bold text-xs sm:text-sm transition-colors shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Conception du scénario kinois en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Générer le Scénario Personnalisé</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Script Breakdown & Scene Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-neutral-100 font-display">
              Découpage Technique & Scènes ({scenes.length} plans)
            </h3>
            <button
              onClick={handleAddScene}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-amber-300 font-medium transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter un plan</span>
            </button>
          </div>

          <div className="space-y-4">
            {scenes.map((scene, index) => {
              const isEditing = editingIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-neutral-900 border border-neutral-800 p-5 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-amber-400">PLAN {scene.sceneNumber}</span>
                      <span className="text-neutral-500">·</span>
                      <span className="text-neutral-300">{scene.timeCode}</span>
                      <span className="text-neutral-500">·</span>
                      <span className="text-neutral-400 font-sans font-semibold">{scene.shotType}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingIndex(isEditing ? null : index)}
                        className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
                        title={isEditing ? 'Terminer modification' : 'Modifier le plan'}
                      >
                        {isEditing ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit3 className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteScene(index)}
                        disabled={scenes.length <= 1}
                        className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 disabled:opacity-30 transition-colors"
                        title="Supprimer le plan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-neutral-400 font-semibold mb-1">Cadrage :</label>
                        <input
                          type="text"
                          value={scene.shotType}
                          onChange={(e) => handleUpdateScene(index, 'shotType', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-100"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 font-semibold mb-1">TimeCode :</label>
                        <input
                          type="text"
                          value={scene.timeCode}
                          onChange={(e) => handleUpdateScene(index, 'timeCode', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-100"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-neutral-400 font-semibold mb-1">Action visuelle :</label>
                        <textarea
                          rows={2}
                          value={scene.visualAction}
                          onChange={(e) => handleUpdateScene(index, 'visualAction', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-100"
                        />
                      </div>
                      <div>
                        <label className="block text-amber-400 font-semibold mb-1">Dialogue Lingala :</label>
                        <input
                          type="text"
                          value={scene.dialogueLingala}
                          onChange={(e) => handleUpdateScene(index, 'dialogueLingala', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-amber-200"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 font-semibold mb-1">Traduction Française :</label>
                        <input
                          type="text"
                          value={scene.dialogueFrench}
                          onChange={(e) => handleUpdateScene(index, 'dialogueFrench', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-200"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-neutral-400 font-semibold mb-1">Note du réalisateur :</label>
                        <input
                          type="text"
                          value={scene.directorNote}
                          onChange={(e) => handleUpdateScene(index, 'directorNote', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-300"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                      <div className="md:col-span-6 space-y-2">
                        <div>
                          <span className="text-neutral-500 uppercase font-semibold">Action à l'image :</span>
                          <p className="text-neutral-200 text-sm mt-0.5 leading-relaxed font-medium">
                            {scene.visualAction}
                          </p>
                        </div>
                        <div className="text-neutral-400">
                          <span className="text-neutral-500 uppercase font-semibold">Bruitages :</span> {scene.soundEffects}
                        </div>
                      </div>

                      <div className="md:col-span-6 space-y-2 bg-neutral-950/70 p-3.5 rounded-lg border border-neutral-800/80">
                        <div>
                          <span className="text-amber-400 font-semibold uppercase text-[10px]">Réplique Lingala :</span>
                          <p className="text-amber-300 font-bold text-sm mt-0.5 italic">
                            "{scene.dialogueLingala}"
                          </p>
                        </div>
                        <div>
                          <span className="text-neutral-400 font-semibold uppercase text-[10px]">Traduction / Voix-off Française :</span>
                          <p className="text-neutral-300 text-xs mt-0.5">
                            "{scene.dialogueFrench}"
                          </p>
                        </div>
                        <div className="pt-2 border-t border-neutral-800 text-neutral-400 italic text-[11px]">
                          Note tournage : {scene.directorNote}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
