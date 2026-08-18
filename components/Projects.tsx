import React, { useEffect, useState, useRef } from 'react';
import { content } from '../data/content';
import { links } from '../data/links';
import { fetchBehanceProjects, BehanceProject } from '../services/behance';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<BehanceProject[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchBehanceProjects();
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const projectItems = gsap.utils.toArray('.project-item');
      
      projectItems.forEach((item: any) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, projects]);

  return (
    <section ref={sectionRef} id="projetos" className="py-24 md:py-40 px-6 md:px-12 bg-brand-dark text-brand-light">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="mb-24 md:mb-40">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray block mb-8">
            {content.projects.label} / {content.projects.title}
          </span>
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tighter leading-[0.9] uppercase">
                {content.projects.headline.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
            </div>
            <div className="md:col-span-4 flex items-end">
              <p className="text-xl md:text-2xl text-brand-gray leading-relaxed text-balance">
                {content.projects.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-32 flex justify-center">
            <div className="w-8 h-8 border-2 border-brand-gray border-t-brand-light rounded-full animate-spin"></div>
          </div>
        )}

        {/* Projects List or Fallback */}
        {!loading && projects.length > 0 ? (
          <div className="space-y-32">
            {projects.map((project, index) => (
              <a 
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-item group block"
              >
                <div className="overflow-hidden mb-6 bg-brand-surface relative aspect-[16/9] md:aspect-[21/9]">
                  <img 
                    src={project.cover} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="flex justify-between items-start border-t border-brand-gray/30 pt-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray block mb-2">
                      0{index + 1} // {project.category || "PROJECT"}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-display font-medium tracking-tight group-hover:text-brand-gray transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="hidden md:block">
                     <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                       VER PROJETO <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                     </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="py-24 border-t border-b border-brand-gray/30 flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-12 opacity-50">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <p className="text-xl md:text-3xl font-display font-medium mb-12 max-w-2xl text-balance">
                Os projetos estão centralizados no Behance para garantir melhor qualidade e atualização.
              </p>
              <a 
                href={links.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-10 py-5 border border-brand-light text-brand-light font-bold uppercase tracking-widest text-sm hover:bg-brand-light hover:text-brand-dark transition-colors"
              >
                {content.projects.ctaFallback} <span className="ml-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </div>
          )
        )}

      </div>
    </section>
  );
};
