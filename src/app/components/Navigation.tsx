import React from 'react';
import { motion } from 'motion/react';
import { Waves, BarChart3, Search, Book, User, LayoutDashboard } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'landing', label: 'Home', icon: Waves },
    { id: 'detection', label: 'Detection', icon: Search },
    { id: 'drift', label: 'Drift Analysis', icon: BarChart3 },
    { id: 'research', label: 'Research', icon: Book },
    { id: 'about', label: 'About', icon: User },
  ];

  return (
    <nav className="fixed top-6 inset-x-0 z-50 flex justify-center px-6">
      <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 px-2 py-2 rounded-2xl flex items-center gap-1 shadow-2xl">
        <div className="flex items-center gap-3 px-4 mr-4 border-r border-white/10">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-slate-950" />
          </div>
          <span className="font-bold text-white tracking-tight hidden sm:block">MARPLAST</span>
        </div>
        
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`relative flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-xl ${
              activeSection === item.id ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeSection === item.id && (
              <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 bg-teal-500/10 border border-teal-500/20 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <item.icon className={`w-4 h-4 ${activeSection === item.id ? 'text-teal-400' : ''}`} />
            <span className="hidden md:block">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
