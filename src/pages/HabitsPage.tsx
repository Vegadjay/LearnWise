
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import HabitTracker from '@/components/habits/HabitTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const HabitsPage = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Habit Tracker</h1>
          <p className="text-muted-foreground">Build and maintain good learning habits</p>
        </header>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <HabitTracker />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Building Good Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Consistency is key when forming new habits. Research suggests it takes about 66 days for a new behavior to become automatic. Here are some tips:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Start with small, achievable goals</li>
                <li>Track your progress daily</li>
                <li>Don't break the chain - try to maintain streaks</li>
                <li>If you miss a day, get back on track immediately</li>
                <li>Celebrate your milestones and achievements</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Effective Study Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Try incorporating these evidence-based study techniques into your routine:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Spaced repetition: Review material at increasing intervals</li>
                <li>Active recall: Test yourself instead of passively reviewing</li>
                <li>Interleaved practice: Mix different topics in your study sessions</li>
                <li>Elaboration: Connect new concepts to what you already know</li>
                <li>Take regular breaks with the Pomodoro technique (25 min work, 5 min break)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default HabitsPage;
