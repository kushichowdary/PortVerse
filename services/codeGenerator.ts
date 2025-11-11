import { PortfolioData } from '../types';
import { generateFuturisticHTML } from './template-generators/futuristicGenerator';
import { generateMinimalistHTML } from './template-generators/minimalistGenerator';
import { generateCreativeHTML } from './template-generators/creativeGenerator';

const generators = {
  futuristic: generateFuturisticHTML,
  minimalist: generateMinimalistHTML,
  creative: generateCreativeHTML,
};

export const generatePortfolioHTML = (data: PortfolioData): string => {
  const generator = generators[data.themeSettings.templateId];
  if (!generator) {
    throw new Error(`No generator found for template ID: ${data.themeSettings.templateId}`);
  }
  return generator(data);
};