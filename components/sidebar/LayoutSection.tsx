import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { SectionKey } from '../../types';
import { Reorder } from 'framer-motion';

const sectionLabels: Record<SectionKey, string> = {
  profile: 'Profile',
  passion: 'Passion',
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  achievements: 'Achievements',
  education: 'Education',
};

const LayoutSection: React.FC = () => {
  const { portfolioData, dispatch } = usePortfolio();
  const { sectionOrder } = portfolioData;

  const handleReorder = (newOrder: SectionKey[]) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: { sectionOrder: newOrder },
    });
  };

  return (
    <div>
      <label className="sidebar-label">Section Order</label>
      <p className="text-xs text-gray-500 mb-4">
        Drag and drop to reorder the sections in your portfolio.
      </p>
      <Reorder.Group axis="y" values={sectionOrder} onReorder={handleReorder} className="space-y-2">
        {sectionOrder.map((sectionKey) => (
          <Reorder.Item
            key={sectionKey}
            value={sectionKey}
            className="flex items-center justify-between p-3 bg-black/20 border border-gray-700/50 rounded-md cursor-grab active:cursor-grabbing"
            whileDrag={{ scale: 1.05, boxShadow: '0px 5px 15px rgba(0,0,0,0.3)' }}
          >
            <span className="font-medium">{sectionLabels[sectionKey]}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default LayoutSection;