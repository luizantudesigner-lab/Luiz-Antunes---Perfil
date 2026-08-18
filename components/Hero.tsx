import React, { useEffect, useRef } from 'react';
import { content } from '../data/content';
import { links } from '../data/links';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const envElementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Sequence
      const tl = gsap.timeline();
      
      tl.from(".hero-meta", { opacity: 0, y: 10, duration: 0.8, stagger: 0.1, ease: "power2.out" })
        .from(".hero-headline span", { 
          yPercent: 100, 
          opacity: 0,
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power4.out" 
        }, "-=0.4")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 1, ease: "power2.out" }, "-=0.6")
        .from(".hero-cta", { opacity: 0, y: 10, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.8")
        .from(".hero-scroll", { opacity: 0, duration: 1, ease: "power2.out" }, "-=0.4");

      // Abstract Environmental Element Motion
      gsap.to(envElementRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "linear"
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;
        
        gsap.to(envElementRef.current, {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: "power2.out"
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen pt-40 pb-20 px-6 md:px-12 flex flex-col justify-between overflow-hidden" id="inicio">
      
      {/* Abstract Environmental Element */}
      <div 
        ref={envElementRef}
        className="absolute top-1/4 -right-1/4 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full border border-brand-line/40 opacity-30 pointer-events-none mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, rgba(212,212,212,0.1) 0%, transparent 70%)' }}
      ></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 border border-brand-line/20 rounded-full opacity-20 blur-2xl pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-[1440px] mx-auto w-full flex-grow flex flex-col justify-center relative z-10">
        
        {/* Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 md:mb-24 text-[9px] font-bold uppercase tracking-widest text-brand-gray">
          <div className="hero-meta">{content.hero.label}</div>
          <div className="hero-meta">{content.hero.location}</div>
          <div className="hero-meta col-span-2 md:col-span-1">{content.hero.availability}</div>
          <div className="hero-meta col-span-2 md:col-span-1">{content.hero.role}</div>
        </div>

        {/* Headline */}
        <h1 ref={headlineRef} className="hero-headline text-5xl md:text-[8rem] lg:text-[10rem] font-display font-bold leading-[0.85] tracking-tighter uppercase mb-16 md:mb-24">
          <div className="overflow-hidden"><span className="block">LUIZ</span></div>
          <div className="overflow-hidden"><span className="block">FERNANDO</span></div>
          <div className="overflow-hidden"><span className="block">ANTUNES</span></div>
        </h1>

        {/* Description Grid */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-5 hero-desc">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4">
              {content.hero.subtitle}
            </h2>
            <p className="text-brand-gray leading-relaxed text-balance">
              {content.hero.description1}
            </p>
          </div>
          <div className="md:col-span-4 hero-desc">
            <p className="text-base md:text-lg leading-relaxed text-balance">
              {content.hero.description2}
            </p>
            <p className="text-base md:text-lg leading-relaxed text-balance mt-4 text-brand-gray">
              {content.hero.description3}
            </p>
          </div>
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-6 pb-2">
            <a 
              href={links.behance} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero-cta group relative text-xs font-bold uppercase tracking-widest flex items-center gap-2 overflow-hidden pb-1"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{content.hero.ctaPortfolio}</span>
              <span className="hidden md:inline-block relative z-10 transition-transform duration-300 group-hover:translate-x-2">↗</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-dark transform scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
            </a>
            <a 
              href={links.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero-cta group relative text-xs font-bold uppercase tracking-widest flex items-center gap-2 overflow-hidden pb-1"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{content.hero.ctaContact}</span>
              <span className="hidden md:inline-block relative z-10 transition-transform duration-300 group-hover:translate-x-2">↗</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-dark transform scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
            </a>
          </div>
        </div>

      </div>

      <div className="hero-scroll absolute bottom-10 left-6 md:left-12 text-[10px] font-bold uppercase tracking-widest text-brand-gray flex items-center gap-4">
        ROLE PARA EXPLORAR 
        <span className="block w-px h-8 bg-brand-gray overflow-hidden relative">
           <span className="absolute top-0 left-0 w-full h-full bg-brand-dark animate-[scrolldown_1.5s_ease-in-out_infinite]"></span>
        </span>
      </div>

      <style>{`
        @keyframes scrolldown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};
