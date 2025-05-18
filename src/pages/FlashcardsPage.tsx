import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Database, Globe, FileText, Cpu, PenTool, BrainCircuit, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from '../components/AnimatedTitle';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoother motion
    }
  }
};

// Updated icon sizes from h-12 w-12 to h-8 w-8
const languages = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Popular language for web development',
    icon: './public/logos/JS.svg',
    cardCount: 12,
    color: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
    difficulty: 'Medium',
    tagColor: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40 dark:text-yellow-300'
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Versatile language for many applications',
    icon: "./public/logos/Python.svg",
    cardCount: 15,
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    difficulty: 'Easy',
    tagColor: 'text-blue-600 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300'
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Object-oriented programming language',
    icon: "./public/logos/java.png",
    cardCount: 10,
    color: 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800',
    difficulty: 'Hard',
    tagColor: 'text-orange-600 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-300'
  },
  {
    id: 'sql',
    name: 'SQL',
    description: 'Database query language',
    icon: "./public/logos/sql-server.png",
    cardCount: 8,
    color: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
    difficulty: 'Medium',
    tagColor: 'text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-300'
  },
  {
    id: 'html',
    name: 'HTML & CSS',
    description: 'Web page structure and styling',
    icon: <Globe className="h-8 w-8 text-indigo-500" />,
    cardCount: 14,
    color: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800',
    difficulty: 'Easy',
    tagColor: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-300'
  },
  {
    id: 'csharp',
    name: 'C#',
    description: 'Language for .NET development',
    icon: "./public/logos/c-sharp.png",
    cardCount: 9,
    color: 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800',
    difficulty: 'Hard',
    tagColor: 'text-purple-600 bg-purple-100 dark:bg-purple-900/40 dark:text-purple-300'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Typed superset of JavaScript',
    icon: "./public/logos/typescript.png",
    cardCount: 11,
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    difficulty: 'Medium',
    tagColor: 'text-blue-600 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300'
  },
  {
    id: 'react',
    name: 'React',
    description: 'JavaScript library for UI',
    icon: "./public/logos/science.png",
    cardCount: 13,
    color: 'bg-cyan-50 border-cyan-200 dark:bg-cyan-900/20 dark:border-cyan-800',
    difficulty: 'Medium',
    tagColor: 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900/40 dark:text-cyan-300'
  },
];

// Enhanced animated card component with GSAP and Framer Motion - FIXED VERSION
const AnimatedCard = ({ language, onClick, index }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const contentRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smoother movement - reduced values for better visibility
  const springConfig = { damping: 30, stiffness: 350 };
  const rotateX = useSpring(useTransform(mouseY, [0, 300], [3, -3]), springConfig); // Reduced rotation
  const rotateY = useSpring(useTransform(mouseX, [0, 300], [-3, 3]), springConfig); // Reduced rotation
  
  // Gradient movement based on mouse position
  const gradientX = useSpring(useTransform(mouseX, [0, 300], [0, 100]), springConfig);
  const gradientY = useSpring(useTransform(mouseY, [0, 300], [0, 100]), springConfig);
  const gradient = useMotionTemplate`radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255, 255, 255, 0.18), transparent 80%)`;
  
  // Handle mouse move on card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  useEffect(() => {
    // GSAP animation for card entrance
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out",
        delay: 0.1 * index
      }
    );
    
    // GSAP animation for icon
    gsap.fromTo(iconRef.current,
      { scale: 0.8, rotation: -15 },
      { 
        scale: 1, 
        rotation: 0, 
        duration: 1, 
        ease: "elastic.out(1, 0.5)",
        delay: 0.3 + (0.1 * index)
      }
    );
    
    // GSAP animation for content
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: -20 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        ease: "power2.out",
        delay: 0.5 + (0.1 * index)
      }
    );
  }, []);

  // Difficulty badge styling
  const getDifficultyBadge = (difficulty) => {
    let badgeClasses = "text-xs font-medium px-2 py-1 rounded-full";
    
    switch(difficulty) {
      case 'Easy': 
        return <span className={`${badgeClasses} bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300`}>
          {difficulty}
        </span>;
      case 'Medium': 
        return <span className={`${badgeClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300`}>
          {difficulty}
        </span>;
      case 'Hard': 
        return <span className={`${badgeClasses} bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300`}>
          {difficulty}
        </span>;
      default: 
        return <span className={`${badgeClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300`}>
          {difficulty}
        </span>;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        perspective: 1200,
      }}
      className={`card-${language.id} cursor-pointer w-full relative`}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <motion.div
        style={{
          rotateX: hovered ? rotateX : 0,
          rotateY: hovered ? rotateY : 0,
        }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <motion.div 
          className={`border-2 ${language.color} h-full rounded-lg shadow-lg overflow-hidden relative bg-white dark:bg-gray-800`}
          whileHover={{ 
            y: -5, // Reduced hover lift for better visibility
            boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.3, ease: "easeOut" }
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: gradient, opacity: hovered ? 0.8 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <CardHeader className="pb-2 relative">
            <div className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center">
                <motion.div 
                  ref={iconRef}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-md flex-shrink-0"
                >
                  {typeof language.icon === 'string' ? (
                    <img src={language.icon} alt="" className="h-8 w-8" />
                  ) : (
                    language.icon
                  )}
                </motion.div>
                <motion.div 
                  className="ml-4 overflow-visible"
                  ref={contentRef}
                >
                  <CardTitle className="group flex items-center text-lg">
                    {language.name}
                    <motion.span 
                      initial={{ x: -5, opacity: 0 }}
                      animate={hovered ? { x: 0, opacity: 1 } : { x: -5, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary ml-2"
                    >
                      <ChevronRight size={16} />
                    </motion.span>
                  </CardTitle>
                  <div className="flex items-center mt-1 space-x-2">
                    <CardDescription className="text-xs">
                      {language.cardCount} cards
                    </CardDescription>
                    {getDifficultyBadge(language.difficulty)}
                  </div>
                </motion.div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {language.description}
            </p>
            
            {/* Card count progress indicator */}
            <div className="mt-4 relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary dark:bg-primary/80 rounded-full"
                style={{ 
                  width: `${(language.cardCount / 15) * 100}%`,
                }}
                whileHover={{ scaleX: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            
            {/* "Start Learning" button */}
            <motion.div 
              className="mt-3 flex justify-end"
              initial={{ opacity: 0 }}
              animate={hovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span 
                className={`${language.tagColor} text-xs font-medium px-3 py-1.5 rounded-full flex items-center`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Start Learning
                <ChevronRight size={14} className="ml-1" />
              </motion.span>
            </motion.div>
          </CardContent>
          
          {/* Card decorative element */}
          <motion.div 
            className="absolute top-2 right-2 h-10 w-10 rounded-full opacity-10 bg-gradient-to-br from-primary to-primary/50"
            animate={hovered ? { scale: 1.5, opacity: 0.15 } : { scale: 1, opacity: 0.1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ParallaxText = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useSpring({ scrollY: 0 });
  
  useEffect(() => {
    let ticker = null;
    let lastTime = null;
    
    const tick = () => {
      if (lastTime) {
        const delta = (performance.now() - lastTime) / 1000;
        baseX.set(baseX.get() + baseVelocity * delta);
      }
      lastTime = performance.now();
      ticker = requestAnimationFrame(tick);
    };
    
    ticker = requestAnimationFrame(tick);
    
    return () => {
      cancelAnimationFrame(ticker);
    };
  }, [baseVelocity, baseX]);
  
  const x = useTransform(baseX, (v) => `${v % 100}%`);
  
  return (
    <div className="flex flex-nowrap whitespace-nowrap overflow-hidden">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        <span className="block mr-4">{children}</span>
        <span className="block mr-4">{children}</span>
        <span className="block mr-4">{children}</span>
        <span className="block mr-4">{children}</span>
      </motion.div>
    </div>
  );
};

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const featuresRef = useRef(null);
  const parallaxRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  
  useEffect(() => {
    // GSAP animations for page elements
    gsap.fromTo(headerRef.current.querySelector('h1'), 
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
    
    gsap.fromTo(headerRef.current.querySelector('p'), 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );
    
    // ScrollTrigger animation for features section
    gsap.fromTo(featuresRef.current, 
      { opacity: 0, y: 50 },
      { 
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
        },
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out" 
      }
    );
    
    // Animation for parallax banner
    gsap.fromTo(parallaxRef.current,
      { opacity: 0 },
      { 
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
        opacity: 1, 
        duration: 1
      }
    );
    
    // Clean up GSAP animations
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return ( 
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4">
        <header ref={headerRef} className="mb-12 mt-6">
          <AnimatedTitle 
            title="Flashcards"
            subtitle="Master your knowledge"
          />
        </header>
        
        {/* Moving parallax banner */}
        <div 
          ref={parallaxRef}
          className="relative w-full bg-primary/10 dark:bg-primary/5 py-2 rounded-lg mb-12 overflow-hidden"
        >
          <ParallaxText baseVelocity={-5}>
            <span className="text-sm font-medium text-primary/80 px-4">
              JavaScript • Python • Java • SQL • HTML • CSS • TypeScript • React • C# • Ruby • PHP • Go
            </span>
          </ParallaxText>
        </div>
        
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {languages.map((language, index) => (
              <AnimatedCard 
                key={language.id}
                language={language}
                index={index}
                onClick={() => {
                  setActiveCard(language.id);
                  // Create a flash animation before navigation
                  gsap.to(`.card-${language.id}`, {
                    boxShadow: "0 0 30px rgba(var(--color-primary), 0.7)",
                    duration: 0.3,
                    onComplete: () => navigate(`/flashcards/${language.id}`)
                  });
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        
        
        {/* Final CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="my-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to master programming languages?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Start your learning journey today with our interactive flashcards and watch your programming skills grow
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl"
            onClick={() => navigate('/flashcards/javascript')}
          >
            Get Started Now
          </motion.button>
          
          <motion.div 
            className="mt-4 text-xs text-muted-foreground"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            No account required • 100+ free cards
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default FlashcardsPage;