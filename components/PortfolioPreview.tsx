import React, { useState } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { generatePortfolioHTML } from '../services/codeGenerator';
import { useToast } from '../hooks/useToast';
import FuturisticTemplate from './templates/FuturisticTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import NeobrutalistTemplate from './templates/NeobrutalistTemplate';
import { AnimatePresence, motion } from 'framer-motion';


const templates = {
  futuristic: FuturisticTemplate,
  minimalist: MinimalistTemplate,
  neobrutalist: NeobrutalistTemplate,
};

interface PortfolioPreviewProps {
  onLogout: () => void;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ onLogout }) => {
  const { portfolioData } = usePortfolio();
  const { addToast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      const htmlContent = generatePortfolioHTML(portfolioData);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${portfolioData.name.toLowerCase().replace(/\s/g, '-')}-portfolio.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast('Portfolio code downloaded successfully!', 'success');
    } catch (error) {
      console.error("Failed to generate or download HTML:", error);
      addToast('Failed to download portfolio code.', 'error');
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const SelectedTemplate = templates[portfolioData.themeSettings.templateId] || FuturisticTemplate;

  const handleScrollToTop = () => {
    const previewContainer = document.querySelector('.preview-container');
    if (previewContainer) {
      previewContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  return (
    <div className="w-full h-full bg-transparent flex flex-col relative">
      <div className="flex-shrink-0 p-3 flex justify-between items-center z-10 glass-pane-enhanced">
        <div className="font-orbitron uppercase tracking-widest text-sm" style={{ color: portfolioData.themeSettings.primaryColor }}>
          Live Preview
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn-futuristic primary"
          >
            {isDownloading ? 'Generating...' : 'Download Code'}
          </button>
           <button
            onClick={onLogout}
            className="btn-futuristic danger"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-grow w-full h-full overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto bg-[#0A0A0A] preview-container">
          <SelectedTemplate data={portfolioData} />
        </div>
      </div>
      <AnimatePresence>
         <motion.button
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 bg-[var(--primary-theme-color)] text-black rounded-full h-12 w-12 flex items-center justify-center shadow-lg lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to Editor"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
            </svg>
          </motion.button>
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPreview;