import React, { useState, useEffect } from 'react';
import PortfolioBuilder from './components/PortfolioBuilder';
import LoginPage from './components/LoginPage';
import { AnimatePresence, motion } from 'framer-motion';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { ToastProvider } from './hooks/useToast';
import { auth } from './services/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
        console.error("Error signing out: ", error);
    }
  };
  
  if (isLoading) {
    return (
        <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center text-center">
            <h1 className="font-orbitron text-3xl text-cyan-400 animate-pulse">Loading Portverse...</h1>
        </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white antialiased">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoginPage />
          </motion.div>
        ) : (
          <motion.div
            key="builder"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <PortfolioProvider>
              <ToastProvider>
                <PortfolioBuilder onLogout={handleLogout} />
              </ToastProvider>
            </PortfolioProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;