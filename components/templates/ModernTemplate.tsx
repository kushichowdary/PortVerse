import React from 'react';
import { PortfolioData, SectionKey } from '../../types';
import { motion, Variants } from 'framer-motion';

interface TemplateProps {
  data: PortfolioData;
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
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
            <h2 className={`section-title ${headingFontClass}`}>About Me</h2>
            <motion.p variants={itemVariants} className={`text-lg leading-relaxed font-medium`}>{data.bio}</motion.p>
        </motion.section>
    ),
    passion: <></>,
    skills: (
      <motion.section key="skills" id="skills" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <h2 className={`section-title ${headingFontClass}`}>Skills</h2>
        <div className="flex flex-wrap gap-3">
          {data.skills.map((skill) => (
            <motion.span variants={itemVariants} key={skill} className="skill-tag">
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.section>
    ),
    experience: (
      <motion.section key="experience" id="experience" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <h2 className={`section-title ${headingFontClass}`}>Experience</h2>
        <div className="relative border-l-2 pl-8 space-y-12 timeline">
          {data.experience.map(exp => (
            <motion.div variants={itemVariants} key={exp.id} className="relative">
              <div className="timeline-dot"></div>
              <p className="absolute -left-8 top-1 text-sm opacity-70 transform -rotate-90 origin-center tracking-wider font-bold">{exp.duration}</p>
              <h3 className={`text-xl font-bold ${headingFontClass}`}>{exp.role}</h3>
              <p className="text-md font-bold company-name">{exp.company}</p>
              <p className="mt-2 opacity-90">{exp.description}</p>
            </motion.div>
          ))}
          {data.experience.length === 0 && <p className="opacity-70">No experience added yet.</p>}
        </div>
      </motion.section>
    ),
    projects: (
      <motion.section key="projects" id="projects" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <h2 className={`section-title ${headingFontClass}`}>Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map(project => (
            <motion.a variants={itemVariants} href={project.link} key={project.id} target="_blank" rel="noopener noreferrer" 
               className="project-card block group"
               whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="overflow-hidden rounded-t-lg">
                <img src={project.imageUrl} alt={project.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${headingFontClass}`}>{project.name}</h3>
                <p className="text-sm opacity-90">{project.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
        {data.projects.length === 0 && <p className="opacity-70 text-center">No projects added yet.</p>}
      </motion.section>
    ),
    achievements: <></>,
    education: (
      <motion.section key="education" id="education" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <h2 className={`section-title ${headingFontClass}`}>Education</h2>
        <div className="space-y-6">
          {data.education.map(edu => (
            <motion.div variants={itemVariants} key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className={`text-xl font-bold ${headingFontClass}`}>{edu.institution}</h3>
                <p className="text-sm opacity-70 font-semibold">{edu.duration}</p>
              </div>
              <p className={`text-md font-medium`}>{edu.degree}</p>
            </motion.div>
          ))}
           {data.education.length === 0 && <p className="opacity-70">No education added yet.</p>}
        </div>
      </motion.section>
    ),
  };

  return (
    <div 
        className={`modern-template min-h-full p-6 md:p-12 lg:p-16 ${fontClass}`} 
        style={{
            '--primary-color': themeSettings.primaryColor,
            '--color-bg': isDarkMode ? '#111827' : '#ffffff', 
            '--color-text': isDarkMode ? '#d1d5db' : '#374151', 
            '--color-heading': isDarkMode ? '#ffffff' : '#111827',
            '--color-card-bg': isDarkMode ? '#1f2937' : '#f3f4f6', 
            '--color-border': isDarkMode ? '#374151' : '#e5e7eb',
        } as React.CSSProperties}>
      <div className="max-w-4xl mx-auto">
        <motion.header 
          className="text-center mb-20 md:mb-24"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <img 
            src={data.avatarUrl} 
            alt={data.name} 
            className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover mx-auto ring-4 ring-offset-4 ring-offset-[var(--color-bg)] ring-[var(--primary-color)]"
          />
          <h1 className={`${headingFontClass} text-4xl md:text-6xl font-extrabold mt-6`}>{data.name}</h1>
          <p className="text-xl md:text-2xl mt-2 font-medium" style={{color: themeSettings.primaryColor}}>{data.tagline}</p>
           <div className="flex justify-center items-center space-x-6 mt-6">
              {data.socials.github && (
                <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
              )}
              {data.socials.linkedin && (
                <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
              )}
           </div>
        </motion.header>

        <main className="space-y-20">
          {data.sectionOrder
            .filter(key => key !== 'passion' && key !== 'achievements')
            .map(sectionKey => sectionComponents[sectionKey])
          }

          {data.contactEmail && (
            <motion.section id="contact" className="text-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
              <h2 className={`section-title ${headingFontClass}`}>Get In Touch</h2>
              <p className="text-lg mb-8 max-w-xl mx-auto opacity-90 font-medium">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
              <motion.a href={`mailto:${data.contactEmail}`}
                 className="contact-btn"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
              >
                Say Hello
              </motion.a>
            </motion.section>
          )}
        </main>
        
        <footer className="text-center mt-24 pt-8 border-t-2 border-dashed border-[var(--color-border)]">
            <p className="opacity-60 text-sm">
                Designed with Portverse
            </p>
        </footer>
      </div>
      <style>{`
        .modern-template {
            background-color: var(--color-bg);
            color: var(--color-text);
        }
        .modern-template h1, 
        .modern-template h2, 
        .modern-template h3 {
            color: var(--color-heading);
        }
        .section-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 2rem;
          position: relative;
          display: inline-block;
        }
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 60%;
            height: 4px;
            background-color: var(--primary-color);
        }
        .skill-tag {
            background-color: var(--color-card-bg);
            border: 1px solid var(--color-border);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 600;
        }
        .timeline {
            border-color: var(--primary-color);
        }
        .timeline-dot {
            position: absolute;
            left: -2.25rem;
            top: 0.25rem;
            width: 1.25rem;
            height: 1.25rem;
            background-color: var(--color-bg);
            border: 3px solid var(--primary-color);
            border-radius: 9999px;
        }
        .company-name {
            color: var(--primary-color);
        }
        .project-card {
            background-color: var(--color-card-bg);
            border-radius: 0.75rem;
            border: 1px solid var(--color-border);
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
            transition: all 0.3s ease-in-out;
        }
        .project-card:hover {
            box-shadow: 0 10px 15px -3px hsla(from var(--primary-color) h s l / 0.1), 0 4px 6px -4px hsla(from var(--primary-color) h s l / 0.1);
            border-color: hsla(from var(--primary-color) h s l / 0.5);
        }
        .social-link {
            color: var(--color-text);
            font-weight: 600;
            text-decoration: none;
            position: relative;
            transition: color 0.3s;
        }
        .social-link:hover {
            color: var(--primary-color);
        }
        .social-link::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: -4px;
            left: 0;
            background-color: var(--primary-color);
            transform: scaleX(0);
            transform-origin: bottom right;
            transition: transform 0.3s ease-out;
        }
        .social-link:hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
        }
        .contact-btn {
            display: inline-block;
            background-color: var(--primary-color);
            color: ${isDarkMode ? '#000' : '#fff'};
            padding: 0.875rem 2.5rem;
            border-radius: 0.5rem;
            font-size: 1.125rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
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

export default ModernTemplate;