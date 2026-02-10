import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FluidBackground } from '@/components/FluidBackground';
import { Navigation } from '@/components/Navigation';
import { WorkCard } from '@/components/WorkCard';
import trabalhosData from '@/content/trabalhos-realizados.json';

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

export function WorksPage() {
  const { intro, works } = useMemo(() => {
    const list = Array.isArray(trabalhosData?.works)
      ? (trabalhosData.works as WorkItem[])
      : [];

    return {
      intro:
        typeof trabalhosData?.intro === 'string' ? trabalhosData.intro : '',
      works: list,
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] noise-overlay">
      <FluidBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-['Space_Grotesk']">
              Trabalhos{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Realizados
              </span>
            </h1>
            <div className="mt-6 text-zinc-300 text-base sm:text-lg max-w-3xl mx-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{intro}</ReactMarkdown>
            </div>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {works.map((work) => (
              <WorkCard key={`${work.title}-${work.year}`} work={work} />
            ))}
          </section>

          <div className="mt-20 text-center">
            <p className="text-zinc-400 mb-6">
              Quer conversar sobre um novo projeto ou trabalho?
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow duration-300"
            >
              Fale comigo
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
