import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/LandingHero';
import { DetectionDashboard } from './components/DetectionDashboard';
import { DriftAnalysis } from './components/DriftAnalysis';
import { ResearchMethodology } from './components/ResearchMethodology';
import { AboutSection } from './components/AboutSection';
import { motion, AnimatePresence } from 'motion/react';

import { uploadImage } from './api';


export type AIModel = 'baseline' | 'adaptive';

export default function App() {
  const [activeSection, setActiveSection] = useState('landing');
  const [selectedModel, setSelectedModel] = useState<AIModel>('adaptive');

  const [result, setResult] = useState<any>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  // 🔥 NEW STATE
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const handleUpload = async (file: File) => {
    if (!file) return;

    setImageURL(URL.createObjectURL(file));

    // 🔥 detect image type
    const type = file.type;
    if (type.includes("image")) {
      setIsImage(true);
    } else {
      setIsImage(false);
    }

    try {
      const data = await uploadImage(file);
      setResult(data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'landing':
        return <Hero onCtaClick={setActiveSection} />;

      case 'detection':
        return (
          <DetectionDashboard
            selectedModel={selectedModel}
            onUpload={handleUpload}
            result={result}
            imageURL={imageURL}
          />
        );

      case 'drift':
        return <DriftAnalysis isImage={isImage} />;

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
    <div className="bg-slate-950 min-h-screen text-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}