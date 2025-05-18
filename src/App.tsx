import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FlashcardsPage from "./pages/FlashcardsPage";
import QuizzesPage from "./pages/QuizzesPage";
import HabitsPage from "./pages/HabitsPage";
import CoursesPage from "./pages/CoursesPage";
import ProgressPage from "./pages/ProgressPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import LanguageFlashcardsPage from "./pages/LanguageFlashcardsPage";
import CourseDetailPage from '@/pages/CourseDetailPage';
import WelcomePage from '@/pages/WelcomPage';

const queryClient = new QueryClient();

// Enhanced cursor glow effect with better performance
const CursorGlowEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
    >
      <motion.div
        className="absolute bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
        style={{
          left: mousePosition.x - 75,
          top: mousePosition.y - 75,
          width: isHovering ? "150px" : "100px",
          height: isHovering ? "150px" : "100px",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
};

// Enhanced AnimatedRoute with better transitions
const AnimatedRoute = ({ element }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="min-h-screen"
      >
        {element}
      </motion.div>
    </AnimatePresence>
  );
};

// Enhanced AnimatedNavLink with better hover effects
const AnimatedNavLink = ({ children }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        filter: "brightness(1.2)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};

// Background animation component
const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
};

// Add context for the animated components
const MotionContext = React.createContext({ AnimatedNavLink });

const MotionProvider = ({ children }) => {
  return (
    <MotionContext.Provider value={{ AnimatedNavLink }}>
      {children}
    </MotionContext.Provider>
  );
};

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  
  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MotionProvider>
          <Toaster />
          <Sonner />
          <HotToaster position="top-right" />
          <CursorGlowEffect />
          
          {showWelcome ? (
            <WelcomePage onComplete={handleWelcomeComplete} />
          ) : (
            <>
              <BackgroundAnimation />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<AnimatedRoute element={<DashboardPage />} />} />
                  <Route path="/dashboard" element={<AnimatedRoute element={<DashboardPage />} />} />
                  <Route path="/flashcards" element={<AnimatedRoute element={<FlashcardsPage />} />} />
                  <Route path="/flashcards/:language" element={<AnimatedRoute element={<LanguageFlashcardsPage />} />} />
                  <Route path="/quizzes" element={<AnimatedRoute element={<QuizzesPage />} />} />
                  <Route path="/habits" element={<AnimatedRoute element={<HabitsPage />} />} />
                  <Route path="/courses" element={<AnimatedRoute element={<CoursesPage />} />} />
                  <Route path="/course/:courseId" element={<AnimatedRoute element={<CourseDetailPage />} />} />
                  <Route path="/profile" element={<AnimatedRoute element={<ProfilePage />} />} />
                  <Route path="*" element={<AnimatedRoute element={<NotFound />} />} />
                </Routes>
              </BrowserRouter>
            </>
          )}
        </MotionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;