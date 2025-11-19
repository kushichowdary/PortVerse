
import React, { useState, useRef, useEffect } from 'react';
import { BuilderSection } from '../../types';
import PersonalSection from './PersonalSection';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectsSection';
import AchievementsSection from './AchievementsSection';
import ThemeSection from './ThemeSection';
import ContactSection from './ContactSection';
import LayoutSection from './LayoutSection';
import { motion, AnimatePresence } from 'framer-motion';

const BuilderSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<BuilderSection>(BuilderSection.PERSONAL);
  
  // Render the specific section
  const renderSection = () => {
    switch (activeSection) {
      case BuilderSection.PERSONAL: return <PersonalSection />;
      case BuilderSection.SKILLS: return <SkillsSection />;
      case BuilderSection.CONTACT: return <ContactSection />;
      case BuilderSection.EXPERIENCE: return <ExperienceSection />;
      case BuilderSection.EDUCATION: return <EducationSection />;
      case BuilderSection.PROJECTS: return <ProjectsSection />;
      case BuilderSection.ACHIEVEMENTS: return <AchievementsSection />;
      case BuilderSection.THEME: return <ThemeSection />;
      case BuilderSection.LAYOUT: return <LayoutSection />;
      default: return <div className="p-4 text-slate-500">Select a section</div>;
    }
  };

  return (
    <div className="text-slate-200 h-full flex flex-col">
      {/* Header Area */}
      <div className="flex items-center justify-between p-6 pb-2 flex-shrink-0">
          <div className="flex items-center gap-3">
             <motion.div 
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                animate={{ boxShadow: ["0 0 15px rgba(124,58,237,0.3)", "0 0 25px rgba(124,58,237,0.6)", "0 0 15px rgba(124,58,237,0.3)"] }}
                transition={{ duration: 3, repeat: Infinity }}
             >
                <span className="font-orbitron font-bold text-white text-lg">P</span>
             </motion.div>
             <div>
                <h2 className="font-inter text-lg font-bold text-white tracking-tight">Portverse</h2>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Editor Online</span>
                </div>
             </div>
          </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 pt-2 flex-shrink-0 relative group">
        <div className="relative flex items-center">
            <div className="sidebar-tabs border-b border-white/5 flex-grow pr-6">
            {Object.values(BuilderSection).map((section) => (
                <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`sidebar-tab ${activeSection === section ? 'active' : ''}`}
                >
                {activeSection === section && (
                    <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="relative z-10">{section}</span>
                </button>
            ))}
            </div>
            {/* Scroll Indicator Arrow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full bg-gradient-to-l from-[#0f172a] to-transparent pl-6 pointer-events-none flex items-center justify-end">
                <motion.div 
                    className="text-violet-400 opacity-70"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </motion.div>
            </div>
        </div>
      </div>

      {/* Content Area - Smooth transitions */}
      <div className="flex-grow overflow-y-auto px-6 py-4 custom-scrollbar relative">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="min-h-full"
            >
                {renderSection()}
                
                {/* Footer */}
                <div className="mt-12 pb-6 text-center border-t border-dashed border-slate-800 pt-6">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-3">
                        Built by <motion.span 
                            className="text-violet-400 font-bold cursor-pointer inline-block"
                            whileHover={{ 
                                scale: 1.1, 
                                textShadow: "0 0 8px rgba(167, 139, 250, 0.8)",
                                color: "#ddd6fe"
                            }}
                        >Kushwanth</motion.span>
                    </p>
                    <div className="flex justify-center gap-4">
                         <motion.a 
                            href="https://github.com/kushichowdary" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-white transition-colors"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            title="GitHub"
                         >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                         </motion.a>
                         <motion.a 
                            href="https://linkedin.com/in/kushichowdary" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-blue-400 transition-colors"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            title="LinkedIn"
                         >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                            </svg>
                         </motion.a>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BuilderSidebar;
