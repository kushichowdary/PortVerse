import React from 'react';
import { ListSection } from './common';
import { Experience } from '../../types';

const ExperienceSection: React.FC = () => {
    return (
        <ListSection<'experience', Experience>
            sectionName="experience"
            singularName="Experience"
            fields={[
                { name: 'role', label: 'Role' },
                { name: 'company', label: 'Company' },
                { name: 'duration', label: 'Duration' },
                { name: 'description', label: 'Description', isTextArea: true },
            ]}
            defaultItem={{ role: 'New Role', company: '', duration: '', description: '' }}
        />
    );
};

export default ExperienceSection;