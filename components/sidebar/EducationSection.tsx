import React from 'react';
import { ListSection } from './common';
import { Education } from '../../types';

const EducationSection: React.FC = () => {
    return (
        <ListSection<'education', Education>
            sectionName="education"
            singularName="Education"
            fields={[
                { name: 'institution', label: 'Institution' },
                { name: 'degree', label: 'Degree' },
                { name: 'duration', label: 'Duration' },
            ]}
            defaultItem={{ institution: 'New School', degree: '', duration: '' }}
        />
    );
};

export default EducationSection;