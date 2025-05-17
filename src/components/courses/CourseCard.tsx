
import React from 'react';
import { Course } from './CourseCatalog';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  onClick?: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  // Convert duration to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) return `${remainingMinutes} min`;
    if (remainingMinutes === 0) return `${hours} hr`;
    return `${hours} hr ${remainingMinutes} min`;
  };
  
  // Determine difficulty badge color
  const difficultyColor = {
    'Beginner': 'bg-green-100 text-green-800 hover:bg-green-100',
    'Intermediate': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    'Advanced': 'bg-purple-100 text-purple-800 hover:bg-purple-100',
  }[course.difficulty];
  
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={`${course.imageUrl}?w=500&auto=format&q=75`}
          alt={course.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge className={difficultyColor}>
            {course.difficulty}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  "h-4 w-4", 
                  index < course.popularity 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-muted"
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-1">
          <Badge variant="outline" className="text-xs">
            {course.topic}
          </Badge>
          {course.subtopics.slice(0, 1).map(subtopic => (
            <Badge key={subtopic} variant="outline" className="text-xs">
              {subtopic}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          {formatDuration(course.duration)}
        </div>
        <Button size="sm" onClick={() => onClick?.(course.id)}>View Course</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
