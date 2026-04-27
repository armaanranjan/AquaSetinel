import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Globe, Award, Users, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export const AboutSection: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Environmental Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Saving Our Oceans Through Precise Intelligence</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Every year, over 8 million tons of plastic enter our oceans. Traditional cleanup efforts are often inefficient due to lack of visibility. Our mission is to provide cleanup agencies and policymakers with the precise spatial data they need to act.
            </p>
            <div className="space-y-4">
              {[
                "Targeted cleanup operations reduce fuel waste by up to 40%.",
                "Early detection prevents large debris from breaking into microplastics.",
                "Policy-driven data supports global bans on specific plastic types."
              ].map((text, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                  </div>
                  <span className="text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-teal-500/10 blur-3xl rounded-full" />
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1689159546515-7f516ad47df9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Environmental impact"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Research Team</h2>
            <p className="text-slate-400">Led by researchers from the Maritime AI Institute.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Elena Vance", role: "Principal Investigator", focus: "Computer Vision", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop" },
              { name: "Marcus Thorne", role: "Lead Engineer", focus: "Oceanography", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop" },
              { name: "Sarah Chen", role: "Policy Analyst", focus: "Global Impact", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&fit=crop" }
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-900 border border-white/10 rounded-3xl text-center group hover:border-teal-400/30 transition-all"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-slate-800 group-hover:border-teal-500/50 transition-colors">
                  <ImageWithFallback src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <div className="text-teal-400 text-sm font-semibold mb-4">{member.role}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-6">{member.focus}</div>
                <div className="flex justify-center gap-4">
                  <button className="text-slate-500 hover:text-teal-400 transition-colors"><Mail className="w-4 h-4" /></button>
                  <button className="text-slate-500 hover:text-teal-400 transition-colors"><Github className="w-4 h-4" /></button>
                  <button className="text-slate-500 hover:text-teal-400 transition-colors"><Globe className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partnerships & Publications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 bg-linear-to-br from-teal-500/10 to-slate-900 border border-teal-500/20 rounded-3xl">
            <Award className="w-10 h-10 text-teal-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Academic Recognition</h3>
            <p className="text-slate-400 leading-relaxed">
              Our work has been published in <span className="text-teal-300 font-bold italic">Nature Maritime Intelligence</span> and presented at the 2025 Global Plastic Cleanup Summit.
            </p>
          </div>
          <div className="p-10 bg-linear-to-br from-blue-500/10 to-slate-900 border border-blue-500/20 rounded-3xl">
            <BookOpen className="w-10 h-10 text-blue-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Open Data Initiative</h3>
            <p className="text-slate-400 leading-relaxed">
              We provide open-access datasets to the research community, containing over 50,000 labeled images of marine plastic in various environmental domains.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
