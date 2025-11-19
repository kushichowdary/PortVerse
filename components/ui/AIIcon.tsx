import React from 'react';

export const AIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2V6" />
    <path d="M12 18V22" />
    <path d="M4.93 4.93L7.76 7.76" />
    <path d="M16.24 16.24L19.07 19.07" />
    <path d="M2 12H6" />
    <path d="M18 12H22" />
    <path d="M4.93 19.07L7.76 16.24" />
    <path d="M16.24 7.76L19.07 4.93" />
  </svg>
);

export const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);