import React, { useEffect, useRef, useState } from 'react';
import { content } from '../data/content';
import { links } from '../data/links';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeYear, setActiveYear] = useState(content.experience.timeline[0].year);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-item');
      
      items.forEach((item: any, i: number) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveYear(content.experience.timeline[i].year),
          onEnterBack: () => setActiveYear(content.experience.timeline[i].year),
        });

        gsap.fromTo(item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
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
    <section ref={sectionRef} id="experiencia" className="py-24 md:py-40 px-6 md:px-12 bg-brand-dark text-brand-light relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="mb-24 md:mb-40 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray block mb-8">
              {content.experience.label} / {content.experience.title}
            </span>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium tracking-tighter leading-[0.9] uppercase mb-8">
              {content.experience.headline.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray leading-relaxed text-balance max-w-2xl">
              {content.experience.subtitle}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-12 gap-12 relative">
          
          {/* Left Side - Sticky Year */}
          <div className="hidden md:block md:col-span-5 relative">
            <div className="sticky top-1/2 -translate-y-1/2">
              <div className="text-[8rem] lg:text-[12rem] font-display font-bold tracking-tighter leading-none opacity-20 transition-all duration-500">
                {activeYear.split(' — ')[0]}
              </div>
            </div>
          </div>

          {/* Right Side - Timeline Items */}
          <div className="md:col-span-7 relative">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-brand-line/20 hidden md:block"></div>

            <div className="space-y-32 md:pl-16">
              {content.experience.timeline.map((item, index) => (
                <div key={index} className="timeline-item relative">
                  {/* Indicator Dot */}
                  <div className="absolute top-2 -left-[65px] w-3 h-3 bg-brand-light rounded-full hidden md:block"></div>
                  
                  <div className="md:hidden text-4xl font-display font-bold opacity-30 mb-6">
                    {item.year}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-2">
                      {item.company}
                    </h3>
                    <div className="text-xs font-bold uppercase tracking-widest text-brand-gray">
                      {item.role}
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-brand-gray text-lg leading-relaxed text-balance">
                    {item.description.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-32 md:pl-16">
               <a 
                href={links.behance} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative text-sm font-bold uppercase tracking-widest flex items-center gap-4 inline-flex text-brand-light"
              >
                <span className="relative z-10">{content.experience.cta}</span>
                <span className="w-8 h-8 rounded-full border border-brand-light flex items-center justify-center transition-colors group-hover:bg-brand-light group-hover:text-brand-dark">
                  <span className="hidden md:inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
