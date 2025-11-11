import React from 'react';
import { PortfolioData } from '../../types';
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
};

const FuturisticTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-[#0A0A0A] text-gray-200 min-h-full font-sans p-8 md:p-12 lg:p-16">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(0,191,255,0.1),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(0,191,255,0.1),_transparent_30%)]"></div>

      <motion.header 
        className="relative flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8 mb-20 md:mb-32"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img 
            src={data.avatarUrl} 
            alt={data.name} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-cyan-400/50 shadow-lg shadow-cyan-500/20"
            whileHover={{ scale: 1.05, rotate: 2 }}
        />
        <div>
            <h1 className="font-orbitron text-4xl md:text-6xl font-black uppercase text-white tracking-wider mb-2">{data.name}</h1>
            <p className="text-lg md:text-xl text-cyan-400">{data.tagline}</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-20 md:space-y-28">
        <motion.section id="about" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h2 className="section-title">01 // PROFILE</h2>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-center glass-pane p-8 rounded-2xl">{data.bio}</p>
        </motion.section>

        <motion.section id="passion" className="relative text-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <div className="p-8 glass-pane border-cyan-500/30 rounded-2xl">
                <h3 className="font-orbitron text-2xl text-white mb-4">My Passion</h3>
                <p className="text-cyan-300 text-lg max-w-2xl mx-auto">{data.passion}</p>
            </div>
        </motion.section>

        <motion.section id="skills" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h2 className="section-title">02 // ARSENAL</h2>
            <div className="flex flex-wrap justify-center gap-3">
                {data.skills.map((skill, i) => (
                    <motion.span 
                        key={skill} 
                        className="px-4 py-2 bg-gray-800/50 border border-cyan-500/30 text-cyan-300 rounded-full text-sm font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </motion.section>

        <motion.section id="experience" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h2 className="section-title">03 // CHRONICLES</h2>
            <div className="relative border-l-2 border-cyan-500/30 pl-8 space-y-12">
                {data.experience.map(exp => (
                    <div key={exp.id} className="relative">
                        <div className="absolute -left-[40px] top-1 w-5 h-5 bg-cyan-400 rounded-full border-4 border-[#0A0A0A] shadow-md shadow-cyan-500/50"></div>
                        <p className="text-sm text-gray-400 mb-1">{exp.duration}</p>
                        <h3 className="font-orbitron text-xl font-bold text-white">{exp.role}</h3>
                        <p className="text-blue-400 mb-2">{exp.company}</p>
                        <p className="text-gray-300">{exp.description}</p>
                    </div>
                ))}
            </div>
        </motion.section>

        <motion.section id="projects" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h2 className="section-title">04 // BLUEPRINTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.projects.map(project => (
                    <motion.a href={project.link} key={project.id} target="_blank" rel="noopener noreferrer" className="block group glass-pane rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_theme(colors.cyan.700)] hover:border-cyan-400 transform hover:-translate-y-2"
                        whileHover={{ scale: 1.03 }}
                    >
                        <img src={project.imageUrl} alt={project.name} className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="p-6">
                            <h3 className="font-orbitron text-xl font-bold text-white mb-2">{project.name}</h3>
                            <p className="text-gray-300 text-sm">{project.description}</p>
                        </div>
                    </motion.a>
                ))}
            </div>
        </motion.section>
        
        <motion.section id="achievements" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
             <h2 className="section-title">05 // ACCOLADES</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.achievements.map(ach => (
                    <div key={ach.id} className="p-6 glass-pane rounded-lg">
                        <h3 className="font-orbitron text-lg font-bold text-cyan-400">{ach.title}</h3>
                        <p className="text-gray-400 mt-1">{ach.description}</p>
                    </div>
                ))}
             </div>
        </motion.section>

         <motion.section id="education" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h2 className="section-title">06 // ORIGINS</h2>
            <div className="relative border-l-2 border-cyan-500/30 pl-8 space-y-12">
                {data.education.map(edu => (
                    <div key={edu.id} className="relative">
                        <div className="absolute -left-[40px] top-1 w-5 h-5 bg-cyan-400 rounded-full border-4 border-[#0A0A0A] shadow-md shadow-cyan-500/50"></div>
                        <p className="text-sm text-gray-400 mb-1">{edu.duration}</p>
                        <h3 className="font-orbitron text-xl font-bold text-white">{edu.institution}</h3>
                        <p className="text-blue-400">{edu.degree}</p>
                    </div>
                ))}
            </div>
        </motion.section>
        
        <footer className="text-center pt-12 border-t border-gray-800">
            <p className="text-gray-500">Designed with PortaVerse</p>
             <div className="flex justify-center space-x-6 mt-4">
                <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">GitHub</a>
                <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
             </div>
        </footer>
      </main>
      <style>{`
        .section-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #22d3ee; /* cyan-400 */
          margin-bottom: 2.5rem;
        }
      `}</style>
    </div>
  );
};

export default FuturisticTemplate;
