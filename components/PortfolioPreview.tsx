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
        <div className="absolute inset-0 overflow-y-auto bg-[#0A0A0A]">
          <SelectedTemplate data={portfolioData} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;