import { Category } from './types';
import { 
  Terminal, Cloud, GitBranch, Activity, Globe, Shield, Users, 
  GraduationCap, Palette, Layout, Server, Database, Code2, 
  Cpu, Lock, Repeat, LineChart, BarChart2, CheckCircle2, 
  Network, Layers, Megaphone, Compass, Map, Hexagon, 
  Briefcase, Fingerprint, Zap, LucideIcon, Github, Box, TrendingUp,
  Search, Share2, MessageSquare, Zap as Bolt, Radio,
  HardDrive, Monitor, MousePointer2, Settings, Wrench,
  Rocket, Target, Award, Infinity
} from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export const CATEGORIES: { name: Category; icon: LucideIcon }[] = [
  { name: 'Cloud Engineer', icon: Cloud },
  { name: 'DevOps Engineer', icon: GitBranch },
  { name: 'SRE', icon: Activity },
  { name: 'Platform Engineer', icon: Hexagon },
  { name: 'DevRel', icon: Megaphone },
  { name: 'Students', icon: GraduationCap },
  { name: 'Solution Architect', icon: Map },
  { name: 'Cloud Architect', icon: Globe },
  { name: 'CTO', icon: Cpu },
  { name: 'CEO', icon: Briefcase },
  { name: 'Director', icon: Layers },
  { name: 'Tech Evangelist', icon: Compass },
  { name: 'DevSecOps Engineer', icon: Shield },
];

const getDomainVibes = (category: Category): string[] => {
  switch (category) {
    case 'Cloud Engineer': return ['Infrastructure', 'Serverless', 'Multi-Cloud', 'Scalability', 'Compute', 'Storage', 'Networking', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Provisioning', 'Terraform', 'Pulumi', 'Backbone', 'Grid', 'Density', 'High-Speed', 'Dataflow', 'Connectivity'];
    case 'DevOps Engineer': return ['Pipeline', 'Automation', 'CI/CD', 'GitOps', 'Fast-Track', 'Workflow', 'Delivery', 'Deployment', 'Continuous', 'Scripting', 'Integration', 'Release', 'Versioned', 'Agile', 'Staging', 'Production', 'Health', 'Container', 'Orchestration', 'Seamless'];
    case 'SRE': return ['Reliability', 'Observability', 'Uptime', 'Metrics', 'Monitoring', 'Logging', 'Tracing', 'Status', 'Dashboard', 'Response', 'Incident', 'Resilience', 'Capacity', 'Budget', 'Latency', 'Traffic', 'Errors', 'Saturation', 'Golden-Signals', 'Hardened'];
    case 'Platform Engineer': return ['Platform', 'IDP', 'Standardization', 'Self-Service', 'Internal', 'Foundation', 'Ecosystem', 'Framework', 'Blueprint', 'Interface', 'Gateway', 'Controller', 'Engine', 'Module', 'Registry', 'Provider', 'Service-Mesh', 'Backplane', 'Governance', 'Abstracted'];
    case 'DevRel': return ['Community', 'Engagement', 'Outreach', 'Education', 'Ambassador', 'Advocate', 'Public', 'Social', 'Collaborative', 'Viral', 'Identity', 'Storyteller', 'Content', 'Speaker', 'Workshop', 'Developer-Success', 'Pulse', 'Growth', 'Mission', 'Connect'];
    case 'Students': return ['Academic', 'Learner', 'Aspirant', 'Portfolio', 'Portfolio-Ready', 'Hacker', 'Scholar', 'Future-Dev', 'Code-Base', 'Freshman', 'Graduate', 'Project', 'Study', 'Craft', 'Foundation', 'Curious', 'Exploration', 'Lab', 'Bright', 'Impact'];
    case 'Solution Architect': return ['Solution', 'Architecture', 'Strategy', 'Design', 'Diagram', 'Blueprint', 'Enterprise', 'Integration', 'Flow', 'Visionary', 'Scalable', 'Optimized', 'Hybrid', 'Consolidation', 'Modernization', 'Framework', 'Pattern', 'Logic', 'Consultant', 'Expert'];
    case 'Cloud Architect': return ['Global', 'Topology', 'Hybrid-Cloud', 'Migration', 'Transformation', 'Security-Posture', 'Compliance', 'Resilience', 'Efficiency', 'Optimization', 'Governance', 'Scale', 'Frontier', 'Horizon', 'Core', 'Edge', 'Unified', 'Sovereignty', 'Interconnected', 'Strategic'];
    case 'CTO': return ['Strategic', 'Executive', 'Innovation', 'Leadership', 'Frontier', 'Vision', 'Future-Proof', 'Legacy', 'Pioneer', 'Board', 'Architecture-Elite', 'Think-Tank', 'Scale-Master', 'Invention', 'Ecosystem-Builder', 'Next-Gen', 'Tech-Stack', 'Modern-Era', 'Global-Scale', 'Ambition'];
    case 'CEO': return ['Visionary', 'Presidential', 'Growth', 'Leadership', 'Legacy', 'Corporate', 'Elite', 'Founder', 'Mission-Control', 'Global-Reach', 'Pinnacle', 'Summit', 'Authority', 'Impact', 'Scale', 'Efficiency', 'Direction', 'Purpose', 'Culture', 'Founder-Spirit'];
    case 'Director': return ['Execution', 'Operation', 'Delivery', 'Success', 'Alignment', 'Synergy', 'Management', 'Excellence', 'Governance', 'Optimization', 'Leadership-View', 'Portfolio', 'Program', 'Tactical', 'Strategic-Alignment', 'Quality', 'Metrics', 'Outcome', 'Performance', 'Accountability'];
    case 'Tech Evangelist': return ['Impact', 'Viral', 'Stage', 'Voice', 'Authority', 'Tech-Talk', 'Global-Vibe', 'Energy', 'Public-Speaker', 'Trendsetter', 'Futurist', 'Storyteller', 'Movement', 'Influence', 'Presence', 'Keynote', 'Expert-Voice', 'Pulse', 'Community-Leader', 'Spotlight'];
    case 'DevSecOps Engineer': return ['Secured', 'Hardened', 'Vault', 'Shield', 'Compliance', 'Armor', 'Fortress', 'Audit', 'Governance', 'Identity', 'Zero-Trust', 'Encryption', 'Protected', 'Scan', 'Vulnerability-Free', 'Cyber', 'Deep-Scan', 'Integrity', 'Sentinel', 'Safety'];
    default: return ['Standard', 'Clean', 'Professional', 'Modern', 'Minimal', 'Sleek', 'Classic', 'Simple', 'Unique', 'Sophisticated', 'Premium', 'Elite', 'Pro', 'Core', 'Next', 'Prime', 'Ultra', 'Vision', 'Flow', 'Grid'];
  }
};

const getDomainStyles = [
  'minimalist', 'brutalist', 'corporate', 'futuristic', 'retro', 
  'glass', 'neon', 'editorial', 'blueprint', 'luxury',
  'utility', 'atmospheric', 'typographic', 'hardware', 'systematic',
  'fluid', 'monotone', 'vibrant', 'clean', 'bold'
];

const generateThemes = (category: Category, count: number, baseIcon: LucideIcon): ThemeOption[] => {
  const themes: ThemeOption[] = [];
  const vibes = getDomainVibes(category);
  const styles = getDomainStyles;

  for (let i = 0; i < count; i++) {
    const vibe = vibes[i % vibes.length];
    const style = styles[i % styles.length];
    themes.push({
      id: `${category.toLowerCase().replace(/\s+/g, '_')}_${vibe.toLowerCase()}_${style}`,
      name: `${vibe} ${style.charAt(0).toUpperCase() + style.slice(1)}`,
      icon: baseIcon,
      description: `A unique ${style} ${vibe} design tailored for ${category}s.`
    });
  }
  return themes;
};

// Backfill all categories to 20 themes
export const CATEGORY_THEMES: Record<Category, ThemeOption[]> = {
  'Cloud Engineer': generateThemes('Cloud Engineer', 20, Cloud),
  'DevOps Engineer': generateThemes('DevOps Engineer', 20, GitBranch),
  'SRE': generateThemes('SRE', 20, Activity),
  'Platform Engineer': generateThemes('Platform Engineer', 20, Hexagon),
  'DevRel': generateThemes('DevRel', 20, Megaphone),
  'Students': generateThemes('Students', 20, GraduationCap),
  'Solution Architect': generateThemes('Solution Architect', 20, Map),
  'Cloud Architect': generateThemes('Cloud Architect', 20, Globe),
  'CTO': generateThemes('CTO', 20, Cpu),
  'CEO': generateThemes('CEO', 20, Briefcase),
  'Director': generateThemes('Director', 20, Layers),
  'Tech Evangelist': generateThemes('Tech Evangelist', 20, Compass),
  'DevSecOps Engineer': generateThemes('DevSecOps Engineer', 20, Shield),
};
