import React, { useState } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { generatePortfolioHTML } from '../services/codeGenerator';
import { useToast } from '../hooks/useToast';
import FuturisticTemplate from './templates/FuturisticTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

const templates = {
  futuristic: FuturisticTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
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

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col relative">
      <div className="flex-shrink-0 bg-black p-3 border-b border-gray-800 flex justify-between items-center z-10">
        <div className="text-sm font-orbitron uppercase tracking-widest text-blue-400">
          Live Preview
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-4 py-2 bg-blue-600/20 border border-blue-500 text-blue-300 font-orbitron text-xs uppercase rounded-md backdrop-blur-sm
                     hover:bg-blue-500 hover:text-black hover:shadow-[0_0_15px_theme(colors.blue.500)] 
                     transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait"
          >
            {isDownloading ? 'Generating...' : 'Download Code'}
          </button>
           <button
            onClick={onLogout}
            className="px-4 py-2 bg-rose-600/20 border border-rose-500 text-rose-300 font-orbitron text-xs uppercase rounded-md backdrop-blur-sm
                     hover:bg-rose-500 hover:text-black hover:shadow-[0_0_15px_theme(colors.rose.500)] 
                     transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-grow w-full h-full rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto bg-[#0A0A0A]">
          <SelectedTemplate data={portfolioData} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;