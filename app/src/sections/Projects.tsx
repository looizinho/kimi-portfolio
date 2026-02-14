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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(
        '.project-card-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
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

      <div className="px-4 pb-16 sm:px-6 lg:px-8">
        <div
          ref={gridRef}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2"
        >
          {projects.slice(0, 4).map((project) => (
            <ProjectCard
              key={project.title}
              className="project-card-item"
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              image={project.image}
              tags={project.tags}
            />
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl justify-center">
          <Link
            to="/trabalhos"
            className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 font-medium text-white transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
          >
            Ver Trabalhos Realizados
          </Link>
        </div>
      </div>
    </section>
  );
}
