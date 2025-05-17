import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, BookOpen, CheckSquare, GraduationCap, Activity, Clock, Calendar, TrendingUp, Brain, Trophy, Star, Bell, ChevronRight, Pencil, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [username, setUsername] = useState('');
  const DEFAULT_AVATAR =
    'https://imgs.search.brave.com/2kBCsI1bSPEEaJySScfqyW0-wlW9x0Uv6K3kTrF-mlk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9tYXJr/LXp1Y2tlcmJlcmct/Y2VvLW9mLW1ldGEt/dGVzdGlmaWVzLWJl/Zm9yZS10aGUtc2Vu/YXRlLW5ld3MtcGhv/dG8tMTczOTk5ODU0/NS5wanBlZz9jcm9w/PTAuNTUzeHc6MC44/Mjd4aDswLjI4M3h3/LDAmcmVzaXplPTY0/MDoq';
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [banner, setBanner] = useState('');

  const heroSectionRef = useRef(null);
  const cardsRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const localToken = localStorage.getItem('userProfile');
    const parsedToken = localToken ? JSON.parse(localToken) : null;
    // Use default avatar if not present or empty
    setAvatar(parsedToken?.avatar && parsedToken.avatar.trim() !== '' ? parsedToken.avatar : DEFAULT_AVATAR);
    setUsername(parsedToken?.name);
    setBanner(parsedToken?.banner || '/lone-tree.jpg');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

    // Ensure values are within the card, with a bit of buffer for edge glow
    const clampedX = Math.max(-50, Math.min(rect.width + 50, x));
    const clampedY = Math.max(-50, Math.min(rect.height + 50, y));

    return {
      x: `${(clampedX / rect.width) * 100}%`,
      y: `${(clampedY / rect.height) * 100}%`,
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

  const confettiColors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

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

  const cardHoverVariants = {
    initial: { y: 0, scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
    hover: {
      boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Handle navigation with proper link checking
  const handleNavigation = (path) => {
    if (!path || path === '#') {
      console.warn("Invalid navigation path:", path);
      return;
    }
    navigate(path);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* LinkedIn-style Hero Section with Banner and Avatar */}
        <motion.div
          ref={heroSectionRef}
          className="mb-6 sm:mb-10 rounded-xl border border-primary/10 relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Banner */}
          <div className="relative w-full h-48 sm:h-64 md:h-72 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Subtle overlay for better visibility */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>

          {/* Profile section that overlaps the banner */}
          <div className="px-6 pb-6 pt-0 relative">
            {/* Avatar that overlaps the banner */}
            <div className="relative -mt-16 sm:-mt-20 md:-mt-24 mb-4 flex justify-between items-end">
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <Avatar className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 border-4 border-background rounded-full shadow-xl">
                    <AvatarImage src={avatar} alt="Profile" />
                    <AvatarFallback className="text-2xl sm:text-3xl">
                      {username ? username.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>

                  {/* Status indicator */}
                  <div
                    className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 rounded-full border-2 border-background"
                  ></div>
                </motion.div>
              </div>

              {/* View profile button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary/10 hover:bg-primary/20 text-primary font-medium px-4 py-2 rounded-md flex items-center gap-2"
                onClick={() => handleNavigation('/profile')}
              >
                <Pencil className="h-4 w-4" />
                <span>Edit Profile</span>
              </motion.button>
            </div>

            {/* Profile information in LinkedIn style */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <motion.h1
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {username || 'Mark Zuck'}

                    {/* Streak badge */}
                    <motion.span
                      className="inline-block bg-orange-500 text-white rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold flex items-center gap-1 shadow-lg align-middle"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Flame className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{streakCount} day streak</span>
                    </motion.span>
                  </motion.h1>
                </div>

                <motion.div
                  className="mt-4 flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Badge className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                    JavaScript
                  </Badge>
                  <Badge className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                    React
                  </Badge>
                  <Badge className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                    NodeJS
                  </Badge>
                  <Badge className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                    UI/UX
                  </Badge>
                </motion.div>
              </div>

              <motion.div
                className="flex flex-row sm:flex-col gap-3 mt-4 sm:mt-0"
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

            {/* Action buttons row */}
            <motion.div
              className="flex flex-wrap mt-6 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Button
                  onClick={() => handleNavigation('/flashcards')}
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
                  onClick={() => handleNavigation('/profile')}
                  size={isMobile ? "default" : "lg"}
                  className="gap-2 border-primary/20 hover:border-primary/50 transition-colors relative z-10"
                >
                  <Activity className="h-4 w-4" /> View Progress
                </Button>
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-primary/30 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

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

            return (
              <motion.div
                key={feature.title}
                variants={cardHoverVariants}
                whileHover="hover"
                initial="initial"
                className="transition-all duration-300"
                ref={cardsRefs.current[index]}
              >
                <Card className="h-full border border-muted/60 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all relative overflow-hidden group">

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite',
                    }}
                  />


                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: `radial-gradient(800px circle at center, ${feature.glowColor})`,
                      animation: 'pulse 2s infinite',
                    }}
                  />

                  {/* Card inner shadow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 shadow-inner"></div>

                  <CardHeader className="pb-2 relative">
                    <div className="flex justify-between items-start">
                      <motion.div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${feature.color} flex items-center justify-center relative overflow-hidden`}
                        transition={{ duration: 0.5 }}
                      >
                        {feature.icon}
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </motion.div>
                      <Badge
                        variant="outline"
                        className={`${index === 0 ? "animate-pulse" : ""} group-hover:bg-background/50 transition-all duration-300 z-10`}
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
                        variant="ghost"
                        className="w-full justify-between bg-muted/50 hover:bg-muted group-hover:border-primary/20"
                        onClick={() => handleNavigation(feature.link)}
                      >
                        <span>Explore</span>
                        <ChevronRight className="h-4 w-4 opacity-70" />
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tabs for Main Content */}
        <Tabs defaultValue="all" className="mb-6 sm:mb-10" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-4 w-full sm:w-auto">
            <TabsTrigger value="all" className="flex-1 sm:flex-initial">Overview</TabsTrigger>
            <TabsTrigger value="upcoming" className="flex-1 sm:flex-initial">Upcoming</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1 sm:flex-initial">Activity</TabsTrigger>
            <TabsTrigger value="stats" className="flex-1 sm:flex-initial">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Stats */}
              <Card className="col-span-1 md:col-span-2 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Study Activity
                  </CardTitle>
                  <CardDescription>Your study time over the past week</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="studyColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="day" />
                        <YAxis unit="min" />
                        <RechartsTooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                        <Area
                          type="monotone"
                          dataKey="minutes"
                          stroke="#2563eb"
                          fillOpacity={1}
                          fill="url(#studyColor)"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="pb-4">
                  <div className="flex justify-between w-full text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Total this week:</span>
                      <span className="font-medium">330 minutes</span>
                    </div>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary"
                      onClick={() => handleNavigation('/progress')}
                    >
                      View details
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
                </CardHeader>
                <CardContent className="pb-0">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                  >
                    {recentActivity.map((item, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex items-start gap-3 group"
                      >
                        <div className="mt-0.5 p-1.5 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                          {item.icon}
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-sm group-hover:text-primary transition-colors">
                            {item.activity}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-center bg-muted/50 hover:bg-muted"
                    onClick={() => handleNavigation('/activity')}
                  >
                    View all activity
                  </Button>
                </CardFooter>
              </Card>

              {/* Upcoming assignments */}
              <Card className="col-span-1 md:col-span-2 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Assignments
                  </CardTitle>
                  <CardDescription>Tasks that need your attention</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-3"
                  >
                    {upcomingAssignments.map((assignment, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="p-3 rounded-lg border border-border/60 bg-background/50 hover:border-primary/20 hover:bg-muted/30 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${assignment.urgency === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                            assignment.urgency === 'medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                              'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            }`}>
                            {assignment.icon}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{assignment.title}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{assignment.subject}</span>
                              <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                              <span>Due: {assignment.dueDate}</span>
                            </div>
                          </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-center bg-muted/50 hover:bg-muted"
                    onClick={() => handleNavigation('/assignments')}
                  >
                    View all assignments
                  </Button>
                </CardFooter>
              </Card>

              {/* Learning Stats */}
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Learning Stats
                  </CardTitle>
                  <CardDescription>Your progress at a glance</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pb-0">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Weekly Goal</span>
                        <span className="font-medium">6/7 days</span>
                      </div>
                      <Progress value={85.7} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Flashcards Mastered</span>
                        <span className="font-medium">192/250</span>
                      </div>
                      <Progress value={76.8} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quizzes Completed</span>
                        <span className="font-medium">9/12</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Course Progress</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-center bg-muted/50 hover:bg-muted"
                    onClick={() => handleNavigation('/stats')}
                  >
                    View detailed stats
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Upcoming Tab Content */}
          <TabsContent value="upcoming">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
              <div className="grid grid-cols-1 gap-4">
                {upcomingAssignments.map((assignment, i) => (
                  <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className={`p-1.5 rounded-full ${assignment.urgency === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                            assignment.urgency === 'medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                              'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            }`}>
                            {assignment.icon}
                          </div>
                          {assignment.title}
                        </CardTitle>
                        <Badge variant={assignment.urgency === 'high' ? 'destructive' :
                          assignment.urgency === 'medium' ? 'warning' : 'outline'}>
                          {assignment.urgency === 'high' ? 'Urgent' :
                            assignment.urgency === 'medium' ? 'Soon' : 'Upcoming'}
                        </Badge>
                      </div>
                      <CardDescription>
                        {assignment.subject} • Due {assignment.dueDate}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end pt-0 gap-2">
                      <Button variant="outline" size="sm">Mark as done</Button>
                      <Button size="sm">Open assignment</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab Content */}
          <TabsContent value="activity">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <div className="grid grid-cols-1 gap-4">
                {recentActivity.map((item, i) => (
                  <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full">
                          {item.icon}
                        </div>
                        <div>
                          <CardTitle className="text-base">{item.activity}</CardTitle>
                          <CardDescription>{item.date}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <Button variant="link" className="p-0 h-auto">
                        View details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Stats Tab Content */}
          <TabsContent value="stats">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Learning Statistics</h2>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Study Time</CardTitle>
                  <CardDescription>Weekly study time i  n minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="studyColorStats" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="day" />
                        <YAxis unit="min" />
                        <RechartsTooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                        <Area
                          type="monotone"
                          dataKey="minutes"
                          stroke="#2563eb"
                          fillOpacity={1}
                          fill="url(#studyColorStats)"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Progress Overview</CardTitle>
                    <CardDescription>Your learning milestones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Flashcards Mastered</span>
                        <span className="font-medium">192/250</span>
                      </div>
                      <Progress value={76.8} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quizzes Completed</span>
                        <span className="font-medium">9/12</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Course Progress</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Your learning badges</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full mb-2">
                          <Trophy className="h-6 w-6" />
                        </div>
                        <span className="text-xs text-center">15 Day Streak</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full mb-2">
                          <GraduationCap className="h-6 w-6" />
                        </div>
                        <span className="text-xs text-center">Quiz Master</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full mb-2">
                          <BookOpen className="h-6 w-6" />
                        </div>
                        <span className="text-xs text-center">Fast Learner</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-full mb-2">
                          <CheckSquare className="h-6 w-6" />
                        </div>
                        <span className="text-xs text-center">Habit Maker</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full mb-2">
                          <Flame className="h-6 w-6" />
                        </div>
                        <span className="text-xs text-center">On Fire</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 rounded-full mb-2">
                          <Star className="h-6 w-6" />
                        </div>
                        <span className="text-xs text-center">Super Star</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;