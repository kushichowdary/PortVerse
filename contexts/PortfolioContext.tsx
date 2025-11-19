import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { PortfolioData } from '../types';

// --- INITIAL STATE ---
export const initialPortfolioData: PortfolioData = {
  name: 'Alex Sterling',
  tagline: 'Creative Developer & UI Specialist',
  avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60',
  bio: 'I am a dedicated developer with a passion for building digital products that solve real-world problems. With a focus on user experience and clean code, I strive to create software that is both beautiful and functional.',
  passion: 'Building intuitive digital experiences that empower users.',
  contactEmail: 'alex.sterling@example.com',
  skills: ['React', 'TypeScript', 'Node.js', 'UI Design', 'Tailwind CSS'],
  socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  education: [{ id: 'edu1', institution: 'State University', degree: 'B.S. Computer Science', duration: '2019 - 2023' }],
  experience: [{ id: 'exp1', role: 'Frontend Developer', company: 'Tech Solutions Inc.', duration: '2023 - Present', description: 'Developing responsive web applications and optimizing frontend performance for enterprise clients.' }],
  projects: [
    { id: 'proj1', name: 'Task Master', description: 'A productivity application designed to help teams manage workflows efficiently.', imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80', link: '#' },
    { id: 'proj2', name: 'E-Commerce Platform', description: 'A full-featured online store with secure payment integration and inventory management.', imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80', link: '#' },
  ],
  achievements: [
      { id: 'ach1', title: 'Best UI Design', description: 'Awarded for the most intuitive user interface at the annual WebDev Summit.' },
  ],
  themeSettings: {
    templateId: 'modern',
    primaryColor: '#8b5cf6', // Violet
    fontPair: 'syne-inter',
    mode: 'light',
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

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};