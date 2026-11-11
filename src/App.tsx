/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { DriverTestimoniesSection } from './components/DriverTestimoniesSection.tsx';
import { MethodologySection } from './components/MethodologySection.tsx';
import { ScriptStudio } from './components/ScriptStudio.tsx';
import { StoryboardPlayer } from './components/StoryboardPlayer.tsx';
import { ProductionKitSection } from './components/ProductionKitSection.tsx';
import { PosterStudioSection } from './components/PosterStudioSection.tsx';
import { Footer } from './components/Footer.tsx';
import { PRESET_SCRIPTS, CampaignScript } from './data/campaignData.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('temoignages');
  const [currentScript, setCurrentScript] = useState<CampaignScript>(PRESET_SCRIPTS[0]);

  const handleOpenQuickScript = (scriptId: string) => {
    const found = PRESET_SCRIPTS.find((s) => s.id === scriptId);
    if (found) {
      setCurrentScript(found);
      setActiveTab('storyboard');
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* Top Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onNavigateTab={setActiveTab}
          onOpenQuickScript={handleOpenQuickScript}
        />

        {/* Dynamic Tab Views */}
        <div id="content-section">
          {activeTab === 'temoignages' && (
            <DriverTestimoniesSection />
          )}

          {activeTab === 'guide' && (
            <MethodologySection />
          )}

          {activeTab === 'studio' && (
            <ScriptStudio
              currentScript={currentScript}
              onSelectScript={setCurrentScript}
              onNavigateToPlayer={() => {
                setActiveTab('storyboard');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'storyboard' && (
            <section className="py-10 bg-neutral-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <StoryboardPlayer script={currentScript} />
              </div>
            </section>
          )}

          {activeTab === 'kit' && (
            <ProductionKitSection />
          )}

          {activeTab === 'affiches' && (
            <PosterStudioSection />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
