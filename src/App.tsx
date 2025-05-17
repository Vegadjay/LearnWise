import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from 'react-hot-toast';
import { motion } from "framer-motion";
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

const queryClient = new QueryClient();

// Cursor glow effect component
const CursorGlowEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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

// AnimatedRoute component for page transitions
const AnimatedRoute = ({ element }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {element}
    </motion.div>
  );
};

// Animated navigation link component
const AnimatedNavLink = ({ children }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        filter: "brightness(1.2)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};

// Add context for the animated components
const MotionContext = React.createContext<{ AnimatedNavLink: typeof AnimatedNavLink } | null>(null);

const MotionProvider = ({ children }) => {
  return (
    <MotionContext.Provider value={{ AnimatedNavLink }}>
      {children}
    </MotionContext.Provider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MotionProvider>
        <Toaster />
        <Sonner />
        <HotToaster position="top-right" />
        <CursorGlowEffect />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AnimatedRoute element={<DashboardPage />} />} />
            <Route path="/dashboard" element={<AnimatedRoute element={<DashboardPage />} />} />
            <Route path="/flashcards" element={<AnimatedRoute element={<FlashcardsPage />} />} />
            <Route path="/flashcards/:language" element={<AnimatedRoute element={<LanguageFlashcardsPage />} />} />
            <Route path="/quizzes" element={<AnimatedRoute element={<QuizzesPage />} />} />
            <Route path="/habits" element={<AnimatedRoute element={<HabitsPage />} />} />
            <Route path="/courses" element={<AnimatedRoute element={<CoursesPage />} />} />
            <Route path="/progress" element={<AnimatedRoute element={<ProgressPage />} />} />
            <Route path="/profile" element={<AnimatedRoute element={<ProfilePage />} />} />
            <Route path="/course/:courseId" element={<CourseDetailPage />} />
            <Route path="*" element={<AnimatedRoute element={<NotFound />} />} />
          </Routes>
        </BrowserRouter>
      </MotionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;