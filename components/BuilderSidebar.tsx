import React, { useState } from 'react';
import { PortfolioData, BuilderSection } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface BuilderSidebarProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const BuilderSidebar: React.FC<BuilderSidebarProps> = ({ data, setData }) => {
  const [activeSection, setActiveSection] = useState<BuilderSection>(BuilderSection.PERSONAL);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: keyof PortfolioData, index?: number, subfield?: string) => {
    const { name, value } = e.target;
    setData(prev => {
      if (index !== undefined && Array.isArray(prev[section])) {
        const newArr = [...(prev[section] as any[])];
        newArr[index] = { ...newArr[index], [name]: value };
        return { ...prev, [section]: newArr };
      }
      if(subfield) {
        return { ...prev, [section]: { ...prev[section], [subfield]: value }};
      }
      return { ...prev, [name]: value };
    });
  };
  
  const handleSkillsChange = (value: string) => {
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(Boolean);
    setData(prev => ({...prev, skills: skillsArray}));
  }

  const addItem = (section: 'projects' | 'experience' | 'education' | 'achievements') => {
    setData(prev => {
      const newItem = { id: crypto.randomUUID() };
      const defaultValues = {
          projects: { name: 'New Project', description: '', imageUrl: 'https://picsum.photos/seed/new/600/400', link: '' },
          experience: { role: 'New Role', company: '', duration: '', description: '' },
          education: { institution: 'New School', degree: '', duration: '' },
          achievements: { title: 'New Achievement', description: '' }
      }
      return { ...prev, [section]: [...prev[section], {...newItem, ...defaultValues[section]}] };
    });
  };

  const removeItem = (section: 'projects' | 'experience' | 'education' | 'achievements', idToRemove: string) => {
    setData(prev => {
      const newArr = prev[section].filter(item => item.id !== idToRemove);
      return { ...prev, [section]: newArr };
    });
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -30, transition: { duration: 0.2 } },
  };

  const renderSection = () => {
    const renderListSection = (sectionName: 'projects' | 'experience' | 'education' | 'achievements', fields: {name: string, type?: string}[], textAreas: string[] = []) => (
        <div className="space-y-6">
            <AnimatePresence>
                {data[sectionName].map((item) => (
                    <motion.div 
                        key={item.id} 
                        variants={itemVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                        className="p-4 border border-gray-700 rounded-lg space-y-3 glass-pane relative">
                         <button onClick={() => removeItem(sectionName, item.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-400 font-bold text-xl z-10">&times;</button>
                        {fields.map(field => {
                             const isTextArea = textAreas.includes(field.name);
                             return (
                                <div key={field.name}>
                                    <label className="text-cyan-400 text-sm capitalize">{field.name}</label>
                                    {isTextArea ? (
                                        <textarea name={field.name} value={item[field.name]} onChange={(e) => handleInputChange(e, sectionName, data[sectionName].findIndex(i => i.id === item.id))} rows={3} className="input-field"></textarea>
                                    ) : (
                                        <input type={field.type || 'text'} name={field.name} value={item[field.name]} onChange={(e) => handleInputChange(e, sectionName, data[sectionName].findIndex(i => i.id === item.id))} className="input-field" />
                                    )}
                                </div>
                             )
                        })}
                    </motion.div>
                ))}
            </AnimatePresence>
            <button onClick={() => addItem(sectionName)} className="btn-secondary w-full">Add {sectionName.slice(0, -1)}</button>
        </div>
    );

    switch (activeSection) {
      case BuilderSection.PERSONAL:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-cyan-400 text-sm">Full Name</label>
              <input type="text" name="name" value={data.name} onChange={(e) => handleInputChange(e, 'name')} className="input-field" />
            </div>
            <div>
              <label className="text-cyan-400 text-sm">Tagline</label>
              <input type="text" name="tagline" value={data.tagline} onChange={(e) => handleInputChange(e, 'tagline')} className="input-field" />
            </div>
             <div>
              <label className="text-cyan-400 text-sm">Avatar URL</label>
              <input type="text" name="avatarUrl" value={data.avatarUrl} onChange={(e) => handleInputChange(e, 'avatarUrl')} className="input-field" />
            </div>
            <div>
              <label className="text-cyan-400 text-sm">About Me / Bio</label>
              <textarea name="bio" value={data.bio} onChange={(e) => handleInputChange(e, 'bio')} rows={4} className="input-field"></textarea>
            </div>
             <div>
              <label className="text-cyan-400 text-sm">My Passion</label>
              <textarea name="passion" value={data.passion} onChange={(e) => handleInputChange(e, 'passion')} rows={3} className="input-field"></textarea>
            </div>
            <div>
              <label className="text-cyan-400 text-sm">GitHub URL</label>
              <input type="text" value={data.socials.github} onChange={(e) => handleInputChange(e, 'socials', undefined, 'github')} className="input-field" />
            </div>
            <div>
              <label className="text-cyan-400 text-sm">LinkedIn URL</label>
              <input type="text" value={data.socials.linkedin} onChange={(e) => handleInputChange(e, 'socials', undefined, 'linkedin')} className="input-field" />
            </div>
          </div>
        );
      case BuilderSection.SKILLS:
         return (
          <div>
            <label className="text-cyan-400 text-sm">Skills (comma-separated)</label>
            <textarea value={data.skills.join(', ')} onChange={(e) => handleSkillsChange(e.target.value)} rows={5} className="input-field"></textarea>
          </div>
         );
       case BuilderSection.EXPERIENCE:
        return renderListSection('experience', [{name: 'role'}, {name: 'company'}, {name: 'duration'}, {name: 'description'}], ['description']);
      case BuilderSection.EDUCATION:
        return renderListSection('education', [{name: 'institution'}, {name: 'degree'}, {name: 'duration'}]);
      case BuilderSection.PROJECTS:
        return renderListSection('projects', [{name: 'name'}, {name: 'description'}, {name: 'imageUrl', type: 'url'}, {name: 'link', type: 'url'}], ['description']);
      case BuilderSection.ACHIEVEMENTS:
        return renderListSection('achievements', [{name: 'title'}, {name: 'description'}], ['description']);
      default:
        return <p>Select a section to edit.</p>;
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
      `}</style>
    </div>
  );
};

export default BuilderSidebar;