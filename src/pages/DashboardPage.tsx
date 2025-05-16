import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, BookOpen, CheckSquare, GraduationCap, Activity, Clock, Calendar, TrendingUp, Brain, Trophy, Star, Bell, ChevronRight, Users, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [banner, setBanner] = useState('');

  const heroSectionRef = useRef(null);
  const cardsRefs = useRef([]);

  // Track mouse position for glow effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const localToken = localStorage.getItem('userProfile');
    const parsedToken = localToken ? JSON.parse(localToken) : null;
    setAvatar(parsedToken?.avatar);
    setUsername(parsedToken?.name);
    setBanner(parsedToken?.banner);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulated streak count
  const streakCount = 15;

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate glow position for an element based on mouse position
  const calculateGlowPosition = (ref) => {
    if (!ref || !ref.current) return { x: "50%", y: "50%" };

    const rect = ref.current.getBoundingClientRect();
    const x = mousePosition.x - rect.left;
    const y = mousePosition.y - rect.top;

    return {
      x: `${(x / rect.width) * 100}%`,
      y: `${(y / rect.height) * 100}%`,
    };
  };

  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Flashcards",
      description: "Review your flashcards with spaced repetition.",
      link: "/flashcards",
      color: "bg-edu-indigo-50 text-edu-indigo-600 dark:bg-edu-indigo-900/30 dark:text-edu-indigo-300",
      glowColor: "from-indigo-500/30 via-indigo-500/5 to-transparent",
      stats: "250 cards",
      progress: 65,
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Quizzes",
      description: "Test your knowledge with adaptive quizzes.",
      link: "/quizzes",
      color: "bg-edu-blue-50 text-edu-blue-600 dark:bg-edu-blue-900/30 dark:text-edu-blue-300",
      glowColor: "from-blue-500/30 via-blue-500/5 to-transparent",
      stats: "12 quizzes",
      progress: 45,
    },
    {
      icon: <CheckSquare className="h-6 w-6" />,
      title: "Habit Tracker",
      description: "Build and maintain good study habits.",
      link: "/habits",
      color: "bg-edu-teal-50 text-edu-teal-600 dark:bg-edu-teal-900/30 dark:text-edu-teal-300",
      glowColor: "from-teal-500/30 via-teal-500/5 to-transparent",
      stats: "8 active habits",
      progress: 78,
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Progress",
      description: "Track your learning progress over time.",
      link: "/progress",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
      glowColor: "from-purple-500/30 via-purple-500/5 to-transparent",
      stats: "Last 30 days",
      progress: 92,
    },
  ];

  const recentActivity = [
    { activity: "Completed JavaScript Flashcards", date: "Today", icon: <BookOpen className="h-4 w-4" /> },
    { activity: "Mastered React Basics Quiz", date: "Yesterday", icon: <GraduationCap className="h-4 w-4" /> },
    { activity: "Added new study habit", date: "2 days ago", icon: <CheckSquare className="h-4 w-4" /> },
    { activity: "Enrolled in Python Course", date: "1 week ago", icon: <TrendingUp className="h-4 w-4" /> },
  ];

  const upcomingAssignments = [
    { title: "Advanced Mathematics Quiz", dueDate: "Tomorrow", urgency: "high", subject: "Mathematics", icon: <BookOpen className="h-4 w-4" /> },
    { title: "Physics Lab Report", dueDate: "3 days", urgency: "medium", subject: "Physics", icon: <GraduationCap className="h-4 w-4" /> },
    { title: "Programming Challenge", dueDate: "1 week", urgency: "low", subject: "Computer Science", icon: <CheckSquare className="h-4 w-4" /> },
  ];

  const weeklyData = [
    { day: 'Mon', minutes: 30 },
    { day: 'Tue', minutes: 45 },
    { day: 'Wed', minutes: 25 },
    { day: 'Thu', minutes: 60 },
    { day: 'Fri', minutes: 75 },
    { day: 'Sat', minutes: 40 },
    { day: 'Sun', minutes: 55 },
  ];

  const studyBuddies = [
    { name: "Alex", avatar: "/api/placeholder/40/40", online: true },
    { name: "Sarah", avatar: "/api/placeholder/40/40", online: true },
    { name: "Mike", avatar: "/api/placeholder/40/40", online: false },
    { name: "Jen", avatar: "/api/placeholder/40/40", online: true },
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Confetti pieces
  const confettiColors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
  const generateConfetti = () => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      size: 5 + Math.random() * 10,
      rotation: Math.random() * 360,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    }));
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded-lg shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            {`${payload[0].value} minutes`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Handle status selection
  const handleStatusChange = (status) => {
    // Logic to update user status
    setShowStatusMenu(false);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section with Avatar */}
        <motion.div
          ref={heroSectionRef}
          className="mb-6 sm:mb-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 p-4 sm:p-8 rounded-xl border border-primary/10 relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-4xl mx-auto relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              {/* Avatar with status */}
              <motion.div
                className="relative"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3
                }}
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Avatar className="w-20 w-20 sm:w-24 sm:h-24 border-4 border-background shadow-xl">
                      <AvatarImage src={`${avatar}`} alt="Profile" />
                    </Avatar>
                    <div
                      className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 blur-md -z-10 opacity-70 group-hover:opacity-100 animate-pulse"
                    ></div>
                  </motion.div>
                  <div
                    className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-background cursor-pointer"
                    onClick={() => setShowStatusMenu(!showStatusMenu)}
                  ></div>

                  {/* Status dropdown */}
                  <AnimatePresence>
                    {showStatusMenu && (
                      <motion.div
                        className="absolute top-full mt-2 right-0 bg-background rounded-lg shadow-lg border border-border p-2 w-36 z-10"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div
                          className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                          onClick={() => handleStatusChange('online')}
                        >
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Online</span>
                        </div>
                        <div
                          className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                          onClick={() => handleStatusChange('busy')}
                        >
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>Busy</span>
                        </div>
                        <div
                          className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                          onClick={() => handleStatusChange('away')}
                        >
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>Away</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Streak counter with confetti */}
                <motion.div
                  className="absolute -right-4 -top-2 bg-orange-500 text-white rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold flex items-center gap-1 shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Flame className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{streakCount} days</span>

                  {/* Confetti animation */}
                  {showConfetti && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {generateConfetti().map(confetti => (
                        <motion.div
                          key={confetti.id}
                          className="absolute"
                          style={{
                            left: `${confetti.x}%`,
                            top: `${confetti.y}%`,
                            width: `${confetti.size}px`,
                            height: `${confetti.size}px`,
                            backgroundColor: confetti.color,
                            borderRadius: '2px',
                            zIndex: 20,
                          }}
                          initial={{
                            opacity: 1,
                            y: confetti.y,
                            x: confetti.x,
                            rotate: 0
                          }}
                          animate={{
                            opacity: 0,
                            y: `${200 + Math.random() * 300}%`,
                            x: `${confetti.x + (Math.random() * 40 - 20)}%`,
                            rotate: `${Math.random() * 360}deg`
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>

              <div className="text-center sm:text-left">
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome back, {username}
                </motion.h1>
                <motion.p
                  className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Your learning journey continues - you're making great progress!
                </motion.p>

                <motion.div
                  className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <Button
                      onClick={() => navigate('/flashcards')}
                      size={isMobile ? "default" : "lg"}
                      className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-md relative z-10"
                    >
                      <BookOpen className="h-4 w-4" /> Resume Learning
                    </Button>
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/50 to-secondary/50 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"></div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <Button
                      variant="outline"
                      onClick={() => navigate('/profile')}
                      size={isMobile ? "default" : "lg"}
                      className="gap-2 border-primary/20 hover:border-primary/50 transition-colors relative z-10"
                    >
                      <Activity className="h-4 w-4" /> View Progress
                    </Button>
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-primary/30 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Stats cards */}
              <motion.div
                className="flex flex-row sm:flex-col gap-3 mt-4 sm:mt-0 sm:ml-auto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="bg-background/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-border/50 flex items-center gap-2 sm:gap-3 shadow-sm relative overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="bg-primary/10 p-1 sm:p-2 rounded-full relative z-10">
                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-xs text-muted-foreground">Total Points</p>
                    <p className="font-bold text-base sm:text-xl">1,250</p>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-background/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-border/50 flex items-center gap-2 sm:gap-3 shadow-sm relative overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="bg-orange-500/10 p-1 sm:p-2 rounded-full relative z-10">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  </div>
                  <div className="w-16 sm:w-24 relative z-10">
                    <p className="text-xs text-muted-foreground">Rank</p>
                    <p className="font-bold text-base sm:text-xl">Gold Tier</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-10"
        >
          {features.map((feature, index) => {
            if (!cardsRefs.current[index]) {
              cardsRefs.current[index] = React.createRef();
            }

            const glowPosition = calculateGlowPosition(cardsRefs.current[index]);

            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="transition-all duration-300"
                ref={cardsRefs.current[index]}
              >
                <Card className="h-full border border-muted/60 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all relative overflow-hidden group">
                  {/* Mouse position based glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(400px circle at ${glowPosition.x} ${glowPosition.y}, ${feature.glowColor})`,
                    }}
                  />

                  {/* Card inner shadow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 shadow-inner"></div>

                  <CardHeader className="pb-2 relative">
                    <div className="flex justify-between items-start">
                      <motion.div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${feature.color} flex items-center justify-center relative overflow-hidden`}
                        whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {feature.icon}
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </motion.div>
                      <Badge
                        variant="outline"
                        className={`${index === 0 ? "animate-pulse" : ""} group-hover:bg-background/50 transition-colors duration-300 z-10`}
                      >
                        {feature.stats}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 text-base sm:text-lg relative z-10">{feature.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm relative z-10">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 relative z-10">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="space-y-2 cursor-help">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span className="font-medium">{feature.progress}%</span>
                            </div>
                            <Progress value={feature.progress} className="h-2" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>You've completed {feature.progress}% in this area</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardContent>
                  <CardFooter className="relative z-10">
                    <motion.div
                      className="w-full"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full group bg-background/80 hover:bg-background/60 text-xs sm:text-sm backdrop-blur-sm z-10"
                        onClick={() => navigate(feature.link)}
                      >
                        <span>Open {feature.title}</span>
                        <motion.span
                          className="ml-2 inline-block"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                        >
                          →
                        </motion.span>
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats and Activity Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2"
            whileHover={{ y: -5 }}
          >
            <Card className="h-full relative group overflow-hidden">
              {/* Glow effect for the card on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <div>
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
                    Learning Statistics
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Your activity over the last 7 days
                  </CardDescription>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full text-xs font-medium hidden sm:flex">
                        <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span>{weeklyData.reduce((sum, day) => sum + day.minutes, 0)} mins total</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your total study time this week</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="h-48 sm:h-56 md:h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={weeklyData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.2)" />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground) / 0.3)" />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground) / 0.3)"
                        tickFormatter={(value) => `${value}m`}
                      />
                      <RechartsTooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                      <defs>
                        <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="minutes"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorMinutes)"
                        strokeWidth={2}
                        activeDot={{ r: 6, stroke: 'hsl(var(--background))', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity and Assignments Tabs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full relative group overflow-hidden">
              {/* Glow effect for the card on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-secondary/5 via-transparent to-secondary/10"></div>

              <CardHeader className="pb-2 relative z-10">
                <Tabs defaultValue="activity" onValueChange={setSelectedTab} className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-base sm:text-lg">
                      {selectedTab === "activity" ? "Recent Activity" : "Upcoming Tasks"}
                    </CardTitle>
                    <TabsList className="h-8">
                      <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
                      <TabsTrigger value="assignments" className="text-xs">Tasks</TabsTrigger>
                    </TabsList>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    {selectedTab === "activity" ?
                      "Your recent learning activities" :
                      "Tasks due soon"
                    }
                  </CardDescription>

                  <TabsContent value="activity" className="mt-2 space-y-0">
                    <ul className="space-y-2">
                      {recentActivity.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-background/50 hover:bg-background p-2 rounded-md border border-border/50 flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="bg-primary/10 p-1.5 rounded-full">
                              {item.icon}
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium">{item.activity}</p>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="assignments" className="mt-2 space-y-0">
                    <ul className="space-y-2">
                      {upcomingAssignments.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-background/50 hover:bg-background p-2 rounded-md border border-border/50 flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-full ${item.urgency === 'high' ? 'bg-red-500/10' :
                              item.urgency === 'medium' ? 'bg-yellow-500/10' :
                                'bg-green-500/10'
                              }`}>
                              {item.icon}
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium">{item.title}</p>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="text-xs py-0 h-4">
                                  {item.subject}
                                </Badge>
                                <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Card className="relative group overflow-hidden">
            {/* Glow effect for the card on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-teal-500/5 via-transparent to-blue-500/10"></div>

            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Based on your learning habits and preferences
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border border-border rounded-lg p-3 hover:bg-background/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Complete JavaScript Course</h4>
                      <p className="text-xs text-muted-foreground mb-2">You're 75% through - finish strong!</p>
                      <Progress value={75} className="h-1.5 mb-2" />
                      <Button variant="outline" size="sm" className="text-xs h-7 w-full">
                        Continue Learning
                      </Button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border border-border rounded-lg p-3 hover:bg-background/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Try New Data Science Path</h4>
                      <p className="text-xs text-muted-foreground mb-2">Matches your interests in math and statistics</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Badge variant="secondary" className="text-xs">Python</Badge>
                        <Badge variant="secondary" className="text-xs">ML</Badge>
                        <Badge variant="secondary" className="text-xs">Beginner</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs h-7 w-full">
                        Explore Path
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;