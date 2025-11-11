import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    if (email && password) {
      onLogin();
    } else {
      alert('Please enter your credentials.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-4">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-500/50 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-cyan-500/50 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center flex flex-col items-center w-full max-w-md"
      >
        <h1 className="font-orbitron text-5xl md:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-500">
          PortaVerse
        </h1>
        <p className="mt-2 text-lg font-light text-gray-400">
          Sign in to design your future.
        </p>

        <motion.form
          onSubmit={handleLogin}
          className="w-full mt-12 p-8 glass-pane rounded-2xl space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button
            type="submit"
            className="w-full px-8 py-3 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 font-orbitron text-lg uppercase rounded-lg backdrop-blur-sm
                     hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_theme(colors.cyan.400),0_0_40px_theme(colors.cyan.500)] 
                     transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
          >
            Login
          </button>
        </motion.form>
      </motion.div>
      <style>{`
        .input-field {
          width: 100%;
          background-color: rgba(0,0,0,0.3);
          border: 1px solid rgba(0, 255, 255, 0.2);
          color: #e0e0e0;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease-in-out;
          font-size: 1rem;
        }
        .input-field::placeholder {
          color: #777;
        }
        .input-field:focus {
          outline: none;
          border-color: #00ffff;
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-4000 {
          animation-delay: -4s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
