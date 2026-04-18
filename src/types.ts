export type Platform = 'linkedin' | 'twitter' | 'facebook';

export type Category = 
  | 'Cloud Engineer' 
  | 'DevOps Engineer' 
  | 'SRE' 
  | 'Platform Engineer' 
  | 'DevRel' 
  | 'Students' 
  | 'Solution Architect' 
  | 'Cloud Architect' 
  | 'CTO' 
  | 'CEO' 
  | 'Director' 
  | 'Tech Evangelist' 
  | 'DevSecOps Engineer';

export interface BannerConfig {
  name: string;
  role: string;
  skills: string[];
  category: Category;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  logoUrl?: string;
  useRealIcons: boolean;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  highContrast: boolean;
}

export interface PlatformSpec {
  name: string;
  ratio: string;
  width: number;
  height: number;
}

export const PLATFORMS: Record<Platform, PlatformSpec> = {
  linkedin: { name: 'LinkedIn', ratio: '4:1', width: 1584, height: 396 },
  twitter: { name: 'Twitter', ratio: '3:1', width: 1500, height: 500 },
  facebook: { name: 'Facebook', ratio: '1.91:1', width: 1200, height: 630 },
};
