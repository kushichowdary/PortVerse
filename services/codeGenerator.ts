
import { PortfolioData } from '../types';
import { generateFuturisticHTML } from './template-generators/futuristicGenerator';
import { generateMinimalistHTML } from './template-generators/minimalistGenerator';
import { generateNeobrutalistHTML } from './template-generators/neobrutalistGenerator';
import { generateModernHTML } from './template-generators/modernGenerator';
import { generateElegantHTML } from './template-generators/elegantGenerator';
import { generateTechDocHTML } from './template-generators/techDocGenerator';
import { generateStudioHTML } from './template-generators/studioGenerator';
import { generateCyberHTML } from './template-generators/cyberGenerator';

const generators = {
  futuristic: generateFuturisticHTML,
  minimalist: generateMinimalistHTML,
  neobrutalist: generateNeobrutalistHTML,
  modern: generateModernHTML,
  elegant: generateElegantHTML,
  techdoc: generateTechDocHTML,
  studio: generateStudioHTML,
  cyber: generateCyberHTML,
};

export const generatePortfolioHTML = (data: PortfolioData): string => {
  const generator = generators[data.themeSettings.templateId];
  if (!generator) {
    throw new Error(`No generator found for template ID: ${data.themeSettings.templateId}`);
  }
  return generator(data);
};
