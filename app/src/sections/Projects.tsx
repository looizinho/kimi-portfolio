import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from '@/components/ProjectCard';
import projetosDestacadosData from '@/content/projetos-destacados.json';

gsap.registerPlugin(ScrollTrigger);

const { projects } = projetosDestacadosData;

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Horizontal scroll
      const track = trackRef.current;
      if (track) {
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative"
    >
      {/* Section Heading */}
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

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative h-screen">
        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center gap-8 px-8"
          style={{ width: 'fit-content' }}
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

          {/* End Card */}
          <div className="flex-shrink-0 w-[40vw] max-w-[500px] h-[60vh] max-h-[600px] rounded-3xl glass flex flex-col items-center justify-center p-8">
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
