import React from 'react';
import { motion } from 'motion/react';
import { Zap, Layout, BarChart, Download, Share2, Palette, ArrowRight, Shield, Globe, Terminal, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0D0D0E] text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#BBFF00]/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-[#19191B] border border-[#2D2D30] px-4 py-2 rounded-full text-xs font-bold mb-8"
          >
            <span className="bg-[#BBFF00] text-black px-2 py-0.5 rounded-full mr-2">NEW</span>
            <span className="text-[#999999]">v2.0 is now live with SRE & GitOps themes</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none"
          >
            LEVEL UP YOUR <br />
            <span className="text-[#BBFF00]">TECH BRAND.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#999999] max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Generate professional, high-fidelity cover images for LinkedIn, Twitter, and Facebook in seconds. Tailored for Engineers, CTOs, and DevOps.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onStart}
              className="btn btn-primary px-12 py-4 text-lg flex items-center group"
            >
              Start Generating Free
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="btn btn-secondary px-12 py-4 text-lg">
              View Templates
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">BUILT FOR THE MODERN STACK</h2>
            <p className="text-[#999999]">Everything you need to stand out in the tech ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Terminal,
                title: "Role-Specific Themes",
                desc: "From SRE Dashboards to Terminal vibes, choose a theme that matches your daily workflow."
              },
              {
                icon: Globe,
                title: "Multi-Platform",
                desc: "One-click export for LinkedIn, Twitter, and Facebook with automatic ratio adjustments."
              },
              {
                icon: Zap,
                title: "Smart Skill Badges",
                desc: "Automatically detects your tech stack and pulls official logos for a professional look."
              },
              {
                icon: Palette,
                title: "Brand Control",
                desc: "Custom colors, font sizes, and high-contrast modes to match your personal brand."
              },
              {
                icon: Shield,
                title: "Privacy First",
                desc: "No tracking, no cookies. Your data stays yours. Safari optimized for the best experience."
              },
              {
                icon: BarChart,
                title: "Analytics Ready",
                desc: "Track how your profile banner performs with our built-in engagement dashboard."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-[#19191B] border border-[#2D2D30] hover:border-[#BBFF00]/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#0D0D0E] rounded-xl flex items-center justify-center mb-6 text-[#BBFF00] group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[#999999] text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-[#19191B] to-[#0D0D0E] p-12 rounded-[3rem] border border-[#2D2D30]">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic">"THE GO-TO TOOL FOR TECH COVERS."</h2>
          <div className="flex items-center justify-center space-x-4 mb-12">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0D0D0E] bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-[#999999]">Joined by 10k+ engineers worldwide</span>
          </div>
          <button
            onClick={onStart}
            className="btn btn-primary px-16 py-5 text-xl rounded-full"
          >
            Get Your Banner Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#2D2D30] bg-[#080808]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <Logo showText />
          </div>
          <div className="flex space-x-8 text-sm font-medium text-[#999999]">
            <a href="#" className="hover:text-[#BBFF00] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#BBFF00] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#BBFF00] transition-colors">API</a>
            <a href="#" className="hover:text-[#BBFF00] transition-colors">Support</a>
          </div>
          <div className="text-[#999999] text-xs">
            © {new Date().getFullYear()} AURA. Built for the modern engineer.
          </div>
        </div>
      </footer>
    </div>
  );
};
