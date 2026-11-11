import React, { useState, useRef } from 'react';
import { Download, Share2, Sparkles, Image as ImageIcon, Copy, Check } from 'lucide-react';
import { KINSHASA_SLOGANS } from '../data/campaignData.ts';
import { CAMPAIGN_IMAGES } from '../utils/imageMap.ts';

export const PosterStudioSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(CAMPAIGN_IMAGES.moto);
  const [selectedSloganIndex, setSelectedSloganIndex] = useState<number>(0);
  const [customText, setCustomText] = useState('BATELA BOMOI NA YO');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentSlogan = KINSHASA_SLOGANS[selectedSloganIndex];

  const handleDownloadPoster = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350; // 4:5 Instagram & WhatsApp portrait format
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedImage;

    img.onload = () => {
      // Draw background image covering the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Dark gradient overlay for text legibility
      const gradient = ctx.createLinearGradient(0, canvas.height * 0.4, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 10, 10, 0)');
      gradient.addColorStop(0.5, 'rgba(10, 10, 10, 0.7)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Top branding banner
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(0, 0, canvas.width, 16);

      // Top Header Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('KIN-SÉCURITÉ ROUTIÈRE · KINSHASA', 60, 80);

      // Slogan Lingala
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 54px sans-serif';
      const sloganText = currentSlogan ? currentSlogan.lingala : customText;
      ctx.fillText(`"${sloganText}"`, 60, canvas.height - 240);

      // French Translation
      ctx.fillStyle = '#e5e7eb';
      ctx.font = 'normal 32px sans-serif';
      const translationText = currentSlogan ? currentSlogan.french : '';
      ctx.fillText(translationText, 60, canvas.height - 180);

      // Footer callout
      ctx.fillStyle = '#9ca3af';
      ctx.font = '26px sans-serif';
      ctx.fillText('Campagne d\'intérêt public pour la protection des vies à Kinshasa', 60, canvas.height - 90);

      // Convert to image and download
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `affiche-kinshasa-securite-${Date.now()}.png`;
      a.click();
    };
  };

  const handleCopySlogan = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-12 bg-neutral-950 text-neutral-100 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>COMMUNICATION VISUELLE & SLOGANS DE RUE</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>VIGNETTES & AFFICHES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-2 font-display">
            Studio d'Affiches & Bibliothèque de Slogans en Lingala
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 leading-relaxed">
            Créez des vignettes percutantes pour vos vidéos TikTok, WhatsApp et réseaux sociaux, associant les visuels authentiques de Kinshasa aux slogans qui marquent les esprits.
          </p>
        </div>

        {/* Poster Studio Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Controls */}
          <div className="lg:col-span-5 rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-5">
            <h3 className="text-base font-bold text-neutral-100 pb-3 border-b border-neutral-800">
              Personnaliser votre visuel de campagne
            </h3>

            {/* Photo Picker */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                1. Choisir la photo d'arrière-plan :
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Wewa avec Casque', src: CAMPAIGN_IMAGES.moto },
                  { label: 'Poids Lourds Avenue', src: CAMPAIGN_IMAGES.camion },
                  { label: 'Boulevard 30 Juin', src: CAMPAIGN_IMAGES.hero },
                  { label: 'Tournage en Rue', src: CAMPAIGN_IMAGES.studio },
                ].map((imgOpt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(imgOpt.src)}
                    className={`rounded-lg overflow-hidden border p-1 text-left transition-all ${
                      selectedImage === imgOpt.src
                        ? 'border-amber-400 bg-neutral-950 ring-1 ring-amber-400/30'
                        : 'border-neutral-800 hover:border-neutral-700 bg-neutral-950/60'
                    }`}
                  >
                    <img
                      src={imgOpt.src}
                      alt={imgOpt.label}
                      className="w-full h-16 object-cover rounded"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-[11px] text-neutral-300 font-medium truncate mt-1">
                      {imgOpt.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slogan Picker */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                2. Sélectionner le slogan en Lingala :
              </label>
              <select
                value={selectedSloganIndex}
                onChange={(e) => setSelectedSloganIndex(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 focus:border-amber-400 focus:outline-none"
              >
                {KINSHASA_SLOGANS.map((slog, i) => (
                  <option key={i} value={i}>
                    {slog.category} : "{slog.lingala}"
                  </option>
                ))}
              </select>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={handleDownloadPoster}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger l'Affiche Haute Résolution (PNG)</span>
              </button>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col justify-between p-6">
              <img
                src={selectedImage}
                alt="Aperçu Affiche"
                className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

              {/* Top Bar */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className="font-extrabold tracking-wider uppercase text-amber-400">
                  KIN-SÉCURITÉ ROUTIÈRE
                </span>
                <span className="text-neutral-400 font-mono text-[10px]">
                  VILLE DE KINSHASA
                </span>
              </div>

              {/* Bottom Slogan Block */}
              <div className="relative z-10 space-y-2">
                <div className="text-xl sm:text-2xl font-black text-amber-300 font-display leading-tight drop-shadow-md">
                  "{currentSlogan ? currentSlogan.lingala : customText}"
                </div>
                <div className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">
                  {currentSlogan ? currentSlogan.french : ''}
                </div>
                <div className="pt-3 border-t border-neutral-700/60 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>#KinSecurite #BatelaBomoi</span>
                  <span>Pour nos familles à Kinshasa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Slogans Reference Library */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-neutral-100 font-display mb-1">
            Répertoire des Formules & Slogans Kinois
          </h3>
          <p className="text-xs text-neutral-400 mb-6">
            Ces expressions utilisent les codes culturels de Kinshasa : la rime, le respect des parents et la métaphore financière.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KINSHASA_SLOGANS.map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-semibold uppercase text-amber-400 tracking-wider mb-1">
                    {s.category}
                  </div>
                  <div className="text-sm font-bold text-amber-200 leading-snug">
                    "{s.lingala}"
                  </div>
                  <div className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                    {s.french}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400 italic truncate max-w-[180px]">
                    {s.usage}
                  </span>
                  <button
                    onClick={() => handleCopySlogan(`${s.lingala} - ${s.french}`, idx)}
                    className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
                    title="Copier le slogan"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
