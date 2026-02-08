import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MagneticButton } from '@/components/MagneticButton';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [decodedText, setDecodedText] = useState('');
  const originalText = 'LUIZINHO NETO';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  useEffect(() => {
    // Character decode animation
    let iteration = 0;
    const interval = setInterval(() => {
      setDecodedText(
        originalText
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subheading animation
      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: 'power3.out' }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 1.5, ease: 'elastic.out(1, 0.5)' }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Content */}
      <div className="text-center z-10">
        {/* Main Heading */}
        <h1
          ref={headingRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 font-['Space_Grotesk'] tracking-tight text-glow"
        >
          {decodedText || originalText}
        </h1>

        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-12 opacity-0"
        >
          <span className="text-violet-400">Tecnologia</span>
          <span className="mx-3 text-zinc-600">·</span>
          <span className="text-cyan-400">Audiovisual</span>
          <span className="mx-3 text-zinc-600">·</span>
          <span className="text-pink-400">Interatividade</span>
        </p>

        {/* CTA Button */}
        <div ref={ctaRef} className="opacity-0">
          <MagneticButton onClick={scrollToProjects}>
            Explorar Projetos
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-zinc-500" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
      <div className="absolute top-1/3 right-20 w-3 h-3 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-pink-500 animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
}
