import React, { useState } from 'react';
import PortfolioBuilder from './components/PortfolioBuilder';
import LoginPage from './components/LoginPage';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white antialiased">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoginPage onLogin={() => setIsAuthenticated(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="builder"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <PortfolioBuilder />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;