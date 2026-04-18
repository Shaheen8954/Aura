import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, Cloud, GitBranch, Settings, Server, Database, Activity, Infinity, 
  Lock, Repeat, LineChart, BarChart2, CheckCircle2, Shield, Network, Layers, 
  Cpu, Megaphone, Users, GraduationCap, Globe, Zap, Compass, Map, Hexagon, 
  Briefcase, Code2, Cpu as Microchip, Fingerprint, Download, Share2, Palette, 
  Type, Image as ImageIcon, Layout, Sun, Moon, Accessibility, BarChart, 
  ChevronRight, Github, Twitter, Linkedin, Facebook, Plus, Trash2, Upload
} from 'lucide-react';
import { BannerConfig, Platform, PLATFORMS, Category } from './types';
import { Logo } from './components/Logo';
import { BannerPreview } from './components/BannerPreview';
import { Analytics } from './components/Analytics';
import { LandingPage } from './components/LandingPage';
import { cn } from './lib/utils';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, CATEGORY_THEMES } from './constants';

export default function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<'editor' | 'analytics'>('editor');
  const [isLightMode, setIsLightMode] = useState(false);
  const [platform, setPlatform] = useState<Platform>('linkedin');
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const [config, setConfig] = useState<BannerConfig>({
    name: 'Sarah Jenkins',
    role: 'Lead DevOps Engineer | AWS Certified',
    skills: ['Terraform', 'Kubernetes', 'Python', 'Docker'],
    category: 'DevOps Engineer',
    theme: 'terminal',
    primaryColor: '#BBFF00',
    secondaryColor: '#999999',
    textColor: '#FFFFFF',
    useRealIcons: true,
    fontSize: 'md',
    highContrast: false,
  });

  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLightMode]);

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!bannerRef.current) return;
    
    setIsDownloading(true);
    const spec = PLATFORMS[platform];
    const captureElement = bannerRef.current;
    
    try {
      // Safari needs a bit more time to render cross-origin assets even with proxy
      if (isSafari) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Calculate scale to ensure output exactly matches platform specs
      const elementWidth = captureElement.offsetWidth;
      const targetScale = spec.width / elementWidth;

      // In order to make the image high resolution but match the aspect ratio 
      // of the on-screen preview, we use the ratio of (spec width / on-screen width)
      // multiplied by a high-res factor (e.g. 2 for Retina) if desired. 
      // LinkedIn recommends 1584x396, so we'll target exactly those dimensions via scale.
      
      const dataUrl = await toPng(captureElement, {
        pixelRatio: targetScale,
        skipFonts: false,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });
      
      const link = document.createElement('a');
      link.download = `aura-${platform}-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to generate image. Please try again or try another browser.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfig({ ...config, logoUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafariBrowser = ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
    setIsSafari(isSafariBrowser);
  }, []);

  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] light:bg-slate-50 text-white light:text-slate-900 font-sans transition-colors duration-300 flex flex-col">
      {/* Safari Notice */}
      {isSafari && (
        <div className="bg-[#BBFF00] text-black px-4 py-2 text-center text-xs font-bold flex items-center justify-center space-x-2">
          <Zap size={14} />
          <span>Safari user? For the best experience (including downloads), open in a new tab.</span>
          <button onClick={handleOpenNewTab} className="underline ml-2">Open Now</button>
        </div>
      )}

      {/* Navbar */}
      <nav className="h-16 sticky top-0 z-50 bg-[#19191B] light:bg-white border-b border-[#2D2D30] light:border-slate-200 px-6 flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => setView('landing')}
        >
          <Logo showText />
        </div>

        {view === 'app' ? (
          <div className="flex items-center space-x-1 bg-[#0D0D0E] light:bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('editor')}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-2",
                activeTab === 'editor' ? "bg-[#19191B] light:bg-white shadow-sm text-[#BBFF00] light:text-blue-600" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <Layout size={14} />
              <span>Editor</span>
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-2",
                activeTab === 'analytics' ? "bg-[#19191B] light:bg-white shadow-sm text-[#BBFF00] light:text-blue-600" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <BarChart size={14} />
              <span>Analytics</span>
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-[#999999]">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Templates</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsLightMode(!isLightMode)}
            className={cn(
              "flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
              isLightMode 
                ? "border-slate-300 text-slate-800 bg-white hover:bg-slate-100 shadow-sm" 
                : "border-[#2D2D30] text-white bg-[#0D0D0E] hover:bg-[#19191B]"
            )}
          >
            {isLightMode ? <Moon size={14} /> : <Sun size={14} />}
            <span>{isLightMode ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          <button 
            onClick={() => {
              setView('app');
              setActiveTab('editor');
            }}
            className="btn btn-secondary text-xs py-1.5 px-4"
          >
            Dashboard
          </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <LandingPage onStart={() => {
                setView('app');
                setActiveTab('editor');
              }} />
            </motion.div>
          ) : activeTab === 'editor' ? (
            <motion.div 
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 grid grid-cols-[320px_1fr] overflow-hidden"
            >
              {/* Sidebar Controls */}
              <aside className="bg-[#19191B] light:bg-white border-r border-[#2D2D30] light:border-slate-200 p-6 overflow-y-auto space-y-8 custom-scrollbar">
                <section className="space-y-6">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#999999]">Customization</div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#999999] mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        value={config.name} 
                        onChange={(e) => setConfig({ ...config, name: e.target.value })}
                        className="input-field w-full text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#999999] mb-1.5">Role / Headline</label>
                      <input 
                        type="text" 
                        value={config.role} 
                        onChange={(e) => setConfig({ ...config, role: e.target.value })}
                        className="input-field w-full text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#999999] mb-1.5">Tech Stack (Max 5)</label>
                      <textarea 
                        value={config.skills.join(', ')} 
                        onChange={(e) => setConfig({ ...config, skills: e.target.value.split(',').map(s => s.trim()) })}
                        className="input-field w-full text-sm h-20 resize-none" 
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#999999]">Brand Colors</div>
                  <div className="flex gap-3">
                    {['#BBFF00', '#00F0FF', '#FF007A', '#FFFFFF'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setConfig({ ...config, primaryColor: color })}
                        className={cn(
                          "w-6 h-6 rounded-full border-2 transition-all",
                          config.primaryColor === color ? "border-white scale-110" : "border-transparent"
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <input 
                      type="color" 
                      value={config.primaryColor} 
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="w-6 h-6 rounded-full border-none p-0 cursor-pointer bg-transparent"
                    />
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#999999]">Role Category</div>
                  <div className="grid grid-cols-1 gap-2">
                    <select 
                      value={config.category}
                      onChange={(e) => {
                        const newCat = e.target.value as Category;
                        setConfig({ 
                          ...config, 
                          category: newCat, 
                          theme: CATEGORY_THEMES[newCat][0].id 
                        });
                      }}
                      className="input-field w-full text-sm py-2"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#999999]">Design Template</div>
                  <div className="grid grid-cols-2 gap-3 h-[320px] overflow-y-auto custom-scrollbar pr-2 pb-4">
                    {CATEGORY_THEMES[config.category].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setConfig({ ...config, theme: t.id })}
                        onMouseEnter={() => setHoveredTheme(t.id)}
                        onMouseLeave={() => setHoveredTheme(null)}
                        className={cn(
                          "relative rounded-lg overflow-hidden border-2 transition-all p-0 block w-full text-left bg-[#0A0A0A] light:bg-white group",
                          config.theme === t.id 
                            ? "border-[#BBFF00] light:border-blue-500 shadow-[0_0_15px_rgba(187,255,0,0.2)] light:shadow-[0_0_10px_rgba(59,130,246,0.3)] bg-[#BBFF00]/5 light:bg-blue-50" 
                            : "border-[#2D2D30] light:border-slate-200 hover:border-[#555] light:hover:border-slate-300"
                        )}
                      >
                        <div className="w-full relative pt-[25%] overflow-hidden pointer-events-none bg-[#050505] light:bg-slate-100">
                          {/* Inner scaled container rendering the live preview math: 120px target / 800px width = ~0.15 */}
                          <div className="absolute top-0 left-0 w-[800px] h-[200px] origin-top-left" style={{ transform: 'scale(0.15)' }}>
                            <BannerPreview config={{ ...config, theme: t.id }} platform="linkedin" />
                          </div>
                        </div>
                        <div className="p-2 border-t border-[#2d2d30] light:border-slate-200 bg-[#121212] light:bg-white group-hover:bg-[#1a1a1a] light:group-hover:bg-slate-50 transition-colors">
                          <div className="text-[10px] font-bold truncate text-[#E4E3E0] light:text-slate-800 flex items-center gap-1.5">
                            <t.icon size={12} className={cn("shrink-0", config.theme === t.id ? "text-[#BBFF00] light:text-blue-500" : "text-[#888] light:text-slate-400")}/> 
                            <span className="truncate">{t.name}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#999999]">Logo Upload</div>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1 btn btn-secondary text-xs py-2 flex items-center justify-center cursor-pointer">
                      <Upload size={14} className="mr-2" />
                      <span>Add Company Logo +</span>
                      <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                    </label>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#999999]">Accessibility</div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#999999] mb-3">Font Scaling</label>
                      <div className="flex gap-2">
                        {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
                          <button
                            key={size}
                            onClick={() => setConfig({ ...config, fontSize: size })}
                            className={cn(
                              "flex-1 py-1.5 text-[10px] font-bold rounded border transition-all uppercase",
                              config.fontSize === size 
                                ? "bg-[#BBFF00]/10 light:bg-blue-50 border-[#BBFF00] light:border-blue-500 text-[#BBFF00] light:text-blue-600" 
                                : "border-[#2D2D30] light:border-slate-200 text-slate-500 hover:border-slate-400 light:hover:border-slate-300"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => setConfig({ ...config, highContrast: !config.highContrast })}
                      className={cn(
                        "w-full py-2.5 rounded border transition-all flex items-center justify-center space-x-2 text-xs font-bold",
                        config.highContrast 
                          ? "bg-[#BBFF00] light:bg-blue-600 text-black light:text-white border-[#BBFF00] light:border-blue-600" 
                          : "border-[#2D2D30] light:border-slate-200 text-slate-400 hover:border-slate-300 light:hover:border-slate-300"
                      )}
                    >
                      <Accessibility size={14} />
                      <span>{config.highContrast ? "High Contrast Active" : "Enable High Contrast"}</span>
                    </button>
                  </div>
                </section>

                <section className="mt-auto pt-6 border-t border-[#2D2D30] light:border-slate-200 space-y-4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#999999] light:text-slate-500">Export For</div>
                  <div className="grid grid-cols-2 gap-2">
                    {(['linkedin', 'twitter', 'facebook'] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={cn(
                          "platform-chip text-[11px] font-bold py-2 px-3 rounded-full border transition-all flex items-center justify-center space-x-2",
                          platform === p 
                            ? "bg-[#BBFF00]/10 light:bg-blue-50 border-[#BBFF00] light:border-blue-500 text-[#BBFF00] light:text-blue-600" 
                            : "bg-[#0D0D0E] light:bg-slate-100 border-[#2D2D30] light:border-slate-200 text-slate-500 hover:border-slate-400 light:hover:border-slate-300"
                        )}
                      >
                        <span className="capitalize">{p}</span>
                      </button>
                    ))}
                  </div>
                </section>
              </aside>

              {/* Main Editor View */}
              <main className="bg-[#080808] light:bg-slate-100 flex flex-col items-center justify-center p-12 gap-8 overflow-y-auto">
                <div className="w-full max-w-5xl relative group">
                  <div className="absolute -inset-4 bg-[#BBFF00]/5 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative overflow-hidden rounded-md border border-[#2D2D30] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <BannerPreview config={{...config, theme: hoveredTheme || config.theme}} platform={platform} ref={bannerRef} />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="btn btn-primary px-10 py-3 text-base min-w-[280px] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        <span>Generating High-Res...</span>
                      </>
                    ) : (
                      <>
                        <Download size={18} />
                        <span>Instant Download ({PLATFORMS[platform].width} x {PLATFORMS[platform].height}px)</span>
                      </>
                    )}
                  </button>
                  <button className="btn btn-secondary px-6 py-3 text-base flex items-center space-x-2">
                    <Share2 size={18} />
                    <span>One-Click Share</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-6 w-full max-w-2xl mt-8">
                  <div className="p-4 rounded-xl bg-[#19191B] light:bg-white border border-[#2D2D30] light:border-slate-200 text-center">
                    <div className="text-[10px] font-bold text-[#999999] light:text-slate-500 uppercase tracking-widest mb-1">Ratio</div>
                    <div className="text-sm font-bold text-[#BBFF00] light:text-slate-900">{PLATFORMS[platform].ratio}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#19191B] light:bg-white border border-[#2D2D30] light:border-slate-200 text-center">
                    <div className="text-[10px] font-bold text-[#999999] light:text-slate-500 uppercase tracking-widest mb-1">Format</div>
                    <div className="text-sm font-bold text-[#BBFF00] light:text-slate-900">PNG 2x</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#19191B] light:bg-white border border-[#2D2D30] light:border-slate-200 text-center">
                    <div className="text-[10px] font-bold text-[#999999] light:text-slate-500 uppercase tracking-widest mb-1">Status</div>
                    <div className="text-sm font-bold text-[#BBFF00] light:text-slate-900">Ready</div>
                  </div>
                </div>
              </main>
            </motion.div>
          ) : (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 p-8 overflow-y-auto"
            >
              <Analytics />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Analytics Row (Design specific) */}
      {view === 'app' && activeTab === 'editor' && (
        <div className="h-[120px] bg-[#19191B] light:bg-white border-t border-[#2D2D30] light:border-slate-200 px-12 grid grid-cols-4 items-center">
          <div className="stat-card border-none">
            <div className="text-[12px] text-[#999999] mb-1">Total Impressions</div>
            <div className="text-2xl font-bold text-white light:text-slate-900">12.4k</div>
            <div className="text-[12px] text-[#BBFF00]">+14% this week</div>
          </div>
          <div className="stat-card border-l border-[#2D2D30] light:border-slate-200 pl-12">
            <div className="text-[12px] text-[#999999] mb-1">Profile Visits</div>
            <div className="text-2xl font-bold text-white light:text-slate-900">892</div>
            <div className="text-[12px] text-slate-500">via Banner Link</div>
          </div>
          <div className="stat-card border-l border-[#2D2D30] light:border-slate-200 pl-12">
            <div className="text-[12px] text-[#999999] mb-1">Banner Saved</div>
            <div className="text-2xl font-bold text-white light:text-slate-900">42</div>
            <div className="text-[12px] text-slate-500">Active Templates</div>
          </div>
          <div className="stat-card border-l border-[#2D2D30] light:border-slate-200 pl-12">
            <div className="text-[12px] text-[#999999] mb-1">Platform Split</div>
            <div className="text-2xl font-bold text-white light:text-slate-900">68% LI</div>
            <div className="text-[12px] text-slate-500">Twitter (22%), FB (10%)</div>
          </div>
        </div>
      )}
    </div>
  );
}
