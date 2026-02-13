import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from '@/components/ProjectCard';
import projetosDestacadosData from '@/content/projetos-destacados.json';

gsap.registerPlugin(ScrollTrigger);

const { projects } = projetosDestacadosData;

export function Projects() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateViewport = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener('change', updateViewport);

    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const track = trackRef.current;
      if (!track) return;

      if (!isDesktop) {
        gsap.set(track, { clearProps: 'all' });
        return;
      }

      const scrollWidth = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section ref={sectionRef} id="projects" className="relative">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center font-['Space_Grotesk']"
        >
          Projetos{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Destacados
          </span>
        </h2>
      </div>

      <div ref={containerRef} className="relative h-auto md:h-screen">
        <div
          ref={trackRef}
          className="relative md:absolute md:top-0 md:left-0 flex flex-col md:flex-row items-center md:h-full gap-6 md:gap-8 px-4 md:px-8 pb-10 md:pb-0"
          style={{ width: isDesktop ? 'fit-content' : '100%' }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              image={project.image}
              tags={project.tags}
            />
          ))}

          <div className="flex-shrink-0 w-full md:w-[40vw] max-w-[500px] min-h-[280px] md:h-[60vh] md:max-h-[600px] rounded-3xl glass flex flex-col items-center justify-center p-8">
            <h3 className="text-3xl font-bold text-white mb-4 font-['Space_Grotesk'] text-center">
              Quer ver mais?
            </h3>
            <p className="text-zinc-400 text-center mb-8">
              Confira todos os trabalhos realizados em uma página dedicada
            </p>
            <Link
              to="/trabalhos"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow duration-300"
            >
              Ver Trabalhos Realizados
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
