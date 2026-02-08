import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  className?: string;
}

export function ProjectCard({ 
  title, 
  subtitle,
  description,
  image, 
  tags,
  className 
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -8;
    const rotateY = (mouseX / (rect.width / 2)) * 8;
    
    setTransform({ rotateX, rotateY });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTransform({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative flex-shrink-0',
        'w-[80vw] max-w-[900px] h-[60vh] max-h-[600px]',
        'rounded-3xl overflow-hidden',
        'cursor-pointer',
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className={cn(
            'w-full h-full object-cover',
            'transition-transform duration-700 ease-out',
            isHovering && 'scale-110'
          )}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Space_Grotesk']">
          {title}
        </h3>
        
        {/* Subtitle */}
        <p className="text-lg text-cyan-400 mb-3 font-medium">
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-zinc-300 max-w-xl mb-6 line-clamp-2">
          {description}
        </p>

        {/* View Project Link */}
        <div className={cn(
          'flex items-center gap-2 text-white font-medium',
          'transition-all duration-300',
          'opacity-0 translate-y-4',
          isHovering && 'opacity-100 translate-y-0'
        )}>
          <span>Ver projeto</span>
          <ExternalLink className="w-5 h-5" />
        </div>
      </div>

      {/* Border Glow */}
      <div className={cn(
        'absolute inset-0 rounded-3xl pointer-events-none',
        'border-2 border-transparent',
        'transition-all duration-500',
        isHovering && 'border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]'
      )} />
    </div>
  );
}
