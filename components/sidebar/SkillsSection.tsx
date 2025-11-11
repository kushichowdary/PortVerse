import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

const SkillsSection: React.FC = () => {
    const { portfolioData, dispatch } = usePortfolio();

    const handleSkillsChange = (value: string) => {
        const skillsArray = value.split(',').map(skill => skill.trim()).filter(Boolean);
        dispatch({type: 'UPDATE_DATA', payload: { skills: skillsArray }});
    }

    return (
        <div>
            <label className="sidebar-label">Skills (comma-separated)</label>
            <textarea value={portfolioData.skills.join(', ')} onChange={(e) => handleSkillsChange(e.target.value)} rows={5} className="input-field"></textarea>
        </div>
    );
};

export default SkillsSection;
