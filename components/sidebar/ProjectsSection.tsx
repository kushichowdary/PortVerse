import React from 'react';
import { ListSection } from './common';
import { Project } from '../../types';

const ProjectsSection: React.FC = () => {
    return (
        <ListSection<'projects', Project>
            sectionName="projects"
            singularName="Project"
            fields={[
                { name: 'name', label: 'Project Name' },
                { name: 'description', label: 'Description', isTextArea: true },
                { name: 'imageUrl', label: 'Image URL', type: 'url' },
                { name: 'link', label: 'Project Link', type: 'url' },
            ]}
            defaultItem={{ name: 'New Project', description: '', imageUrl: 'https://picsum.photos/seed/new/600/400', link: '' }}
        />
    );
};

export default ProjectsSection;