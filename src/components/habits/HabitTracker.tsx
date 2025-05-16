
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Trash2, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export interface Habit {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  lastCompleted?: string; // ISO string
  createdAt: string; // ISO string
  completedDates: string[]; // Array of ISO string dates
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState('');
  const { toast } = useToast();

  // Load habits from localStorage on initial render
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      try {
        const parsedHabits = JSON.parse(savedHabits);
        setHabits(parsedHabits);
      } catch (error) {
        console.error('Error parsing habits from localStorage:', error);
        // If there's an error, initialize with default habits
        initializeDefaultHabits();
      }
    } else {
      // If no habits in localStorage, initialize with defaults
      initializeDefaultHabits();
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (habits.length) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits]);

  const initializeDefaultHabits = () => {
    const now = new Date().toISOString();
    const defaultHabits: Habit[] = [
      { 
        id: '1', 
        name: 'Study for 30 minutes', 
        completed: false, 
        streak: 3,
        createdAt: now,
        completedDates: [] 
      },
      { 
        id: '2', 
        name: 'Review flashcards', 
        completed: true, 
        streak: 5,
        lastCompleted: now,
        createdAt: now,
        completedDates: [now]
      },
      { 
        id: '3', 
        name: 'Take practice quiz', 
        completed: false, 
        streak: 0,
        createdAt: now,
        completedDates: []
      },
    ];
    
    setHabits(defaultHabits);
    localStorage.setItem('habits', JSON.stringify(defaultHabits));
  };

  const addHabit = () => {
    if (!newHabitName.trim()) {
      toast({
        title: "Habit name required",
        description: "Please enter a name for your new habit.",
        variant: "destructive",
      });
      return;
    }
    
    const now = new Date().toISOString();
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      completed: false,
      streak: 0,
      createdAt: now,
      completedDates: []
    };
    
    setHabits([...habits, newHabit]);
    setNewHabitName('');
    
    toast({
      title: "Habit added",
      description: `"${newHabitName}" has been added to your habits.`,
    });
  };

  const toggleHabit = (id: string) => {
    const now = new Date().toISOString();
    const today = now.split('T')[0]; // Get just the date part YYYY-MM-DD
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const wasCompleted = habit.completed;
        const isCompleting = !wasCompleted;
        
        // Check if we have completed today already
        const completedToday = habit.completedDates?.some(date => date.startsWith(today)) || false;
        
        // Prepare the new completed dates
        let newCompletedDates = [...(habit.completedDates || [])];
        
        if (isCompleting && !completedToday) {
          // Add today's date if completing and not already completed today
          newCompletedDates.push(now);
        } else if (!isCompleting && completedToday) {
          // Remove today's date if uncompleting
          newCompletedDates = newCompletedDates.filter(date => !date.startsWith(today));
        }
        
        return {
          ...habit,
          completed: isCompleting,
          streak: isCompleting ? habit.streak + 1 : Math.max(0, habit.streak - 1),
          lastCompleted: isCompleting ? now : habit.lastCompleted,
          completedDates: newCompletedDates
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (id: string) => {
    const habitToDelete = habits.find(h => h.id === id);
    if (!habitToDelete) return;
    
    setHabits(habits.filter(habit => habit.id !== id));
    toast({
      title: "Habit deleted",
      description: `"${habitToDelete.name}" has been removed from your list.`,
    });
  };

  const completedCount = habits.filter(habit => habit.completed).length;
  const progressPercentage = habits.length > 0 
    ? (completedCount / habits.length) * 100 
    : 0;

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Never';
    try {
      return format(new Date(isoString), 'MMM d, yyyy h:mm a');
    } catch (e) {
      console.error("Date formatting error:", e);
      return 'Invalid date';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-6"
        >
          Daily Habit Tracker
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium">Progress: {completedCount} of {habits.length} completed</span>
            <span className="ml-auto text-sm font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex gap-3 mb-6"
      >
        <Input 
          placeholder="Add a new habit..." 
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addHabit()}
          className="flex-1"
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={addHabit} className="flex-shrink-0 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {habits.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No habits added yet. Add your first habit above!</p>
          </motion.div>
        ) : (
          habits.map((habit) => (
            <motion.div 
              key={habit.id}
              variants={itemVariants}
              layout
              whileHover={{ scale: 1.01 }}
              className={cn(
                "flex flex-col border rounded-md p-4 card-animated",
                habit.completed ? "bg-primary/5 border-primary/20 dark:bg-primary/10 dark:border-primary/10" : "bg-card"
              )}
            >
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 rounded-full mr-4",
                    habit.completed
                      ? "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                  onClick={() => toggleHabit(habit.id)}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: habit.completed ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                  <span className="sr-only">Mark as {habit.completed ? "incomplete" : "complete"}</span>
                </Button>
                
                <div className="flex-1">
                  <p className={cn("font-medium", habit.completed && "text-muted-foreground line-through")}>{habit.name}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-1">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" /> 
                      Created: {formatDate(habit.createdAt).split(',')[0]}
                    </div>
                    {habit.lastCompleted && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 mr-1" /> 
                        Last completed: {formatDate(habit.lastCompleted).split(',')[0]}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant={habit.streak > 0 ? "default" : "outline"} className="px-2 py-1">
                    <span className="font-bold mr-1">{habit.streak}</span> 
                    <span className="text-xs">day{habit.streak !== 1 ? 's' : ''}</span>
                  </Badge>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteHabit(habit.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete habit</span>
                  </Button>
                </div>
              </div>
              
              {/* Calendar view of completed dates could be added here in future */}
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default HabitTracker;
