import React, { useEffect, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import HabitTracker from '@/components/habits/HabitTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CheckCircle, TrendingUp, BookOpen, Award, Calendar } from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HabitsPage = () => {
  const cardsRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    const ctx = gsap.context(() => {
      // Stagger animation for the cards
      gsap.from('.habit-card', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      });
    });

    return () => ctx.revert(); // Clean up animations
  }, []);

  // Animation variants for Framer Motion
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.99] }
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Header Section */}
        <motion.header 
          ref={headerRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Habit Tracker</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Build consistent routines and track your progress to achieve your learning goals
          </p>
        </motion.header>
        
        {/* Main Tracker Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="shadow-lg border-0 shadow-blue-900/5 overflow-hidden bg-gradient-to-br from-white to-blue-50/80 dark:from-gray-900 dark:to-gray-800">
            <CardHeader className="bg-blue-50/50 dark:bg-gray-800/50 border-b border-blue-100/50 dark:border-gray-700">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-xl">Your Habits Dashboard</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 pb-8">
              <HabitTracker />
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Cards Section */}
        <motion.div 
          ref={cardsRef}
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Building Good Habits Card */}
          <motion.div variants={itemVariant} className="habit-card">
            <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <CardTitle>Building Good Habits</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-5">
                  Consistency is key when forming new habits. Research suggests it takes about 66 days for a new behavior to become automatic.
                </p>
                <div className="space-y-4">
                  {[
                    {icon: <CheckCircle className="h-5 w-5 text-green-500" />, text: "Start with small, achievable goals"},
                    {icon: <TrendingUp className="h-5 w-5 text-blue-500" />, text: "Track your progress daily"},
                    {icon: <Award className="h-5 w-5 text-amber-500" />, text: "Don't break the chain - maintain streaks"},
                    {icon: <CheckCircle className="h-5 w-5 text-green-500" />, text: "If you miss a day, resume immediately"},
                    {icon: <Award className="h-5 w-5 text-amber-500" />, text: "Celebrate your achievements"}
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-0.5">{item.icon}</div>
                      <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Effective Study Habits Card */}
          <motion.div variants={itemVariant} className="habit-card">
            <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <CardTitle>Effective Study Habits</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-5">
                  Incorporate these evidence-based study techniques into your routine to maximize learning efficiency.
                </p>
                <div className="space-y-4">
                  {[
                    {icon: <BookOpen className="h-5 w-5 text-purple-500" />, text: "Spaced repetition: Review material at increasing intervals"},
                    {icon: <CheckCircle className="h-5 w-5 text-green-500" />, text: "Active recall: Test yourself instead of passively reviewing"},
                    {icon: <TrendingUp className="h-5 w-5 text-blue-500" />, text: "Interleaved practice: Mix different topics in study sessions"},
                    {icon: <BookOpen className="h-5 w-5 text-purple-500" />, text: "Elaboration: Connect new concepts to what you already know"},
                    {icon: <CheckCircle className="h-5 w-5 text-green-500" />, text: "Use the Pomodoro technique (25 min work, 5 min break)"}
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-0.5">{item.icon}</div>
                      <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Additional Information Card */}
          <motion.div variants={itemVariant} className="habit-card md:col-span-2">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  <CardTitle>Your Progress Journey</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Consistency",
                      icon: <TrendingUp className="h-8 w-8 text-blue-500 mb-3" />,
                      text: "Regular practice, even in small amounts, builds stronger neural pathways than occasional cramming."
                    },
                    {
                      title: "Mindfulness",
                      icon: <Award className="h-8 w-8 text-amber-500 mb-3" />,
                      text: "Being present and focused during your study sessions dramatically increases retention and understanding."
                    },
                    {
                      title: "Reflection",
                      icon: <BookOpen className="h-8 w-8 text-purple-500 mb-3" />,
                      text: "Taking time to review what you've learned and how you're progressing helps cement knowledge and refine strategies."
                    }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex justify-center">{item.icon}</div>
                      <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default HabitsPage;