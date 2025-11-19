import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

const SkillsSection: React.FC = () => {
    const { portfolioData, dispatch } = usePortfolio();
    const [skillsText, setSkillsText] = useState(portfolioData.skills.join(', '));

    useEffect(() => {
        setSkillsText(portfolioData.skills.join(', '));
    }, [portfolioData.skills]);

    const handleBlur = () => {
        const skillsArray = skillsText.split(',').map(skill => skill.trim()).filter(Boolean);
        if (JSON.stringify(skillsArray) !== JSON.stringify(portfolioData.skills)) {
            dispatch({type: 'UPDATE_DATA', payload: { skills: skillsArray }});
        }
    }

    return (
        <div>
            <label className="sidebar-label">Skills (comma-separated)</label>
            <textarea 
                value={skillsText} 
                onChange={(e) => setSkillsText(e.target.value)} 
                onBlur={handleBlur}
                rows={5} 
                className="input-field-modern"
            ></textarea>
        </div>
    );
};

export default SkillsSection;