import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Book, BarChart, Bookmark, CheckSquare, GraduationCap, Home, ChevronLeft, ChevronRight, User, ArrowLeft, Lock, Unlock, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  // Get lock state from localStorage or default to false
  const [isLocked, setIsLocked] = useState(() => {
    const savedLockState = localStorage.getItem('sidebarLocked');
    return savedLockState ? JSON.parse(savedLockState) : false;
  });

  // Save lock state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarLocked', JSON.stringify(isLocked));
  }, [isLocked]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Load the collapsed state from localStorage
  useEffect(() => {
    const savedCollapsedState = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsedState !== null) {
      setIsCollapsed(JSON.parse(savedCollapsedState));
    }
  }, []);

  // Save the collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const navItems = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/' },
    { name: 'Flashcards', icon: <Book className="h-5 w-5" />, href: '/flashcards' },
    { name: 'Quizzes', icon: <GraduationCap className="h-5 w-5" />, href: '/quizzes' },
    { name: 'Habits', icon: <CheckSquare className="h-5 w-5" />, href: '/habits' },
    { name: 'Courses', icon: <Bookmark className="h-5 w-5" />, href: '/courses' },
    { name: 'Profile', icon: <User className="h-5 w-5" />, href: '/profile' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    toast.success(isLocked ? 'Sidebar unlocked' : 'Sidebar locked');
  };

  const handleGoBack = () => {
    navigate(-1);
    toast.success('Navigated back');
  };

  // Auto-expand on hover for desktop - only if not locked
  const handleMouseEnter = () => {
    if (!isMobile && isCollapsed && !isLocked) {
      setIsCollapsed(false);
    }
  };

  // Auto-collapse on mouse leave - only if not locked
  const handleMouseLeave = () => {
    if (!isMobile && !isCollapsed && !isLocked) {
      setIsCollapsed(true);
    }
  };

  // Animation variants
  const sidebarVariants = {
    expanded: {
      width: '240px',
      transition: {
        duration: 0.3,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    collapsed: {
      width: '80px',
      transition: {
        duration: 0.3,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const toggleButtonVariants = {
    expanded: { rotate: 0 },
    collapsed: { rotate: 180 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.25
      }
    })
  };

  // Define hover animation for background color
  const hoverBackgroundVariants = {
    initial: { backgroundColor: "rgba(var(--accent), 0)" },
    hover: { 
      backgroundColor: "rgba(var(--primary), 0.2)", 
      transition: { duration: 0.3 } 
    }
  };

  return (
    <>
      <motion.aside
        className="sidebar border-r bg-card h-screen flex flex-col relative z-20 shadow-lg"
        initial={false}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-4">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                className="flex items-center justify-between pb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="h-8 w-8 rounded-full bg-primary flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                  >
                    <span className="text-primary-foreground font-medium text-lg">L</span>
                  </motion.div>
                  <motion.h1
                    className="text-xl font-bold text-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    LearnWise
                  </motion.h1>
                </div>
                <motion.button
                  onClick={toggleLock}
                  className={cn(
                    "rounded-md p-1.5 transition-colors",
                    isLocked 
                      ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30" 
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isLocked ? "Unlock sidebar" : "Lock sidebar"}
                  title={isLocked ? "Unlock sidebar" : "Lock sidebar"}
                >
                  {isLocked ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <div className="flex flex-col items-center gap-4 pb-4">
              <motion.div
                className="h-8 w-8 rounded-full bg-primary flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, type: 'spring' }}
              >
                <span className="text-primary-foreground font-medium text-lg">L</span>
              </motion.div>
              <motion.button
                onClick={toggleLock}
                className={cn(
                  "rounded-md p-1.5 transition-colors",
                  isLocked 
                    ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30" 
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isLocked ? "Unlock sidebar" : "Lock sidebar"}
                title={isLocked ? "Unlock sidebar" : "Lock sidebar"}
              >
                {isLocked ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <Unlock className="h-4 w-4" />
                )}
              </motion.button>
            </div>
          )}
        </div>

        <div className="px-2 mb-2 flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center gap-2 group"
            onClick={handleGoBack}
          >
            <motion.span
              whileHover={{ x: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="inline-flex items-center"
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.span>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Go Back
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "w-full flex items-center justify-center gap-2 group",
              isCollapsed ? "justify-center" : "justify-between"
            )}
            onClick={toggleSidebar}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <>
                <span className="flex items-center gap-2">
                  <PanelLeftClose className="h-4 w-4" />
                  <span>Collapse</span>
                </span>
                <ChevronLeft className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        <nav className="flex-1 overflow-auto px-2">
          <ul className="space-y-1 py-2">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;

              return (
                <motion.li
                  key={item.name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  onMouseEnter={() => setIsHovering(item.name)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center h-10 px-3 py-2 text-sm rounded-md relative overflow-hidden group",
                      isActive
                        ? "text-primary-foreground font-medium"
                        : "text-foreground/70 transition-colors"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-primary z-0"
                        layoutId="sidebar-highlight"
                        transition={{
                          type: "spring",
                          duration: 0.5,
                          bounce: 0.2
                        }}
                        initial={false}
                      />
                    )}

                    {!isActive && isHovering === item.name && (
                      <motion.div
                        className="absolute inset-0 z-0"
                        initial={{ 
                          backgroundColor: "rgba(var(--accent), 0.2)",
                          borderLeft: "0px solid rgba(var(--primary), 0.5)" 
                        }}
                        animate={{ 
                          backgroundColor: "rgba(var(--primary), 0.15)",
                          borderLeft: "4px solid rgba(var(--primary), 0.8)" 
                        }}
                        exit={{ 
                          backgroundColor: "rgba(var(--accent), 0)",
                          borderLeft: "0px solid rgba(var(--primary), 0)" 
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-x-3">
                      <motion.div
                        whileHover={{ rotate: isActive ? 0 : 10, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          isHovering === item.name && !isActive ? "text-primary" : ""
                        )}
                      >
                        {item.icon}
                      </motion.div>
                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                              "whitespace-nowrap overflow-hidden",
                              isHovering === item.name && !isActive ? "text-primary font-medium" : ""
                            )}
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t p-4">
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-edu-indigo-200 flex items-center justify-center">
                  <span className="text-edu-indigo-700 font-medium">U</span>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">User</p>
                  <p className="text-xs text-muted-foreground">student@learn.wise</p>
                </div>
              </div>
            )}
            {/* ThemeToggle outside of AnimatePresence to ensure it works correctly */}
            <div className={cn("theme-toggle-container", isCollapsed ? "w-full flex justify-center" : "")}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile overlay when sidebar is open */}
      {isMobile && !isCollapsed && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
};