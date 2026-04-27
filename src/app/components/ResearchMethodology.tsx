import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Beaker, Brain, Code2, Microscope, TrendingUp, Activity, CheckCircle2, Circle } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { AIModel } from '@/app/App';

const PERFORMANCE_DATA = [
  { epoch: 0, baseline: 0.42, adapted: 0.42 },
  { epoch: 10, baseline: 0.58, adapted: 0.65 },
  { epoch: 20, baseline: 0.65, adapted: 0.78 },
  { epoch: 30, baseline: 0.68, adapted: 0.84 },
  { epoch: 40, baseline: 0.70, adapted: 0.89 },
  { epoch: 50, baseline: 0.71, adapted: 0.92 },
  { epoch: 60, baseline: 0.72, adapted: 0.94 },
];

interface ResearchMethodologyProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

export const ResearchMethodology: React.FC<ResearchMethodologyProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Methodology Header */}
        <div className="mb-16 border-b border-white/10 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4 text-teal-400">
              <Microscope className="w-6 h-6" />
              <span className="font-bold tracking-widest uppercase text-sm">Experimental Setup</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Unsupervised Domain Adaptation for <br />Marine Environment Robustness</h2>
            <p className="text-slate-400 max-w-3xl text-lg leading-relaxed">
              Standard detection models fail when deployed in varied oceanic conditions due to domain shift. Our approach utilizes a CycleGAN-inspired domain bridge to align target domain distributions.
            </p>
          </div>

          {/* Model Selection UI */}
          <div className="w-full md:w-72">
            <div className="p-6 bg-slate-900 border border-teal-500/20 rounded-3xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Active Research Model</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => onModelChange('adaptive')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${selectedModel === 'adaptive' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-3">
                    {selectedModel === 'adaptive' ? <CheckCircle2 className="w-4 h-4 text-teal-400" /> : <Circle className="w-4 h-4" />}
                    <span className="text-sm font-semibold">Domain-Adaptive</span>
                  </div>
                  <span className="text-[10px] bg-teal-500/20 text-teal-400 px-1.5 py-0.5 rounded uppercase font-bold">Ours</span>
                </button>
                <button 
                  onClick={() => onModelChange('baseline')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${selectedModel === 'baseline' ? 'bg-slate-700/30 border-slate-500 text-white' : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-3">
                    {selectedModel === 'baseline' ? <CheckCircle2 className="w-4 h-4 text-slate-400" /> : <Circle className="w-4 h-4" />}
                    <span className="text-sm font-semibold">Baseline YOLOv8</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Brain,
              title: "Adversarial Training",
              desc: "A domain discriminator forces the feature extractor to learn domain-invariant representations of plastic debris."
            },
            {
              icon: Code2,
              title: "Spatio-Temporal GNN",
              desc: "Graph Neural Networks model the physical relationship between plastic particles and ocean current vectors."
            },
            {
              icon: TrendingUp,
              title: "Drift Estimation",
              desc: "Integrating Eulerian current data with Lagrangian particle tracking for 48-hour drift forecasting."
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-slate-900/50 border border-white/10 rounded-3xl hover:border-teal-400/30 transition-all"
            >
              <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-400" />
              Model Comparison
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_DATA}>
                  <defs>
                    <linearGradient id="colorAdapted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="epoch" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 1]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="adapted" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorAdapted)" name="Domain-Adaptive" strokeDasharray={selectedModel === 'adaptive' ? "0" : "5 5"} />
                  <Area type="monotone" dataKey="baseline" stroke="#64748b" strokeWidth={2} fillOpacity={0} name="Baseline YOLOv8" strokeDasharray={selectedModel === 'baseline' ? "0" : "5 5"} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              {selectedModel === 'adaptive' ? 'Significant Accuracy Gains' : 'Baseline Performance Metrics'}
            </h3>
            <p className="text-slate-400 mb-8">
              {selectedModel === 'adaptive' 
                ? 'Our Domain-Adaptive (DA) model achieves a +22% mAP improvement over baseline models in "Wild" maritime conditions.' 
                : 'Standard baseline models struggle with high variance in lighting and water surface reflections.'}
            </p>
            <div className="space-y-6">
              {[
                { label: 'Precision', val: selectedModel === 'adaptive' ? 91 : 68, color: 'bg-teal-400' },
                { label: 'Recall', val: selectedModel === 'adaptive' ? 86 : 59, color: 'bg-cyan-400' },
                { label: 'F1 Score', val: selectedModel === 'adaptive' ? 88 : 63, color: 'bg-blue-400' },
              ].map(bar => (
                <div key={bar.label}>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                    <span>{bar.label}</span>
                    <span className="text-slate-200">{bar.val}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      key={`${selectedModel}-${bar.label}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.val}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${bar.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Architecture Diagram Placeholder */}
        <div className="p-12 bg-slate-900 border border-white/10 rounded-3xl text-center mb-20">
          <Beaker className="w-12 h-12 text-teal-400 mx-auto mb-6 opacity-50" />
          <h3 className="text-2xl font-bold text-white mb-4">Model Architecture</h3>
          <div className="max-w-4xl mx-auto aspect-video bg-slate-950 rounded-2xl border border-dashed border-slate-700 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
               <div className="flex gap-4">
                  <div className="w-24 h-16 bg-teal-500/20 rounded border border-teal-500 flex items-center justify-center text-[10px] text-teal-400 font-bold uppercase">Source</div>
                  <div className="w-24 h-16 bg-cyan-500/20 rounded border border-cyan-500 flex items-center justify-center text-[10px] text-cyan-400 font-bold uppercase">Target</div>
               </div>
               <div className="w-1 h-8 bg-slate-700" />
               <div className="w-48 h-20 bg-slate-800 rounded border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-400 uppercase text-center p-2">
                 Feature Extractor (ResNet-50)
               </div>
               <div className="w-1 h-8 bg-slate-700" />
               <div className="flex gap-8">
                  <div className="w-32 h-20 bg-teal-500/10 rounded border border-teal-500/30 flex items-center justify-center text-[10px] text-teal-400 font-bold uppercase text-center p-2">Detection Head</div>
                  <div className="w-32 h-20 bg-red-500/10 rounded border border-red-500/30 flex items-center justify-center text-[10px] text-red-400 font-bold uppercase text-center p-2">Domain Discriminator</div>
               </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500">Figure 1: Dual-Path Adversarial Domain Adaptation Architecture</p>
        </div>

        {/* Qualitative Results Gallery */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8">Qualitative Results: Domain Bridge Effects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: 'Baseline YOLOv8 (In-the-wild)', desc: 'Heavy false negatives due to glare and foam interference.', img: 'https://images.unsplash.com/photo-1689159546515-7f516ad47df9?w=600&q=80', status: 'missed' },
              { label: 'Domain-Adaptive Model (Ours)', desc: 'Robust segmentation even in turbulent conditions.', img: 'https://images.unsplash.com/photo-1689159546515-7f516ad47df9?w=600&q=80', status: 'detected' }
            ].map((item, i) => (
              <div key={i} className={`group relative overflow-hidden rounded-3xl border transition-all ${((item.status === 'detected' && selectedModel === 'adaptive') || (item.status === 'missed' && selectedModel === 'baseline')) ? 'border-teal-500 bg-teal-500/5' : 'border-white/10 bg-slate-900'}`}>
                <div className={`relative aspect-video ${item.status === 'detected' ? 'brightness-110 saturate-125' : 'grayscale brightness-75'}`}>
                  <ImageWithFallback src={item.img} alt={item.label} className="w-full h-full object-cover" />
                  {item.status === 'detected' && (
                    <div className="absolute inset-0 border-4 border-teal-500/30 pointer-events-none" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-bold ${item.status === 'detected' ? 'text-teal-400' : 'text-slate-400'}`}>{item.label}</h4>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${item.status === 'detected' ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-500'}`}>
                      {item.status === 'detected' ? '94% Recall' : '62% Recall'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
