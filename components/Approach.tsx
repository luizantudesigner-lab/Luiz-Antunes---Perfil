import React, { useEffect, useRef, useState } from 'react';
import { content } from '../data/content';
import { links } from '../data/links';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Approach: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pillars = gsap.utils.toArray('.pillar-item');
      
      pillars.forEach((pillar: any, i: number) => {
        ScrollTrigger.create({
          trigger: pillar,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });

        gsap.fromTo(pillar,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pillar,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="abordagem" className="py-24 md:py-40 px-6 md:px-12 bg-brand-light text-brand-dark">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="mb-24 md:mb-40 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray block mb-8">
              {content.approach.label} / {content.approach.title}
            </span>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium tracking-tighter leading-[0.9] uppercase mb-12">
              {content.approach.headline.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            
            <div className="space-y-6 max-w-3xl mb-16">
              <p className="text-xl md:text-3xl text-brand-gray leading-relaxed text-balance">
                {content.approach.text1}
              </p>
              <p className="text-xl md:text-3xl leading-relaxed text-balance">
                {content.approach.text2}
              </p>
              <p className="text-xl md:text-3xl text-brand-gray leading-relaxed text-balance">
                {content.approach.text3}
              </p>
            </div>

            <div className="border-l-4 border-brand-dark pl-6 md:pl-10">
              <p className="text-2xl md:text-4xl font-display font-bold italic tracking-tight uppercase text-balance max-w-4xl">
                {content.approach.quote}
              </p>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-12 gap-12 relative mt-32 border-t border-brand-line pt-24">
          
          {/* Graphic Element */}
          <div className="md:col-span-6 relative h-[400px] md:h-auto">
            <div className="sticky top-1/2 -translate-y-1/2 w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center">
              {/* Abstract Procedural Graphic changing based on activeIndex */}
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* State 0: Pesquisa (Dispersed points) */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${activeIndex === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={`p1-${i}`}
                      className="absolute w-2 h-2 bg-brand-dark rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.2
                      }}
                    ></div>
                  ))}
                </div>

                {/* State 1: Sistema (Organized grid) */}
                <div className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${activeIndex === 1 ? 'opacity-100' : 'opacity-0'}`}>
                   <div className="grid grid-cols-4 gap-8">
                     {Array.from({ length: 16 }).map((_, i) => (
                       <div key={`p2-${i}`} className="w-2 h-2 bg-brand-dark rounded-full"></div>
                     ))}
                   </div>
                </div>

                {/* State 2: Performance (Directed motion lines) */}
                <div className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center gap-6 ${activeIndex === 2 ? 'opacity-100' : 'opacity-0'}`}>
                   {Array.from({ length: 5 }).map((_, i) => (
                     <div key={`p3-${i}`} className="w-full h-px bg-brand-dark overflow-hidden relative">
                       <div 
                         className="absolute top-0 left-0 h-full bg-brand-dark w-1/4"
                         style={{ 
                           animation: `slideRight 2s linear infinite`,
                           animationDelay: `${i * 0.2}s`
                         }}
                       ></div>
                     </div>
                   ))}
                </div>
                
              </div>
            </div>
          </div>

          <style>{`
            @keyframes slideRight {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(400%); }
            }
          `}</style>

          {/* Scrolling Content */}
          <div className="md:col-span-6 space-y-40 pb-40">
            {content.approach.pillars.map((pillar, index) => (
              <div key={index} className="pillar-item">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray block mb-4">
                  PILAR {pillar.num}
                </span>
                <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-8">
                  {pillar.title}
                </h3>
                <div className="space-y-4 text-xl md:text-2xl leading-relaxed text-balance text-brand-gray">
                  {pillar.desc.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Closing */}
        <div className="mt-24 pt-24 border-t border-brand-line">
          <div className="max-w-4xl">
            <div className="space-y-4 text-xl md:text-3xl leading-relaxed text-balance mb-12">
              {content.approach.closing.split('\n\n').map((paragraph, i) => (
                <p key={i} className={i % 2 !== 0 ? "text-brand-gray" : ""}>{paragraph}</p>
              ))}
            </div>
            <a 
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-10 py-5 bg-brand-dark text-brand-light font-bold uppercase tracking-widest text-sm hover:bg-brand-gray transition-colors"
            >
              {content.approach.cta} <span className="ml-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
