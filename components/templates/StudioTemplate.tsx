
import React from 'react';
import { PortfolioData, SectionKey } from '../../types';
import { motion } from 'framer-motion';

interface TemplateProps {
  data: PortfolioData;
}

const StudioTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { themeSettings } = data;
  const isDarkMode = themeSettings.mode === 'dark';

  const bg = isDarkMode ? '#000000' : '#ffffff';
  const text = isDarkMode ? '#ffffff' : '#000000';
  const accent = themeSettings.primaryColor;
  
  const sectionComponents: Record<SectionKey, React.ReactNode> = {
    profile: (
        <div className="grid md:grid-cols-12 gap-8 mb-32 items-end">
            <div className="md:col-span-4">
                 <img src={data.avatarUrl} alt={data.name} className="w-full aspect-[3/4] object-cover grayscale" />
            </div>
            <div className="md:col-span-8">
                <h1 className="text-6xl md:text-9xl font-black leading-none -ml-1 mb-6 tracking-tighter">{data.name.split(' ')[0]}<span style={{color: accent}}>.</span></h1>
                <p className="text-2xl md:text-3xl font-light leading-tight max-w-2xl">{data.bio}</p>
                <div className="mt-8 flex gap-6 text-sm uppercase tracking-widest font-bold">
                     {data.socials.linkedin && <a href={data.socials.linkedin} className="hover:underline decoration-2 underline-offset-4">LinkedIn</a>}
                     {data.socials.twitter && <a href={data.socials.twitter} className="hover:underline decoration-2 underline-offset-4">Twitter</a>}
                </div>
            </div>
        </div>
    ),
    passion: (
        <div className="mb-32 py-20 border-y border-current">
            <p className="text-4xl md:text-6xl font-bold text-center uppercase leading-tight">
                {data.passion}
            </p>
        </div>
    ),
    projects: (
        <div className="mb-32">
            <div className="flex justify-between items-end mb-8 pb-4 border-b border-current">
                <h2 className="text-sm font-bold uppercase tracking-widest">Selected Works</h2>
                <span className="text-xs font-mono">{data.projects.length} Items</span>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-20">
                {data.projects.map((proj, i) => (
                    <a key={proj.id} href={proj.link} target="_blank" rel="noreferrer" className={`group block ${i % 2 !== 0 ? 'md:mt-20' : ''}`}>
                        <div className="overflow-hidden mb-4">
                            <img src={proj.imageUrl} alt={proj.name} className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold group-hover:text-[var(--accent)] transition-colors">{proj.name}</h3>
                                <p className="text-sm mt-1 max-w-xs" style={{opacity: isDarkMode ? 0.6 : 0.8}}>{proj.description}</p>
                            </div>
                            <span className="text-xs font-mono border border-current rounded-full px-2 py-1 opacity-50 group-hover:opacity-100">0{i+1}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    ),
    skills: (
         <div className="mb-32 grid md:grid-cols-2 gap-8">
             <h2 className="text-sm font-bold uppercase tracking-widest">Skillset</h2>
             <div className="flex flex-wrap gap-x-8 gap-y-4 text-xl md:text-2xl font-light">
                 {data.skills.map(skill => (
                     <span key={skill} className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-[var(--accent)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right hover:after:origin-left cursor-default">
                         {skill}
                     </span>
                 ))}
             </div>
         </div>
    ),
    experience: (
        <div className="mb-32">
             <h2 className="text-sm font-bold uppercase tracking-widest mb-12 border-b border-current pb-4">Experience</h2>
             {data.experience.map(exp => (
                 <div key={exp.id} className="grid md:grid-cols-12 gap-4 mb-8 group">
                     <div className="md:col-span-3 text-sm font-mono opacity-50 pt-1">{exp.duration}</div>
                     <div className="md:col-span-9 border-t border-gray-800/20 pt-4 group-first:border-0 group-first:pt-0">
                         <h3 className="text-3xl font-bold mb-1">{exp.role}</h3>
                         <p className="text-lg font-medium mb-2 text-[var(--accent)]">{exp.company}</p>
                         <p className="font-light max-w-xl" style={{opacity: isDarkMode ? 0.8 : 1}}>{exp.description}</p>
                     </div>
                 </div>
             ))}
        </div>
    ),
    achievements: (
         <div className="mb-32 bg-[var(--accent)] text-[var(--inverse)] p-8 md:p-16 -mx-4 md:-mx-8">
             <h2 className="text-sm font-bold uppercase tracking-widest mb-8 opacity-80">Recognition</h2>
             <div className="grid gap-8">
                 {data.achievements.map(ach => (
                     <div key={ach.id} className="border-b border-current pb-8 last:border-0 last:pb-0">
                         <h3 className="text-2xl font-bold">{ach.title}</h3>
                         <p className="opacity-80 mt-2">{ach.description}</p>
                     </div>
                 ))}
             </div>
         </div>
    ),
    education: (
        <div className="mb-32">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-8 border-b border-current pb-4">Education</h2>
            {data.education.map(edu => (
                <div key={edu.id} className="flex justify-between items-baseline mb-4">
                    <div>
                        <h3 className="text-xl font-bold">{edu.institution}</h3>
                        <p className="opacity-60">{edu.degree}</p>
                    </div>
                    <span className="text-sm font-mono opacity-40">{edu.duration}</span>
                </div>
            ))}
        </div>
    )
  };

  return (
    <div className="min-h-full p-4 md:p-8 overflow-x-hidden font-sans" style={{backgroundColor: bg, color: text, '--accent': accent, '--inverse': isDarkMode ? '#000' : '#fff'} as React.CSSProperties}>
        <nav className="flex justify-between items-center mb-20">
            <div className="font-bold tracking-tighter text-xl">{data.name.toUpperCase()}</div>
            {data.contactEmail && <a href={`mailto:${data.contactEmail}`} className="text-sm font-bold uppercase tracking-widest border border-current px-4 py-2 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[var(--inverse)] transition-all">Get in touch</a>}
        </nav>
        
        <main className="max-w-6xl mx-auto">
            {/* Custom Order for Studio: Profile -> Projects -> Passion -> Skills -> Rest */}
             {sectionComponents['profile']}
             {sectionComponents['projects']}
             {sectionComponents['passion']}
             {sectionComponents['skills']}
             {sectionComponents['experience']}
             {sectionComponents['achievements']}
             {sectionComponents['education']}
        </main>

        <footer className="mt-32 py-8 border-t border-current flex justify-between text-xs font-mono uppercase">
            <span>Portverse Studio Edition</span>
            <span>© {new Date().getFullYear()}</span>
        </footer>
    </div>
  );
};

export default StudioTemplate;