import React, { useRef } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

const PersonalSection: React.FC = () => {
  const { portfolioData, dispatch } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({
          type: 'UPDATE_DATA',
          payload: { avatarUrl: reader.result as string },
        });
      };
      reader.readAsDataURL(file);
    }
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
        <label className="sidebar-label">Avatar</label>
        <div className="flex items-center gap-4">
          <img src={portfolioData.avatarUrl} alt="Avatar Preview" className="w-16 h-16 rounded-full object-cover border-2 border-gray-600" />
          <div className="flex-grow">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-futuristic primary w-full mb-2"
              style={{fontSize: '0.75rem', padding: '0.5rem 1rem'}}
            >
              Upload Image
            </button>
            <input
              type="text"
              name="avatarUrl"
              value={portfolioData.avatarUrl}
              onChange={handleInputChange}
              className="input-field-futuristic text-xs"
              placeholder="Or paste image URL"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
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