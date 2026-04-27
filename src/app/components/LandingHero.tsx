import React from 'react';
import { motion } from 'motion/react';
import { Droplets, Activity, Percent, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface HeroProps {
  onCtaClick: (target: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1634052404940-39687d95a8bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Deep ocean waves"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-900/60 to-slate-950" />
      </div>

      {/* Animated Waves Overlay (Subtle) */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <svg className="absolute bottom-0 w-full h-40 opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            initial={{ d: "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,197.3C960,192,1056,128,1152,117.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
            animate={{ 
              d: [
                "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,197.3C960,192,1056,128,1152,117.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,192L48,181.3C96,171,192,149,288,165.3C384,181,480,235,576,234.7C672,235,768,181,864,165.3C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,197.3C960,192,1056,128,1152,117.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            fill="currentColor"
            className="text-teal-500/20"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-teal-400 uppercase bg-teal-400/10 border border-teal-400/20 rounded-full">
            Ocean Monitoring v2.0
          </span>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            AI-Powered Marine Plastic <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-cyan-400">
              Detection & Drift Analysis
            </span>
          </h1>
          <p className="max-w-2xl mx-auto mb-10 text-lg text-slate-300 md:text-xl">
            Leveraging domain-adaptive deep learning and spatio-temporal modeling to monitor, 
            predict, and mitigate marine plastic pollution across global oceans.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button 
              onClick={() => onCtaClick('detection')}
              className="px-8 py-4 font-semibold text-slate-900 transition-all rounded-lg bg-teal-400 hover:bg-teal-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              View Live Detection
              <Activity className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onCtaClick('research')}
              className="px-8 py-4 font-semibold transition-all border rounded-lg bg-white/5 border-white/20 hover:bg-white/10 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              Explore Research
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 gap-6 mt-20 md:grid-cols-3">
          {[
            { label: 'Detection Accuracy', value: '94.2%', icon: Percent, color: 'text-teal-400' },
            { label: 'Plastic Density', value: '12.8 items/km²', icon: Droplets, color: 'text-cyan-400' },
            { label: 'Avg. Drift Velocity', value: '0.45 m/s', icon: Activity, color: 'text-blue-400' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="p-6 transition-all border bg-slate-900/40 backdrop-blur-md border-white/10 rounded-2xl hover:border-teal-400/30 group"
            >
              <stat.icon className={`w-8 h-8 mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
