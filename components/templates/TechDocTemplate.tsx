
import React from 'react';
import { PortfolioData, SectionKey } from '../../types';
import { motion } from 'framer-motion';

interface TemplateProps {
  data: PortfolioData;
}

const TechDocTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { themeSettings } = data;
  const isDarkMode = themeSettings.mode === 'dark';
  const primary = themeSettings.primaryColor;

  // Styles
  const bgColor = isDarkMode ? '#0f172a' : '#ffffff';
  const sidebarColor = isDarkMode ? '#1e293b' : '#f8fafc';
  const textColor = isDarkMode ? '#e2e8f0' : '#334155';
  const headingColor = isDarkMode ? '#f8fafc' : '#0f172a';
  const borderColor = isDarkMode ? '#334155' : '#e2e8f0';
  
  const sectionComponents: Record<SectionKey, React.ReactNode> = {
    profile: (
        <section id="intro" className="mb-16 scroll-mt-24">
            <h1 className="text-4xl font-bold mb-4 tracking-tight" style={{color: headingColor}}>{data.name}</h1>
            <div className="font-mono text-sm mb-6 p-2 rounded border inline-block" style={{borderColor, color: primary, background: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)'}}>
                &gt; {data.tagline}
            </div>
            <p className="text-lg leading-7 max-w-3xl" style={{color: textColor}}>{data.bio}</p>
            <div className="mt-6 flex gap-4">
                {data.socials.github && <a href={data.socials.github} className="text-sm font-medium hover:underline" style={{color: primary}}>GitHub ↗</a>}
                {data.socials.linkedin && <a href={data.socials.linkedin} className="text-sm font-medium hover:underline" style={{color: primary}}>LinkedIn ↗</a>}
            </div>
        </section>
    ),
    passion: (
         <section id="passion" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{color: headingColor, borderColor}}>Passion</h2>
            <blockquote className="pl-4 border-l-4 italic" style={{borderColor: primary, color: textColor}}>
                "{data.passion}"
            </blockquote>
        </section>
    ),
    skills: (
        <section id="skills" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{color: headingColor, borderColor}}>Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.skills.map(skill => (
                    <div key={skill} className="flex items-center justify-between p-3 rounded border font-mono text-sm" style={{borderColor, backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9'}}>
                        <span>{skill}</span>
                        <span style={{color: primary}}>✓</span>
                    </div>
                ))}
            </div>
        </section>
    ),
    experience: (
        <section id="experience" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{color: headingColor, borderColor}}>Experience</h2>
            <div className="space-y-8">
                {data.experience.map(exp => (
                    <div key={exp.id} className="relative pl-6 border-l-2" style={{borderColor}}>
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2" style={{borderColor: primary, backgroundColor: bgColor}}></div>
                        <h3 className="text-xl font-semibold" style={{color: headingColor}}>{exp.role}</h3>
                        <div className="flex items-center gap-2 text-sm font-mono mt-1 mb-2" style={{color: primary}}>
                            <span>{exp.company}</span>
                            <span>•</span>
                            <span>{exp.duration}</span>
                        </div>
                        <p style={{color: textColor}}>{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    ),
    projects: (
        <section id="projects" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{color: headingColor, borderColor}}>Projects</h2>
            <div className="grid grid-cols-1 gap-6">
                {data.projects.map(proj => (
                    <a key={proj.id} href={proj.link} target="_blank" rel="noreferrer" className="group block p-6 rounded-lg border transition-all hover:shadow-md" style={{borderColor, backgroundColor: isDarkMode ? '#1e293b' : '#fff'}}>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-48 h-32 flex-shrink-0 rounded overflow-hidden border" style={{borderColor}}>
                                <img src={proj.imageUrl} alt={proj.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2 group-hover:underline decoration-2 underline-offset-2" style={{color: headingColor, textDecorationColor: primary}}>{proj.name} ↗</h3>
                                <p className="text-sm" style={{color: textColor}}>{proj.description}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    ),
    achievements: (
         <section id="achievements" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{color: headingColor, borderColor}}>Achievements</h2>
            <ul className="list-disc list-inside space-y-2" style={{color: textColor}}>
                {data.achievements.map(ach => (
                    <li key={ach.id}>
                        <span className="font-semibold" style={{color: headingColor}}>{ach.title}:</span> {ach.description}
                    </li>
                ))}
            </ul>
        </section>
    ),
    education: (
        <section id="education" className="mb-16 scroll-mt-24">
             <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{color: headingColor, borderColor}}>Education</h2>
             <div className="space-y-4">
                 {data.education.map(edu => (
                     <div key={edu.id} className="flex justify-between items-start border-b pb-4 last:border-0" style={{borderColor}}>
                         <div>
                             <h4 className="font-bold" style={{color: headingColor}}>{edu.institution}</h4>
                             <p className="text-sm" style={{color: textColor}}>{edu.degree}</p>
                         </div>
                         <div className="font-mono text-xs px-2 py-1 rounded" style={{backgroundColor: isDarkMode ? '#334155' : '#e2e8f0', color: headingColor}}>
                             {edu.duration}
                         </div>
                     </div>
                 ))}
             </div>
        </section>
    )
  };

  return (
    <div className="min-h-full flex" style={{ backgroundColor: bgColor, color: textColor, fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Sidebar Navigation */}
      <aside className="w-64 hidden lg:block fixed h-full overflow-y-auto border-r p-8" style={{backgroundColor: sidebarColor, borderColor}}>
          <div className="mb-8">
              <div className="w-12 h-12 rounded bg-gradient-to-br from-blue-500 to-purple-600 mb-4"></div>
              <h3 className="font-bold text-sm uppercase tracking-wider opacity-70">Documentation</h3>
          </div>
          <nav className="space-y-1">
            {data.sectionOrder.map(key => (
                <a key={key} href={`#${key === 'profile' ? 'intro' : key}`} className="block px-3 py-2 text-sm rounded transition-colors font-medium opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5" style={{color: headingColor}}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
            ))}
            {data.contactEmail && <a href="#contact" className="block px-3 py-2 text-sm rounded transition-colors font-medium opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5" style={{color: headingColor}}>Contact</a>}
          </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 md:p-16 max-w-4xl">
        {data.sectionOrder.map(key => sectionComponents[key])}
        
        {data.contactEmail && (
            <section id="contact" className="mb-16 scroll-mt-24 p-8 rounded-lg border" style={{borderColor, backgroundColor: sidebarColor}}>
                <h2 className="text-xl font-bold mb-4" style={{color: headingColor}}>Contact</h2>
                <p className="mb-4">Ready to collaborate? Send a message.</p>
                <a href={`mailto:${data.contactEmail}`} className="inline-block px-4 py-2 rounded text-white font-medium text-sm transition-opacity hover:opacity-90" style={{backgroundColor: primary}}>
                    Email Me: {data.contactEmail}
                </a>
            </section>
        )}

        <footer className="border-t pt-8 mt-12 text-sm opacity-60" style={{borderColor}}>
            <p>© {new Date().getFullYear()} {data.name}. Built with Portverse.</p>
        </footer>
      </main>

       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>
    </div>
  );
};

export default TechDocTemplate;
