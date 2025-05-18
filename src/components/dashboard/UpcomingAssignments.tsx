import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  urgency: 'high' | 'medium' | 'low';
  subject: string;
  icon: React.ReactNode;
  link: string;
}

interface UpcomingAssignmentsProps {
  assignments: Assignment[];
  onMarkAsDone: (id: number) => void;
  onOpenAssignment: (assignment: Assignment) => void;
}

const UpcomingAssignments: React.FC<UpcomingAssignmentsProps> = ({
  assignments,
  onMarkAsDone,
  onOpenAssignment
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {assignments.map((assignment) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  {assignment.icon}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{assignment.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    Due: {assignment.dueDate}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenAssignment(assignment)}
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkAsDone(assignment.id)}
                >
                  Done
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAssignments; 