import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

const PersonalSection: React.FC = () => {
  const { portfolioData, dispatch } = usePortfolio();

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

  return (
    <div className="space-y-4">
      <div>
        <label className="sidebar-label">Full Name</label>
        <input type="text" name="name" value={portfolioData.name} onChange={handleInputChange} className="input-field-futuristic" />
      </div>
      <div>
        <label className="sidebar-label">Tagline</label>
        <input type="text" name="tagline" value={portfolioData.tagline} onChange={handleInputChange} className="input-field-futuristic" />
      </div>
      <div>
        <label className="sidebar-label">Avatar URL</label>
        <input type="text" name="avatarUrl" value={portfolioData.avatarUrl} onChange={handleInputChange} className="input-field-futuristic" />
      </div>
      <div>
        <label className="sidebar-label">About Me / Bio</label>
        <textarea name="bio" value={portfolioData.bio} onChange={handleInputChange} rows={4} className="input-field-futuristic"></textarea>
      </div>
      <div>
        <label className="sidebar-label">My Passion</label>
        <textarea name="passion" value={portfolioData.passion} onChange={handleInputChange} rows={3} className="input-field-futuristic"></textarea>
      </div>
      <div>
        <label className="sidebar-label">GitHub URL</label>
        <input type="text" name="github" value={portfolioData.socials.github} onChange={handleSocialChange} className="input-field-futuristic" />
      </div>
      <div>
        <label className="sidebar-label">LinkedIn URL</label>
        <input type="text" name="linkedin" value={portfolioData.socials.linkedin} onChange={handleSocialChange} className="input-field-futuristic" />
      </div>
    </div>
  );
};

export default PersonalSection;