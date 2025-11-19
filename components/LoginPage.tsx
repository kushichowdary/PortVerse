
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { initialPortfolioData } from '../contexts/PortfolioContext';
import Waves from './ui/Waves';
import FuzzyText from './ui/FuzzyText';
import './ui/Waves.css';

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    if (isSignUp && !name.trim()) {
        setError('Please enter your full name.');
        return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        // Initialize user data in localStorage with their name so the builder picks it up immediately
        const newUserPortfolio = { 
            ...initialPortfolioData, 
            name: name.trim(),
            contactEmail: email // Also helpful to pre-fill email
        };
        localStorage.setItem('portfolioData', JSON.stringify(newUserPortfolio));

      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // App.tsx's onAuthStateChanged will handle the rest.
    } catch (err: any) {
      let friendlyMessage = 'An error occurred. Please try again.';
      if (err.code) {
        switch (err.code) {
          case 'auth/invalid-email':
            friendlyMessage = 'Please enter a valid email address.';
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            friendlyMessage = 'Invalid email or password.';
            break;
          case 'auth/email-already-in-use':
            friendlyMessage = 'An account with this email already exists.';
            break;
          case 'auth/weak-password':
            friendlyMessage = 'Password should be at least 6 characters long.';
            break;
          default:
            friendlyMessage = 'Authentication failed. Please try again later.';
        }
      }
      setError(friendlyMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a] p-4">
      <Waves 
        lineColor="rgba(139, 92, 246, 0.2)"
        waveAmpX={50}
        waveAmpY={25}
        xGap={15}
        yGap={25}
        friction={0.96}
        tension={0.01}
        backgroundColor="#0f172a"
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center flex flex-col items-center w-full max-w-md"
      >
        {/* Cinematic Title Animation */}
        <div className="mb-6 relative z-20 flex flex-col items-center justify-center group cursor-default">
           <FuzzyText 
             fontSize="clamp(3rem, 5vw, 4.5rem)" 
             fontWeight={900} 
             fontFamily="Orbitron, sans-serif" 
             color="#8b5cf6"
             enableHover={true}
             baseIntensity={0.15}
             hoverIntensity={0.5}
           >
             PORTVERSE
           </FuzzyText>
        </div>

        <p className="mt-2 text-lg font-light text-slate-400 tracking-wide">
          {isSignUp ? 'Design your future.' : 'Enter the portal.'}
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full mt-8 p-8 login-card-interactive rounded-2xl space-y-6 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Subtle grid background for form */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          {error && (
             <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-300 bg-red-900/30 p-3 rounded-lg border border-red-500/30 text-sm flex items-center gap-2 backdrop-blur-sm"
             >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
             </motion.div>
          )}
          
          <AnimatePresence>
            {isSignUp && (
                <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden"
                >
                     <div className="relative">
                        <label className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1 block ml-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field-modern w-full"
                            placeholder="e.g. Alex Sterling"
                            required={isSignUp}
                            autoComplete="name"
                        />
                     </div>
                </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <label className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1 block ml-1">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field-modern w-full"
                placeholder="name@example.com"
                required
                autoComplete="email"
            />
          </div>

          <div className="relative">
            <label className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1 block ml-1">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field-modern w-full"
                placeholder="••••••••"
                required
                autoComplete={isSignUp ? "new-password" : "current-password"}
            />
          </div>

          <div className="pt-4">
             <button
                type="submit"
                disabled={isSubmitting}
                className="btn-modern primary w-full py-3.5 text-base relative overflow-hidden group"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                    {isSubmitting ? 'Processing...' : (isSignUp ? 'Create Account' : 'Access Workspace')}
                </span>
                {/* Button hover shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </button>
          </div>
        </motion.form>
        <p className="mt-8 text-slate-500 text-sm">
          {isSignUp ? 'Already initialized? ' : "New to the system? "}
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }} 
            className="font-bold text-violet-400 hover:text-violet-300 transition-colors border-b border-transparent hover:border-violet-300 pb-0.5"
          >
            {isSignUp ? 'Login' : 'Initialize'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
