import React, { useState } from 'react';
import BuilderSidebar from './BuilderSidebar';
import PortfolioPreview from './PortfolioPreview';
import { PortfolioData } from '../types';

const initialPortfolioData: PortfolioData = {
  name: 'Your Name',
  tagline: 'Futuristic Developer & Digital Artisan',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  bio: 'A passionate creator building amazing things for the web of tomorrow. This is your chance to shine and tell your story.',
  passion: 'I am driven by a passion for creating intuitive, beautiful, and high-performance web experiences. I thrive on solving complex problems and turning innovative ideas into reality.',
  skills: ['React', 'TypeScript', 'Node.js', 'UI/UX Design', 'Framer Motion', 'Next.js', 'GraphQL'],
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  education: [
    { id: 'edu1', institution: 'Institute of Technology', degree: 'B.S. in Cybernetics', duration: '2020 - 2024' },
  ],
  experience: [
    { id: 'exp1', role: 'Frontend Engineer', company: 'Future Systems Corp.', duration: '2024 - Present', description: 'Engineered and maintained hyper-responsive web applications using bleeding-edge technologies, boosting user engagement by 30%.' },
  ],
  projects: [
    { id: 'proj1', name: 'Project Neo', description: 'A revolutionary app that changes the way people interact with decentralized technology.', imageUrl: 'https://picsum.photos/seed/neo/600/400', link: '#' },
    { id: 'proj2', name: 'Project Cygnus', description: 'An innovative platform for creative professionals to showcase their work in immersive 3D.', imageUrl: 'https://picsum.photos/seed/cygnus/600/400', link: '#' },
  ],
  achievements: [
      { id: 'ach1', title: 'Innovation Award 2024', description: 'Awarded for developing a novel UI component library that increased development speed by 40%.' },
      { id: 'ach2', title: 'Global Hackathon Winner', description: 'First place in the annual global hackathon for creating a real-time data visualization tool for climate change.'}
  ],
};

const PortfolioBuilder: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialPortfolioData);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#111111]">
      <div className="w-full lg:w-1/3 xl:w-1/4 h-1/2 lg:h-full overflow-y-auto bg-black p-4 lg:p-6 border-r border-gray-800/50 shadow-2xl shadow-blue-900/20">
        <BuilderSidebar data={portfolioData} setData={setPortfolioData} />
      </div>
      <div className="w-full lg:w-2/3 xl:w-3/4 h-1/2 lg:h-full overflow-y-auto">
        <PortfolioPreview data={portfolioData} />
      </div>
    </div>
  );
};

export default PortfolioBuilder;