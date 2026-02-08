import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypewriterText } from '@/components/TypewriterText';
import { GlitchText } from '@/components/GlitchText';
import { 
  Youtube, 
  Github, 
  Linkedin, 
  Instagram, 
  ExternalLink,
  Mail,
  ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com',
    description: 'Projetos e tutoriais',
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com',
    description: 'Código e repositórios',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/luizmneto',
    description: 'Perfil profissional',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com',
    description: 'Bastidores e labs',
  },
  {
    name: 'Portfólio',
    icon: ExternalLink,
    url: 'https://portfolio.looizinho.pro',
    description: 'Cases detalhados',
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [, setTypewriterComplete] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading is handled by TypewriterText

      // Email animation
      gsap.fromTo(
        emailRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1,
          scrollTrigger: {
            trigger: emailRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Social links animation
      const links = linksRef.current?.children;
      if (links) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 1.2,
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 85%',
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
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 font-['Space_Grotesk']"
        >
          <TypewriterText
            text="Vamos criar algo juntos?"
            speed={60}
            onComplete={() => setTypewriterComplete(true)}
          />
        </h2>

        {/* Email */}
        <div ref={emailRef} className="mb-12 opacity-0">
          <a
            href="mailto:neto@looizinho.pro"
            className="group inline-flex items-center gap-4 text-2xl sm:text-3xl md:text-4xl text-zinc-300 hover:text-white transition-colors duration-300"
          >
            <Mail className="w-8 h-8 text-violet-400" />
            <GlitchText>neto@looizinho.pro</GlitchText>
            <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>

        {/* Social Links */}
        <div ref={linksRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl glass hover:bg-white/10 transition-all duration-300 opacity-0"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-600/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <link.icon className="w-6 h-6 text-violet-400 group-hover:text-cyan-400 transition-colors duration-300" />
              </div>
              <div>
                <div className="font-medium text-white underline-animation">
                  {link.name}
                </div>
                <div className="text-sm text-zinc-500">{link.description}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Luizinho Neto. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>Feito com</span>
            <span className="text-pink-500">♥</span>
            <span>e muita tecnologia</span>
          </div>
        </div>
      </div>
    </section>
  );
}
