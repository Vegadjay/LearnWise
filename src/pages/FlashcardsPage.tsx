import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { BookOpen, Code, Database, Globe, FileText, Cpu, PenTool, BrainCircuit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const languages = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Popular language for web development',
    icon: <Code className="h-12 w-12 text-yellow-500" />,
    cardCount: 12,
    color: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
    difficulty: 'Medium'
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Versatile language for many applications',
    icon: <Code className="h-12 w-12 text-blue-500" />,
    cardCount: 15,
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    difficulty: 'Easy'
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Object-oriented programming language',
    icon: <Code className="h-12 w-12 text-orange-600" />,
    cardCount: 10,
    color: 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800',
    difficulty: 'Hard'
  },
  {
    id: 'sql',
    name: 'SQL',
    description: 'Database query language',
    icon: <Database className="h-12 w-12 text-green-600" />,
    cardCount: 8,
    color: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
    difficulty: 'Medium'
  },
  {
    id: 'html',
    name: 'HTML & CSS',
    description: 'Web page structure and styling',
    icon: <Globe className="h-12 w-12 text-indigo-500" />,
    cardCount: 14,
    color: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800',
    difficulty: 'Easy'
  },
  {
    id: 'csharp',
    name: 'C#',
    description: 'Language for .NET development',
    icon: <Code className="h-12 w-12 text-purple-600" />,
    cardCount: 9,
    color: 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800',
    difficulty: 'Hard'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Typed superset of JavaScript',
    icon: <Code className="h-12 w-12 text-blue-600" />,
    cardCount: 11,
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    difficulty: 'Medium'
  },
  {
    id: 'react',
    name: 'React',
    description: 'JavaScript library for UI',
    icon: <Code className="h-12 w-12 text-cyan-500" />,
    cardCount: 13,
    color: 'bg-cyan-50 border-cyan-200 dark:bg-cyan-900/20 dark:border-cyan-800',
    difficulty: 'Medium'
  },
];

// Animated card component with mouse position tracking
const AnimatedCard = ({ language, onClick }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smoother movement
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [0, 300], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 300], [-5, 5]), springConfig);
  
  // Gradient movement based on mouse position
  const gradientX = useSpring(useTransform(mouseX, [0, 300], [0, 100]), springConfig);
  const gradientY = useSpring(useTransform(mouseY, [0, 300], [0, 100]), springConfig);
  const gradient = useMotionTemplate`radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255, 255, 255, 0.15), transparent 80%)`;
  
  // Handle mouse move on card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const getBadgeVariant = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        perspective: 1000,
      }}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="cursor-pointer w-full"
    >
      <motion.div
        style={{
          rotateX: hovered ? rotateX : 0,
          rotateY: hovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        variants={itemVariants}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className={`border-2 ${language.color} h-full rounded-lg shadow-lg overflow-hidden relative`}
          whileHover={{ 
            y: -10,
            transition: { duration: 0.2 }
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 z-10 opacity-0 pointer-events-none"
            style={{ background: gradient, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
          
          <CardHeader className="pb-2 relative">
            <div className="flex flex-row items-center space-y-0">
              <motion.div 
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.2
                }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm"
              >
                {language.icon}
              </motion.div>
              <motion.div 
                className="ml-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <CardTitle>{language.name}</CardTitle>
                <CardDescription className="text-xs mt-1">{language.cardCount} cards</CardDescription>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <motion.p 
              className="text-sm text-muted-foreground"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {language.description}
            </motion.p>
          </CardContent>
          
          {/* 3D floating elements */}
          <motion.div 
            className="absolute bottom-2 right-2 opacity-0 z-20"
            style={{ 
              opacity: hovered ? 1 : 0,
              transform: "translateZ(20px)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="text-xs font-medium text-primary bg-background/80 px-2 py-1 rounded-full"
              initial={{ y: 10, opacity: 0 }}
              animate={hovered ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Start Learning
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const FlashcardsPage = () => {
  const navigate = useNavigate();
  
  return ( 
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4"
      >
        <header className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold mb-2"
          >
            Language Flashcards
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground"
          >
            Choose a language to practice with spaced repetition flashcards
          </motion.p>
        </header>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {languages.map((language) => (
            <AnimatedCard 
              key={language.id}
              language={language}
              onClick={() => navigate(`/flashcards/${language.id}`)}
            />
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card-animated"
        >
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Spaced Repetition Learning</CardTitle>
              <CardDescription>
                Flashcards use spaced repetition to help you remember information over the long term
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ y: -5 }} 
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <motion.div 
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-edu-indigo-100 dark:bg-edu-indigo-900/30 rounded-full p-3 mb-4"
                  >
                    <BrainCircuit className="h-8 w-8 text-edu-indigo-600 dark:text-edu-indigo-400" />
                  </motion.div>
                  <h3 className="text-lg font-medium mb-2">Memory Reinforcement</h3>
                  <p className="text-sm text-muted-foreground">
                    Cards you find difficult appear more frequently, strengthening memory pathways
                  </p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }} 
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <motion.div 
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                    className="bg-edu-blue-100 dark:bg-edu-blue-900/30 rounded-full p-3 mb-4"
                  >
                    <Cpu className="h-8 w-8 text-edu-blue-600 dark:text-edu-blue-400" />
                  </motion.div>
                  <h3 className="text-lg font-medium mb-2">Adaptive Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    The system adapts to your learning pace and knowledge level
                  </p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }} 
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <motion.div 
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
                    className="bg-edu-teal-100 dark:bg-edu-teal-900/30 rounded-full p-3 mb-4"
                  >
                    <PenTool className="h-8 w-8 text-edu-teal-600 dark:text-edu-teal-400" />
                  </motion.div>
                  <h3 className="text-lg font-medium mb-2">Effective Practice</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular review sessions help move knowledge to long-term memory
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default FlashcardsPage;