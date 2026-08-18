import React, { useEffect, useRef, useState } from 'react';
import { content } from '../data/content';
import gsap from 'gsap';

export const TechStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orbital text animation
      gsap.to('.orbital-text', {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "linear",
        transformOrigin: "center center"
      });
      
      // Counter rotation for text readability
      gsap.to('.orbital-word', {
        rotation: -360,
        duration: 60,
        repeat: -1,
        ease: "linear",
        transformOrigin: "center center"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const orbitalWords = ["FIGMA", "PHOTOSHOP", "GPT", "GEMINI", "FIREBASE", "REACT", "PREMIERE", "CLAUDE"];

  return (
    <section ref={sectionRef} id="ferramentas" className="py-24 md:py-40 px-6 md:px-12 bg-brand-light text-brand-dark overflow-hidden relative">
      
      {/* Orbital Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 md:opacity-10 overflow-hidden">
        <div ref={orbitalRef} className="orbital-text relative w-[1000px] h-[1000px] md:w-[1500px] md:h-[1500px] rounded-full border border-brand-dark/20 flex items-center justify-center">
          {orbitalWords.map((word, i) => {
            const angle = (i / orbitalWords.length) * Math.PI * 2;
            const radius = 500; // adjust based on container size (approx 50% of 1000)
            const x = Math.cos(angle) * 50; // percentage
            const y = Math.sin(angle) * 50; // percentage
            return (
              <div 
                key={i} 
                className="orbital-word absolute text-6xl md:text-8xl font-display font-bold tracking-tighter"
                style={{ 
                  left: `calc(50% + ${x}%)`, 
                  top: `calc(50% + ${y}%)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {word}
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-24 md:mb-40 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray block mb-8">
              {content.tools.label} / {content.tools.title}
            </span>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium tracking-tighter leading-[0.9] uppercase mb-12">
              {content.tools.headline.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            <div className="space-y-6 max-w-3xl">
              {content.tools.subtitle.split('\n\n').map((paragraph, i) => (
                <p key={i} className={`text-xl md:text-3xl leading-relaxed text-balance ${i === 1 ? 'text-brand-gray' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="mt-32">
          {content.tools.categories.map((category, index) => (
            <div 
              key={index}
              className="border-t border-brand-line py-8 group cursor-pointer"
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
              onClick={() => setActiveCategory(activeCategory === index ? null : index)}
            >
              <div className="grid md:grid-cols-12 gap-4 md:gap-12 items-start md:items-center">
                <div className="md:col-span-4">
                  <h3 className="text-2xl md:text-4xl font-display font-medium tracking-tight group-hover:text-brand-gray transition-colors">
                    {category.title}
                  </h3>
                </div>
                <div className="md:col-span-8">
                  {/* Desktop Hover / Mobile Accordion */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    activeCategory === index ? 'max-h-[500px] opacity-100 mt-4 md:mt-0' : 'max-h-0 opacity-0 md:max-h-[500px] md:opacity-0 md:group-hover:opacity-100'
                  }`}>
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                      {category.items.map((item, i) => (
                        <span key={i} className="text-lg md:text-xl font-medium text-brand-gray">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-brand-line"></div>
        </div>

        {/* Closing */}
        <div className="mt-32 max-w-3xl">
           <div className="space-y-6">
              {content.tools.closing.split('\n\n').map((paragraph, i) => (
                <p key={i} className={`text-xl md:text-2xl leading-relaxed text-balance ${i === 1 ? 'text-brand-gray' : ''}`}>
                  {paragraph}
                </p>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};
