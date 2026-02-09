import { useState, useEffect, useRef } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    let rafId: number;
    lastTime.current = Date.now();
    lastScrollY.current = window.scrollY;
    
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const timeDelta = currentTime - lastTime.current;
      
      if (timeDelta > 0) {
        const scrollDelta = currentScrollY - lastScrollY.current;
        velocityRef.current = Math.abs(scrollDelta / timeDelta) * 10;
      }
      
      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    const updateVelocity = () => {
      setVelocity(velocityRef.current);
      velocityRef.current *= 0.95; // Decay
      rafId = requestAnimationFrame(updateVelocity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(updateVelocity);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return velocity;
}

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}
