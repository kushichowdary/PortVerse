export interface ListItem {
  id: string;
}

export interface Project extends ListItem {
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface Experience extends ListItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education extends ListItem {
  institution: string;
  degree: string;
  duration: string;
}

export interface Achievement extends ListItem {
  title: string;
  description: string;
}

export interface ThemeSettings {
  templateId: 'futuristic' | 'minimalist' | 'creative';
  primaryColor: string;
  fontPair: 'orbitron-poppins' | 'inter-lora' | 'playfair-montserrat' | 'roboto-mono-roboto';
  mode: 'dark' | 'light';
}

export type SectionKey = 'profile' | 'passion' | 'skills' | 'experience' | 'projects' | 'achievements' | 'education';

export interface PortfolioData {
  name: string;
  tagline: string;
  avatarUrl: string;
  bio: string;
  passion: string;
  contactEmail: string;
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
  themeSettings: ThemeSettings;
  sectionOrder: SectionKey[];
}

export enum BuilderSection {
  PERSONAL = 'Personal',
  SKILLS = 'Skills',
  CONTACT = 'Contact',
  EXPERIENCE = 'Experience',
  EDUCATION = 'Education',
  PROJECTS = 'Projects',
  ACHIEVEMENTS = 'Achievements',
  THEME = 'Theme',
  LAYOUT = 'Layout',
}