import React from 'react';
import { content } from '../data/content';
import { links } from '../data/links';

export const Footer: React.FC = () => {
  return (
    <footer id="contato" className="py-24 md:py-32 px-6 md:px-12 bg-brand-dark text-brand-light">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-32">
          
          <div className="max-w-3xl">
             <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray block mb-12">
                {content.footer.label}
             </span>
             <h2 className="text-4xl md:text-6xl lg:text-8xl font-display font-medium tracking-tighter leading-[0.9] uppercase mb-12">
                {content.footer.headline.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
             </h2>
             <div className="space-y-6 max-w-2xl mb-12">
               {content.footer.text.split('\n\n').map((paragraph, i) => (
                 <p key={i} className="text-xl md:text-2xl text-brand-gray leading-relaxed text-balance">
                   {paragraph}
                 </p>
               ))}
             </div>
             
             <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-10 py-5 bg-brand-light text-brand-dark font-bold uppercase tracking-widest text-sm hover:bg-brand-gray hover:text-brand-light transition-colors"
                >
                  {content.footer.ctaPrimary} <span className="hidden md:inline-block ml-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
                <a 
                  href={links.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-10 py-5 border border-brand-line/30 text-brand-light font-bold uppercase tracking-widest text-sm hover:border-brand-light transition-colors"
                >
                  {content.footer.ctaSecondary} <span className="hidden md:inline-block ml-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
             </div>
          </div>
        </div>

        <div className="border-t border-brand-line/20 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray">
              {content.footer.copyright}
            </p>
            <a 
              href="#inicio" 
              className="text-[10px] font-bold uppercase tracking-widest text-brand-gray hover:text-brand-light transition-colors"
            >
              VOLTAR AO TOPO ↑
            </a>
        </div>

      </div>
    </footer>
  );
};
