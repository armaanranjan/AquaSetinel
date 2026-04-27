import React, { useState, useEffect } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { Hero } from '@/app/components/LandingHero';
import { DetectionDashboard } from '@/app/components/DetectionDashboard';
import { DriftAnalysis } from '@/app/components/DriftAnalysis';
import { ResearchMethodology } from '@/app/components/ResearchMethodology';
import { AboutSection } from '@/app/components/AboutSection';
import { motion, AnimatePresence } from 'motion/react';

import { uploadImage } from './api'; // ✅ ADD THIS

export type AIModel = 'baseline' | 'adaptive';

export default function App() {
  const [activeSection, setActiveSection] = useState('landing');
  const [selectedModel, setSelectedModel] = useState<AIModel>('adaptive');

  // ✅ NEW STATE (ML)
  const [result, setResult] = useState<any>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  // ✅ NEW HANDLER
  const handleUpload = async (file: File) => {
    if (!file) return;

    setImageURL(URL.createObjectURL(file));

    try {
      const data = await uploadImage(file);
      console.log("ML Response:", data);
      setResult(data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    console.log("Uploading file...");
    const data = await uploadImage(file);
    console.log("RESPONSE:", data);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'landing':
        return <Hero onCtaClick={setActiveSection} />;

      case 'detection':
        return (
          <DetectionDashboard
            selectedModel={selectedModel}
            onUpload={handleUpload}   // ✅ PASS HANDLER
            result={result}          // ✅ PASS RESULT
            imageURL={imageURL}      // ✅ PASS IMAGE
          />
        );

      case 'drift':
        return <DriftAnalysis />;

      case 'research':
        return (
          <ResearchMethodology
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        );

      case 'about':
        return <AboutSection />;

      default:
        return <Hero onCtaClick={setActiveSection} />;
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center border border-white/10">
              <span className="text-teal-400 font-bold text-xs">MP</span>
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-tight">MARPLAST AI</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                Research & Monitoring System
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold text-center md:text-right">
            © 2026 Maritime AI Research Institute. All rights reserved.<br />
            Published under Creative Commons Attribution 4.0 International.
          </div>
        </div>
      </footer>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}