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
        backgroundRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        backgroundRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };
  const primaryRgb = hexToRgb(portfolioData.themeSettings.primaryColor);

  return (
    <>
      <div 
        ref={backgroundRef} 
        className="dynamic-background" 
        style={{ '--bg-gradient-color': `${portfolioData.themeSettings.primaryColor}20` } as React.CSSProperties}
      />
      <div className="flex flex-col lg:flex-row h-screen p-4 gap-4" style={{
        '--primary-theme-color': portfolioData.themeSettings.primaryColor,
        '--primary-theme-color-trans': primaryRgb ? `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.1)` : 'rgba(34, 211, 238, 0.1)'
      } as React.CSSProperties}>
        <motion.div 
            className="w-full lg:w-[450px] h-1/2 lg:h-full overflow-hidden glass-pane-enhanced p-4 lg:p-6 flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <BuilderSidebar />
        </motion.div>
        <motion.div 
            className="w-full flex-1 h-1/2 lg:h-full overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <PortfolioPreview onLogout={onLogout} />
        </motion.div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PortfolioBuilder;