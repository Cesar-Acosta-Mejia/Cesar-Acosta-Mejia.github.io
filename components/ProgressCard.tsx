
import React, { useEffect, useState } from 'react';

interface ProgressCardProps {
  percentage: number;
  status: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ percentage, status }) => {
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayPercent(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-surface-dark/40 border border-border-dark/50 backdrop-blur-xl transition-all hover:bg-surface-dark/60 hover:border-primary/30 group">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1.5">
            <p className="text-white text-base font-bold tracking-wide">Progreso del proyecto</p>
            <p className="text-text-muted text-sm font-medium">{status}</p>
          </div>
          <p className="text-primary text-3xl font-black font-brand transition-transform group-hover:scale-110">
            {displayPercent}%
          </p>
        </div>
        <div className="w-full h-3 rounded-full bg-background-dark/80 overflow-hidden p-[3px] relative">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-700 via-primary to-blue-400 transition-all duration-1000 ease-out relative overflow-hidden"
            style={{ width: `${displayPercent}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full animate-shimmer"></div>
            
            <div className="absolute inset-0 bg-white/20 blur-[4px] rounded-full"></div>
            <div className="absolute inset-0 shadow-[0_0_15px_rgba(19,19,236,0.6)] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
