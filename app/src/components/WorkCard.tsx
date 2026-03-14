import { ExternalLink, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface WorkItem {
  title: string;
  client?: string;
  year?: number;
  location?: string;
  role?: string;
  summary?: string;
  tags?: string[];
  link?: string;
  youtube?: string;
  image?: string;
}

interface WorkCardProps {
  work: WorkItem;
}

function getYoutubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace('www.', '');

    if (hostname === 'youtu.be') {
      const id = parsed.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (hostname.includes('youtube.com') || hostname.includes('youtube-nocookie.com')) {
      if (parsed.pathname.startsWith('/embed/')) {
        const id = parsed.pathname.replace('/embed/', '');
        return id ? `https://www.youtube.com/embed/${id}` : url;
      }

      const id = parsed.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
  } catch {
    return url;
  }

  return url;
}

function withAutoplay(url: string) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('autoplay', '1');
    parsed.searchParams.set('mute', '1');
    parsed.searchParams.set('rel', '0');
    return parsed.toString();
  } catch {
    return url;
  }
}

export function WorkCard({ work }: WorkCardProps) {
  const youtubeEmbedUrl = work.youtube
    ? withAutoplay(getYoutubeEmbedUrl(work.youtube))
    : null;

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
          {youtubeEmbedUrl && (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                    'text-white/90 transition-all duration-300',
                    'hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70'
                  )}
                  aria-label={`Reproduzir vídeo de ${work.title}`}
                >
                  <span className="flex items-center justify-center rounded-full border border-white/40 bg-black/40 p-4 shadow-lg backdrop-blur">
                    <Play className="h-7 w-7 translate-x-[1px]" />
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent
                className="border-white/10 bg-zinc-950/95 p-0 sm:max-w-4xl"
              >
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={`Vídeo de ${work.title}`}
                    className="absolute inset-0 h-full w-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
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
