import React, { useEffect, useRef } from 'react';
import { content } from '../data/content';
import { links } from '../data/links';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the left side and fade in the topics on the right side
      const topics = gsap.utils.toArray('.about-topic');
      
      topics.forEach((topic: any) => {
        gsap.fromTo(topic, 
          { opacity: 0, y: 40 },
          {
            opacity: 1, 
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: topic,
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
    <section ref={sectionRef} id="sobre" className="relative py-24 md:py-40 px-6 md:px-12 bg-brand-light">
      <div className="max-w-[1440px] mx-auto">
        <div ref={triggerRef} className="grid md:grid-cols-12 gap-12 md:gap-24 relative">
          
          {/* Left Side - Sticky */}
          <div className="md:col-span-5 relative">
            <div className="md:sticky md:top-40">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray block mb-8">
                {content.about.label} / {content.about.title}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium tracking-tighter leading-[0.9] uppercase mb-12">
                {content.about.headline.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
              
              <div className="space-y-8 max-w-sm">
                <p className="text-lg md:text-xl leading-relaxed text-balance">
                  {content.about.text1}
                </p>
                <p className="text-brand-gray text-lg md:text-xl leading-relaxed text-balance">
                  {content.about.text2}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Scrolling Content */}
          <div className="md:col-span-6 md:col-start-7 mt-12 md:mt-64 pb-24 border-l border-brand-line/50 pl-6 md:pl-16">
            <div className="mb-24">
              <p className="text-xl md:text-3xl leading-relaxed text-balance font-medium mb-6">
                {content.about.text3.split('\n\n')[0]}
              </p>
              <p className="text-lg md:text-xl text-brand-gray leading-relaxed text-balance">
                {content.about.text3.split('\n\n')[1]}
              </p>
            </div>

            <div className="space-y-24">
              {content.about.topics.map((topic, i) => (
                <div key={i} className="about-topic">
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4">
                    {topic.title}
                  </h3>
                  <p className="text-brand-gray text-lg md:text-xl leading-relaxed text-balance max-w-md">
                    {topic.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-32 pt-12 border-t border-brand-line/50 about-topic">
               <a 
                href={links.behance} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative text-sm font-bold uppercase tracking-widest flex items-center gap-4 inline-flex"
              >
                <span className="relative z-10">{content.about.cta}</span>
                <span className="w-8 h-8 rounded-full border border-brand-dark flex items-center justify-center transition-colors group-hover:bg-brand-dark group-hover:text-brand-light">
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
