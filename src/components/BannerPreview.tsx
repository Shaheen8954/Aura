import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, Cloud, GitBranch, Settings, Server, Database, Activity, Infinity, 
  Lock, Repeat, LineChart, BarChart2, CheckCircle2, Shield, Network, Layers, 
  Cpu, Megaphone, Users, GraduationCap, Globe, Zap, Compass, Map, Hexagon, 
  Briefcase, Code2, Cpu as Microchip, Fingerprint, Box, TrendingUp, Layout, Twitter,
  Github, Search, Radio
} from 'lucide-react';
import { BannerConfig, Platform } from '../types';
import { cn } from '../lib/utils';

interface BannerPreviewProps {
  config: BannerConfig;
  platform: Platform;
}

const getTechIconUrl = (techName: string) => {
  const normalized = techName.toLowerCase().trim();
  const map: Record<string, string> = {
    'aws': 'amazonwebservices/amazonwebservices-plain-wordmark',
    'kubernetes': 'kubernetes/kubernetes-plain',
    'k8s': 'kubernetes/kubernetes-plain',
    'terraform': 'terraform/terraform-original',
    'docker': 'docker/docker-original',
    'python': 'python/python-original',
    'go': 'go/go-original-wordmark',
    'golang': 'go/go-original-wordmark',
    'linux': 'linux/linux-original',
    'azure': 'azure/azure-original',
    'gcp': 'googlecloud/googlecloud-original',
    'ansible': 'ansible/ansible-original',
    'jenkins': 'jenkins/jenkins-original',
    'github': 'github/github-original',
    'gitlab': 'gitlab/gitlab-original',
    'react': 'react/react-original',
    'node': 'nodejs/nodejs-original',
    'bash': 'bash/bash-original',
    'prometheus': 'prometheus/prometheus-original',
    'grafana': 'grafana/grafana-original',
    'ubuntu': 'ubuntu/ubuntu-plain',
    'nginx': 'nginx/nginx-original',
    'java': 'java/java-original',
    'c++': 'cplusplus/cplusplus-original',
    'rust': 'rust/rust-original'
  };
  
  const path = map[normalized];
  return path ? `/api/proxy-icon?path=${path}` : null;
};

interface SkillBadgeProps {
  skill: string;
  theme: string;
  useRealIcons: boolean;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, theme, useRealIcons }) => {
  const cleanSkill = skill.trim();
  const iconUrl = useRealIcons ? getTechIconUrl(cleanSkill) : null;
  
  const getStyle = (t: string) => {
    const darkThemes = ['terminal', 'sre', 'gitops', 'cyberpunk', 'devsecops', 'cto', 'serverless', 'data_center'];
    const lightThemes = ['ide', 'enterprise', 'student', 'ceo'];
    const colorThemes = ['pipeline', 'sol_arch', 'cloud_native', 'platform_eng', 'devrel', 'evangelist', 'cloud_arch', 'director'];
    
    if (darkThemes.includes(t)) return "bg-white/5 border border-white/10 text-slate-200 backdrop-blur-sm";
    if (lightThemes.includes(t)) return "bg-slate-100/80 border border-slate-200 text-slate-700 shadow-sm";
    if (colorThemes.includes(t)) return "bg-black/10 border border-white/20 text-white backdrop-blur-md";
    return "bg-slate-900/80 border border-slate-700 text-slate-300";
  };

  return (
    <div className={cn("px-3 py-1.5 text-xs md:text-sm rounded flex items-center space-x-2", getStyle(theme))}>
      {iconUrl ? (
        <img 
          src={iconUrl} 
          alt={cleanSkill} 
          className={cn("w-4 h-4 object-contain opacity-90", !getStyle(theme).includes('text-slate-700') && "brightness-0 invert")} 
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onError={(e) => (e.currentTarget.style.display='none')} 
        />
      ) : (
        <Activity size={14} className="opacity-70" />
      )}
      <span>{cleanSkill}</span>
    </div>
  );
};

export const BannerPreview = forwardRef<HTMLDivElement, BannerPreviewProps>(({ config, platform }, ref) => {
  const { name, role, skills, theme, primaryColor, secondaryColor, textColor, logoUrl, useRealIcons, fontSize, highContrast } = config;

  const aspectRatios: Record<Platform, string> = {
    linkedin: "aspect-[4/1]",
    twitter: "aspect-[3/1]",
    facebook: "aspect-[1.91/1]",
  };

  const fontSizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const titleFontSizeClasses = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-6xl",
    xl: "text-7xl",
  };

  const bannerClasses = cn(
    "w-full relative overflow-hidden shadow-2xl transition-all duration-500 ease-in-out group select-none h-full",
    aspectRatios[platform],
    highContrast && "contrast-125 saturate-150"
  );

  // --- Design Components for the Engine ---
  
  const GlassContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("relative overflow-hidden backdrop-blur-xl border border-white/10 bg-white/5 rounded-3xl p-8 md:p-12", className)}>
      {children}
    </div>
  );

  const GridBackground = ({ color = primaryColor }: { color?: string }) => (
    <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ 
      backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
      backgroundSize: '40px 40px' 
    }} />
  );

  const MeshGradient = ({ colors = [primaryColor, secondaryColor] }: { colors?: string[] }) => (
    <div className="absolute inset-0 z-0 opacity-40 blur-[100px]">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 rounded-full" style={{ backgroundColor: colors[0] }} />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full" style={{ backgroundColor: colors[1] || colors[0] }} />
    </div>
  );

  const GenerativePattern = ({ type }: { type: number }) => {
    switch (type % 5) {
      case 0: return <GridBackground />;
      case 1: return <MeshGradient />;
      case 2: return (
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%"><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill={primaryColor} /></pattern><rect width="100%" height="100%" fill="url(#dots)" /></svg>
        </div>
      );
      case 3: return (
        <div className="absolute inset-0 opacity-10 flex flex-wrap gap-4 overflow-hidden p-4">
          {Array.from({ length: 20 }).map((_, i) => <div key={i} className="h-px bg-white/20 w-full rotate-45" />)}
        </div>
      );
      default: return <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />;
    }
  };


  const renderTheme = () => {
    const themeLower = theme.toLowerCase();
    
    // Domain-Specific Layout Engine
    // Check if it's one of our generated domain themes (e.g., "cloud_engineer...")
    const parts = theme.split('_');
    const isCategorized = parts.length >= 3 && parts[1] !== 'room' && parts[1] !== 'check';

    if (isCategorized) {
      const archetype = parts[parts.length - 1]; // minimalist, luxury, neon, etc.
      const categoryLabel = config.category;

      // Domain Assets Mapping for premium specialized feel
      const domainCues = {
        'Cloud Engineer': { icon: Cloud, label: 'Cloud-Scale Infrastructure', pattern: 'grid' },
        'DevOps Engineer': { icon: Repeat, label: 'Automated CI/CD Pipeline', pattern: 'dots' },
        'SRE': { icon: Activity, label: 'Site Reliability Engineering', pattern: 'metrics' },
        'Platform Engineer': { icon: Hexagon, label: 'Internal Developer Platform', pattern: 'mesh' },
        'DevRel': { icon: Megaphone, label: 'Developer Relations & Community', pattern: 'social' },
        'Students': { icon: GraduationCap, label: 'Next-Gen Developer Identity', pattern: 'clean' },
        'Solution Architect': { icon: Map, label: 'Solution Architecture Design', pattern: 'blueprint' },
        'Cloud Architect': { icon: Globe, label: 'Enterprise Cloud Strategy', pattern: 'nodes' },
        'CTO': { icon: Cpu, label: 'Technical Vision & Strategic Scale', pattern: 'vision' },
        'CEO': { icon: Briefcase, label: 'Executive Leadership & Direction', pattern: 'prestige' },
        'Director': { icon: Layers, label: 'Organizational Excellence', pattern: 'opsec' },
        'Tech Evangelist': { icon: Compass, label: 'Tech Influence & Public Stage', pattern: 'impact' },
        'DevSecOps Engineer': { icon: Shield, label: 'Hardened Security Lifecycle', pattern: 'vault' },
      };

      const cue = domainCues[categoryLabel] || { icon: Zap, label: 'Professional Identity', pattern: 'grid' };

      switch (archetype) {
        case 'minimalist':
          return (
            <div className={cn(bannerClasses, "bg-white text-slate-800 flex items-center px-12 md:px-24")}>
              <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: primaryColor }} />
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <cue.icon size={14} /> <span>{cue.label}</span>
                </div>
                <h1 className={cn("font-medium tracking-tight mb-1", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-slate-500 font-light mb-8", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="flex gap-2">
                   {skills.map((s, i) => <span key={i} className="text-[10px] uppercase tracking-wider text-slate-400 border border-slate-200 px-2 py-1 rounded-md">{s}</span>)}
                </div>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.05] grayscale pointer-events-none pr-12">
                <cue.icon size={300} strokeWidth={0.5} />
              </div>
            </div>
          );

        case 'luxury':
          return (
            <div className={cn(bannerClasses, "bg-[#090909] text-white flex flex-col items-center justify-center text-center")}>
              <div className="absolute inset-0 border-[1px] border-white/10 m-6" />
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <GridBackground color={primaryColor} />
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 px-12">
                <div className="flex flex-col items-center mb-6">
                  <cue.icon size={32} className="mb-4 opacity-50" style={{ color: primaryColor }} />
                  <div className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/40 mb-2">{cue.label}</div>
                  <div className="w-8 h-px bg-white/20" />
                </div>
                <h1 className={cn("font-serif font-light italic mb-2 tracking-wide", titleFontSizeClasses[fontSize])} style={{ color: primaryColor }}>{name}</h1>
                <h2 className={cn("font-sans font-extralight tracking-[0.3em] uppercase text-white/70 mb-10", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="flex flex-wrap justify-center gap-4 text-[10px] uppercase tracking-widest opacity-50 italic">
                  {skills.join(' • ')}
                </div>
              </motion.div>
            </div>
          );

        case 'brutalist':
          return (
            <div className={cn(bannerClasses, "bg-white text-black p-0 border-[6px] border-black")}>
              <div className="flex h-full">
                <div className="w-20 border-r-[6px] border-black flex items-center justify-center shrink-0" style={{ backgroundColor: primaryColor }}>
                  <div className="rotate-90 whitespace-nowrap font-black uppercase tracking-tighter text-sm flex items-center gap-4">
                    {cue.label} <div className="w-3 h-3 bg-black" />
                  </div>
                </div>
                <div className="flex-1 p-12 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <cue.icon size={120} strokeWidth={2} />
                  </div>
                  <h1 className={cn("font-black uppercase italic leading-[0.8] mb-6 relative z-10", titleFontSizeClasses[fontSize])} style={{ letterSpacing: '-0.05em' }}>{name}</h1>
                  <h2 className="text-xl font-bold uppercase mb-8 opacity-60 italic">{role}</h2>
                  <div className="flex flex-wrap gap-2">
                     {skills.map((s, i) => <div key={i} className="bg-black text-white px-4 py-2 font-black text-xs uppercase tracking-tighter">{s}</div>)}
                  </div>
                </div>
              </div>
            </div>
          );

        case 'editorial':
          return (
            <div className={cn(bannerClasses, "bg-slate-50 text-slate-900 flex items-center")}>
              <div className="absolute top-0 right-0 w-2/5 h-full bg-slate-200" />
              <div className="absolute top-12 right-12 opacity-10 text-slate-400">
                <cue.icon size={300} strokeWidth={0.5} />
              </div>
              <div className="relative z-10 px-12 md:px-24">
                <div className="text-[10px] font-black text-blue-700 uppercase mb-4 tracking-widest flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-700 flex items-center justify-center text-white"><cue.icon size={10} /></span>
                  {cue.label}
                </div>
                <h1 className={cn("font-black tracking-tighter mb-2 leading-none", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-slate-500 font-medium mb-12 italic opacity-80", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="grid grid-cols-2 gap-x-12 gap-y-6 max-w-lg">
                   {skills.slice(0, 4).map((s, i) => (
                     <div key={i} className="border-t-2 border-slate-300 pt-4">
                       <div className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1.5">Expertise 0{i+1}</div>
                       <div className="text-base font-black opacity-90">{s}</div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          );

        case 'hardware':
          return (
            <div className={cn(bannerClasses, "bg-[#0c0d0f] text-emerald-500 font-mono p-12 flex flex-col border border-white/5")}>
              <div className="flex justify-between items-start mb-auto">
                 <div className="text-[10px] opacity-50 tracking-widest uppercase flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   {cue.label} // RUNNING_STATE: STABLE
                 </div>
                 <div className="flex gap-2">
                   {Array.from({ length: 4 }).map((_, i) => <div key={i} className="w-3 h-3 border border-emerald-500/30 flex items-center justify-center text-[6px] text-emerald-500/40">{i}</div>)}
                 </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                 <h1 className={cn("text-white font-black leading-none mb-2 tracking-tight", titleFontSizeClasses[fontSize])}>{name}</h1>
                 <h2 className={cn("opacity-70 mb-10 text-emerald-400 font-bold", fontSizeClasses[fontSize])}># {role.toUpperCase()}</h2>
                 <div className="flex flex-wrap gap-4">
                    {skills.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 bg-emerald-500" />
                        <span className="text-[10px] text-white/80 font-bold">{s}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="mt-auto flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-emerald-500/10 relative overflow-hidden">
                   <motion.div 
                     animate={{ x: ['-100%', '400%'] }} 
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-y-0 w-24 bg-emerald-500/40" 
                   />
                </div>
                <div className="text-[8px] opacity-30 uppercase">{categoryLabel} PRO_ARCH_V9.0_RC</div>
              </div>
            </div>
          );

        case 'glass':
          return (
            <div className={cn(bannerClasses, "bg-[#020202] flex items-center justify-center p-12 overflow-hidden")}>
                <MeshGradient colors={['#312e81', '#4c1d95']} />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex flex-wrap gap-4 p-8">
                  {Array.from({ length: 15 }).map((_, i) => <cue.icon key={i} size={80} strokeWidth={0.5} />)}
                </div>
                <GlassContainer className="w-full max-w-5xl border-white/20 text-center relative z-20 overflow-visible">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-[10px] font-bold text-white/60 tracking-widest uppercase">
                    {cue.label}
                  </div>
                  <h1 className={cn("font-black text-white tracking-widest mb-2 uppercase italic leading-none", titleFontSizeClasses[fontSize])}>{name}</h1>
                  <h2 className={cn("text-blue-300 font-bold mb-10 uppercase tracking-[0.4em] text-xs", fontSizeClasses[fontSize])}>{role}</h2>
                  <div className="flex flex-wrap justify-center gap-3">
                     {skills.map((s, i) => <SkillBadge key={i} skill={s} theme="glass" useRealIcons={useRealIcons} />)}
                  </div>
                </GlassContainer>
            </div>
          );

        case 'atmospheric':
          return (
            <div className={cn(bannerClasses, "bg-[#020202] text-white flex items-center px-12 md:px-24 overflow-hidden")}>
              <div className="absolute inset-0 opacity-40 blur-[120px] pointer-events-none">
                 <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full" style={{ backgroundColor: primaryColor }} />
                 <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full opacity-60" style={{ backgroundColor: secondaryColor }} />
              </div>
              <div className="relative z-10 w-full">
                <div className="flex items-center gap-4 mb-8 text-white/50">
                   <div className="w-12 h-px bg-white/40" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.5em]">{cue.label}</span>
                </div>
                <h1 className={cn("font-black tracking-tight mb-2 italic bg-gradient-to-r from-white via-white to-white/10 bg-clip-text text-transparent", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-white/40 font-black mb-16 tracking-[0.3em] uppercase text-xs", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="flex gap-16">
                   {skills.slice(0, 3).map((s, i) => (
                     <div key={i} className="flex flex-col border-l border-white/10 pl-6">
                       <span className="text-[9px] font-black text-white/20 uppercase mb-4 tracking-widest">Protocol {i+1}</span>
                       <span className="text-lg font-light tracking-tight opacity-90">{s}</span>
                     </div>
                   ))}
                </div>
              </div>
              <div className="absolute right-0 bottom-0 p-12 opacity-5 scale-150 rotate-12 text-white">
                <cue.icon size={280} strokeWidth={1} />
              </div>
            </div>
          );

        case 'futuristic':
          return (
            <div className={cn(bannerClasses, "bg-[#050505] text-white flex items-center overflow-hidden")}>
              <GridBackground color={primaryColor} />
              <div className="absolute right-0 top-0 h-full w-2/5 flex items-center justify-center opacity-[0.08] pointer-events-none">
                <cue.icon size={450} strokeWidth={0.2} style={{ color: primaryColor }} />
              </div>
              <div className="relative z-10 px-12 md:px-24 w-full">
                <div className="flex items-center gap-4 font-mono text-[9px] text-[#BBFF00] mb-8 tracking-[0.6em] uppercase">
                  <div className="w-10 h-[1px] bg-[#BBFF00]" />
                  {cue.label} // ENCRYPTED_IDENTITY_V9
                </div>
                <h1 className={cn("font-black tracking-tighter mb-2 italic uppercase", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-slate-400 font-bold mb-12 border-l-4 pl-6 uppercase tracking-widest", fontSizeClasses[fontSize])} style={{ borderColor: primaryColor }}>{role}</h2>
                <div className="flex flex-wrap gap-6">
                   {skills.map((s, i) => (
                     <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-sm backdrop-blur-sm">
                       <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: primaryColor }} />
                       <span className="text-[11px] font-mono font-bold opacity-80 uppercase tracking-widest">{s}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          );

        case 'corporate':
          return (
            <div className={cn(bannerClasses, "bg-[#f5f5f4] text-[#0a0a0a] flex items-center text-left")}>
              <div className="w-1/2 h-full p-12 md:p-24 flex flex-col justify-center relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center">
                     <cue.icon size={20} strokeWidth={1} />
                   </div>
                   <div className="text-[10px] font-bold uppercase tracking-widest">{cue.label}</div>
                 </div>
                 <h1 className={cn("font-semibold tracking-tight leading-[0.9] mb-4", titleFontSizeClasses[fontSize])}>{name}</h1>
                 <h2 className={cn("text-[#666] font-light uppercase tracking-widest", fontSizeClasses[fontSize])}>{role}</h2>
              </div>
              <div className="w-1/2 h-full bg-[#0a0a0a] text-white flex flex-col justify-center p-12 relative overflow-hidden">
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#0a0a0a] rotate-45" />
                <div className="relative z-10">
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-8 border-b border-white/20 pb-4">Core Competencies</div>
                  <div className="grid grid-cols-1 gap-4">
                     {skills.map((s, i) => (
                       <div key={i} className="flex items-center gap-4">
                         <span className="text-xs font-mono opacity-50">0{i+1}</span>
                         <span className="text-sm font-semibold tracking-wide uppercase opacity-90">{s}</span>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          );

        case 'retro':
          return (
            <div className={cn(bannerClasses, "bg-[#1a0b2e] text-[#ff00ff] overflow-hidden flex flex-col items-center justify-center")}>
               <div className="absolute bottom-0 w-[200%] h-1/2 left-1/2 -translate-x-1/2" style={{
                 backgroundImage: `linear-gradient(transparent 90%, #00ffff 100%), linear-gradient(90deg, transparent 90%, #00ffff 100%)`,
                 backgroundSize: '40px 40px',
                 transform: 'perspective(500px) rotateX(60deg) translateY(100px)',
                 opacity: 0.3
               }} />
               <div className="relative z-10 text-center flex flex-col items-center">
                 <h1 className={cn("font-black tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-br from-[#ff00ff] to-[#00ffff] drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]", titleFontSizeClasses[fontSize])}>{name}</h1>
                 <h2 className={cn("font-mono tracking-[0.2em] font-bold text-[#facc15] mt-2 mb-8 bg-black/50 px-4 py-1 border border-[#00ffff]/30", fontSizeClasses[fontSize])}>{role}</h2>
                 <div className="flex flex-wrap justify-center gap-4">
                   {skills.map((s, i) => (
                     <div key={i} className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#00ffff] bg-[#00ffff]/10 border border-[#00ffff]/50 px-3 py-1 shadow-[0_0_8px_rgba(0,255,255,0.4)]">
                       {s}
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          );

        case 'neon':
          return (
            <div className={cn(bannerClasses, "bg-[#080808] text-white flex items-center justify-center p-12")}>
               <div className="w-full max-w-4xl border border-white/5 rounded-3xl p-12 relative flex items-center justify-between shadow-2xl" style={{ boxShadow: `0 0 80px -20px ${primaryColor}40` }}>
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 rounded-3xl" />
                 <div className="relative z-10 w-2/3">
                    <div className="flex items-center gap-3 mb-8">
                       <cue.icon size={24} style={{ color: primaryColor }} className="drop-shadow-[0_0_8px_currentColor]" />
                       <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-60">{cue.label}</span>
                    </div>
                    <h1 className={cn("font-bold tracking-tight mb-2 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]", titleFontSizeClasses[fontSize])}>{name}</h1>
                    <h2 className={cn("font-light italic tracking-widest text-white/50 mb-8 uppercase", fontSizeClasses[fontSize])}>{role}</h2>
                 </div>
                 <div className="relative z-10 w-1/3 flex flex-col items-end gap-3">
                    {skills.map((s, i) => (
                      <span key={i} className="text-[11px] font-semibold uppercase tracking-widest border px-4 py-2 rounded-full whitespace-nowrap bg-black/50 backdrop-blur-md" style={{ borderColor: primaryColor, color: primaryColor, boxShadow: `0 0 10px ${primaryColor}40` }}>
                        {s}
                      </span>
                    ))}
                 </div>
               </div>
            </div>
          );

        case 'blueprint':
          return (
            <div className={cn(bannerClasses, "bg-[#0a192f] text-[#64ffda] font-mono overflow-hidden")}>
               <GridBackground color="#64ffda" />
               <div className="absolute left-0 top-0 h-full border-r border-[#64ffda]/30 p-4 flex flex-col justify-between items-center opacity-60">
                 <div className="rotate-90 origin-left text-[8px] tracking-[0.4em] uppercase w-48 mt-24">Fig 1. ARCHITECTURE</div>
                 <cue.icon size={20} strokeWidth={1} />
               </div>
               <div className="pl-24 p-12 flex flex-col justify-center h-full relative z-10">
                 <div className="border border-[#64ffda]/30 bg-[#0a192f]/80 backdrop-blur-sm p-8 inline-block max-w-3xl">
                   <div className="text-[10px] tracking-widest uppercase mb-6 flex justify-between border-b border-[#64ffda]/30 pb-2">
                     <span>{cue.label}</span>
                     <span>VER 2.0</span>
                   </div>
                   <h1 className={cn("font-normal uppercase tracking-tight mb-4", titleFontSizeClasses[fontSize])}>{name}</h1>
                   <h2 className={cn("opacity-70 mb-8 border-l-2 border-[#64ffda] pl-4", fontSizeClasses[fontSize])}>{role}</h2>
                   <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                     {skills.map((s, i) => (
                       <div key={i} className="text-[11px] tracking-widest flex items-center gap-2">
                         <div className="w-1 h-1 bg-[#64ffda] rounded-full" /> {s}
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </div>
          );

        case 'utility':
           return (
             <div className={cn(bannerClasses, "bg-[#f5f5f5] text-[#1a1a1a] p-12 flex items-center justify-center font-sans")}>
                <div className="w-full max-w-5xl bg-white rounded-[32px] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex justify-between items-stretch">
                   <div className="flex flex-col flex-1">
                      <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-8 shadow-md">
                        <cue.icon size={20} />
                      </div>
                      <h1 className={cn("font-medium tracking-tight mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
                      <h2 className={cn("text-[#888] font-regular mb-auto", fontSizeClasses[fontSize])}>{role}</h2>
                   </div>
                   <div className="w-px bg-slate-100 mx-12" />
                   <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1 items-center">
                     {skills.map((s, i) => (
                       <div key={i} className="flex flex-col">
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 opacity-70">Capability 0{i+1}</div>
                         <div className="text-sm font-semibold text-slate-800">{s}</div>
                         <div className="flex gap-1 mt-2">
                           {Array.from({ length: 15 }).map((_, j) => <div key={j} className={cn("w-1.5 h-1.5 rounded-full", j < 10 ? "bg-slate-800" : "bg-slate-200")} />)}
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
             </div>
           );

        case 'typographic':
           return (
             <div className={cn(bannerClasses, "bg-white text-black overflow-hidden flex items-center p-12")}>
               <div className="absolute right-[-5%] top-[-10%] opacity-5 text-black pointer-events-none" style={{ fontSize: '500px', lineHeight: 0.8, fontFamily: 'serif', fontWeight: 900 }}>
                 01
               </div>
               <div className="border border-slate-200 w-full h-full flex items-center relative z-10 bg-white/80 backdrop-blur-sm">
                 <div className="w-16 h-full border-r border-slate-200 flex items-center justify-center bg-slate-50 shrink-0">
                    <div className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
                       <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400">{cue.label}</span>
                    </div>
                 </div>
                 <div className="p-12 relative flex-1">
                    <h1 className={cn("font-serif font-black tracking-tighter mb-4", titleFontSizeClasses[fontSize])}>{name}</h1>
                    <h2 className={cn("font-sans font-medium text-slate-500 uppercase tracking-widest text-xs mb-10 w-fit border-b border-black pb-2", fontSizeClasses[fontSize])}>{role}</h2>
                    <div className="flex gap-8">
                       {skills.map((s, i) => <span key={i} className="text-sm font-serif italic text-slate-600">{s}</span>)}
                    </div>
                 </div>
               </div>
             </div>
           );

        case 'systematic':
           return (
             <div className={cn(bannerClasses, "bg-[#E4E3E0] text-[#141414] font-sans p-8")}>
               <div className="grid grid-cols-4 grid-rows-3 gap-0 w-full h-full border border-[#141414]">
                 <div className="col-span-3 row-span-2 border-r border-b border-[#141414] p-10 flex flex-col justify-center bg-white/50">
                    <div className="text-[10px] font-bold font-mono uppercase tracking-widest mb-6 border border-[#141414] rounded-full px-3 py-1 w-fit flex items-center gap-2">
                       <cue.icon size={12} /> {cue.label}
                    </div>
                    <h1 className={cn("font-black uppercase tracking-tighter leading-none mb-3", titleFontSizeClasses[fontSize])}>{name}</h1>
                    <h2 className={cn("font-medium opacity-70", fontSizeClasses[fontSize])}>{role}</h2>
                 </div>
                 <div className="col-span-1 row-span-2 border-b border-[#141414] p-8 flex flex-col items-center justify-center gap-6 bg-white/20">
                    <cue.icon size={80} strokeWidth={0.5} className="opacity-20" />
                 </div>
                 <div className="col-span-4 row-span-1 grid grid-cols-5 text-center">
                    {skills.slice(0, 5).map((s, i) => (
                      <div key={i} className="border-r border-[#141414] last:border-0 p-6 flex flex-col justify-center items-center hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors group">
                        <span className="font-serif italic text-[11px] opacity-60 mb-2 group-hover:opacity-100">SKILL 0{i+1}</span>
                        <span className="font-mono font-bold text-xs uppercase tracking-tight">{s}</span>
                      </div>
                    ))}
                 </div>
               </div>
             </div>
           );

        case 'fluid':
           return (
             <div className={cn(bannerClasses, "bg-[#f5f5f0] text-[#2c302e] flex items-center justify-between px-16 overflow-hidden")}>
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[150%] bg-[#cfd1c4] rounded-[100%] opacity-40 blur-3xl pointer-events-none" />
                <div className="relative z-10 w-2/3">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-full bg-[#5A5A40] flex items-center justify-center text-white">
                      <cue.icon size={16} />
                    </div>
                    <span className="font-serif italic text-sm text-[#5A5A40]">{cue.label}</span>
                  </div>
                  <h1 className={cn("font-serif font-light mb-4 text-[#1a1c1b]", titleFontSizeClasses[fontSize])}>{name}</h1>
                  <h2 className={cn("font-sans font-medium uppercase tracking-[0.2em] text-[#5A5A40] text-xs mb-12", fontSizeClasses[fontSize])}>{role}</h2>
                </div>
                <div className="relative z-10 w-1/3 flex flex-col items-end gap-3">
                   {skills.map((s, i) => (
                     <div key={i} className="px-6 py-3 bg-white/60 backdrop-blur-md rounded-full border border-white/40 shadow-sm text-xs font-semibold tracking-wide text-[#5A5A40] hover:bg-white transition-all">
                       {s}
                     </div>
                   ))}
                </div>
             </div>
           );

        case 'monotone':
           return (
             <div className={cn(bannerClasses, "bg-black text-white flex flex-col items-center justify-center text-center px-12 relative")}>
               <div className="absolute inset-x-8 top-12 h-px bg-white/20" />
               <div className="absolute inset-x-8 bottom-12 h-px bg-white/20" />
               <div className="text-[9px] uppercase tracking-[0.4em] font-mono text-white/40 mb-8 absolute top-8 bg-black px-4">{cue.label}</div>
               <h1 className={cn("font-bold tracking-[-0.05em] leading-[0.9] text-white opacity-95", titleFontSizeClasses[fontSize])}>{name}</h1>
               <h2 className={cn("font-light text-white/50 mt-4 mb-8", fontSizeClasses[fontSize])}>{role}</h2>
               <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-white/30 absolute bottom-8 bg-black px-6">
                 {skills.join('  /  ')}
               </div>
             </div>
           );

        case 'vibrant':
           return (
             <div className={cn(bannerClasses, "text-[#000] flex items-center p-16")} style={{ backgroundColor: primaryColor }}>
                <div className="absolute top-0 right-0 h-full w-1/3 bg-black/5" />
                <div className="relative z-10 w-full border-l border-black/20 pl-12 py-4">
                  <div className="font-sans font-bold uppercase tracking-[0.3em] text-[10px] mb-6 opacity-60 flex items-center gap-3">
                    <cue.icon size={16} /> {cue.label}
                  </div>
                  <h1 className={cn("font-serif font-bold italic tracking-tight leading-none mb-4", titleFontSizeClasses[fontSize])}>{name}</h1>
                  <h2 className={cn("font-sans font-black uppercase tracking-tight opacity-80 mb-12", fontSizeClasses[fontSize])}>{role}</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm font-semibold opacity-90 border-t border-black/20 pt-6 max-w-4xl">
                     {skills.map((s, i) => <div key={i}>{s}</div>)}
                  </div>
                </div>
             </div>
           );

        case 'clean':
           return (
             <div className={cn(bannerClasses, "bg-white text-slate-900 flex items-center justify-center text-center")}>
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at center, black 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="relative z-10 px-12 max-w-4xl">
                  <h1 className={cn("font-light tracking-tight mb-3", titleFontSizeClasses[fontSize])}>{name}</h1>
                  <h2 className={cn("font-medium text-slate-400 uppercase tracking-widest text-[10px] mb-12", fontSizeClasses[fontSize])}>{role}</h2>
                  <div className="flex flex-wrap justify-center gap-6">
                    {skills.map((s, i) => (
                      <span key={i} className="text-xs font-semibold text-slate-600 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">{s}</span>
                    ))}
                  </div>
                </div>
             </div>
           );

        case 'bold':
           return (
             <div className={cn(bannerClasses, "bg-[#050505] text-white flex items-center overflow-hidden")}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] 40% to-transparent z-10" />
                <div className="absolute right-0 top-0 h-full w-2/3 bg-white/5 skew-x-[-15deg] translate-x-32" />
                <div className="w-[150%] absolute right-[-20%] bottom-[-20%] opacity-10 font-black italic uppercase leading-[0.7] text-[#BBFF00]" style={{ fontSize: '24vw', wordBreak: 'break-all', transform: 'rotate(-5deg)' }}>
                  {name.split(' ')[0]}
                </div>
                <div className="relative z-20 px-16 w-full transform skew-x-[-5deg]">
                  <h1 className={cn("font-black tracking-tighter uppercase mb-4 text-[#BBFF00]", titleFontSizeClasses[fontSize])} style={{ letterSpacing: '-0.02em', lineHeight: 0.9 }}>{name}</h1>
                  <h2 className={cn("font-bold text-white uppercase tracking-wider mb-8 text-xl max-w-lg", fontSizeClasses[fontSize])}>{role}</h2>
                  <div className="flex flex-wrap gap-3 mt-12 border-t border-[#BBFF00]/30 pt-6">
                    {skills.map((s, i) => <span key={i} className="text-[10px] font-black italic uppercase tracking-widest text-[#BBFF00] bg-[#BBFF00]/10 px-3 py-1">{s}</span>)}
                  </div>
                </div>
             </div>
           );

        default:

          return (
            <div className={cn(bannerClasses, "bg-[#0A0A0A] flex items-center justify-center")}>
              <GenerativePattern type={parts.length} />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full px-12 md:px-24 text-center">
                <cue.icon size={48} className="mx-auto mb-6 opacity-40" style={{ color: primaryColor }} />
                <h1 className={cn("font-black tracking-tighter mb-2", titleFontSizeClasses[fontSize])} style={{ color: primaryColor }}>{name}</h1>
                <h2 className={cn("text-white/50 font-medium mb-10 tracking-widest uppercase text-xs", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {skills.map((s, i) => <SkillBadge key={i} skill={s} theme="cloud_native" useRealIcons={useRealIcons} />)}
                </div>
              </motion.div>
            </div>
          );
      }
    }

    switch (theme) {
      case 'terminal':
        return (
          <div className={cn(bannerClasses, "bg-slate-950 font-mono text-slate-300")} style={{ color: textColor }}>
            <div className="absolute inset-0 opacity-[0.03] flex flex-wrap gap-4 p-4 pointer-events-none text-xs">
              {Array.from({ length: 40 }).map((_, i) => <span key={i}>sudo systemctl restart docker... </span>)}
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Terminal size={180} strokeWidth={0.5} style={{ color: primaryColor }} className="transform translate-x-10 -translate-y-10" />
            </div>
            <div className="relative h-full flex flex-col justify-center px-12 md:px-20 z-10">
              <div className="flex items-center space-x-2 mb-4 text-sm" style={{ color: primaryColor }}>
                <span className="text-slate-500">root@infrastructure:~$</span><span className="animate-pulse">_</span>
              </div>
              <h1 className={cn("font-bold mb-2 tracking-tight", titleFontSizeClasses[fontSize])} style={{ color: textColor }}>
                <span style={{ color: primaryColor }}>{"{"}</span> {name} <span style={{ color: primaryColor }}>{"{"}</span>
              </h1>
              <h2 className={cn("mb-6", fontSizeClasses[fontSize])} style={{ color: secondaryColor }}>
                <span className="text-blue-400">const</span> role <span style={{ color: primaryColor }}>=</span> <span className="text-amber-300">"{role}"</span>;
              </h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => <SkillBadge key={i} skill={skill} theme="terminal" useRealIcons={useRealIcons} />)}
              </div>
            </div>
            {logoUrl && <img src={logoUrl} className="absolute bottom-4 right-4 h-8 opacity-50" referrerPolicy="no-referrer" crossOrigin="anonymous" />}
          </div>
        );
      
      case 'pipeline':
        return (
          <div className={cn(bannerClasses, "text-white")} style={{ background: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})` }}>
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 50 Q 25 20, 50 50 T 100 50" fill="none" stroke="white" strokeWidth="0.5" className="animate-pulse" />
              </svg>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-end pr-16 space-x-8 opacity-40">
               <div className="flex flex-col space-y-6"><Cloud size={48} /><Server size={48} /></div>
               <Infinity size={120} strokeWidth={1} />
            </div>
            <div className="relative h-full flex flex-col justify-center px-12 md:px-20 z-10 w-2/3">
              <div className="flex items-center space-x-2 font-semibold tracking-widest uppercase text-xs mb-3"><Repeat size={14} /><span>Continuous Delivery</span></div>
              <h1 className={cn("font-black mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("font-light mb-6 opacity-80", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => <SkillBadge key={i} skill={skill} theme="pipeline" useRealIcons={useRealIcons} />)}
              </div>
            </div>
            {logoUrl && <img src={logoUrl} className="absolute bottom-4 right-4 h-8 opacity-50" referrerPolicy="no-referrer" crossOrigin="anonymous" />}
          </div>
        );

      case 'ceo':
        return (
          <div className={cn(bannerClasses, "bg-white text-slate-900 flex items-center justify-center text-center")} style={{ color: textColor }}>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle, ${primaryColor} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
            <Globe className="absolute top-[-50px] right-[-50px] text-slate-100 opacity-50" size={400} strokeWidth={0.5} />
            <div className="relative z-10 px-12 flex flex-col items-center">
               <div className="w-12 h-1 mb-8" style={{ backgroundColor: primaryColor }}></div>
               <h1 className={cn("font-black tracking-tighter mb-4", titleFontSizeClasses[fontSize])}>{name}</h1>
               <h2 className={cn("uppercase tracking-[0.3em] font-light", fontSizeClasses[fontSize])} style={{ color: secondaryColor }}>{role}</h2>
            </div>
            {logoUrl && <img src={logoUrl} className="absolute top-4 left-4 h-8" referrerPolicy="no-referrer" crossOrigin="anonymous" />}
          </div>
        );

      case 'sre':
        return (
          <div className={cn(bannerClasses, "bg-[#0a192f] text-slate-300 overflow-hidden")}>
            <div className="absolute bottom-0 w-full h-1/2 opacity-20">
               <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
                 <path d="M0,50 L0,30 Q10,40 20,20 T40,25 T60,10 T80,30 T100,15 L100,50 Z" fill={primaryColor} opacity="0.2" />
                 <polyline points="0,35 15,45 30,15 50,30 70,5 100,25" fill="none" stroke={primaryColor} strokeWidth="0.5" />
               </svg>
            </div>
            <div className="absolute inset-0 border-t border-b border-emerald-900/30 grid grid-cols-4 divide-x divide-emerald-900/30"><div></div><div></div><div></div><div></div></div>
            <div className="relative h-full flex flex-row items-center justify-between px-12 md:px-20 z-10">
              <div className="w-1/2">
                <div className="inline-flex items-center space-x-2 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono mb-4">
                  <CheckCircle2 size={12} /><span>ALL SYSTEMS OPERATIONAL</span>
                </div>
                <h1 className={cn("font-bold text-white mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-emerald-400/80 mb-6 font-mono", fontSizeClasses[fontSize])}>{role}</h2>
              </div>
              <div className="w-1/2 flex flex-col items-end justify-center space-y-4">
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50 backdrop-blur">
                    <div className="text-xs text-slate-500 mb-1 flex justify-between"><LineChart size={12}/> UPTIME</div>
                    <div className="text-xl font-mono text-emerald-400">99.999%</div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50 backdrop-blur">
                    <div className="text-xs text-slate-500 mb-1 flex justify-between"><Activity size={12}/> LATENCY</div>
                    <div className="text-xl font-mono text-emerald-400">12ms</div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-end gap-2 max-w-md">
                  {skills.slice(0, 4).map((skill, i) => <SkillBadge key={i} skill={skill} theme="sre" useRealIcons={useRealIcons} />)}
                </div>
              </div>
            </div>
          </div>
        );

      case 'gitops':
        return (
          <div className={cn(bannerClasses, "bg-slate-900 text-white overflow-hidden flex items-center")}>
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 10 50 L 90 50" stroke={primaryColor} strokeWidth="0.5" strokeDasharray="2 2"/>
                <path d="M 30 50 Q 40 20 60 20 T 90 20" stroke={secondaryColor} fill="none" strokeWidth="0.5"/>
                <circle cx="30" cy="50" r="1.5" fill={primaryColor} />
                <circle cx="60" cy="20" r="1.5" fill={secondaryColor} />
                <circle cx="80" cy="50" r="1.5" fill={primaryColor} />
              </svg>
            </div>
            <div className="relative z-10 px-12 md:px-20">
              <div className="flex items-center space-x-2 font-mono text-sm mb-3" style={{ color: primaryColor }}>
                <GitBranch size={16} /><span>main</span>
              </div>
              <h1 className={cn("font-black mb-2", titleFontSizeClasses[fontSize])} style={{ color: textColor }}>{name}</h1>
              <h2 className={cn("text-slate-300 font-light mb-6", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => <SkillBadge key={i} skill={skill} theme="gitops" useRealIcons={useRealIcons} />)}
              </div>
            </div>
          </div>
        );

      case 'serverless':
        return (
          <div className={cn(bannerClasses, "bg-[#121212] text-white overflow-hidden flex items-center")}>
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 gap-4 p-4 h-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                ))}
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center opacity-20">
              <Zap size={240} strokeWidth={0.5} style={{ color: primaryColor }} />
            </div>
            <div className="relative z-10 px-12 md:px-20">
              <div className="inline-block px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: primaryColor }}>Event Driven Architecture</div>
              <h1 className={cn("font-black tracking-tight mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-[#999999] font-medium mb-6", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => <SkillBadge key={i} skill={skill} theme="serverless" useRealIcons={useRealIcons} />)}
              </div>
            </div>
          </div>
        );

      case 'security_vault':
        return (
          <div className={cn(bannerClasses, "bg-black text-white overflow-hidden flex items-center")}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-black"></div>
            <div className="absolute inset-0 border border-red-500/10 m-4 rounded-xl"></div>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-20">
              <Lock size={200} strokeWidth={0.5} style={{ color: primaryColor }} />
            </div>
            <div className="relative z-10 px-12 md:px-20 font-mono">
              <div className="flex items-center space-x-2 text-red-500 text-xs mb-4">
                <Shield size={14} /><span>[ ENCRYPTED SESSION ]</span>
              </div>
              <h1 className={cn("font-bold mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-slate-500 mb-8", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex flex-wrap gap-2 text-xs opacity-70">
                {skills.map((s, i) => <span key={i} className="text-red-500/80">{"<"}{s}{">"}</span>)}
              </div>
            </div>
          </div>
        );

      case 'community_pulse':
        return (
          <div className={cn(bannerClasses, "bg-slate-50 text-slate-900 border-none shadow-none")}>
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-indigo-100 opacity-50"></div>
            <div className="absolute right-0 top-0 p-12 opacity-10">
              <Users size={320} strokeWidth={0.5} style={{ color: primaryColor }} />
            </div>
            <div className="relative h-full flex flex-col justify-center px-12 md:px-20 z-10">
              <div className="flex space-x-1 mb-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i % 2 === 0 ? primaryColor : secondaryColor }}></div>
                ))}
              </div>
              <h1 className={cn("font-black tracking-tight mb-2 text-slate-900", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("font-medium mb-6", fontSizeClasses[fontSize])} style={{ color: primaryColor }}>{role}</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => <SkillBadge key={i} skill={skill} theme="ceo" useRealIcons={useRealIcons} />)}
              </div>
            </div>
          </div>
        );

      case 'blueprint':
        return (
          <div className={cn(bannerClasses, "bg-[#1E3A8A] text-white/90 overflow-hidden")} style={{ backgroundImage: 'linear-gradient(#ffffff0a 1px, transparent 1px), linear-gradient(90deg, #ffffff0a 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            <div className="absolute inset-0 border-[20px] border-[#1E3A8A] z-20 pointer-events-none"></div>
            <div className="absolute inset-4 border border-white/20 z-20 pointer-events-none"></div>
            <div className="relative h-full flex flex-col justify-center px-12 md:px-20 z-10 font-mono">
              <div className="text-[10px] uppercase tracking-widest opacity-60 mb-8 flex justify-between w-full max-w-sm border-b border-white/20 pb-1">
                <span>Scale 1:1</span>
                <span>Serial_No: {Date.now().toString().slice(-6)}</span>
              </div>
              <h1 className={cn("font-medium tracking-tight mb-2 uppercase italic text-white", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("opacity-70 mb-8 border-l-2 pl-4", fontSizeClasses[fontSize])} style={{ borderColor: primaryColor }}>{role}</h2>
              <div className="grid grid-cols-2 gap-x-12 gap-y-2 opacity-60 text-[11px] uppercase">
                {skills.map((s, i) => <div key={i} className="flex justify-between border-b border-white/10"><span>Module {i+1}:</span> <span>{s}</span></div>)}
              </div>
            </div>
          </div>
        );

      case 'evangelist_vibe':
        return (
          <div className={cn(bannerClasses, "bg-[#0A0A0A] text-white flex flex-col items-center justify-center text-center")}>
            <div className="absolute inset-0 bg-[#BBFF00]/5 opacity-30 mix-blend-overlay"></div>
            <div className="absolute top-0 w-full h-1 bg-[#BBFF00]"></div>
            <div className="absolute bottom-0 w-full h-1 bg-[#BBFF00]"></div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10 px-12"
            >
              <h1 className={cn("font-black tracking-tighter mb-2 italic leading-none drop-shadow-2xl", titleFontSizeClasses[fontSize])} style={{ color: primaryColor }}>
                {name.toUpperCase()}
              </h1>
              <div className="bg-white text-black px-4 py-1.5 font-black uppercase tracking-widest inline-block mb-8 transform -skew-x-12 rotate-2">
                {role}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {skills.map((s, i) => <span key={i} className="text-xs font-bold border-b-2 border-white pb-1">{s}</span>)}
              </div>
            </motion.div>
          </div>
        );

      case 'kubernetes_mesh':
        return (
          <div className={cn(bannerClasses, "bg-[#326CE5] text-white flex items-center overflow-hidden")}>
            <div className="absolute inset-0 opacity-10">
               <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <polygon key={i} points="10,0 20,5 20,15 10,20 0,15 0,5" fill="none" stroke="currentColor" strokeWidth="0.5" transform={`translate(${Math.random()*100}, ${Math.random()*100}) scale(2)`} />
                  ))}
               </svg>
            </div>
            <div className="absolute right-12 opacity-10">
              <Hexagon size={300} strokeWidth={1} />
            </div>
            <div className="relative z-10 px-12 md:px-20 font-sans">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-[#326CE5] mb-6 shadow-xl">
                <Hexagon size={28} fill="currentColor" />
              </div>
              <h1 className={cn("font-black mb-1", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-white/80 mb-6 font-medium italic", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => <SkillBadge key={i} skill={skill} theme="pipeline" useRealIcons={useRealIcons} />)}
              </div>
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className={cn(bannerClasses, "bg-[#F5F2EA] text-slate-800 flex items-center")}>
            <div className="absolute top-0 left-0 w-12 h-full bg-[#E5E2DA] opacity-50 border-r border-slate-200"></div>
            <div className="relative z-10 px-24 font-serif">
              <div className="text-[10px] tracking-[0.3em] font-bold text-slate-400 uppercase mb-8 border-b border-slate-300 pb-2">Student Digital Identity</div>
              <h1 className={cn("font-black tracking-tight mb-2 italic", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-slate-500 font-light mb-8", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex flex-wrap gap-4">
                {skills.map((s, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-slate-600">
                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'strategy':
        return (
          <div className={cn(bannerClasses, "bg-white text-black flex items-center")}>
            <div className="absolute inset-0 bg-slate-50 opacity-50"></div>
            <div className="absolute right-0 top-0 h-full w-1/3 skew-x-[-12deg] origin-top translate-x-12" style={{ backgroundColor: primaryColor }}></div>
            <div className="relative z-10 px-12 md:px-20">
              <h1 className={cn("font-black tracking-tighter mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-slate-500 font-light uppercase tracking-widest mb-10", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex space-x-8">
                {skills.slice(0, 3).map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Priority {i + 1}</span>
                    <span className="text-sm font-bold">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'modern_stack':
        return (
          <div className={cn(bannerClasses, "bg-[#0F172A] text-white flex items-center justify-center text-center")}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
            </div>
            <div className="relative z-10 px-12 backdrop-blur-3xl p-12 rounded-[2rem] border border-white/5">
              <h1 className={cn("font-black tracking-tighter mb-2 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-blue-400 font-medium mb-8", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill, i) => <SkillBadge key={i} skill={skill} theme="cloud_native" useRealIcons={useRealIcons} />)}
              </div>
            </div>
          </div>
        );

      case 'cloud_native':
        return (
          <div className={cn(bannerClasses, "bg-[#030712] text-white flex items-center overflow-hidden")}>
            <MeshGradient colors={['#3B82F6', '#10B981']} />
            <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center opacity-10">
              <Layers size={400} strokeWidth={0.5} />
            </div>
            <div className="relative z-10 px-12 md:px-24">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-[10px] uppercase tracking-widest mb-4">
                <Box size={14} /> <span>Cloud Native Certified</span>
              </div>
              <h1 className={cn("font-black tracking-tight mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-slate-400 mb-8 font-medium", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((s, i) => <SkillBadge key={i} skill={s} theme="pipeline" useRealIcons={useRealIcons} />)}
              </div>
            </div>
          </div>
        );

      case 'system_graph':
        return (
          <div className={cn(bannerClasses, "bg-[#0c0c0e] text-white flex items-center")}>
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="20" cy="20" r="1" fill={primaryColor} />
                <circle cx="80" cy="30" r="1.2" fill={primaryColor} />
                <circle cx="50" cy="70" r="0.8" fill={primaryColor} />
                <line x1="20" y1="20" x2="80" y2="30" stroke={primaryColor} strokeWidth="0.1" />
                <line x1="80" y1="30" x2="50" y2="70" stroke={primaryColor} strokeWidth="0.1" />
                <line x1="20" y1="20" x2="50" y2="70" stroke={primaryColor} strokeWidth="0.1" />
              </svg>
            </div>
            <div className="relative z-10 px-12 md:px-24">
              <h1 className={cn("font-black mb-1", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-slate-500 font-mono mb-8", fontSizeClasses[fontSize])}>{">"} {role}</h2>
              <div className="flex space-x-4">
                 {skills.map((s, i) => (
                   <div key={i} className="flex flex-col items-center">
                     <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center mb-1"><Cpu size={14} className="text-blue-400" /></div>
                     <span className="text-[10px] opacity-40 uppercase">{s}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        );

      case 'social_devrel':
        return (
          <div className={cn(bannerClasses, "bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center")}>
            <div className="absolute right-0 top-0 p-12 opacity-20">
              <Megaphone size={300} strokeWidth={0.5} />
            </div>
            <div className="relative z-10 px-12 md:px-24">
              <div className="w-12 h-1 bg-white mb-6"></div>
              <h1 className={cn("font-black tracking-tighter mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-white/80 font-bold italic mb-8", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2"><Twitter size={14} /> <span className="text-xs">@developer</span></div>
                <div className="flex items-center space-x-2"><Github size={14} /> <span className="text-xs">/devrel</span></div>
              </div>
            </div>
          </div>
        );

      case 'open_source':
        return (
          <div className={cn(bannerClasses, "bg-[#0d1117] text-[#c9d1d9] flex flex-col p-8 md:p-12 font-sans")}>
            <div className="flex items-center space-x-3 mb-auto opacity-50 text-xs">
              <Github size={16} /> <span>Contributions in the last year</span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h1 className={cn("text-white font-bold mb-1", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-slate-400 mb-6", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex gap-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className={cn("w-3 h-3 rounded-sm", i % 5 === 0 ? "bg-[#39d353]" : i % 3 === 0 ? "bg-[#26a641]" : "bg-[#161b22]")}></div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'portfolio_pro':
        return (
          <div className={cn(bannerClasses, "bg-white text-slate-900 flex items-center px-12 md:px-24")}>
            <div className="absolute left-0 top-0 w-2 h-full bg-blue-600"></div>
            <div className="flex-1">
              <h1 className={cn("font-black tracking-tight mb-2 text-slate-800", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-blue-600 font-bold uppercase tracking-widest mb-8", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex gap-4">
                 {skills.map((s, i) => <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded text-xs text-slate-500">{s}</span>)}
              </div>
            </div>
            <div className="hidden md:block opacity-5">
              <Briefcase size={280} strokeWidth={0.5} />
            </div>
          </div>
        );

      case 'sol_mesh':
        return (
          <div className={cn(bannerClasses, "bg-[#111111] text-white flex items-center overflow-hidden")}>
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
             <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center">
                <svg width="300" height="300" viewBox="0 0 100 100" className="opacity-20">
                   <path d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z" fill="none" stroke={primaryColor} strokeWidth="0.5" />
                   <path d="M50 10 L50 90 M80 30 L20 70 M80 70 L20 30" stroke={primaryColor} strokeWidth="0.2" />
                </svg>
             </div>
             <div className="relative z-10 px-12 md:px-24">
                <h1 className={cn("font-black tracking-tighter mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("font-medium text-slate-400 mb-8 border-l-4 pl-6", fontSizeClasses[fontSize])} style={{ borderColor: primaryColor }}>{role}</h2>
                <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-[#999999]">
                   <Search size={14} /> <span>Enterprise Architecture Strategy</span>
                </div>
             </div>
          </div>
        );

      case 'cloud_vault':
        return (
          <div className={cn(bannerClasses, "bg-[#0b0f19] text-white flex items-center overflow-hidden")}>
             <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-transparent"></div>
             <div className="absolute right-24 top-1/2 -translate-y-1/2 opacity-10">
                <Lock size={320} strokeWidth={0.5} style={{ color: primaryColor }} />
             </div>
             <div className="relative z-10 px-12 md:px-24">
                <div className="bg-blue-600/20 border border-blue-500/30 text-blue-400 px-3 py-1 rounded inline-block text-[10px] font-bold mb-6">ISO 27001 CLOUD SECURITY</div>
                <h1 className={cn("font-black mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-slate-400 font-light mb-8 italic", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="flex gap-3">
                   {skills.map((s, i) => <div key={i} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center"><Shield size={14} /></div>)}
                </div>
             </div>
          </div>
        );

      case 'visionary':
        return (
          <div className={cn(bannerClasses, "bg-black text-white flex items-center justify-center text-center")}>
             <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
             </div>
             <div className="relative z-10 px-12">
                <Globe className="mx-auto mb-8 opacity-40 animate-[spin_20s_linear_infinite]" size={80} strokeWidth={1} />
                <h1 className={cn("font-black tracking-[0.2em] uppercase mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("tracking-[0.5em] font-light text-white/60 uppercase", fontSizeClasses[fontSize])}>{role}</h2>
             </div>
          </div>
        );

      case 'leadership':
        return (
          <div className={cn(bannerClasses, "bg-slate-50 text-slate-900 border-none")}>
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-900"></div>
            <div className="relative h-full flex flex-col justify-center px-12 md:px-24">
               <h1 className={cn("font-black tracking-tighter mb-1", titleFontSizeClasses[fontSize])}>{name}</h1>
               <h2 className={cn("text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-6 mb-8 w-max", fontSizeClasses[fontSize])}>{role}</h2>
               <div className="flex space-x-12">
                  <div className="flex flex-col"><span className="text-[10px] font-bold text-slate-400 uppercase">Focus</span><span className="text-sm font-bold">Innovation</span></div>
                  <div className="flex flex-col"><span className="text-[10px] font-bold text-slate-400 uppercase">Scale</span><span className="text-sm font-bold">Global Enterprise</span></div>
               </div>
            </div>
          </div>
        );

      case 'execution':
        return (
          <div className={cn(bannerClasses, "bg-[#111] text-white flex items-center px-12 md:px-24")}>
            <div className="absolute right-0 top-0 h-full w-1 border-r-8 border-emerald-500"></div>
            <div className="flex-1">
               <div className="flex items-center space-x-2 text-emerald-500 font-bold text-xs mb-6">
                  <CheckCircle2 size={16} /> <span>OPERATIONAL EXCELLENCE</span>
               </div>
               <h1 className={cn("font-black tracking-tighter mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
               <h2 className={cn("text-slate-400 font-medium mb-10", fontSizeClasses[fontSize])}>{role}</h2>
               <div className="flex space-x-8 text-[11px] font-bold opacity-60">
                 {skills.map((s, i) => <span key={i}> {">"} {s}</span>)}
               </div>
            </div>
          </div>
        );

      case 'team_synergy':
        return (
          <div className={cn(bannerClasses, "bg-indigo-900 text-white flex items-center overflow-hidden")}>
             <div className="absolute left-0 bottom-0 p-12 opacity-10">
                <Users size={340} strokeWidth={0.5} />
             </div>
             <div className="relative z-10 px-12 md:px-24 flex flex-col items-end text-right w-full">
                <h1 className={cn("font-black mb-1 leading-none", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-indigo-200/70 mb-8 italic", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="flex gap-2">
                   {skills.map((s, i) => <div key={i} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5"><div className="w-1.5 h-1.5 rounded-full bg-white" /></div>)}
                </div>
             </div>
          </div>
        );

      case 'org_chart':
        return (
          <div className={cn(bannerClasses, "bg-slate-900 text-white flex flex-col p-8 md:p-12")}>
             <div className="flex-1 flex flex-col justify-center">
                <h1 className={cn("font-black tracking-tighter mb-1", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-[#BBFF00] font-bold text-xs uppercase tracking-widest mb-10", fontSizeClasses[fontSize])}>{role}</h2>
             </div>
             <div className="flex space-x-1 justify-center opacity-30 mt-auto">
                {Array.from({ length: 15 }).map((_, i) => <div key={i} className="flex flex-col items-center"><div className="w-4 h-4 rounded-sm border border-white/20 mb-1"></div><div className="w-[1px] h-4 bg-white/20"></div></div>)}
             </div>
          </div>
        );

      case 'keyboard_pro':
        return (
          <div className={cn(bannerClasses, "bg-[#18181b] text-[#71717a] font-mono flex items-center px-12 md:px-24 overflow-hidden")}>
             <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
             <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#BBFF00] mb-6 font-bold pb-2 border-b border-white/5 inline-block">Crafting Digital Experiences</div>
                <h1 className={cn("text-white font-bold mb-1 tracking-tight", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("opacity-60 mb-8", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="text-xs text-white/40 flex items-center space-x-4">
                   <span>FN</span> <span>CTRL</span> <span>OPT</span> <span className="text-[#BBFF00]">CMD</span> <span>SHIFT</span>
                </div>
             </div>
             <div className="hidden md:block absolute right-0 bottom-0 p-12 opacity-10 scale-150">
                <Terminal size={200} />
             </div>
          </div>
        );

      case 'global_talk':
        return (
          <div className={cn(bannerClasses, "bg-[#060606] text-white flex items-center overflow-hidden")}>
             <div className="absolute right-0 top-0 h-full w-1/3 skew-x-[-12deg] bg-[#BBFF00] origin-top translate-x-12 opacity-10"></div>
             <div className="relative z-10 px-12 md:px-24 flex flex-col items-start">
                <div className="flex items-center space-x-3 mb-6">
                   <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"><Radio size={16} className="text-[#BBFF00]" /></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#BBFF00]">International Speaker</span>
                </div>
                <h1 className={cn("font-black tracking-tighter italic mb-1", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-slate-400 font-light mb-8", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="flex gap-4">
                   {skills.map((s, i) => <span key={i} className="text-[9px] font-bold uppercase tracking-widest border border-white/10 px-2 py-1 rounded">{"# " + s}</span>)}
                </div>
             </div>
          </div>
        );

      case 'devsecops_flow':
        return (
          <div className={cn(bannerClasses, "bg-[#050505] text-white flex items-center font-mono overflow-hidden")}>
             <div className="absolute inset-0 opacity-10">
                <div className="flex flex-col h-full justify-between py-8">
                   {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-px w-full bg-red-500/20" />)}
                </div>
             </div>
             <div className="relative z-10 px-12 md:px-24">
                <div className="flex items-center space-x-2 text-red-500 font-bold text-xs mb-4">
                   <Lock size={14} /> <span>HARDENED_PIPELINE_ACTIVE</span>
                </div>
                <h1 className={cn("font-black tracking-tighter mb-1", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-slate-600 mb-8", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="flex space-x-6 text-[10px]">
                   <div className="flex items-center space-x-1"><div className="w-1.5 h-1.5 bg-red-500" /> <span>SCAN</span></div>
                   <div className="flex items-center space-x-1"><div className="w-1.5 h-1.5 bg-red-500" /> <span>TEST</span></div>
                   <div className="flex items-center space-x-1"><div className="w-1.5 h-1.5 bg-red-500" /> <span>SIGN</span></div>
                </div>
             </div>
          </div>
        );

      case 'vulnerability_grid':
        return (
          <div className={cn(bannerClasses, "bg-[#09090b] text-[#ef4444] font-mono flex items-center overflow-hidden")}>
             <div className="absolute inset-0 grid grid-cols-12 gap-2 p-4 opacity-[0.03]">
                {Array.from({ length: 72 }).map((_, i) => (
                  <div key={i} className="aspect-square border border-red-500 flex items-center justify-center text-[6px]">{i.toString(16).toUpperCase()}</div>
                ))}
             </div>
             <div className="relative z-10 px-12 md:px-24 border-l-2 border-red-500 pl-8">
                <h1 className={cn("font-bold text-white mb-2 tracking-tight", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-[#ef4444] mb-10 opacity-70", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                   {skills.map((s, i) => <span key={i} className="text-[10px] tracking-widest">{"> " + s.toUpperCase()}</span>)}
                </div>
             </div>
          </div>
        );

      case 'observability':
        return (
          <div className={cn(bannerClasses, "bg-[#050505] text-[#00FF00] font-mono flex items-center")}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="relative z-10 px-12 md:px-20 w-full grid grid-cols-[1fr_200px] gap-12">
              <div>
                <div className="text-[10px] mb-4 flex items-center space-x-2"><Activity size={12} className="animate-pulse" /> <span>LIVE_METRICS_READY</span></div>
                <h1 className={cn("font-bold mb-2 tracking-tight transition-all", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className="text-white opacity-80 mb-8 border-l border-[#00FF00] pl-4">{role}</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => <span key={i} className="px-2 py-0.5 border border-[#00FF00]/30 rounded text-[10px]">{s.toUpperCase()}</span>)}
                </div>
              </div>
              <div className="flex flex-col justify-end space-y-4 opacity-50">
                 <div className="h-12 w-full bg-[#00FF00]/10 border border-[#00FF00]/20 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF00]/40 to-transparent w-full h-full animate-[shimmer_2s_infinite]"></div>
                 </div>
                 <div className="h-12 w-full bg-[#00FF00]/10 border border-[#00FF00]/20 rounded"></div>
              </div>
            </div>
          </div>
        );

      case 'platform_idp':
        return (
          <div className={cn(bannerClasses, "bg-slate-100 text-slate-800 flex items-center")}>
            <div className="absolute top-0 h-full w-24 bg-white border-r border-slate-200 flex flex-col items-center py-6 space-y-6">
              {[Layout, Box, Database, Cpu].map((Icon, i) => <Icon key={i} size={20} className="text-slate-300" />)}
            </div>
            <div className="relative z-10 pl-36 pr-12 w-full">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-blue-600 mb-6 uppercase tracking-widest">
                <Box size={14} /> <span>Developer Portal v4.2</span>
              </div>
              <h1 className={cn("font-black tracking-tight mb-2 text-slate-900", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-slate-500 mb-8", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => <SkillBadge key={i} skill={skill} theme="ide" useRealIcons={useRealIcons} />)}
              </div>
            </div>
          </div>
        );
      
      case 'incident_room':
        return (
          <div className={cn(bannerClasses, "bg-red-950 text-white flex items-center overflow-hidden")}>
             <div className="absolute inset-0 bg-red-900/10 animate-pulse"></div>
             <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #ff0000 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.05 }}></div>
             <div className="relative z-10 px-12 md:px-20 w-full font-mono">
                <div className="flex items-center space-x-2 text-red-500 font-bold text-xs mb-4">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>CRITICAL_ALERT: SYSTEM_IDENTITY_LOG</span>
                </div>
                <h1 className={cn("font-black tracking-tight mb-2 border-b border-red-500/30 pb-4 inline-block", titleFontSizeClasses[fontSize])}>{name}</h1>
                <div className="mt-4 flex flex-col space-y-1 text-[11px] opacity-60">
                  <div>{">"} TRACE: {role}</div>
                  <div>{">"} STATUS: ACTIVE</div>
                  <div>{">"} STACK: {skills.join(' | ')}</div>
                </div>
             </div>
          </div>
        );

      case 'global_infra':
        return (
          <div className={cn(bannerClasses, "bg-[#020617] text-white flex items-center justify-between px-12 md:px-24 overflow-hidden")}>
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute w-full h-full border-[1px] border-white/5 rounded-full scale-150 -translate-y-1/2"></div>
              <div className="absolute w-full h-full border-[1px] border-white/5 rounded-full scale-125 translate-y-1/4"></div>
            </div>
            <div className="relative z-10 max-w-xl">
              <div className="flex items-center space-x-2 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                <Globe size={14} /> <span>Global Network Backbone</span>
              </div>
              <h1 className={cn("font-black tracking-tighter mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
              <h2 className={cn("text-slate-400 font-light italic mb-8", fontSizeClasses[fontSize])}>{role}</h2>
              <div className="flex gap-4 opacity-50">
                 <div className="flex flex-col"><span className="text-[9px] uppercase font-bold">Region</span><span className="text-xs">Multi-Cloud</span></div>
                 <div className="flex flex-col"><span className="text-[9px] uppercase font-bold">Nodes</span><span className="text-xs">Edge Mesh</span></div>
              </div>
            </div>
            <div className="relative z-10 opacity-20 hidden md:block">
               <Globe size={240} strokeWidth={0.5} />
            </div>
          </div>
        );

      case 'student_code':
        return (
          <div className={cn(bannerClasses, "bg-[#1e1e1e] text-[#d4d4d4] font-mono flex flex-col")}>
            <div className="bg-[#252526] h-8 flex items-center px-4 space-x-2 border-b border-black/20">
               <div className="flex space-x-1.5 pt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
               </div>
               <span className="text-[10px] opacity-50 italic">career_path.tsx</span>
            </div>
            <div className="flex-1 flex p-8 md:p-12 gap-8">
               <div className="w-12 text-right opacity-20 select-none text-sm hidden md:block">
                  {Array.from({ length: 12 }).map((_, i) => <div key={i}>{i+1}</div>)}
               </div>
               <div className="flex-1">
                  <div className="text-xs md:text-sm leading-relaxed">
                     <span className="text-[#569cd6]">interface</span> <span className="text-[#4ec9b0]">Professional</span> {"{"}
                     <div className="pl-6 pt-1">
                        <span className="text-[#9cdcfe]">name</span>: <span className="text-[#ce9178]">"{name}"</span>;
                     </div>
                     <div className="pl-6">
                        <span className="text-[#9cdcfe]">role</span>: <span className="text-[#ce9178]">"{role}"</span>;
                     </div>
                     <div className="pl-6">
                        <span className="text-[#9cdcfe]">stack</span>: [<span className="text-[#ce9178]">{skills.map(s => `"${s}"`).join(', ')}</span>];
                     </div>
                     {"}"}
                  </div>
               </div>
            </div>
          </div>
        );

      case 'arch_diagram':
        return (
          <div className={cn(bannerClasses, "bg-white text-slate-900 grid grid-cols-[1fr_2fr_1fr] divide-x divide-slate-100")}>
            <div className="flex flex-col items-center justify-center p-6 space-y-8 opacity-20">
               <Users size={32} /> <Repeat size={32} />
            </div>
            <div className="flex flex-col items-center justify-center p-12 text-center relative overflow-hidden bg-slate-50/50">
               <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
               <div className="relative z-10">
                 <h1 className={cn("font-black tracking-tighter mb-1", titleFontSizeClasses[fontSize])}>{name}</h1>
                 <h2 className={cn("text-blue-600 font-bold uppercase text-xs tracking-[0.2em] mb-8", fontSizeClasses[fontSize])}>{role}</h2>
                 <div className="flex gap-2 justify-center">
                    {skills.slice(0, 4).map((s, i) => <div key={i} className="px-3 py-1 bg-white border border-slate-200 text-[10px] font-bold rounded shadow-sm">{s}</div>)}
                 </div>
               </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 space-y-8 opacity-20">
               <Database size={32} /> <Cloud size={32} />
            </div>
          </div>
        );

      case 'startup_pulse':
        return (
          <div className={cn(bannerClasses, "bg-indigo-600 text-white flex items-center overflow-hidden")}>
             <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 rotate-12 translate-x-24">
                <TrendingUp size={400} strokeWidth={1} />
             </div>
             <div className="relative z-10 px-12 md:px-24">
                <div className="inline-flex items-center space-x-2 bg-indigo-500/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-6">
                   <Zap size={12} fill="currentColor" /> <span>Series A Funded Identity</span>
                </div>
                <h1 className={cn("font-black tracking-tight mb-2", titleFontSizeClasses[fontSize])}>{name}</h1>
                <h2 className={cn("text-indigo-200/80 mb-8 italic", fontSizeClasses[fontSize])}>{role}</h2>
                <div className="flex gap-6">
                   <div className="flex flex-col"><span className="text-[10px] opacity-60">Focus</span><span className="text-sm font-bold">Scaling</span></div>
                   <div className="flex flex-col"><span className="text-[10px] opacity-60">Culture</span><span className="text-sm font-bold">Dev-First</span></div>
                </div>
             </div>
          </div>
        );

      case 'tech_board':
        return (
          <div className={cn(bannerClasses, "bg-slate-50 text-slate-900 flex flex-col p-8 md:p-12")}>
             <div className="flex justify-between items-start mb-auto">
                <div>
                   <h1 className={cn("font-black tracking-tight leading-none", titleFontSizeClasses[fontSize])}>{name}</h1>
                   <h2 className={cn("text-slate-500 mt-1", fontSizeClasses[fontSize])}>{role}</h2>
                </div>
                <div className="flex space-x-4">
                   <div className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center"><BarChart2 className="text-slate-400" /></div>
                   <div className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center"><LineChart className="text-slate-400" /></div>
                </div>
             </div>
             <div className="grid grid-cols-4 gap-4">
                {skills.map((s, i) => (
                   <div key={i} className="flex flex-col border-t-2 border-slate-200 pt-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Core Competency</span>
                      <span className="text-xs font-bold">{s}</span>
                   </div>
                ))}
             </div>
          </div>
        );

      default:
        return (
          <div className={cn(bannerClasses, "bg-slate-900 text-white flex items-center justify-center")}>
            <h1 className="text-4xl">Select a theme</h1>
          </div>
        );
    }
  };

  return (
    <div ref={ref} id="banner-capture">
      {renderTheme()}
    </div>
  );
});

BannerPreview.displayName = 'BannerPreview';
