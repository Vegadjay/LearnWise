import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, CheckSquare, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Activity {
  activity: string;
  date: string;
  icon: React.ReactNode;
}

interface ActivityTabProps {
  activities: Activity[];
}

const ActivityTab: React.FC<ActivityTabProps> = ({ activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
            >
              <div className="p-2 bg-primary/10 rounded-full">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.activity}</p>
                <p className="text-sm text-muted-foreground">{activity.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTab; 