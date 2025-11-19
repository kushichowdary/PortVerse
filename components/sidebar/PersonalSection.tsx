import React, { useRef, useState, useEffect } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { PRESETS } from '../../services/presets';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../hooks/useToast';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const dropdownVariants = {
  closed: { 
    opacity: 0,
    y: -10,
    height: 0,
    transition: { duration: 0.2 }
  },
  open: { 
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: { duration: 0.3, staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const optionVariants = {
  closed: { opacity: 0, x: -10 },
  open: { opacity: 1, x: 0 }
};

const presetOptions = [
  { value: 'coder', label: '💻 Coder / Software Engineer' },
  { value: 'civil', label: '🏗️ Civil Engineer' },
  { value: 'mechanical', label: '⚙️ Mechanical Engineer' },
  { value: 'ece', label: '📡 ECE Engineer' },
  { value: 'eee', label: '⚡ EEE Engineer' },
  { value: 'photography', label: '📸 Photography / Creative' },
];

const PersonalSection: React.FC = () => {
  const { portfolioData, dispatch } = usePortfolio();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [presetLoading, setPresetLoading] = useState(false);
  const [presetSuccess, setPresetSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_DATA', payload: { [name]: value } });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_DATA',
      payload: { socials: { ...portfolioData.socials, [name]: value } },
    });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({
          type: 'UPDATE_DATA',
          payload: { avatarUrl: reader.result as string },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (key: string) => {
    setIsDropdownOpen(false);
    if (key && PRESETS[key]) {
        if(window.confirm(`Load preset for ${key.toUpperCase()}? This will overwrite your current content.`)) {
            setPresetLoading(true);
            setTimeout(() => {
                dispatch({
                    type: 'UPDATE_DATA',
                    payload: PRESETS[key]
                });
                setPresetLoading(false);
                setPresetSuccess(true);
                addToast(`${key.toUpperCase()} preset loaded successfully!`, 'success');
                setTimeout(() => setPresetSuccess(false), 2000);
            }, 800);
        }
    }
  };

  return (
    <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
    >
      {/* Identity Matrix - Custom Animated Dropdown */}
      <motion.div variants={itemVariants} className="relative p-4 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-xl overflow-visible shadow-lg z-20">
        <AnimatePresence>
            {presetLoading && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/90 z-30 flex items-center justify-center flex-col gap-3 rounded-xl"
                >
                     <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                     <span className="text-[10px] text-violet-300 font-mono animate-pulse tracking-widest">INITIALIZING DATA MATRIX...</span>
                </motion.div>
            )}
            {presetSuccess && !presetLoading && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-emerald-950/90 z-30 flex items-center justify-center rounded-xl"
                >
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        <span className="tracking-widest text-xs">SYSTEM UPDATED</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <label className="sidebar-label text-violet-300 mb-3 flex justify-between items-center">
            <span>Identity Matrix</span>
            <span className="text-[9px] bg-violet-500/20 text-violet-200 px-2 py-0.5 rounded-full border border-violet-500/30">PRESETS</span>
        </label>
        
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full text-left input-field-modern flex items-center justify-between !bg-violet-900/10 !border-violet-500/30 hover:!border-violet-400/50 transition-colors ${isDropdownOpen ? 'ring-2 ring-violet-500/20' : ''}`}
            >
                <span className="text-violet-100 font-medium">Select Target Profession...</span>
                <motion.svg 
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    className="w-4 h-4 text-violet-400" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </motion.svg>
            </button>

            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div 
                        className="absolute top-full left-0 right-0 mt-2 bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50"
                        variants={dropdownVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="p-2 space-y-1 max-h-[240px] overflow-y-auto custom-scrollbar">
                            {presetOptions.map((option) => (
                                <motion.button
                                    key={option.value}
                                    variants={optionVariants}
                                    onClick={() => handlePresetSelect(option.value)}
                                    className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-violet-600/20 rounded-lg transition-colors flex items-center gap-3 group"
                                >
                                    <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity group-hover:scale-110 transform duration-200 inline-block">
                                        {option.label.split(' ')[0]}
                                    </span>
                                    <span className="font-medium">
                                        {option.label.split(' ').slice(1).join(' ')}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-5">
        <motion.div variants={itemVariants}>
            <label className="sidebar-label">Full Name</label>
            <input type="text" name="name" value={portfolioData.name} onChange={handleInputChange} className="input-field-modern" placeholder="e.g. John Doe" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
            <label className="sidebar-label">Tagline</label>
            <input type="text" name="tagline" value={portfolioData.tagline} onChange={handleInputChange} className="input-field-modern" placeholder="e.g. Creative Developer" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
            <label className="sidebar-label">Avatar</label>
            <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="relative w-14 h-14 shrink-0">
                    <img src={portfolioData.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover ring-2 ring-slate-700" />
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/20"></div>
                </div>
                <div className="flex-grow min-w-0">
                    <div className="flex gap-2 mb-2">
                         <button
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-modern secondary py-1.5 text-xs flex-1"
                        >
                        Upload
                        </button>
                         <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarUpload}
                        accept="image/*"
                        className="hidden"
                        />
                    </div>
                    <input
                    type="text"
                    name="avatarUrl"
                    value={portfolioData.avatarUrl}
                    onChange={handleInputChange}
                    className="input-field-modern !py-1.5 !text-xs !bg-black/20"
                    placeholder="Or paste image URL"
                    />
                </div>
            </div>
        </motion.div>

        <motion.div variants={itemVariants}>
            <label className="sidebar-label">About Me</label>
            <textarea name="bio" value={portfolioData.bio} onChange={handleInputChange} rows={4} className="input-field-modern resize-none" placeholder="Tell your story..."></textarea>
        </motion.div>

        <motion.div variants={itemVariants}>
            <label className="sidebar-label">Passion</label>
            <textarea name="passion" value={portfolioData.passion} onChange={handleInputChange} rows={3} className="input-field-modern resize-none" placeholder="What drives you?"></textarea>
        </motion.div>

        <motion.div variants={itemVariants}>
            <label className="sidebar-label">Social Coordinates</label>
            <div className="space-y-3">
                 <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-xs font-mono">GH</span>
                    <input type="text" name="github" value={portfolioData.socials.github} onChange={handleSocialChange} className="input-field-modern pl-10" placeholder="GitHub URL" />
                 </div>
                 <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-xs font-mono">LI</span>
                    <input type="text" name="linkedin" value={portfolioData.socials.linkedin} onChange={handleSocialChange} className="input-field-modern pl-10" placeholder="LinkedIn URL" />
                 </div>
            </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PersonalSection;