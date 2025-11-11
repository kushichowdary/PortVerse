import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Waves from './ui/Waves';
import TrueFocus from './ui/TrueFocus';
import CyberButton from './ui/CyberButton';
import './ui/Waves.css';
import './ui/TrueFocus.css';

const LoginPage: React.FC = () => {
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
    setError('');
    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-4">
      <Waves 
        lineColor="rgba(34, 211, 238, 0.15)"
        waveAmpX={64}
        waveAmpY={32}
        xGap={20}
        yGap={20}
        friction={0.95}
        tension={0.002}
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center flex flex-col items-center w-full max-w-md"
      >
        <div className="h-24 flex items-center">
          <TrueFocus
            sentence="Portverse"
            manualMode={true}
            borderColor="#22d3ee"
            glowColor="rgba(34, 211, 238, 0.6)"
            animationDuration={0.3}
            blurAmount={3}
          />
        </div>

        <p className="mt-2 text-lg font-light text-gray-400">
          {isSignUp ? 'Create an account to design your future.' : 'Sign in to design your future.'}
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full mt-12 p-8 glass-pane rounded-2xl space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
          <div className="pt-2">
            <CyberButton
                type="submit"
                disabled={isSubmitting}
                themeColor="#22d3ee"
            >
                {isSubmitting ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
            </CyberButton>
          </div>
        </form>
        <p className="mt-6 text-gray-400">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }} 
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
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
      `}</style>
    </div>
  );
};

export default LoginPage;