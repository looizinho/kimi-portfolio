import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FluidBackground } from '@/components/FluidBackground';
import { Navigation } from '@/components/Navigation';
import { GalleryItem } from '@/components/GalleryItem';
import galleryData from '@/content/galeria-instagram.json';

interface GalleryProfile {
  handle: string;
  url: string;
}

interface GalleryPhoto {
  id: string;
  image: string;
  alt: string;
  caption?: string;
  date?: string;
  instagramUrl?: string;
}

export function GalleryPage() {
  const { intro, profile, photos } = useMemo(() => {
    const list = Array.isArray(galleryData?.photos)
      ? (galleryData.photos as GalleryPhoto[])
      : [];

    return {
      intro: typeof galleryData?.intro === 'string' ? galleryData.intro : '',
      profile: galleryData?.profile as GalleryProfile,
      photos: list,
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background noise-overlay">
      <FluidBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground font-['Space_Grotesk']">
              Galeria do{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Instagram
              </span>
            </h1>
            <div className="mt-6 text-foreground/80 text-base sm:text-lg max-w-3xl mx-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{intro}</ReactMarkdown>
            </div>

            {profile?.url && profile?.handle && (
              <div className="mt-8 flex items-center justify-center">
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium hover:shadow-[0_0_30px_rgba(131,165,152,0.5)] transition-shadow duration-300"
                >
                  Seguir @{profile.handle}
                </a>
              </div>
            )}
          </header>

          <section className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {photos.map((photo) => (
              <GalleryItem key={photo.id} photo={photo} />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
