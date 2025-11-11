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
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeTab = tabsRef.current.find(tab => tab?.textContent === activeSection);
    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth
      });
    }
  }, [activeSection]);


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
      default: return <p>Select a section to edit.</p>;
    }
  };

  return (
    <div className="text-gray-200 h-full flex flex-col">
      <h2 className="font-orbitron text-2xl font-bold text-white mb-6 flex-shrink-0">Portfolio Editor</h2>
      {/* FIX: Cast style object to React.CSSProperties to allow custom CSS properties. */}
      <div className="relative overflow-x-auto flex-shrink-0" style={{'--scrollbar-height': '4px'} as React.CSSProperties}>
        <div className="sidebar-tabs">
          {Object.values(BuilderSection).map((section, index) => (
            <button
              key={section}
              // FIX: Use a function block for the ref callback to ensure a void return type.
              ref={el => { tabsRef.current[index] = el; }}
              onClick={() => setActiveSection(section)}
              className={`sidebar-tab ${activeSection === section ? 'active' : ''}`}
            >
              {section}
            </button>
          ))}
          <motion.div
            className="sidebar-tab-indicator"
            animate={indicatorStyle}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto pr-2 -mr-4">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                {renderSection()}
            </motion.div>
        </AnimatePresence>
      </div>
       <div className="flex-shrink-0 pt-4 mt-2 text-center text-xs text-gray-500 border-t border-white/10">
        <p>
            Built by <a href="https://github.com/kushichowdary" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-400 hover:text-[var(--primary-theme-color)] transition-colors">Kushwanth</a>
        </p>
        <div className="flex justify-center items-center space-x-2 mt-1">
            <a href="https://github.com/kushichowdary" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--primary-theme-color)] transition-colors">GitHub</a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/kushichowdary/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--primary-theme-color)] transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default BuilderSidebar;
