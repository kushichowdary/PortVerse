import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { PortfolioData } from '../types';

// --- INITIAL STATE ---
const initialPortfolioData: PortfolioData = {
  name: 'Your Name',
  tagline: 'Futuristic Developer & Digital Artisan',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  bio: 'A passionate creator building amazing things for the web of tomorrow. This is your chance to shine and tell your story.',
  passion: 'I am driven by a passion for creating intuitive, beautiful, and high-performance web experiences. I thrive on solving complex problems and turning innovative ideas into reality.',
  contactEmail: 'your.email@example.com',
  skills: ['React', 'TypeScript', 'Node.js', 'UI/UX Design', 'Framer Motion', 'Next.js', 'GraphQL'],
  socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  education: [{ id: 'edu1', institution: 'Institute of Technology', degree: 'B.S. in Cybernetics', duration: '2020 - 2024' }],
  experience: [{ id: 'exp1', role: 'Frontend Engineer', company: 'Future Systems Corp.', duration: '2024 - Present', description: 'Engineered and maintained hyper-responsive web applications using bleeding-edge technologies, boosting user engagement by 30%.' }],
  projects: [
    { id: 'proj1', name: 'Project Neo', description: 'A revolutionary app that changes the way people interact with decentralized technology.', imageUrl: 'https://picsum.photos/seed/neo/600/400', link: '#' },
    { id: 'proj2', name: 'Project Cygnus', description: 'An innovative platform for creative professionals to showcase their work in immersive 3D.', imageUrl: 'https://picsum.photos/seed/cygnus/600/400', link: '#' },
  ],
  achievements: [
      { id: 'ach1', title: 'Innovation Award 2024', description: 'Awarded for developing a novel UI component library that increased development speed by 40%.' },
      { id: 'ach2', title: 'Global Hackathon Winner', description: 'First place in the annual global hackathon for creating a real-time data visualization tool for climate change.'}
  ],
  themeSettings: {
    templateId: 'futuristic',
    primaryColor: '#22d3ee', // cyan-400
    fontPair: 'orbitron-poppins',
    mode: 'dark',
  },
  sectionOrder: ['profile', 'passion', 'skills', 'experience', 'projects', 'achievements', 'education']
};

// --- ACTION TYPES ---
type Action = 
  | { type: 'UPDATE_DATA'; payload: Partial<PortfolioData> } 
  | { type: 'REPLACE_DATA'; payload: PortfolioData }
  | { type: 'RESET_DATA' };

// --- REDUCER ---
const portfolioReducer = (state: PortfolioData, action: Action): PortfolioData => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, ...action.payload };
    case 'REPLACE_DATA':
        return action.payload;
    case 'RESET_DATA':
        // Clear from local storage as well to ensure a clean reset on refresh
        localStorage.removeItem('portfolioData');
        return initialPortfolioData;
    default:
      return state;
  }
};

// --- CONTEXT ---
interface PortfolioContextType {
  portfolioData: PortfolioData;
  dispatch: React.Dispatch<Action>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// --- PROVIDER ---
export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolioData, dispatch] = useReducer(portfolioReducer, initialPortfolioData, (initial) => {
    try {
      const storedData = localStorage.getItem('portfolioData');
      const parsedData = storedData ? JSON.parse(storedData) : initial;
      // Ensure sectionOrder exists for users with old data
      if (!parsedData.sectionOrder) {
        parsedData.sectionOrder = initial.sectionOrder;
      }
      return parsedData;
    } catch (error) {
      console.error("Could not parse portfolio data from localStorage", error);
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    } catch (error) {
        console.error("Could not save portfolio data to localStorage", error);
    }
  }, [portfolioData]);

  return (
    <PortfolioContext.Provider value={{ portfolioData, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
};

// --- CUSTOM HOOK ---
export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};