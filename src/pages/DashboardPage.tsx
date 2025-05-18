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
import HeroSection from '@/components/dashboard/HeroSection';
import FeatureCards from '@/components/dashboard/FeatureCards';
import StudyActivity from '@/components/dashboard/StudyActivity';
import CoursePreview from '@/components/dashboard/CoursePreview';
import ActivityTab from '@/components/dashboard/ActivityTab';
import StatisticsTab from '@/components/dashboard/StatisticsTab';

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

  const [upcomingAssignments, setUpcomingAssignments] = useState([
    { 
      id: 1,
      title: "Advanced Mathematics Quiz", 
      dueDate: "Tomorrow", 
      urgency: "high", 
      subject: "Mathematics", 
      icon: <BookOpen className="h-4 w-4" />,
      link: "https://example.com/math-quiz"
    },
    { 
      id: 2,
      title: "Physics Lab Report", 
      dueDate: "3 days", 
      urgency: "medium", 
      subject: "Physics", 
      icon: <GraduationCap className="h-4 w-4" />,
      link: "https://example.com/physics-lab"
    },
    { 
      id: 3,
      title: "Programming Challenge", 
      dueDate: "1 week", 
      urgency: "low", 
      subject: "Computer Science", 
      icon: <CheckSquare className="h-4 w-4" />,
      link: "https://example.com/programming-challenge"
    },
  ]);

  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

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
      stats: "250 Questions",
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

  const handleMarkAsDone = (assignmentId) => {
    setUpcomingAssignments(prev => 
      prev.filter(assignment => assignment.id !== assignmentId)
    );
  };

  const handleOpenAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowAssignmentModal(true);
  };

  const AssignmentModal = ({ isOpen, onClose, assignment }) => {
    if (!isOpen || !assignment) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold mb-4">{assignment.title}</h3>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Subject: {assignment.subject}
            </p>
            <p className="text-sm text-muted-foreground">
              Due: {assignment.dueDate}
            </p>
            <div className="flex flex-col gap-2">
              <Button 
                className="w-full"
                onClick={() => window.open(assignment.link, '_blank')}
              >
                Open Assignment Link
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const sampleCourses = [
    {
      id: '1',
      title: 'Introduction to basic maths',
      description: 'Learn the basics of React and component-based development',
      progress: 75,
      youtubeVideoId: 'dQw4w9WgXcQ'
    },
    {
      id: '2',
      title: 'Advanced Physics',
      description: 'Master modern JavaScript concepts and patterns',
      progress: 45,
      youtubeVideoId: 'dQw4w9WgXcQ'
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <HeroSection
          username={username}
          avatar={avatar}
          banner={banner}
          streakCount={streakCount}
          handleNavigation={handleNavigation}
        />

        <FeatureCards
          features={features}
          handleNavigation={handleNavigation}
        />

        <Tabs defaultValue="all" className="mb-6 sm:mb-10" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-4 w-full sm:w-auto">
            <TabsTrigger value="all" className="flex-1 sm:flex-initial">Overview</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1 sm:flex-initial">Activity</TabsTrigger>
            <TabsTrigger value="stats" className="flex-1 sm:flex-initial">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-6">
              <StudyActivity
                weeklyData={weeklyData}
                handleNavigation={handleNavigation}
              />
              <CoursePreview courses={sampleCourses} />
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <ActivityTab activities={recentActivity} />
          </TabsContent>

          <TabsContent value="stats">
            <StatisticsTab weeklyData={weeklyData} />
          </TabsContent>
        </Tabs>
      </div>

      <AssignmentModal
        isOpen={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        assignment={selectedAssignment}
      />
    </AppLayout>
  );
};

export default DashboardPage;