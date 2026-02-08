import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({ 
  children, 
  className, 
  strength = 0.3,
  onClick 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      targetRef.current = {
        x: distanceX * strength,
        y: distanceY * strength
      };
    };

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    const animate = () => {
      setTransform(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.15,
        y: prev.y + (targetRef.current.y - prev.y) * 0.15
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [strength]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        'relative inline-flex items-center justify-center',
        'px-8 py-4 font-medium text-white',
        'bg-gradient-to-r from-violet-600 to-cyan-500',
        'rounded-full overflow-hidden',
        'transition-shadow duration-300',
        'hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]',
        'active:scale-95',
        className
      )}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }}
      onClick={onClick}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
