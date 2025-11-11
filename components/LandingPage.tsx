
import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black p-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50 animate-gradient-xy"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      </div>
      
      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

        <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-500">
          PortaVerse
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-light text-gray-300 max-w-2xl">
          Design Your Future. <span className="font-semibold text-white">Generate Your Portfolio.</span>
        </p>
        
        <button
          onClick={onGetStarted}
          className="mt-12 px-8 py-4 bg-cyan-500/10 border-2 border-cyan-400 text-cyan-300 font-orbitron text-lg uppercase rounded-lg backdrop-blur-sm
                     hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_theme(colors.cyan.400),0_0_40px_theme(colors.cyan.500)] 
                     transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
      <style>{`
        @keyframes gradient-xy {
          0%, 100% {
            background-size: 400% 400%;
            background-position: top center;
          }
          50% {
            background-size: 200% 200%;
            background-position: bottom center;
          }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-4000 {
          animation-delay: -4s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
