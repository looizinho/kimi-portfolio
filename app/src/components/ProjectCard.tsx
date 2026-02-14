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
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden rounded-3xl',
        'min-h-[320px] sm:min-h-[360px] lg:min-h-[400px]',
        'cursor-pointer transition-transform duration-300 hover:-translate-y-1',
        className
      )}
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={`${title}-${tag}`}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-2 font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h3>

        <p className="mb-3 text-base font-medium text-cyan-400 sm:text-lg">{subtitle}</p>

        <p className="mb-6 max-w-xl line-clamp-3 text-zinc-300">{description}</p>

        <div
          className={cn(
            'w-fit text-white font-medium flex items-center gap-2',
            'transition-all duration-300',
            'opacity-80 group-hover:opacity-100'
          )}
        >
          <span>Ver projeto</span>
          <ExternalLink className="h-5 w-5" />
        </div>
      </div>

      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-3xl',
          'border-2 border-transparent transition-all duration-500',
          'group-hover:border-violet-500/50 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]'
        )}
      />
    </div>
  );
}
