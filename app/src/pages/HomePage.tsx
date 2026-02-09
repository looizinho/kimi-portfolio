import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FluidBackground } from '@/components/FluidBackground';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Projects } from '@/sections/Projects';
import { TechStack } from '@/sections/TechStack';
import { Contact } from '@/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const target = document.querySelector(location.hash);
    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location.hash]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] noise-overlay">
      {/* Fluid Background */}
      <FluidBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <div id="hero">
          <Hero />
        </div>
        <About />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
}
