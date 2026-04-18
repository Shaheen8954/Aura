import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 32, showText = false }) => {
  return (
    <div className={cn("flex items-center space-x-4 group", className)}>
      <div className="relative flex items-center justify-center">
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Outer Atmosphere - Minimal geometric rings */}
          <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
          <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
          
          {/* The Core Mark - Abstract 'A' composed of geometric primitives */}
          <path 
            d="M20 7L32 31H8L20 7Z" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeLinejoin="round" 
            className="text-white light:text-slate-900"
          />
          
          {/* The Aura Focal Point - Sophisticated accent */}
          <path 
            d="M20 16L24 24H16L20 16Z" 
            fill="#BBFF00" 
            className="opacity-90 transition-all duration-500 group-hover:scale-110"
          />
          
          {/* Optical Guides */}
          <line x1="20" y1="4" x2="20" y2="7" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="20" y1="33" x2="20" y2="36" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
        </svg>
        
        {/* Subtle shadow glow - only on dark mode */}
        <div className="absolute inset-0 bg-[#BBFF00] blur-[15px] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
      </div>
      
      {showText && (
        <span className="text-xl font-light tracking-[0.4em] text-white light:text-slate-900 leading-none ml-2">
          AURA
        </span>
      )}
    </div>
  );
};
