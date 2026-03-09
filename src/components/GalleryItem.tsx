import { ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface GalleryPhoto {
  id: string;
  image: string;
  alt: string;
  caption?: string;
  date?: string;
  instagramUrl?: string;
}

interface GalleryItemProps {
  photo: GalleryPhoto;
}

export function GalleryItem({ photo }: GalleryItemProps) {
  return (
    <div className="break-inside-avoid">
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className={cn(
              'group relative w-full overflow-hidden rounded-2xl',
              'border border-white/10 bg-white/5 backdrop-blur-sm',
              'transition-transform duration-300 hover:-translate-y-1'
            )}
            aria-label={`Abrir foto: ${photo.alt}`}
          >
            <img
              src={photo.image}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {photo.date && (
              <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white/80">
                {photo.date}
              </span>
            )}
          </button>
        </DialogTrigger>
        <DialogContent className="border-white/10 bg-zinc-950/95 p-0 sm:max-w-4xl">
          <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_280px]">
            <div className="relative w-full overflow-hidden rounded-xl">
              <img
                src={photo.image}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex h-full flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white font-['Space_Grotesk']">
                  {photo.alt}
                </h3>
                {photo.caption && (
                  <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                    {photo.caption}
                  </p>
                )}
                {photo.date && (
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {photo.date}
                  </p>
                )}
              </div>
              {photo.instagramUrl && (
                <a
                  href={photo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  Ver no Instagram
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
