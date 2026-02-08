import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function TypewriterText({ 
  text, 
  className, 
  speed = 50,
  delay = 0,
  onComplete 
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isTyping, text, speed, onComplete]);

  return (
    <span className={cn('font-mono', className)}>
      {displayText}
      <span className={cn(
        'inline-block w-0.5 h-5 ml-1 bg-cyan-400',
        isTyping && indexRef.current < text.length ? 'animate-pulse' : 'opacity-0'
      )} />
    </span>
  );
}
