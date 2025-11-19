import React, { useState } from 'react';
import { SparkleIcon } from './AIIcon';
import { enhanceText } from '../../services/geminiService';
import { useToast } from '../../hooks/useToast';

interface MagicButtonProps {
  text: string;
  type: 'bio' | 'description' | 'tagline';
  onEnhance: (newText: string) => void;
  className?: string;
}

const MagicButton: React.FC<MagicButtonProps> = ({ text, type, onEnhance, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleEnhance = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (!text || text.length < 3) {
      addToast('Please enter some text first.', 'info');
      return;
    }

    setIsLoading(true);
    try {
      const enhanced = await enhanceText(text, type);
      if (enhanced && enhanced !== text) {
        onEnhance(enhanced);
        addToast('Content enhanced with AI!', 'success');
      } else {
          addToast('Could not enhance text at this time.', 'info');
      }
    } catch (error) {
      addToast('Failed to connect to AI service.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnhance}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-300 
        ${isLoading 
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]'
        } ${className}`}
      title="Enhance with Gemini AI"
      type="button"
    >
      {isLoading ? (
        <>
            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Thinking...</span>
        </>
      ) : (
        <>
            <SparkleIcon className="w-3 h-3" />
            <span>AI Enhance</span>
        </>
      )}
    </button>
  );
};

export default MagicButton;