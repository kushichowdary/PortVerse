import React, { useState } from 'react';
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

const BuilderSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<BuilderSection>(BuilderSection.PERSONAL);

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
    <div className="text-gray-200">
      <h2 className="font-orbitron text-2xl font-bold text-white mb-6">Portfolio Editor</h2>
      <div className="flex space-x-1 border-b border-gray-800 mb-6 overflow-x-auto pb-1">
        {Object.values(BuilderSection).map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              activeSection === section 
                ? 'border-b-2 border-cyan-400 text-cyan-300' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {section}
          </button>
        ))}
      </div>
      <div className="transition-opacity duration-300">
        {renderSection()}
      </div>
       <style>{`
        .input-field {
          width: 100%;
          background-color: #0F0F0F;
          border: 1px solid #333;
          color: #e0e0e0;
          padding: 0.75rem;
          border-radius: 0.375rem;
          transition: all 0.2s ease-in-out;
        }
        .input-field:focus {
          outline: none;
          border-color: #00ffff;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }
        .btn-secondary {
            padding: 0.5rem 1rem;
            background-color: transparent;
            border: 1px solid #00BFFF;
            color: #00BFFF;
            border-radius: 0.375rem;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        .btn-secondary:hover {
            background-color: rgba(0, 191, 255, 0.2);
        }
        .sidebar-label {
            color: #22d3ee;
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
            display: block;
        }
      `}</style>
    </div>
  );
};

export default BuilderSidebar;