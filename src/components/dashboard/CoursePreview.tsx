import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CoursePreviewProps {
  courses: Array<{
    id: string;
    title: string;
    description: string;
    progress: number;
    youtubeVideoId: string;
  }>;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ courses }) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-muted/50 rounded-lg"
            >
              <h3 className="font-medium mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {course.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="w-full bg-muted rounded-full h-2 mr-4">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursePreview; 