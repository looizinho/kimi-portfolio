import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: string;
  className?: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
  }, []);

  return (
    <span
      className={cn(
        'relative inline-block cursor-pointer',
        isGlitching && 'animate-[glitch_0.3s_ease-in-out]',
        className
      )}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </span>
  );
}
