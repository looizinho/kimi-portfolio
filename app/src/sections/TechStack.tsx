import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechOrbit } from '@/components/TechOrbit';
import { 
  Monitor, 
  Box, 
  Video, 
  Code, 
  Wifi, 
  Radio, 
  Share2, 
  Cpu, 
  Lightbulb,
  Github,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    name: 'Resolume',
    icon: <Monitor className="w-8 h-8" />,
    description: 'VJ software para performance ao vivo',
  },
  {
    name: 'TouchDesigner',
    icon: <Box className="w-8 h-8" />,
    description: 'Plataforma visual de desenvolvimento',
  },
  {
    name: 'vMix',
    icon: <Video className="w-8 h-8" />,
    description: 'Software de live streaming',
  },
  {
    name: 'Python',
    icon: <Code className="w-8 h-8" />,
    description: 'Automação e scripts',
  },
  {
    name: 'ArtNet',
    icon: <Wifi className="w-8 h-8" />,
    description: 'Protocolo DMX over Ethernet',
  },
  {
    name: 'OSC',
    icon: <Radio className="w-8 h-8" />,
    description: 'Open Sound Control',
  },
  {
    name: 'NDI',
    icon: <Share2 className="w-8 h-8" />,
    description: 'Network Device Interface',
  },
  {
    name: 'IoT',
    icon: <Cpu className="w-8 h-8" />,
    description: 'Internet das Coisas',
  },
  {
    name: 'LED',
    icon: <Lightbulb className="w-8 h-8" />,
    description: 'Painéis e controle de LED',
  },
  {
    name: 'GitHub',
    icon: <Github className="w-8 h-8" />,
    description: 'Versionamento e colaboração',
  },
  {
    name: 'AI/ML',
    icon: <Sparkles className="w-8 h-8" />,
    description: 'Inteligência Artificial',
  },
];

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

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

      // Orbit animation
      gsap.fromTo(
        orbitRef.current,
        { opacity: 0, scale: 0.8, rotate: -180 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: orbitRef.current,
            start: 'top 75%',
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
      id="tech"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 text-center font-['Space_Grotesk']"
        >
          Tecnologias &{' '}
          <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            Ferramentas
          </span>
        </h2>

        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
          Stack tecnológico utilizado para criar experiências audiovisuais imersivas e interativas
        </p>

        {/* Tech Orbit */}
        <div ref={orbitRef}>
          <TechOrbit technologies={technologies} />
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Projetos', value: '50+' },
            { label: 'Eventos', value: '100+' },
            { label: 'Anos de Experiência', value: '10+' },
            { label: 'Tecnologias', value: '20+' },
          ].map((stat) => (
            <div key={stat.label} className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Space_Grotesk']">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
