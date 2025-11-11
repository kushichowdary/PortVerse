import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

const ContactSection: React.FC = () => {
  const { portfolioData, dispatch } = usePortfolio();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_DATA', payload: { [name]: value } });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="sidebar-label">Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          value={portfolioData.contactEmail}
          onChange={handleInputChange}
          className="input-field-futuristic"
          placeholder="your.email@example.com"
        />
      </div>
      <p className="text-xs text-gray-500">
        This email will be displayed in the contact section of your portfolio.
      </p>
    </div>
  );
};

export default ContactSection;