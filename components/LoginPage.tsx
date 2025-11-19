import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { initialPortfolioData } from '../contexts/PortfolioContext';
import Waves from './ui/Waves';
import TrueFocus from './ui/TrueFocus';
import './ui/Waves.css';
import './ui/TrueFocus.css';

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
        <div className="h-24 flex items-center justify-center">
          <TrueFocus
            sentence="Portverse"
            manualMode={true}
            borderColor="#8b5cf6"
            glowColor="rgba(139, 92, 246, 0.6)"
            animationDuration={0.3}
            blurAmount={3}
          />
        </div>

        <p className="mt-2 text-lg font-light text-slate-400">
          {isSignUp ? 'Create an account to start building.' : 'Sign in to your workspace.'}
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full mt-12 p-8 login-card-interactive rounded-2xl space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {error && <p className="text-red-400 bg-red-900/20 p-3 rounded-md border border-red-900/50 text-sm">{error}</p>}
          
          <AnimatePresence>
            {isSignUp && (
                <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden"
                >
                     <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field-modern"
                        required={isSignUp}
                        autoComplete="name"
                    />
                </motion.div>
            )}
          </AnimatePresence>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field-modern"
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field-modern"
            required
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
          <div className="pt-2">
             <button
                type="submit"
                disabled={isSubmitting}
                className="btn-modern primary w-full py-3 text-base"
            >
                {isSubmitting ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
            </button>
          </div>
        </motion.form>
        <p className="mt-6 text-slate-400 text-sm">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }} 
            className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;