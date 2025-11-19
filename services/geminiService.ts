import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize the client
const ai = new GoogleGenAI({ apiKey });

export const enhanceText = async (text: string, type: 'bio' | 'description' | 'tagline'): Promise<string> => {
  if (!text || !text.trim()) return "";
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return text;
  }

  try {
    let prompt = "";
     if (type === 'bio') {
      prompt = `Rewrite the following professional biography to be more engaging, professional, and concise (approx 80-120 words). Maintain the first-person perspective. Do not use markdown formatting.\n\nInput: "${text}"`;
    } else if (type === 'description') {
      prompt = `Rewrite the following job or project description to highlight achievements and use active verbs. Keep it professional and concise. Do not use markdown formatting.\n\nInput: "${text}"`;
    } else if (type === 'tagline') {
      prompt = `Create a catchy, professional, and innovative tagline (max 10 words) based on this concept. Do not use markdown formatting.\n\nInput: "${text}"`;
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    
    return response.text?.trim() || text;
  } catch (error) {
    console.error("Error enhancing text with Gemini:", error);
    // Return original text on error so user doesn't lose data
    return text;
  }
}