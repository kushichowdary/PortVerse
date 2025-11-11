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
      duration: 0.6,
      ease: [0.6, 0.01, 0.05, 0.95]
    }
  }
} as const;

const NeobrutalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { themeSettings } = data;
  const isDarkMode = themeSettings.mode === 'dark';
  
  const fontClass = 
    themeSettings.fontPair.includes('poppins') ? 'font-poppins' :
    themeSettings.fontPair.includes('montserrat') ? 'font-montserrat' :
    themeSettings.fontPair.includes('lora') ? 'font-lora' :
    themeSettings.fontPair.includes('inter') ? 'font-inter' :
    'font-roboto';

  const headingFontClass =
    themeSettings.fontPair.includes('orbitron') ? 'font-orbitron' :
    themeSettings.fontPair.includes('playfair') ? 'font-playfair' :
    themeSettings.fontPair.includes('space-grotesk') ? 'font-space-grotesk' :
    themeSettings.fontPair.includes('roboto-mono') ? 'font-roboto-mono' :
    'font-inter';

  const sectionComponents: Record<SectionKey, React.ReactNode> = {
    profile: (
      <motion.section key="profile" id="about" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <div className="brutalist-card">
            <h2 className={`section-title ${headingFontClass}`}>Profile</h2>
            <p className="leading-relaxed">{data.bio}</p>
        </div>
      </motion.section>
    ),
    passion: (
        <motion.section key="passion" id="passion" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <div className="brutalist-card text-center">
                <h2 className={`section-title ${headingFontClass}`}>Passion</h2>
                <p className="text-lg font-medium" style={{color: themeSettings.primaryColor}}>{data.passion}</p>
            </div>
        </motion.section>
    ),
    skills: (
      <motion.section key="skills" id="skills" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <div className="brutalist-card">
            <h2 className={`section-title ${headingFontClass}`}>Skills</h2>
            <div className="flex flex-wrap gap-3">
            {data.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                {skill}
                </span>
            ))}
            </div>
        </div>
      </motion.section>
    ),
    experience: (
      <motion.section key="experience" id="experience" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <div className="brutalist-card">
            <h2 className={`section-title ${headingFontClass}`}>Experience</h2>
            <div className="space-y-6">
            {data.experience.map(exp => (
                <div key={exp.id} className="exp-item">
                <h3 className={`text-xl font-bold ${headingFontClass}`}>{exp.role}</h3>
                <p className="text-md font-semibold" style={{color: themeSettings.primaryColor}}>{exp.company}</p>
                <p className="text-sm uppercase font-semibold tracking-wider opacity-70 my-1">{exp.duration}</p>
                <p>{exp.description}</p>
                </div>
            ))}
            {data.experience.length === 0 && <p className="opacity-70">No experience added yet.</p>}
            </div>
        </div>
      </motion.section>
    ),
    projects: (
      <motion.section key="projects" id="projects" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <div className="brutalist-card">
            <h2 className={`section-title ${headingFontClass}`}>Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map(project => (
                <a href={project.link} key={project.id} target="_blank" rel="noopener noreferrer" 
                className="project-card block group">
                    <img src={project.imageUrl} alt={project.name} className="w-full h-52 object-cover border-b-2" style={{borderColor: isDarkMode ? 'var(--color-text-main)' : 'var(--color-text-main)'}} />
                    <div className="p-4">
                        <h3 className={`text-lg font-bold mb-1 ${headingFontClass}`}>{project.name}</h3>
                        <p className="text-sm">{project.description}</p>
                    </div>
                </a>
            ))}
            </div>
            {data.projects.length === 0 && <p className="opacity-70">No projects added yet.</p>}
        </div>
      </motion.section>
    ),
    achievements: (
        <motion.section key="achievements" id="achievements" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <div className="brutalist-card">
              <h2 className={`section-title ${headingFontClass}`}>Achievements</h2>
              <div className="space-y-4">
              {data.achievements.map(ach => (
                  <div key={ach.id}>
                    <h3 className={`font-bold text-lg ${headingFontClass}`}>{ach.title}</h3>
                    <p>{ach.description}</p>
                  </div>
              ))}
              </div>
              {data.achievements.length === 0 && <p className="opacity-70">No achievements added yet.</p>}
          </div>
        </motion.section>
    ),
    education: (
      <motion.section key="education" id="education" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <div className="brutalist-card">
            <h2 className={`section-title ${headingFontClass}`}>Education</h2>
            <div className="space-y-4">
            {data.education.map(edu => (
                <div key={edu.id}>
                    <h3 className={`text-xl font-bold ${headingFontClass}`}>{edu.institution}</h3>
                    <p className="text-md font-semibold">{edu.degree}</p>
                    <p className="text-sm uppercase font-semibold tracking-wider opacity-70">{edu.duration}</p>
                </div>
            ))}
            {data.education.length === 0 && <p className="opacity-70">No education added yet.</p>}
            </div>
        </div>
      </motion.section>
    ),
  };

  return (
    <div 
        className={`min-h-full p-4 md:p-8 lg:p-12 ${fontClass}`} 
        style={{
            '--primary-color': themeSettings.primaryColor,
            '--color-bg-main': isDarkMode ? '#1a1a1a' : '#f0f0f0',
            '--color-text-main': isDarkMode ? '#e0e0e0' : '#1a1a1a',
            '--color-card-bg': isDarkMode ? '#111111' : '#ffffff',
        } as React.CSSProperties}>
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center gap-6 mb-12">
          <img 
            src={data.avatarUrl} 
            alt={data.name} 
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover avatar-brutalist"
          />
          <div className="text-center sm:text-left">
            <h1 className={`${headingFontClass} text-4xl sm:text-6xl font-bold`}>{data.name}</h1>
            <p className="text-xl font-medium" style={{color: themeSettings.primaryColor}}>{data.tagline}</p>
          </div>
        </header>

        <main className="space-y-10">
          {data.sectionOrder
            .map(sectionKey => sectionComponents[sectionKey])
          }

          {data.contactEmail && (
            <motion.section id="contact" className="text-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
              <div className="brutalist-card">
                <h2 className={`section-title ${headingFontClass}`}>Get In Touch</h2>
                <p className="mb-6">
                    Have a project in mind or just want to say hi?
                </p>
                <a href={`mailto:${data.contactEmail}`}
                    className="contact-btn inline-block font-bold text-lg">
                    Send an Email
                </a>
              </div>
            </motion.section>
          )}
        </main>
        
        <footer className="text-center mt-12 pt-8 border-t-2" style={{borderColor: 'var(--color-text-main)'}}>
            <p className="opacity-70">Designed with Portverse</p>
             <div className="flex justify-center space-x-4 mt-2">
                {data.socials.github && (
                  <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-[var(--primary-color)] transition-colors">GitHub</a>
                )}
                {data.socials.linkedin && (
                  <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-[var(--primary-color)] transition-colors">LinkedIn</a>
                )}
             </div>
        </footer>
      </div>
      <style>{`
        body {
            background-color: var(--color-bg-main);
            color: var(--color-text-main);
        }
        .section-title {
          font-size: 1.125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .05em;
          margin-bottom: 1.5rem;
          display: inline-block;
        }
        .avatar-brutalist {
            border: 3px solid var(--color-text-main);
            box-shadow: 6px 6px 0px var(--color-text-main);
        }
        .brutalist-card {
            background-color: var(--color-card-bg);
            border: 3px solid var(--color-text-main);
            box-shadow: 8px 8px 0px var(--primary-color);
            padding: 1.5rem 2rem;
            transition: box-shadow 0.2s ease-in-out;
        }
        .brutalist-card:hover {
            box-shadow: 10px 10px 0px var(--primary-color);
        }
        .skill-tag {
            background-color: var(--color-card-bg);
            border: 2px solid var(--color-text-main);
            padding: 0.25rem 0.75rem;
            font-weight: 500;
        }
        .project-card {
            background-color: var(--color-card-bg);
            border: 3px solid var(--color-text-main);
            box-shadow: 6px 6px 0px var(--color-text-main);
            transition: all 0.2s ease-in-out;
        }
        .project-card:hover {
            box-shadow: 8px 8px 0px var(--primary-color);
            transform: translate(-2px, -2px);
            border-color: var(--primary-color);
        }
        .contact-btn {
            background-color: var(--primary-color);
            color: ${isDarkMode ? '#000' : '#fff'};
            padding: 0.75rem 1.5rem;
            border: 3px solid var(--color-text-main);
            box-shadow: 6px 6px 0px var(--color-text-main);
            transition: all 0.2s ease-in-out;
        }
        .contact-btn:hover {
            box-shadow: 8px 8px 0px var(--color-text-main);
            transform: translate(-2px, -2px);
        }
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-lora { font-family: 'Lora', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-roboto-mono { font-family: 'Roboto Mono', monospace; }
        .font-roboto { font-family: 'Roboto', sans-serif; }
        .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
    </div>
  );
};

export default NeobrutalistTemplate;