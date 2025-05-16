
import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Book, BarChart, Bookmark, CheckSquare, GraduationCap, Home, ChevronLeft, ChevronRight, User, ArrowLeft } from 'lucide-react';
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

  const navItems = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/' },
    { name: 'Flashcards', icon: <Book className="h-5 w-5" />, href: '/flashcards' },
    { name: 'Quizzes', icon: <GraduationCap className="h-5 w-5" />, href: '/quizzes' },
    { name: 'Habits', icon: <CheckSquare className="h-5 w-5" />, href: '/habits' },
    { name: 'Courses', icon: <Bookmark className="h-5 w-5" />, href: '/courses' },
    { name: 'Progress', icon: <BarChart className="h-5 w-5" />, href: '/progress' },
    { name: 'Profile', icon: <User className="h-5 w-5" />, href: '/profile' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleGoBack = () => {
    navigate(-1);
    toast.success('Navigated back');
  };

  return (
    <>
      <motion.aside 
        className="sidebar border-r bg-card h-screen flex flex-col relative z-20"
        initial={false}
        animate={{ width: isCollapsed ? '80px' : '240px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <button 
          onClick={toggleSidebar} 
          className="absolute -right-3 top-6 bg-primary text-white rounded-full p-1 shadow-md z-10 hover:bg-primary/90 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? 
            <ChevronRight className="h-4 w-4" /> : 
            <ChevronLeft className="h-4 w-4" />
          }
        </button>

        <div className="p-4">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                className="flex items-center space-x-2 pb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-lg">L</span>
                </div>
                <h1 className="text-xl font-bold text-foreground">LearnWise</h1>
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <div className="flex justify-center pb-4">
              <motion.div 
                className="h-8 w-8 rounded-full bg-primary flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-primary-foreground font-medium text-lg">L</span>
              </motion.div>
            </div>
          )}
        </div>

        <div className="px-2 mb-4">
          <Button 
            variant="outline" 
            size="sm"
            className="w-full flex items-center justify-center gap-2 hover:bg-accent"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
            {!isCollapsed && <span>Go Back</span>}
          </Button>
        </div>

        <nav className="flex-1 overflow-auto px-2">
          <ul className="space-y-1 py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center h-10 px-3 py-2 text-sm rounded-md relative overflow-hidden group",
                      isActive
                        ? "text-primary-foreground font-medium"
                        : "text-foreground/70 hover:text-foreground hover:bg-accent/50 transition-colors"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-primary z-0"
                        layoutId="sidebar-highlight"
                        transition={{ type: "spring", duration: 0.5 }}
                        initial={false}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-x-3">
                      <motion.div 
                        whileHover={{ rotate: isActive ? 0 : 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                      </motion.div>
                      <AnimatePresence initial={false}>
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.3 }}
                            className="whitespace-nowrap overflow-hidden"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="h-8 w-8 rounded-full bg-edu-indigo-200 flex items-center justify-center">
                    <span className="text-edu-indigo-700 font-medium">U</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">User</p>
                    <p className="text-xs text-muted-foreground">student@learn.wise</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <ThemeToggle />
          </div>
        </div>
      </motion.aside>

      {/* Mobile overlay when sidebar is open */}
      {isMobile && !isCollapsed && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
};
