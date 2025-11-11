import React from 'react';
import { PortfolioData } from '../../types';
import { motion } from 'framer-motion';

interface TemplateProps {
  data: PortfolioData;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.1
    }
  })
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { themeSettings } = data;
  const isDarkMode = themeSettings.mode === 'dark';
  
  const fontClass = 
    themeSettings.fontPair.includes('poppins') ? 'font-poppins' :
    themeSettings.fontPair.includes('montserrat') ? 'font-montserrat' :
    themeSettings.fontPair.includes('inter') ? 'font-inter' :
    'font-roboto';

  const headingFontClass =
    themeSettings.fontPair.includes('orbitron') ? 'font-orbitron' :
    themeSettings.fontPair.includes('playfair') ? 'font-playfair' :
    themeSettings.fontPair.includes('lora') ? 'font-lora' :
    'font-roboto-mono';

  return (
    <div 
        className={`min-h-full ${fontClass} ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`} 
        style={{'--primary-color': themeSettings.primaryColor} as React.CSSProperties}>
        
        <div className="lg:flex">
            {/* Left/Top Section */}
            <div className={`lg:w-1/3 lg:h-screen lg:fixed lg:top-0 lg:left-0 p-8 md:p-12 flex flex-col justify-between ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                    <img 
                        src={data.avatarUrl} 
                        alt={data.name} 
                        className="w-24 h-24 rounded-full object-cover mb-6"
                    />
                    <h1 className={`${headingFontClass} text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data.name}</h1>
                    <p className="text-lg text-[var(--primary-color)] mt-1">{data.tagline}</p>
                    <p className={`mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{data.bio}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-6"
                >
                    {data.contactEmail && (
                        <div>
                            <h3 className={`text-sm uppercase font-semibold tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Contact</h3>
                             <a href={`mailto:${data.contactEmail}`} className={`mt-2 inline-block break-all ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-[var(--primary-color)] transition-colors`}>{data.contactEmail}</a>
                        </div>
                    )}
                    <div>
                      <h3 className={`text-sm uppercase font-semibold tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Connect</h3>
                       <div className="flex space-x-4 mt-2">
                          {data.socials.github && (
                            <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-[var(--primary-color)] transition-colors`}>GitHub</a>
                          )}
                          {data.socials.linkedin && (
                            <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-[var(--primary-color)] transition-colors`}>LinkedIn</a>
                          )}
                       </div>
                    </div>
                </motion.div>
            </div>

            {/* Right/Bottom Section */}
            <main className="lg:w-2/3 lg:ml-auto p-8 md:p-12 lg:p-20 space-y-16 relative">
                 <a href="#" className="lg:hidden absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full text-sm border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-black transition-colors z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Top</span>
                </a>
                 <motion.section id="skills" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                    <h2 className={`section-title ${headingFontClass}`}>Skills</h2>
                    <div className="flex flex-wrap gap-3">
                      {data.skills.map((skill) => (
                        <motion.span variants={itemVariants} key={skill} className={`px-4 py-2 rounded-md font-medium text-sm border-2 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                </motion.section>

                <motion.section id="projects" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                    <h2 className={`section-title ${headingFontClass}`}>Projects</h2>
                    <div className="space-y-8">
                      {data.projects.map(project => (
                        <motion.a variants={itemVariants} href={project.link} key={project.id} target="_blank" rel="noopener noreferrer" className="block group">
                           <div className="sm:flex items-start gap-6">
                               <div className="w-full sm:w-40 h-auto sm:h-24 flex-shrink-0 rounded-md overflow-hidden mb-4 sm:mb-0">
                                   <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                               </div>
                               <div>
                                   <h3 className={`text-lg font-bold group-hover:text-[var(--primary-color)] transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h3>
                                   <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
                               </div>
                           </div>
                        </motion.a>
                      ))}
                    </div>
                </motion.section>
                
                 <motion.section id="experience" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                    <h2 className={`section-title ${headingFontClass}`}>Experience</h2>
                    <div className="relative border-l-2 border-[var(--primary-color)]/30 pl-8 space-y-10">
                      {data.experience.map(exp => (
                        <motion.div variants={itemVariants} key={exp.id} className="relative">
                            <div className={`absolute -left-[42px] top-1 w-4 h-4 bg-[var(--primary-color)] rounded-full`}></div>
                            <p className="text-sm text-gray-500 mb-1">{exp.duration}</p>
                            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                            <p className="text-md font-semibold text-[var(--primary-color)]">{exp.company}</p>
                        </motion.div>
                      ))}
                    </div>
                </motion.section>
                
                <footer className={`text-center pt-10 mt-20 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
                    <p className="text-gray-500 text-sm">Designed with Portverse</p>
                </footer>
            </main>
        </div>

      <style>{`
        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .1em;
          color: var(--primary-color);
          margin-bottom: 2rem;
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

export default CreativeTemplate;