
import React from 'react';
import { Sidebar } from './Sidebar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <motion.main 
        className="flex-1 overflow-auto"
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
        <Footer />
      </motion.main>
    </div>
  );
};

export default AppLayout;
