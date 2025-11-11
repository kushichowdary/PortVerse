import React from 'react';
import BuilderSidebar from './sidebar/BuilderSidebar';
import PortfolioPreview from './PortfolioPreview';
import { ToastContainer } from '../hooks/useToast';

interface PortfolioBuilderProps {
  onLogout: () => void;
}

const PortfolioBuilder: React.FC<PortfolioBuilderProps> = ({ onLogout }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen bg-[#111111]">
        <div className="w-full lg:w-[450px] h-1/2 lg:h-full overflow-y-auto bg-black p-4 lg:p-6 border-r border-gray-800/50 shadow-2xl shadow-blue-900/20">
          <BuilderSidebar />
        </div>
        <div className="w-full flex-1 h-1/2 lg:h-full overflow-y-auto">
          <PortfolioPreview onLogout={onLogout} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PortfolioBuilder;