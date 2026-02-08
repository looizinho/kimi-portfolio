import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Tech {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface TechOrbitProps {
  technologies: Tech[];
  className?: string;
}

export function TechOrbit({ technologies, className }: TechOrbitProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const orbitRef = useRef<HTMLDivElement>(null);

  const radius = 200;
  const angleStep = (2 * Math.PI) / technologies.length;

  return (
    <div className={cn('relative w-full h-[500px] flex items-center justify-center', className)}>
      {/* Center Element */}
      <div className="absolute z-10 flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.5)]">
          <span className="text-2xl font-bold text-white font-['Space_Grotesk']">STACK</span>
        </div>
      </div>

      {/* Orbit Ring */}
      <div 
        ref={orbitRef}
        className={cn(
          'absolute w-[400px] h-[400px] rounded-full',
          'border border-white/10',
          !isPaused && 'orbit-animation'
        )}
        style={{
          transform: 'rotateX(20deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {technologies.map((_, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = 200 + radius * Math.cos(angle);
            const y = 200 + radius * Math.sin(angle);
            return (
              <line
                key={index}
                x1="200"
                y1="200"
                x2={x}
                y2={y}
                stroke="rgba(139, 92, 246, 0.2)"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="pulse-line"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            );
          })}
        </svg>

        {/* Tech Nodes */}
        {technologies.map((tech, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <div
              key={index}
              className={cn(
                'absolute w-16 h-16 -ml-8 -mt-8',
                'flex items-center justify-center',
                'rounded-xl glass',
                'cursor-pointer transition-all duration-300',
                'hover:scale-150 hover:bg-violet-500/20',
                hoveredIndex === index && 'scale-150 bg-violet-500/20 z-20',
                !isPaused && 'counter-rotate'
              )}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setIsPaused(true);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setIsPaused(false);
              }}
            >
              {/* Icon */}
              <div className="text-white/80 hover:text-white transition-colors">
                {tech.icon}
              </div>

              {/* Tooltip */}
              {hoveredIndex === index && (
                <div className={cn(
                  'absolute -bottom-20 left-1/2 -translate-x-1/2',
                  'w-40 p-3 rounded-lg glass',
                  'text-center z-30',
                  'animate-in fade-in zoom-in duration-200'
                )}>
                  <p className="text-sm font-semibold text-white mb-1">{tech.name}</p>
                  <p className="text-xs text-zinc-400">{tech.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Outer Glow Ring */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full border border-violet-500/10 pointer-events-none"
        style={{ transform: 'rotateX(20deg)' }}
      />
    </div>
  );
}
