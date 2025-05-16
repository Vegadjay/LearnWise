
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Tooltip as ShadcnTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ProgressPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Weekly activity data
  const weeklyActivityData = [
    { day: 'Mon', time: 45, completion: 85, color: '#6366F1' },
    { day: 'Tue', time: 65, completion: 92, color: '#8B5CF6' },
    { day: 'Wed', time: 30, completion: 70, color: '#EC4899' },
    { day: 'Thu', time: 55, completion: 88, color: '#14B8A6' },
    { day: 'Fri', time: 70, completion: 95, color: '#6366F1' },
    { day: 'Sat', time: 40, completion: 80, color: '#8B5CF6' },
    { day: 'Sun', time: 25, completion: 65, color: '#EC4899' },
  ];

  // Subject data for pie chart
  const subjectData = [
    { name: 'Mathematics', value: 35, color: '#6366F1' },
    { name: 'Science', value: 25, color: '#8B5CF6' },
    { name: 'History', value: 15, color: '#EC4899' },
    { name: 'Languages', value: 20, color: '#14B8A6' },
    { name: 'Other', value: 5, color: '#F43F5E' },
  ];

  // Flashcard progress data
  const flashcardData = [
    { date: 'Week 1', mastered: 4, learning: 8, new: 12 },
    { date: 'Week 2', mastered: 10, learning: 12, new: 8 },
    { date: 'Week 3', mastered: 18, learning: 10, new: 6 },
    { date: 'Week 4', mastered: 25, learning: 8, new: 4 },
  ];

  // Quiz performance data
  const quizData = [
    { subject: 'Math', score: 78 },
    { subject: 'Science', score: 65 },
    { subject: 'History', score: 82 },
    { subject: 'Language', score: 71 },
    { subject: 'Programming', score: 89 },
  ];

  // Habit data
  const habitData = [
    { name: 'Study Session', streak: 5, completion: 90 },
    { name: 'Flash Cards', streak: 7, completion: 100 },
    { name: 'Quiz Practice', streak: 3, completion: 70 },
    { name: 'Note Taking', streak: 4, completion: 80 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded-lg shadow-md">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} ${entry.unit || ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Learning Progress</h1>
          <p className="text-muted-foreground">Track your improvement over time</p>
        </header>
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-6 bg-card border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
            <TabsTrigger value="flashcards" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Flashcards</TabsTrigger>
            <TabsTrigger value="quizzes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Quizzes</TabsTrigger>
            <TabsTrigger value="habits" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Habits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quiz Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">72%</div>
                    <p className="text-sm text-muted-foreground">Average score across all quizzes</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Flashcard Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-secondary">8/12</div>
                    <p className="text-sm text-muted-foreground">Cards mastered this week</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Habit Streaks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-accent">5</div>
                    <p className="text-sm text-muted-foreground">Days of consistent habit tracking</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyActivityData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="time" 
                        name="Minutes Studied" 
                        unit="min" 
                        barSize={30} 
                        radius={[4, 4, 0, 0]}
                      >
                        {weeklyActivityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {subjectData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={flashcardData}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Line 
                          type="monotone" 
                          dataKey="mastered" 
                          name="Mastered" 
                          stroke="#6366F1" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                          activeDot={{ r: 6 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="learning" 
                          name="Learning" 
                          stroke="#8B5CF6" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Subject Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {['Mathematics', 'Science', 'History'].map((subject, index) => {
                    const colors = ['edu-blue', 'edu-indigo', 'edu-teal'];
                    const percentages = [75, 60, 40];
                    const activities = [4, 3, 2];
                    
                    return (
                      <div key={subject}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Badge className={`mr-2 bg-${colors[index]}-100 text-${colors[index]}-800 hover:bg-${colors[index]}-100`}>
                              {subject}
                            </Badge>
                            <span className="text-sm">{activities[index]} activities completed</span>
                          </div>
                          <span className="text-sm font-medium">{percentages[index]}%</span>
                        </div>
                        <TooltipProvider>
                          <ShadcnTooltip>
                            <TooltipTrigger asChild>
                              <div className="h-2 rounded-full bg-muted overflow-hidden">
                                <motion.div 
                                  className={`h-full bg-${colors[index]}-500 rounded-full`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentages[index]}%` }}
                                  transition={{ duration: 0.5, delay: 0.1 * index }}
                                ></motion.div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{percentages[index]}% complete</p>
                            </TooltipContent>
                          </ShadcnTooltip>
                        </TooltipProvider>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="flashcards">
            <Card>
              <CardHeader>
                <CardTitle>Flashcard Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={flashcardData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorMastered" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorLearning" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="mastered" 
                        name="Mastered Cards" 
                        stroke="#6366F1" 
                        fillOpacity={1} 
                        fill="url(#colorMastered)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="learning" 
                        name="Learning Cards" 
                        stroke="#8B5CF6" 
                        fillOpacity={1} 
                        fill="url(#colorLearning)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Total Cards Studied</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-secondary">8</div>
                    <div className="text-sm text-muted-foreground">Cards Mastered</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-accent">4</div>
                    <div className="text-sm text-muted-foreground">Cards for Review</div>
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  Your spaced repetition system is actively tracking your performance with each card. Cards you struggle with will appear more frequently to enhance your learning.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quizzes">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={quizData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 40, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="subject" />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="score" 
                        name="Score" 
                        unit="%" 
                        barSize={20}
                        radius={[0, 4, 4, 0]}
                      >
                        {quizData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.score > 80 ? '#14B8A6' : entry.score > 70 ? '#6366F1' : '#8B5CF6'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="text-sm text-muted-foreground">Quizzes Taken</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-secondary">72%</div>
                    <div className="text-sm text-muted-foreground">Average Score</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-accent">3</div>
                    <div className="text-sm text-muted-foreground">Topics Covered</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Recent Quiz Results</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">Mathematics Quiz</div>
                        <div className="text-sm text-muted-foreground">Completed 2 days ago</div>
                      </div>
                      <Badge className="bg-edu-blue-100 text-edu-blue-800 hover:bg-edu-blue-100">80%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">Science Quiz</div>
                        <div className="text-sm text-muted-foreground">Completed 3 days ago</div>
                      </div>
                      <Badge className="bg-edu-indigo-100 text-edu-indigo-800 hover:bg-edu-indigo-100">65%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">History Quiz</div>
                        <div className="text-sm text-muted-foreground">Completed 5 days ago</div>
                      </div>
                      <Badge className="bg-edu-teal-100 text-edu-teal-800 hover:bg-edu-teal-100">70%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="habits">
            <Card>
              <CardHeader>
                <CardTitle>Habit Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={habitData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="completion" 
                        name="Completion" 
                        fill="#6366F1" 
                        unit="%" 
                        barSize={30} 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">Active Habits</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-secondary">5</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-accent">80%</div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Habit Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">Study for 30 minutes</div>
                        <div className="text-sm text-muted-foreground">3 day streak</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Consistent</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">Review flashcards</div>
                        <div className="text-sm text-muted-foreground">5 day streak</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Consistent</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">Take practice quiz</div>
                        <div className="text-sm text-muted-foreground">0 day streak</div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Needs Work</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
};

export default ProgressPage;
