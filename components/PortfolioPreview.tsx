
import React, { useState } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { generatePortfolioHTML } from '../services/codeGenerator';
import { useToast } from '../hooks/useToast';
import FuturisticTemplate from './templates/FuturisticTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import NeobrutalistTemplate from './templates/NeobrutalistTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import TechDocTemplate from './templates/TechDocTemplate';
import StudioTemplate from './templates/StudioTemplate';
import CyberTemplate from './templates/CyberTemplate';
import { AnimatePresence, motion } from 'framer-motion';


const templates = {
  futuristic: FuturisticTemplate,
  minimalist: MinimalistTemplate,
  neobrutalist: NeobrutalistTemplate,
  modern: ModernTemplate,
  elegant: ElegantTemplate,
  techdoc: TechDocTemplate,
  studio: StudioTemplate,
  cyber: CyberTemplate,
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
      
      // File Size Check (25MB limit warning)
      const fileSizeInBytes = blob.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      const WARNING_LIMIT_MB = 25;

      if (fileSizeInMB > WARNING_LIMIT_MB) {
        const proceed = window.confirm(
            `⚠️ High File Size Warning\n\n` +
            `Your portfolio file is ${fileSizeInMB.toFixed(2)} MB.\n` +
            `This exceeds the recommended ${WARNING_LIMIT_MB} MB limit. Large files may load slowly for visitors or be rejected by some hosting providers.\n\n` +
            `This is usually caused by large high-resolution images.\n\n` +
            `Do you want to download anyway?`
        );

        if (!proceed) {
            setIsDownloading(false);
            addToast('Download cancelled by user.', 'info');
            return;
        }
      }

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
      <div className="flex-shrink-0 p-4 flex justify-between items-center z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="font-inter font-medium text-sm text-slate-400 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          Live Preview
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn-modern primary"
          >
            {isDownloading ? 'Processing...' : 'Download Code'}
          </button>
           <button
            onClick={onLogout}
            className="btn-modern danger"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-grow w-full h-full overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto bg-[#111] preview-container">
          <SelectedTemplate data={portfolioData} />
        </div>
      </div>
      <AnimatePresence>
         <motion.button
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 bg-violet-600 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to Top"
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
