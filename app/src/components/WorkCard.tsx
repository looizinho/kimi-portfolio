import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkItem {
  title: string;
  client?: string;
  year?: number;
  location?: string;
  role?: string;
  summary?: string;
  tags?: string[];
  link?: string;
  image?: string;
}

interface WorkCardProps {
  work: WorkItem;
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
      {work.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={work.image}
            alt={work.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
            {work.title}
          </h3>
          {work.link && (
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label={`Abrir link de ${work.title}`}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        <div className="mt-2 text-sm text-zinc-400">
          {[work.client, work.year, work.location].filter(Boolean).join(' • ')}
        </div>

        {work.role && (
          <div className="mt-3 text-sm text-cyan-300 font-medium">
            {work.role}
          </div>
        )}

        {work.summary && (
          <p className="mt-4 text-zinc-300 leading-relaxed">
            {work.summary}
          </p>
        )}

        {work.tags && work.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {work.tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className={cn(
                  'px-3 py-1 text-xs font-medium rounded-full',
                  'bg-white/10 text-white/90 border border-white/10'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent transition-all duration-500 group-hover:border-violet-500/50 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]" />
    </article>
  );
}
