
import React, { useEffect, useRef } from 'react';
import { PortfolioData, SectionKey } from '../../types';
import { motion, useAnimation, useInView } from 'framer-motion';

interface TemplateProps {
  data: PortfolioData;
}

const CyberCard: React.FC<{ children: React.ReactNode; className?: string; primaryColor: string; delay?: number }> = ({ children, className = '', primaryColor, delay = 0 }) => {
    return (
        <motion.div 
            className={`relative group border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5 }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 transition-colors duration-300 group-hover:border-[var(--primary-color)]" style={{'--primary-color': primaryColor} as React.CSSProperties} />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 transition-colors duration-300 group-hover:border-[var(--primary-color)]" style={{'--primary-color': primaryColor} as React.CSSProperties} />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 transition-colors duration-300 group-hover:border-[var(--primary-color)]" style={{'--primary-color': primaryColor} as React.CSSProperties} />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 transition-colors duration-300 group-hover:border-[var(--primary-color)]" style={{'--primary-color': primaryColor} as React.CSSProperties} />
            
            <div className="p-6 relative z-10 h-full">
                {children}
            </div>
        </motion.div>
    )
}

const CyberTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { themeSettings } = data;
  const isDarkMode = themeSettings.mode === 'dark';
  const primary = themeSettings.primaryColor;

  // Colors & Theme Logic
  const bg = isDarkMode ? '#050505' : '#f0f0f0';
  const text = isDarkMode ? '#e0e0e0' : '#1a1a1a';
  const gridColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  const sectionComponents: Record<SectionKey, React.ReactNode> = {
    profile: (
        <div className="min-h-[80vh] flex flex-col justify-center items-center text-center relative">
             <div className="w-32 h-32 md:w-48 md:h-48 relative mb-8 group">
                 <div className="absolute inset-0 rounded-full border-2 border-dashed animate-spin-slow" style={{borderColor: primary}}></div>
                 <div className="absolute inset-2 rounded-full border border-white/20"></div>
                 <img src={data.avatarUrl} alt={data.name} className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
             </div>
             <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 relative inline-block cyber-glitch" data-text={data.name}>
                {data.name}
             </h1>
             <div className="inline-block px-4 py-1 border border-white/20 bg-white/5 backdrop-blur-md text-sm md:text-lg font-mono tracking-widest uppercase">
                {data.tagline}
             </div>
             
             <div className="flex gap-6 mt-12">
                {Object.entries(data.socials).map(([key, url]) => (
                    url && (
                        <a key={key} href={url} target="_blank" rel="noreferrer" className="text-xs font-mono uppercase hover:text-[var(--primary)] transition-colors" style={{'--primary': primary} as React.CSSProperties}>
                            [{key}]
                        </a>
                    )
                ))}
             </div>
        </div>
    ),
    passion: (
        <div className="py-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[var(--primary)]" style={{'--primary': primary} as React.CSSProperties}></div>
            <p className="text-2xl md:text-4xl font-light max-w-3xl mx-auto leading-relaxed">
                <span style={{color: primary}}>&lt;passion&gt;</span>
                 {data.passion}
                <span style={{color: primary}}>&lt;/passion&gt;</span>
            </p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-[var(--primary)]" style={{'--primary': primary} as React.CSSProperties}></div>
        </div>
    ),
    skills: (
        <div className="py-20">
            <h2 className="text-xl font-mono uppercase tracking-widest mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-[var(--primary)]" style={{'--primary': primary} as React.CSSProperties}></span>
                System_Capabilities
            </h2>
            <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, i) => (
                    <motion.div 
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-mono hover:bg-[var(--primary)] hover:text-black hover:border-[var(--primary)] transition-all cursor-crosshair"
                        style={{'--primary': primary} as React.CSSProperties}
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>
        </div>
    ),
    projects: (
        <div className="py-20">
             <h2 className="text-xl font-mono uppercase tracking-widest mb-12 flex items-center gap-4">
                <span className="w-8 h-px bg-[var(--primary)]" style={{'--primary': primary} as React.CSSProperties}></span>
                Deployed_Modules
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.projects.map((proj, i) => (
                    <CyberCard key={proj.id} primaryColor={primary} delay={i * 0.1}>
                        <div className="aspect-video w-full bg-black mb-4 overflow-hidden relative group-hover:ring-1 ring-[var(--primary)]" style={{'--primary': primary} as React.CSSProperties}>
                             <img src={proj.imageUrl} alt={proj.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                             <a href={proj.link} target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 px-3 py-1 text-xs font-mono bg-[var(--primary)] text-black opacity-0 group-hover:opacity-100 transition-opacity" style={{'--primary': primary} as React.CSSProperties}>
                                 OPEN_SOURCE
                             </a>
                        </div>
                        <h3 className="text-xl font-bold mb-2 font-mono">{proj.name}</h3>
                        <p className="text-sm opacity-70 leading-relaxed">{proj.description}</p>
                    </CyberCard>
                ))}
            </div>
        </div>
    ),
    experience: (
        <div className="py-20">
             <h2 className="text-xl font-mono uppercase tracking-widest mb-12 flex items-center gap-4">
                <span className="w-8 h-px bg-[var(--primary)]" style={{'--primary': primary} as React.CSSProperties}></span>
                Log_History
            </h2>
            <div className="space-y-0 relative border-l border-white/10 ml-3 md:ml-0">
                {data.experience.map((exp, i) => (
                    <motion.div 
                        key={exp.id} 
                        className="pl-8 md:pl-12 pb-12 relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]" style={{'--primary': primary} as React.CSSProperties}></div>
                        <div className="font-mono text-xs opacity-50 mb-2 flex items-center gap-2">
                            <span>{exp.duration}</span>
                            <span className="w-4 h-px bg-white/20"></span>
                            <span style={{color: primary}}>{exp.company}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{exp.role}</h3>
                        <p className="opacity-70 max-w-2xl text-sm leading-relaxed">{exp.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    ),
    achievements: (
         <div className="py-20">
             <h2 className="text-xl font-mono uppercase tracking-widest mb-12 flex items-center gap-4">
                <span className="w-8 h-px bg-[var(--primary)]" style={{'--primary': primary} as React.CSSProperties}></span>
                Trophies
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                {data.achievements.map((ach, i) => (
                     <CyberCard key={ach.id} primaryColor={primary} delay={i * 0.1} className="bg-transparent border-dashed">
                         <div className="flex items-start gap-4">
                             <div className="text-2xl opacity-50">0{i+1}</div>
                             <div>
                                 <h4 className="text-lg font-bold mb-1" style={{color: primary}}>{ach.title}</h4>
                                 <p className="text-sm opacity-70">{ach.description}</p>
                             </div>
                         </div>
                     </CyberCard>
                ))}
            </div>
         </div>
    ),
    education: (
         <div className="py-20 border-t border-white/10">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                    <h2 className="text-sm font-mono uppercase tracking-widest mb-8 opacity-50">Education_Data</h2>
                    {data.education.map(edu => (
                        <div key={edu.id} className="mb-6 last:mb-0">
                            <h3 className="text-xl font-bold">{edu.institution}</h3>
                            <div className="flex gap-4 text-sm mt-1">
                                <span style={{color: primary}}>{edu.degree}</span>
                                <span className="opacity-50">// {edu.duration}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {data.contactEmail && (
                     <div className="text-right">
                         <p className="text-sm font-mono opacity-50 mb-2">Initialize_Connection</p>
                         <a href={`mailto:${data.contactEmail}`} className="text-2xl md:text-3xl font-bold hover:text-[var(--primary)] transition-colors" style={{'--primary': primary} as React.CSSProperties}>
                             {data.contactEmail}
                         </a>
                     </div>
                )}
             </div>
         </div>
    )
  };

  return (
    <div className="w-full min-h-full relative overflow-hidden font-sans selection:bg-[var(--primary)] selection:text-black" style={{backgroundColor: bg, color: text, '--primary': primary} as React.CSSProperties}>
        
        {/* CRT Overlay Effects */}
        <div className="fixed inset-0 pointer-events-none z-50" style={{background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%'}}></div>
        <div className="fixed inset-0 pointer-events-none z-40 opacity-20" style={{backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, backgroundSize: '40px 40px'}}></div>
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 relative z-10">
             {data.sectionOrder.map(key => sectionComponents[key])}
             
             <footer className="py-12 text-center font-mono text-xs opacity-40">
                 System_ID: {data.name.replace(/\s/g, '_').toUpperCase()} // v.2.0.4
             </footer>
        </div>

        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syncopate:wght@400;700&display=swap');
            
            .font-mono { font-family: 'Share Tech Mono', monospace; }
            
            .animate-spin-slow {
                animation: spin 10s linear infinite;
            }
            
            .cyber-glitch {
                position: relative;
            }
            .cyber-glitch::before,
            .cyber-glitch::after {
                content: attr(data-text);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .cyber-glitch::before {
                left: 2px;
                text-shadow: -1px 0 red;
                clip: rect(24px, 550px, 90px, 0);
                animation: glitch-anim-2 3s infinite linear alternate-reverse;
            }
            .cyber-glitch::after {
                left: -2px;
                text-shadow: -1px 0 blue;
                clip: rect(85px, 550px, 140px, 0);
                animation: glitch-anim 2.5s infinite linear alternate-reverse;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes glitch-anim {
                0% { clip: rect(12px, 9999px, 31px, 0); }
                20% { clip: rect(84px, 9999px, 9px, 0); }
                40% { clip: rect(23px, 9999px, 99px, 0); }
                60% { clip: rect(66px, 9999px, 13px, 0); }
                80% { clip: rect(89px, 9999px, 63px, 0); }
                100% { clip: rect(5px, 9999px, 34px, 0); }
            }
            @keyframes glitch-anim-2 {
                0% { clip: rect(65px, 9999px, 100px, 0); }
                20% { clip: rect(23px, 9999px, 11px, 0); }
                40% { clip: rect(99px, 9999px, 57px, 0); }
                60% { clip: rect(46px, 9999px, 35px, 0); }
                80% { clip: rect(12px, 9999px, 4px, 0); }
                100% { clip: rect(78px, 9999px, 92px, 0); }
            }
        `}</style>
    </div>
  );
};

export default CyberTemplate;
