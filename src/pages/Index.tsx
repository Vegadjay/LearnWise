
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, BookOpen, CheckSquare, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Flashcards",
      description: "Review your flashcards with spaced repetition.",
      link: "/flashcards",
      color: "bg-edu-indigo-50 text-edu-indigo-600",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Quizzes",
      description: "Test your knowledge with adaptive quizzes.",
      link: "/quizzes",
      color: "bg-edu-blue-50 text-edu-blue-600",
    },
    {
      icon: <CheckSquare className="h-6 w-6" />,
      title: "Habit Tracker",
      description: "Build and maintain good study habits.",
      link: "/habits",
      color: "bg-edu-teal-50 text-edu-teal-600",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Progress",
      description: "Track your learning progress over time.",
      link: "/progress",
      color: "bg-purple-50 text-purple-600",
    },
  ];
  
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <motion.h1 
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to LearnWise
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your personalized learning platform
          </motion.p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center`}>
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(feature.link)}
                  >
                    Open {feature.title}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Recent Progress</h2>
          <Card>
            <CardHeader>
              <CardTitle>Learning Statistics</CardTitle>
              <CardDescription>Your activity over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Learning stats will appear here as you use the app</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="ghost" onClick={() => navigate("/progress")}>View detailed progress</Button>
            </CardFooter>
          </Card>
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recommended Courses</h2>
            <Button variant="outline" onClick={() => navigate("/courses")}>View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <div className="flex p-4">
                <div className="w-16 h-16 rounded bg-muted flex-shrink-0"></div>
                <div className="ml-4">
                  <h3 className="font-medium">Introduction to Mathematics</h3>
                  <p className="text-sm text-muted-foreground">Learn the basics of algebra and geometry</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline" className="text-xs">Mathematics</Badge>
                    <Badge variant="outline" className="text-xs">Beginner</Badge>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex p-4">
                <div className="w-16 h-16 rounded bg-muted flex-shrink-0"></div>
                <div className="ml-4">
                  <h3 className="font-medium">Advanced Physics Concepts</h3>
                  <p className="text-sm text-muted-foreground">Dive deep into advanced physics theories</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline" className="text-xs">Physics</Badge>
                    <Badge variant="outline" className="text-xs">Advanced</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
