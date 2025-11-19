import React, { useEffect, useRef } from 'react';
import BuilderSidebar from './sidebar/BuilderSidebar';
import PortfolioPreview from './PortfolioPreview';
import { ToastContainer } from '../hooks/useToast';
import { usePortfolio } from '../contexts/PortfolioContext';
import { motion } from 'framer-motion';

interface PortfolioBuilderProps {
  onLogout: () => void;
}

const PortfolioBuilder: React.FC<PortfolioBuilderProps> = ({ onLogout }) => {
  const { portfolioData } = usePortfolio();
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
          const { clientX, clientY } = e;
          const moveX = clientX * 0.01;
          const moveY = clientY * 0.01;
          backgroundRef.current.style.backgroundPosition = `${moveX}px ${moveY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        ref={backgroundRef} 
        className="dynamic-background" 
      />
      
      {/* Main Grid */}
      <div className="flex flex-col lg:flex-row h-screen p-4 gap-6 overflow-hidden">
        
        {/* Editor Sidebar - The Command Center */}
        <motion.div 
            className="w-full lg:w-[420px] h-[45%] lg:h-full flex flex-col cinematic-panel overflow-hidden relative z-20"
            initial={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
           {/* Decorative tech lines */}
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-50" />
           <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent opacity-50" />
           
          <BuilderSidebar />
        </motion.div>

        {/* Live Preview - The Output Stage */}
        <motion.div 
            className="w-full flex-1 h-[55%] lg:h-full rounded-2xl shadow-2xl border border-slate-800/50 bg-black/40 backdrop-blur-sm relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-white/5 z-30" />
          <PortfolioPreview onLogout={onLogout} />
        </motion.div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PortfolioBuilder;