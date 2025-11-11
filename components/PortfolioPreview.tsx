import React from 'react';
import { PortfolioData } from '../types';
import FuturisticTemplate from './templates/FuturisticTemplate';
import { generatePortfolioHTML } from '../services/codeGenerator';

interface PortfolioPreviewProps {
  data: PortfolioData;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ data }) => {

  const handleDownload = () => {
    const htmlContent = generatePortfolioHTML(data);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.toLowerCase().replace(/\s/g, '-')}-portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col relative">
      <div className="flex-shrink-0 bg-black p-3 border-b border-gray-800 flex justify-between items-center z-10">
        <div className="text-sm font-orbitron uppercase tracking-widest text-blue-400">
          Live Preview
        </div>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600/20 border border-blue-500 text-blue-300 font-orbitron text-xs uppercase rounded-md backdrop-blur-sm
                     hover:bg-blue-500 hover:text-black hover:shadow-[0_0_15px_theme(colors.blue.500)] 
                     transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Download Code
        </button>
      </div>
      <div className="flex-grow w-full h-full rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto bg-[#0A0A0A]">
          <FuturisticTemplate data={data} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;