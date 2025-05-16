
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import QuizSession, { QuizResults } from '@/components/quiz/QuizSession';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Book, BarChart, Timer, Brain, CheckCircle, AlertCircle, Code, Database, Globe, GraduationCap, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Import quiz data - we'll simulate this for now
import { SAMPLE_QUIZZES } from '@/data/quizData';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const QuizzesPage = () => {
  const [activeTab, setActiveTab] = useState('mathematics');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [leaveQuizDialogOpen, setLeaveQuizDialogOpen] = useState(false);
  const [isBlockNavigation, setIsBlockNavigation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [dialogTargetTab, setDialogTargetTab] = useState('');
  
  // Block navigation when quiz is active
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isBlockNavigation) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isBlockNavigation]);
  
  // Handle quiz start
  const startQuiz = () => {
    setQuizStarted(true);
    setQuizResults(null);
    setIsBlockNavigation(true);
    toast.success('Quiz started! Good luck!', { icon: '🚀' });
  };
  
  // Handle quiz completion
  const handleCompleteQuiz = (results: QuizResults) => {
    setQuizResults(results);
    setIsBlockNavigation(false);
    
    // Show toast based on score
    if (results.score >= 80) {
      toast.success('Great job! You scored ' + results.score + '%', { icon: '🏆' });
    } else if (results.score >= 60) {
      toast.success('Good effort! You scored ' + results.score + '%', { icon: '👍' });
    } else {
      toast('Keep practicing! You scored ' + results.score + '%', { icon: '📚' });
    }
  };
  
  // Handle quiz restart
  const handleRestartQuiz = () => {
    setQuizStarted(true);
    setQuizResults(null);
    setIsBlockNavigation(true);
    toast('Quiz restarted! Good luck!', { icon: '🔄' });
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    if (quizStarted && !quizResults) {
      setLeaveQuizDialogOpen(true);
      setDialogTargetTab(value);
      return;
    }
    
    setActiveTab(value);
    setQuizStarted(false);
    setQuizResults(null);
  };
  
  // Confirm tab change
  const confirmTabChange = () => {
    setLeaveQuizDialogOpen(false);
    setActiveTab(dialogTargetTab);
    setQuizStarted(false);
    setQuizResults(null);
    setIsBlockNavigation(false);
  };
  
  // Categories and their details
  const categories = [
    {
      id: 'mathematics',
      title: 'Mathematics Quiz',
      description: 'Test your knowledge of mathematical concepts and problem-solving skills.',
      icon: <BarChart className="h-12 w-12 text-primary/70 mb-4" />,
      color: 'from-primary to-blue-600',
      timeLimit: 240, // 4 minutes
      difficulty: 'Medium'
    },
    {
      id: 'science',
      title: 'Science Quiz',
      description: 'Test your knowledge of scientific principles and natural phenomena.',
      icon: <Brain className="h-12 w-12 text-secondary/70 mb-4" />,
      color: 'from-secondary to-purple-600',
      timeLimit: 300, // 5 minutes
      difficulty: 'Medium'
    },
    {
      id: 'history',
      title: 'History Quiz',
      description: 'Test your knowledge of historical events, figures, and civilizations.',
      icon: <Book className="h-12 w-12 text-accent/70 mb-4" />,
      color: 'from-accent to-teal-600',
      timeLimit: 270, // 4.5 minutes
      difficulty: 'Hard'
    },
    {
      id: 'programming',
      title: 'Programming Quiz',
      description: 'Test your knowledge of programming concepts and languages.',
      icon: <Code className="h-12 w-12 text-edu-blue-500/70 mb-4" />,
      color: 'from-edu-blue-500 to-edu-blue-600',
      timeLimit: 360, // 6 minutes
      difficulty: 'Hard'
    },
    {
      id: 'literature',
      title: 'Literature Quiz',
      description: 'Test your knowledge of literary works, authors, and movements.',
      icon: <Book className="h-12 w-12 text-edu-indigo-500/70 mb-4" />,
      color: 'from-edu-indigo-500 to-edu-indigo-600',
      timeLimit: 300, // 5 minutes
      difficulty: 'Medium'
    },
    {
      id: 'geography',
      title: 'Geography Quiz',
      description: 'Test your knowledge of countries, capitals, landforms, and geography.',
      icon: <Globe className="h-12 w-12 text-edu-teal-500/70 mb-4" />,
      color: 'from-edu-teal-500 to-edu-teal-600',
      timeLimit: 210, // 3.5 minutes
      difficulty: 'Easy'
    },
    {
      id: 'languages',
      title: 'Languages Quiz',
      description: 'Test your knowledge of different languages, grammar, and vocabulary.',
      icon: <Languages className="h-12 w-12 text-edu-purple-500/70 mb-4" />,
      color: 'from-edu-purple-500 to-edu-purple-600',
      timeLimit: 240, // 4 minutes
      difficulty: 'Medium'
    },
    {
      id: 'computer-science',
      title: 'Computer Science',
      description: 'Test your knowledge of algorithms, data structures, and computer theory.',
      icon: <Database className="h-12 w-12 text-blue-500/70 mb-4" />,
      color: 'from-blue-500 to-blue-600',
      timeLimit: 300, // 5 minutes
      difficulty: 'Hard'
    },
    {
      id: 'general-knowledge',
      title: 'General Knowledge',
      description: 'Test your knowledge on a wide variety of topics and trivia.',
      icon: <GraduationCap className="h-12 w-12 text-green-500/70 mb-4" />,
      color: 'from-green-500 to-green-600',
      timeLimit: 270, // 4.5 minutes
      difficulty: 'Easy'
    }
  ];
  
  const activeCategory = categories.find(cat => cat.id === activeTab) || categories[0];
  
  return (
    <AppLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        <header className="mb-8">
          <div className="flex items-center mb-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 10 }}
              className="mr-3"
            >
              <Brain className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-bold">Quizzes</h1>
          </div>
          <p className="text-muted-foreground">Challenge yourself with our adaptive quizzes to test your knowledge</p>
        </header>
        
        <Card className="mb-8 overflow-hidden card-animated">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-2">Knowledge Challenge</h2>
                <p className="text-muted-foreground mb-6">
                  Test your skills across different subjects with our interactive quizzes. 
                  Track your progress and improve your knowledge over time.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center px-3 py-1 bg-primary/10 rounded-full">
                    <CheckCircle className="h-4 w-4 mr-1.5 text-primary" />
                    <span className="text-sm">Multiple subjects</span>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center px-3 py-1 bg-primary/10 rounded-full">
                    <Timer className="h-4 w-4 mr-1.5 text-primary" />
                    <span className="text-sm">Timed challenges</span>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center px-3 py-1 bg-primary/10 rounded-full">
                    <BarChart className="h-4 w-4 mr-1.5 text-primary" />
                    <span className="text-sm">Performance tracking</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <CardContent className="pt-6">
            <Tabs 
              defaultValue="mathematics" 
              value={activeTab} 
              onValueChange={handleTabChange}
            >
              <TabsList className="mb-6 bg-muted/60 flex flex-wrap">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.id.charAt(0).toUpperCase() + category.id.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map(category => (
                <TabsContent key={category.id} value={category.id}>
                  {!quizStarted ? (
                    <motion.div 
                      className="text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-gradient-to-r rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                        {category.icon}
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                        {category.description}
                      </p>
                      <div className="mb-6 flex justify-center gap-8">
                        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {SAMPLE_QUIZZES[category.id]?.length || 0}
                          </div>
                          <div className="text-sm text-muted-foreground">Questions</div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                          <div className="text-2xl font-bold text-secondary">
                            {Math.floor(category.timeLimit / 60)}:{(category.timeLimit % 60).toString().padStart(2, '0')}
                          </div>
                          <div className="text-sm text-muted-foreground">Time Limit</div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                          <Badge variant={
                            category.difficulty === 'Easy' ? 'success' : 
                            category.difficulty === 'Medium' ? 'warning' : 'destructive'
                          } className="text-base px-3 py-1">
                            {category.difficulty}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">Difficulty</div>
                        </motion.div>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button 
                          onClick={startQuiz} 
                          size="lg" 
                          className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                        >
                          <Play className="h-4 w-4" /> Start Quiz
                        </Button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <QuizSession 
                        questions={SAMPLE_QUIZZES[category.id] || []}
                        onComplete={handleCompleteQuiz}
                        onRestart={handleRestartQuiz}
                        timeLimit={category.timeLimit}
                      />
                    </motion.div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
        
        <motion.h2 
          variants={itemVariants}
          className="text-2xl font-bold mb-4"
        >
          Explore Quiz Categories
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          className="category-grid mb-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="card-animated"
              onClick={() => {
                if (quizStarted && !quizResults) {
                  setLeaveQuizDialogOpen(true);
                  setDialogTargetTab(category.id);
                } else {
                  setActiveTab(category.id);
                  setQuizStarted(false);
                  setQuizResults(null);
                }
              }}
            >
              <Card className="cursor-pointer h-full overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <Badge variant={
                      category.difficulty === 'Easy' ? 'success' : 
                      category.difficulty === 'Medium' ? 'warning' : 'destructive'
                    }>
                      {category.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                      {React.cloneElement(category.icon, { className: "h-5 w-5 text-primary" })}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Timer className="h-3.5 w-3.5 mr-1" />
                      <span>{Math.floor(category.timeLimit / 60)}:{(category.timeLimit % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <div>
                      {SAMPLE_QUIZZES[category.id]?.length || 0} questions
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <Card className="card-animated">
              <CardHeader>
                <CardTitle>How Our Quizzes Work</CardTitle>
                <CardDescription>Learn about our adaptive quizzing system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                    <Timer className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Timed Challenges</h3>
                    <p className="text-sm text-muted-foreground">
                      Each quiz has a time limit to simulate exam conditions and help improve your speed.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-secondary/10 rounded-full w-10 h-10 flex items-center justify-center">
                    <BarChart className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Performance Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Get detailed breakdowns of your performance to identify areas for improvement.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-accent/10 rounded-full w-10 h-10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Multiple Difficulty Levels</h3>
                    <p className="text-sm text-muted-foreground">
                      Questions range from easy to hard to challenge learners at all levels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="card-animated">
              <CardHeader>
                <CardTitle>Study Tips</CardTitle>
                <CardDescription>Maximize your learning potential</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <p className="text-sm">Take regular breaks to avoid mental fatigue</p>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <p className="text-sm">Review incorrect answers to strengthen knowledge</p>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <p className="text-sm">Use flashcards to complement quiz learning</p>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm">Set regular study goals using the Habits feature</p>
                </div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                  <Button variant="outline" className="w-full" onClick={() => navigate('/flashcards')}>
                    Explore Flashcards
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Leave quiz confirmation dialog */}
      <Dialog open={leaveQuizDialogOpen} onOpenChange={setLeaveQuizDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Quit Current Quiz?
            </DialogTitle>
          </DialogHeader>
          <p>
            Your progress in the current quiz will be lost. Are you sure you want to leave?
          </p>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setLeaveQuizDialogOpen(false)}>
              Continue Quiz
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmTabChange}
            >
              Quit Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default QuizzesPage;
