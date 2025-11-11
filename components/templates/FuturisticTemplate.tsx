import React from 'react';
import { PortfolioData, SectionKey } from '../../types';
import { motion } from 'framer-motion';

interface TemplateProps {
  data: PortfolioData;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
} as const;

const FuturisticTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { themeSettings } = data;
  const isDarkMode = themeSettings.mode === 'dark';

  const fontClass = 
    themeSettings.fontPair.includes('poppins') ? 'font-poppins' :
    themeSettings.fontPair.includes('montserrat') ? 'font-montserrat' :
    themeSettings.fontPair.includes('lora') ? 'font-lora' :
    'font-roboto';

  const headingFontClass =
    themeSettings.fontPair.includes('orbitron') ? 'font-orbitron' :
    themeSettings.fontPair.includes('playfair') ? 'font-playfair' :
    themeSettings.fontPair.includes('inter') ? 'font-inter' :
    'font-roboto-mono';

  const sectionComponents: Record<SectionKey, React.ReactNode> = {
    profile: (
        <motion.section key="profile" id="about" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h2 className={`section-title ${headingFontClass}`}>01 // PROFILE</h2>
            <p className={`leading-relaxed max-w-3xl mx-auto text-center glass-pane p-8 rounded-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{data.bio}</p>
        </motion.section>
    ),
    passion: (
        <motion.section key="passion" id="passion" className="relative text-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <div className={`p-8 glass-pane border-[var(--primary-color)]/30 rounded-2xl`}>
                <h3 className={`${headingFontClass} text-2xl mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Passion</h3>
                <p className="text-[var(--primary-color)] opacity-90 text-lg max-w-2xl mx-auto">{data.passion}</p>
            </div>
        </motion.section>
    ),
    skills: (
        <motion.section key="skills" id="skills" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h2 className={`section-title ${headingFontClass}`}>02 // ARSENAL</h2>
            <div className="flex flex-wrap justify-center gap-3">
                {data.skills.map((skill, i) => (
                    <motion.span 
                        key={skill} 
                        className={`px-4 py-2 border border-[var(--primary-color)]/30 text-[var(--primary-color)] rounded-full text-sm font-medium ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </motion.section>
    ),
    experience: (
        <motion.section key="experience" id="experience" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h2 className={`section-title ${headingFontClass}`}>03 // CHRONICLES</h2>
            <div className="relative border-l-2 border-[var(--primary-color)]/30 pl-8 space-y-12">
                {data.experience.map(exp => (
                    <div key={exp.id} className="relative">
                        <div className={`absolute -left-[40px] top-1 w-5 h-5 bg-[var(--primary-color)] rounded-full border-4 ${isDarkMode ? 'border-[#0A0A0A]' : 'border-gray-100'}`} style={{boxShadow: `0 0 15px ${themeSettings.primaryColor}80`}}></div>
                        <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.duration}</p>
                        <h3 className={`${headingFontClass} text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                        <p className="text-[var(--primary-color)] mb-2">{exp.company}</p>
                        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{exp.description}</p>
                    </div>
                ))}
                 {data.experience.length === 0 && <p className="text-gray-500">No experience added yet.</p>}
            </div>
        </motion.section>
    ),
    projects: (
        <motion.section key="projects" id="projects" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h2 className={`section-title ${headingFontClass}`}>04 // BLUEPRINTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.projects.map(project => (
                    <motion.a href={project.link} key={project.id} target="_blank" rel="noopener noreferrer" className="block group glass-pane rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--primary-color)] transform hover:-translate-y-2"
                        whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${themeSettings.primaryColor}40` }}
                    >
                        <img src={project.imageUrl} alt={project.name} className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="p-6">
                            <h3 className={`${headingFontClass} text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
                        </div>
                    </motion.a>
                ))}
            </div>
             {data.projects.length === 0 && <p className="text-center text-gray-500">No projects added yet.</p>}
        </motion.section>
    ),
    achievements: (
        <motion.section key="achievements" id="achievements" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
             <h2 className={`section-title ${headingFontClass}`}>05 // ACCOLADES</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.achievements.map(ach => (
                    <div key={ach.id} className="p-6 glass-pane rounded-lg">
                        <h3 className={`${headingFontClass} text-lg font-bold text-[var(--primary-color)]`}>{ach.title}</h3>
                        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{ach.description}</p>
                    </div>
                ))}
             </div>
             {data.achievements.length === 0 && <p className="text-center text-gray-500">No achievements added yet.</p>}
        </motion.section>
    ),
    education: (
         <motion.section key="education" id="education" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h2 className={`section-title ${headingFontClass}`}>06 // ORIGINS</h2>
            <div className="relative border-l-2 border-[var(--primary-color)]/30 pl-8 space-y-12">
                {data.education.map(edu => (
                    <div key={edu.id} className="relative">
                        <div className={`absolute -left-[40px] top-1 w-5 h-5 bg-[var(--primary-color)] rounded-full border-4 ${isDarkMode ? 'border-[#0A0A0A]' : 'border-gray-100'}`} style={{boxShadow: `0 0 15px ${themeSettings.primaryColor}80`}}></div>
                        <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{edu.duration}</p>
                        <h3 className={`${headingFontClass} text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{edu.institution}</h3>
                        <p className="text-[var(--primary-color)]">{edu.degree}</p>
                    </div>
                ))}
                 {data.education.length === 0 && <p className="text-gray-500">No education added yet.</p>}
            </div>
        </motion.section>
    )
  };

  return (
    <div 
      className={`min-h-full p-8 md:p-12 lg:p-16 ${fontClass} ${isDarkMode ? 'bg-[#0A0A0A] text-gray-200' : 'bg-gray-100 text-gray-800'}`} 
      style={{'--primary-color': themeSettings.primaryColor} as React.CSSProperties}
    >
      <div 
        className="absolute top-0 left-0 w-full h-full" 
        style={{background: `radial-gradient(circle at top left, ${themeSettings.primaryColor}1A, transparent 30%), radial-gradient(circle at bottom right, ${themeSettings.primaryColor}1A, transparent 30%)`}}
      ></div>

      <motion.header 
        className="relative flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8 mb-20 md:mb-32"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img 
            src={data.avatarUrl} 
            alt={data.name} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[var(--primary-color)]/50 shadow-lg"
            style={{boxShadow: `0 0 25px ${themeSettings.primaryColor}33`}}
            whileHover={{ scale: 1.05, rotate: 2 }}
        />
        <div>
            <h1 className={`${headingFontClass} text-4xl md:text-6xl font-black uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data.name}</h1>
            <p className="text-lg md:text-xl text-[var(--primary-color)]">{data.tagline}</p>
        </div>
      </motion.header>

      <main className="max-w-5xl mx-auto space-y-20 md:space-y-28">
        {data.sectionOrder.map(sectionKey => sectionComponents[sectionKey])}

        {data.contactEmail && (
            <motion.section id="contact" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
                <h2 className={`section-title ${headingFontClass}`}>07 // CONNECT</h2>
                <div className="text-center max-w-md mx-auto">
                    <p className="mb-6 text-lg">I'm currently available for freelance work and open to discussing new projects. Let's create something amazing together.</p>
                    <a href={`mailto:${data.contactEmail}`}
                       className="inline-block px-8 py-4 bg-[var(--primary-color)]/20 border-2 border-[var(--primary-color)] text-[var(--primary-color)] font-bold font-orbitron text-lg uppercase rounded-lg backdrop-blur-sm
                     hover:bg-[var(--primary-color)] hover:text-black hover:shadow-[0_0_20px_var(--primary-color)]
                     transition-all duration-300 ease-in-out transform hover:scale-105">
                        Get In Touch
                    </a>
                </div>
            </motion.section>
        )}
        
        <footer className={`text-center pt-12 ${isDarkMode ? 'border-t border-gray-800' : 'border-t border-gray-200'}`}>
            <p className="text-gray-500">Designed with Portverse</p>
             <div className="flex justify-center space-x-6 mt-4">
                {data.socials.github && (
                  <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-[var(--primary-color)] transition-colors`}>GitHub</a>
                )}
                {data.socials.linkedin && (
                  <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-[var(--primary-color)] transition-colors`}>LinkedIn</a>
                )}
             </div>
        </footer>
      </main>
      <style>{`
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary-color);
          margin-bottom: 2.5rem;
        }
        .glass-pane {
            background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)'};
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-lora { font-family: 'Lora', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-roboto-mono { font-family: 'Roboto Mono', monospace; }
        .font-roboto { font-family: 'Roboto', sans-serif; }
      `}</style>
    </div>
  );
};

export default FuturisticTemplate;