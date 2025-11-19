import React from 'react';
import { ListSection } from './common';
import { Project } from '../../types';
import { usePortfolio } from '../../contexts/PortfolioContext';

const MAX_PROJECTS = 5;

const ProjectsSection: React.FC = () => {
    const { portfolioData } = usePortfolio();
    const projectCount = portfolioData.projects.length;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <label className="sidebar-label" style={{ marginBottom: 0 }}>Your Projects</label>
                <span className="text-sm font-mono text-slate-500">{projectCount} / {MAX_PROJECTS}</span>
            </div>
            <ListSection<'projects', Project>
                sectionName="projects"
                singularName="Project"
                maxItems={MAX_PROJECTS}
                fields={[
                    { name: 'name', label: 'Project Name' },
                    { name: 'description', label: 'Description', isTextArea: true },
                    { name: 'imageUrl', label: 'Project Image', isImageUpload: true },
                    { name: 'link', label: 'Project Link', type: 'url' },
                ]}
                defaultItem={{ name: 'New Project', description: '', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80', link: '' }}
            />
        </div>
    );
};

export default ProjectsSection;