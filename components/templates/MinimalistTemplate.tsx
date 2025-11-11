import React from 'react';
import { PortfolioData, SectionKey } from '../../types';
import { motion } from 'framer-motion';

interface TemplateProps {
  data: PortfolioData;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
} as const;

const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        <h2 className={`section-title ${headingFontClass} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About Me</h2>
        <p className={`leading-relaxed text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{data.bio}</p>
      </motion.section>
    ),
    passion: <></>, // Not typically in minimalist designs, can be added if desired
    skills: (
      <motion.section key="skills" id="skills" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
        <h2 className={`section-title ${headingFontClass} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills</h2>
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {data.skills.map((skill) => (
            <span key={skill} className={`px-3 py-1 rounded-md font-medium ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
              {skill}
            </span>
          ))}
        </div>
      </motion.section>
    ),
    experience: (
      <motion.section key="experience" id="experience" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
        <h2 className={`section-title ${headingFontClass} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Experience</h2>
        <div className="space-y-8">
          {data.experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{exp.duration}</p>
              </div>
              <p className="text-md text-[var(--primary-color)] font-semibold">{exp.company}</p>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.description}</p>
            </div>
          ))}
          {data.experience.length === 0 && <p className="text-gray-500">No experience added yet.</p>}
        </div>
      </motion.section>
    ),
    projects: (
      <motion.section key="projects" id="projects" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
        <h2 className={`section-title ${headingFontClass} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map(project => (
            <a href={project.link} key={project.id} target="_blank" rel="noopener noreferrer" 
               className={`block group border rounded-lg overflow-hidden transition-all hover:shadow-xl hover:border-[var(--primary-color)] ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200'}`}>
              <img src={project.imageUrl} alt={project.name} className="w-full h-52 object-cover" />
              <div className="p-5">
                <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
              </div>
            </a>
          ))}
        </div>
        {data.projects.length === 0 && <p className="text-gray-500">No projects added yet.</p>}
      </motion.section>
    ),
    achievements: <></>, // Can be added if desired
    education: (
      <motion.section key="education" id="education" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
        <h2 className={`section-title ${headingFontClass} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Education</h2>
        <div className="space-y-6">
          {data.education.map(edu => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{edu.institution}</h3>
                <p className="text-sm text-gray-500">{edu.duration}</p>
              </div>
              <p className={`text-md ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{edu.degree}</p>
            </div>
          ))}
           {data.education.length === 0 && <p className="text-gray-500">No education added yet.</p>}
        </div>
      </motion.section>
    ),
  };

  return (
    <div 
        className={`min-h-full p-8 md:p-16 lg:p-24 ${fontClass} ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-800'}`} 
        style={{'--primary-color': themeSettings.primaryColor} as React.CSSProperties}>
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center gap-8 mb-16">
          <img 
            src={data.avatarUrl} 
            alt={data.name} 
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-offset-4"
            style={{'--tw-ring-color': themeSettings.primaryColor, '--tw-ring-offset-color': isDarkMode ? '#111827' : '#fff'} as React.CSSProperties}
          />
          <div className="text-center sm:text-left">
            <h1 className={`${headingFontClass} text-4xl sm:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data.name}</h1>
            <p className="text-xl text-[var(--primary-color)] mt-1">{data.tagline}</p>
             <div className="flex justify-center sm:justify-start items-center space-x-4 mt-4 text-gray-500">
                {data.socials.github && (
                  <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary-color)] transition-colors">GitHub</a>
                )}
                {data.socials.github && data.socials.linkedin && <span>&bull;</span>}
                {data.socials.linkedin && (
                  <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary-color)] transition-colors">LinkedIn</a>
                )}
             </div>
          </div>
        </header>

        <main className="space-y-16">
          {data.sectionOrder
            .filter(key => key !== 'passion' && key !== 'achievements') // Filter out sections not used in this template
            .map(sectionKey => sectionComponents[sectionKey])
          }

          {data.contactEmail && (
            <motion.section id="contact" className="text-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
              <h2 className={`section-title ${headingFontClass} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Get In Touch</h2>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Have a question or want to work together?
              </p>
              <a href={`mailto:${data.contactEmail}`}
                 className={`inline-block px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                 style={{border: `2px solid ${themeSettings.primaryColor}`}}
              >
                Say Hello
              </a>
            </motion.section>
          )}
        </main>
        
        <footer className={`text-center mt-20 pt-8 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
            <p className="text-gray-500">Designed with Portverse</p>
        </footer>
      </div>
      <style>{`
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--primary-color);
          display: inline-block;
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

export default MinimalistTemplate;