import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillCard } from '@/components/SkillCard';
import { 
  Video, 
  Code2, 
  Gamepad2, 
  Lightbulb, 
  Cpu, 
  LightbulbIcon,
  Sparkles 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    title: 'Audiovisual',
    description: 'Produção e operação de conteúdo audiovisual. Experiência em live streaming, edição e direção de transmissões.',
    icon: Video,
  },
  {
    title: 'Softwares',
    description: 'Uso e integração de diferentes ferramentas digitais para criar soluções completas e eficientes.',
    icon: Code2,
  },
  {
    title: 'Interatividade',
    description: 'Projetos interativos envolvendo público, sensores e interfaces para experiências imersivas.',
    icon: Gamepad2,
  },
  {
    title: 'Criatividade',
    description: 'Foco em soluções criativas para eventos e experiências que impactam e engajam.',
    icon: Lightbulb,
  },
  {
    title: 'Automação/IoT',
    description: 'Automação de processos e Internet das Coisas aplicada a cenários de eventos e instalações.',
    icon: Cpu,
  },
  {
    title: 'Iluminação',
    description: 'Trabalho com luz, incluindo cenários, painéis de LED e projeção mapeada.',
    icon: LightbulbIcon,
  },
  {
    title: 'Inteligência Artificial',
    description: 'Uso de IA em projetos criativos para geração de conteúdo e automação inteligente.',
    icon: Sparkles,
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, rotateX: 90, y: 50 },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-16 text-center font-['Space_Grotesk']"
        >
          Áreas de{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Atuação
          </span>
        </h2>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          style={{ perspective: '1000px' }}
        >
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              title={skill.title}
              description={skill.description}
              icon={skill.icon}
              className={index === skills.length - 1 ? 'sm:col-span-2 lg:col-span-1 xl:col-span-1' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
