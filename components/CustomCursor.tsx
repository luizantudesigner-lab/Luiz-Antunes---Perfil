import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if it's mobile or touch device to disable custom cursor
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    const ctx = gsap.context(() => {
      // Setup initial cursor
      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
      gsap.set(cursorTextRef.current, { opacity: 0, scale: 0 });

      // Mouse move
      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out",
        });
      };

      // Hover logic
      const handleHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a') || target.closest('button');
        
        if (link) {
          let text = "";
          if (link.href?.includes('behance')) text = "PORTFÓLIO ↗";
          else if (link.href?.includes('wa.me')) text = "CONVERSAR ↗";
          else text = "VER ↗";

          if (cursorTextRef.current) cursorTextRef.current.innerText = text;

          gsap.to(cursorRef.current, {
            width: 90,
            height: 90,
            backgroundColor: "var(--color-brand-dark)",
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(cursorTextRef.current, {
            opacity: 1,
            scale: 1,
            color: "var(--color-brand-light)",
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(cursorRef.current, {
            width: 12,
            height: 12,
            backgroundColor: "var(--color-brand-dark)",
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(cursorTextRef.current, {
            opacity: 0,
            scale: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      };

      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleHover);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseover', handleHover);
      };
    });

    return () => {
      ctx.revert();
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-brand-dark rounded-full pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
      style={{ willChange: 'transform, width, height' }}
    >
      <div 
        ref={cursorTextRef} 
        className="text-[10px] font-bold uppercase tracking-wider text-center leading-none"
      ></div>
    </div>
  );
};
