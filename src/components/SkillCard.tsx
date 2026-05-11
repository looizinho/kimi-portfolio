import { TiltCard } from './TiltCard';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function SkillCard({ 
  title, 
  description, 
  icon: Icon,
  className
}: SkillCardProps) {
  return (
    <TiltCard
      className={cn(
        'group relative p-6 rounded-2xl',
        'glass',
        'transition-all duration-500',
        'hover:border-primary/50',
        className
      )}
      tiltAmount={10}
      glowColor="rgba(131, 165, 152, 0.2)"
    >
      {/* Icon */}
      <div className="mb-4 relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          <Icon className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-secondary" />
        </div>
        {/* Glow behind icon */}
        <div className="absolute inset-0 w-12 h-12 rounded-xl bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-white mb-2 font-['Space_Grotesk']">
        {title}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed">
        {description}
      </p>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </TiltCard>
  );
}
