
import React from 'react';
import { PortfolioData, SectionKey } from '../../types';
import { motion, Variants } from 'framer-motion';

interface TemplateProps {
  data: PortfolioData;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const ElegantTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { themeSettings } = data;
  const isDarkMode = themeSettings.mode === 'dark';

  // Setup Fonts
  let fontImport = <></>;
  let headingFamily = 'serif';
  let bodyFamily = 'sans-serif';

  if (themeSettings.fontPair.includes('italiana')) {
     headingFamily = "'Italiana', serif";
     bodyFamily = "'Montserrat', sans-serif";
     fontImport = (
         <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Montserrat:wght@300;400&display=swap');
            .font-heading { font-family: ${headingFamily}; }
            .font-body { font-family: ${bodyFamily}; }
         `}</style>
     );
  } else {
      // Use mapped classes from index.html if not Italiana specific override needed
      // But we want to ensure specificity for this template
       fontImport = (
         <style>{`
            .font-heading { font-family: inherit; }
            .font-body { font-family: inherit; }
         `}</style>
     );
  }

  // Fallback logic for other new fonts if selected in Elegant template
  const containerFontClass = 
    themeSettings.fontPair.includes('quicksand') ? 'font-quicksand' :
    themeSettings.fontPair.includes('exo') ? 'font-exo' :
    themeSettings.fontPair.includes('montserrat') ? 'font-montserrat' :
    themeSettings.fontPair.includes('roboto') ? 'font-roboto' :
    themeSettings.fontPair.includes('dm') ? 'font-dm' :
    themeSettings.fontPair.includes('inter') ? 'font-inter' :
    '';

  const headingFontClass = 
    themeSettings.fontPair.includes('oswald') ? 'font-oswald' :
    themeSettings.fontPair.includes('syncopate') ? 'font-syncopate' :
    themeSettings.fontPair.includes('italiana') ? 'font-italiana' :
    themeSettings.fontPair.includes('archivo') ? 'font-archivo' :
    themeSettings.fontPair.includes('space') ? 'font-space' :
    themeSettings.fontPair.includes('syne') ? 'font-syne' :
    '';

  const bg = isDarkMode ? '#121212' : '#FAFAFA';
  const text = isDarkMode ? '#E0E0E0' : '#000000'; // Pure black for text in light mode
  const muted = isDarkMode ? '#A0A0A0' : '#404040'; // Darker gray for muted text in light mode
  const border = isDarkMode ? '#333333' : '#D4D4D4'; // Darker border in light mode
  const accent = themeSettings.primaryColor;

  const sectionComponents: Record<SectionKey, React.ReactNode> = {
    profile: (
      <motion.section key="profile" id="about" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
         <p className="text-xl md:text-2xl leading-relaxed font-light font-body max-w-4xl" style={{ opacity: isDarkMode ? 0.9 : 1 }}>
            {data.bio}
         </p>
      </motion.section>
    ),
    passion: (
      <motion.section key="passion" id="passion" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-12 border-t border-b" style={{borderColor: border}}>
          <h3 className="text-sm uppercase tracking-widest mb-6 font-body" style={{color: accent}}>Passion</h3>
          <p className="text-2xl md:text-3xl font-heading italic leading-tight">"{data.passion}"</p>
      </motion.section>
    ),
    skills: (
      <motion.section key="skills" id="skills" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h3 className="text-sm uppercase tracking-widest mb-8 font-body" style={{color: muted}}>Expertise</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 font-body">
          {data.skills.map((skill, i) => (
            <div key={skill} className="border-t pt-2" style={{borderColor: border}}>
               {skill}
            </div>
          ))}
        </div>
      </motion.section>
    ),
    experience: (
      <motion.section key="experience" id="experience" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="flex items-baseline justify-between mb-12">
             <h2 className={`text-4xl md:text-5xl font-heading ${headingFontClass}`}>Career</h2>
        </div>
        <div className="space-y-16">
          {data.experience.map((exp) => (
            <div key={exp.id} className="grid md:grid-cols-12 gap-6">
               <div className="md:col-span-3 font-body text-sm tracking-wider uppercase pt-2" style={{color: muted}}>
                   {exp.duration}
               </div>
               <div className="md:col-span-9">
                   <h3 className={`text-2xl font-heading mb-1 ${headingFontClass}`}>{exp.role}</h3>
                   <p className="text-lg mb-4 font-body" style={{color: accent}}>{exp.company}</p>
                   <p className="font-body font-light leading-relaxed" style={{ opacity: isDarkMode ? 0.8 : 1 }}>{exp.description}</p>
               </div>
            </div>
          ))}
          {data.experience.length === 0 && <p className="opacity-50 italic">No experience listed.</p>}
        </div>
      </motion.section>
    ),
    projects: (
       <motion.section key="projects" id="projects" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
         <h2 className={`text-4xl md:text-5xl font-heading mb-12 ${headingFontClass}`}>Selected Works</h2>
         <div className="grid md:grid-cols-2 gap-12">
             {data.projects.map((proj) => (
                 <a href={proj.link} key={proj.id} target="_blank" rel="noopener noreferrer" className="group block">
                     <div className="overflow-hidden mb-6 aspect-[4/3]">
                         <img src={proj.imageUrl} alt={proj.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale hover:grayscale-0" />
                     </div>
                     <h3 className={`text-2xl font-heading mb-2 group-hover:underline decoration-1 underline-offset-4 ${headingFontClass}`}>{proj.name}</h3>
                     <p className="font-body font-light" style={{color: muted}}>{proj.description}</p>
                 </a>
             ))}
         </div>
          {data.projects.length === 0 && <p className="opacity-50 italic">No projects listed.</p>}
       </motion.section>
    ),
    achievements: (
      <motion.section key="achievements" id="achievements" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h3 className="text-sm uppercase tracking-widest mb-8 font-body" style={{color: muted}}>Recognition</h3>
         <div className="grid md:grid-cols-2 gap-8">
             {data.achievements.map((ach) => (
                 <div key={ach.id} className="border p-8" style={{borderColor: border}}>
                     <h4 className={`text-lg font-heading mb-2 ${headingFontClass}`} style={{color: accent}}>{ach.title}</h4>
                     <p className="font-body font-light text-sm" style={{ opacity: isDarkMode ? 0.8 : 1 }}>{ach.description}</p>
                 </div>
             ))}
         </div>
      </motion.section>
    ),
    education: (
      <motion.section key="education" id="education" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="grid md:grid-cols-12 gap-6 border-t pt-8" style={{borderColor: border}}>
             <div className="md:col-span-3">
                 <h3 className="text-sm uppercase tracking-widest font-body" style={{color: muted}}>Education</h3>
             </div>
             <div className="md:col-span-9 space-y-8">
                 {data.education.map(edu => (
                     <div key={edu.id} className="flex justify-between items-start">
                         <div>
                             <h4 className={`text-xl font-heading ${headingFontClass}`}>{edu.institution}</h4>
                             <p className="font-body font-light">{edu.degree}</p>
                         </div>
                         <span className="font-body text-sm" style={{color: muted}}>{edu.duration}</span>
                     </div>
                 ))}
             </div>
          </div>
      </motion.section>
    )
  };

  return (
    <div 
        className={`min-h-full w-full ${containerFontClass}`}
        style={{ backgroundColor: bg, color: text }}
    >
      {fontImport}
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
         <header className="mb-24 md:mb-32">
             <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                 <div>
                     <h1 className={`text-5xl md:text-7xl lg:text-8xl font-heading font-normal tracking-tight leading-none mb-6 ${headingFontClass}`}>
                         {data.name}
                     </h1>
                     <p className="text-xl md:text-2xl font-body font-light" style={{color: accent}}>
                         {data.tagline}
                     </p>
                 </div>
                 <div className="flex flex-col items-end gap-2">
                     {data.socials.linkedin && <a href={data.socials.linkedin} className="text-sm font-body uppercase tracking-widest hover:underline">LinkedIn</a>}
                     {data.socials.github && <a href={data.socials.github} className="text-sm font-body uppercase tracking-widest hover:underline">GitHub</a>}
                     {data.socials.twitter && <a href={data.socials.twitter} className="text-sm font-body uppercase tracking-widest hover:underline">Twitter</a>}
                 </div>
             </div>
         </header>

         <main className="space-y-24 md:space-y-32">
            {data.sectionOrder.map(key => sectionComponents[key])}
            
            {data.contactEmail && (
                <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-20 text-center">
                    <h2 className={`text-3xl md:text-5xl font-heading mb-8 ${headingFontClass}`}>Let's create something timeless.</h2>
                    <a href={`mailto:${data.contactEmail}`} className="inline-block border-b pb-1 text-xl font-body hover:text-[var(--accent)] transition-colors" style={{borderColor: text, '--accent': accent} as React.CSSProperties}>
                        {data.contactEmail}
                    </a>
                </motion.section>
            )}
         </main>

         <footer className="mt-32 pt-8 border-t flex justify-between items-center font-body text-xs uppercase tracking-widest" style={{borderColor: border, color: muted}}>
             <span>&copy; {new Date().getFullYear()} {data.name}</span>
             <span>Created with Portverse</span>
         </footer>
      </div>
    </div>
  );
};

export default ElegantTemplate;
