import React from 'react';
import './CyberButton.css';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  themeColor?: string;
  type?: 'button' | 'submit' | 'reset';
}

const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  onClick,
  disabled,
  themeColor = '#22d3ee', // Default to cyan
  type = 'button'
}) => {
    
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };
  
  const rgbColor = hexToRgb(themeColor);
  const glowColor = rgbColor ? `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.7)` : 'rgba(34, 211, 238, 0.7)';

  return (
    <button
      className="cyber-button"
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{
        '--theme-color': themeColor,
        '--glow-color': glowColor,
      } as React.CSSProperties}
    >
      <div className="left">
        <div className="shadow_up" />
        <div className="shadow_down" />
      </div>
      <div className="right">
        {children}
        <div className="shadow_up" />
        <div className="shadow_down" />
        <svg className="wire_svg" viewBox="0 0 100 100">
          <path d="m0 20 h50 q 5 -2 -10 -10 q -5 0 -4 35 q 9 5 10 -10 q 0 -2 -50 0" strokeWidth="4px" fill="none" />
        </svg>
      </div>
    </button>
  );
};

export default CyberButton;