export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  name: string;
  tagline: string;
  avatarUrl: string;
  bio: string;
  passion: string;
  skills: string[];
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
}

export enum BuilderSection {
  PERSONAL = 'Personal',
  SKILLS = 'Skills',
  EXPERIENCE = 'Experience',
  EDUCATION = 'Education',
  PROJECTS = 'Projects',
  ACHIEVEMENTS = 'Achievements',
}