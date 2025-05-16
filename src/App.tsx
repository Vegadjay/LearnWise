
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from 'react-hot-toast';
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HotToaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/flashcards/:language" element={<LanguageFlashcardsPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
