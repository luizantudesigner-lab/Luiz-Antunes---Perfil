import React, { useEffect, useRef } from 'react';
import { content } from '../data/content';
import { links } from '../data/links';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Trajectory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the huge numbers when they come into view
      gsap.fromTo('.stat-value', 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: '.stats-container',
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="trajetoria" className="py-24 md:py-40 px-6 md:px-12 bg-brand-light text-brand-dark overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="mb-24 md:mb-32 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray block mb-8">
              {content.trajectory.label} / {content.trajectory.title}
            </span>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium tracking-tighter leading-[0.9] uppercase mb-12">
              {content.trajectory.headline.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            
            <div className="space-y-8 max-w-3xl">
              <p className="text-xl md:text-3xl leading-relaxed text-balance text-brand-gray">
                {content.trajectory.text1}
              </p>
              <p className="text-xl md:text-3xl leading-relaxed text-balance">
                {content.trajectory.text2}
              </p>
              <p className="text-xl md:text-3xl leading-relaxed text-balance text-brand-gray">
                {content.trajectory.text3}
              </p>
              <p className="text-xl md:text-3xl leading-relaxed text-balance pt-8 border-t border-brand-line/50">
                {content.trajectory.text4}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-32 md:mt-48 mb-32 md:mb-48 border-t border-b border-brand-line py-16 md:py-24">
          {content.trajectory.stats.map((stat, i) => (
            <div key={i} className="flex flex-col overflow-hidden">
              <span className="stat-value text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-4 block">
                {stat.value}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray block mt-auto">
                {stat.label.split('\n').map((line, j) => (
                  <React.Fragment key={j}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* Availability */}
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4"></div>
          <div className="md:col-span-8">
             <h3 className="text-sm font-bold uppercase tracking-widest mb-6">
               {content.trajectory.availability.title}
             </h3>
             <div className="space-y-6 max-w-3xl mb-12">
               {content.trajectory.availability.text.split('\n\n').map((paragraph, i) => (
                 <p key={i} className="text-xl md:text-2xl text-brand-gray leading-relaxed text-balance">
                   {paragraph}
                 </p>
               ))}
             </div>
             <a 
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-10 py-5 bg-brand-dark text-brand-light font-bold uppercase tracking-widest text-sm hover:bg-brand-gray transition-colors"
            >
              {content.trajectory.availability.cta} <span className="ml-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
