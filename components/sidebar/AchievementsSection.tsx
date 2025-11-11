import React from 'react';
import { ListSection } from './common';
import { Achievement } from '../../types';

const AchievementsSection: React.FC = () => {
    return (
        <ListSection<'achievements', Achievement>
            sectionName="achievements"
            singularName="Achievement"
            fields={[
                { name: 'title', label: 'Title' },
                { name: 'description', label: 'Description', isTextArea: true },
            ]}
            defaultItem={{ title: 'New Achievement', description: '' }}
        />
    );
};

export default AchievementsSection;