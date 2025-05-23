import React, { useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Search, Clock, Filter, Calendar, Youtube } from 'lucide-react';
import CourseCard from './CourseCard';
import {SAMPLE_COURSES} from '../../data/courses';


interface FilterOptions {
  topic: string[];
  difficulty: ('Beginner' | 'Intermediate' | 'Advanced')[];
  duration: 'all' | 'short' | 'medium' | 'long';
}

interface CourseCatalogProps {
  onCourseClick: (courseId: string, youtubeVideoId: string) => void; // Updated to include youtubeVideoId
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const CourseCatalog: React.FC<CourseCatalogProps> = ({ onCourseClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    topic: [],
    difficulty: [],
    duration: 'all',
  });
  const [sortBy, setSortBy] = useState<'popularity' | 'duration'>('popularity');
  
  // Extract unique topics for filters
  const allTopics = useMemo(() => 
    Array.from(new Set(SAMPLE_COURSES.map(course => course.topic))), 
    []
  );
  
  // Filter and sort courses based on user selections
  const filteredCourses = useMemo(() => {
    let result = [...SAMPLE_COURSES];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.topic.toLowerCase().includes(query) ||
        course.subtopics.some(subtopic => subtopic.toLowerCase().includes(query))
      );
    }
    
    // Apply topic filter
    if (filters.topic.length > 0) {
      result = result.filter(course => filters.topic.includes(course.topic));
    }
    
    // Apply difficulty filter
    if (filters.difficulty.length > 0) {
      result = result.filter(course => filters.difficulty.includes(course.difficulty));
    }
    
    // Apply duration filter
    if (filters.duration !== 'all') {
      result = result.filter(course => {
        if (filters.duration === 'short') return course.duration <= 60;
        if (filters.duration === 'medium') return course.duration > 60 && course.duration <= 120;
        if (filters.duration === 'long') return course.duration > 120;
        return true;
      });
    }
    
    // Apply sorting
    if (sortBy === 'popularity') {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'duration') {
      result.sort((a, b) => a.duration - b.duration);
    }
    
    return result;
  }, [searchQuery, filters, sortBy]);
  
  const handleCourseClick = (course: Course) => {
    onCourseClick(course.id, course.youtubeVideoId);
  };

  const toggleTopicFilter = (topic: string) => {
    setFilters(prev => {
      if (prev.topic.includes(topic)) {
        return { ...prev, topic: prev.topic.filter(t => t !== topic) };
      } else {
        return { ...prev, topic: [...prev.topic, topic] };
      }
    });
  };
  
  const toggleDifficultyFilter = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
    setFilters(prev => {
      if (prev.difficulty.includes(difficulty)) {
        return { ...prev, difficulty: prev.difficulty.filter(d => d !== difficulty) };
      } else {
        return { ...prev, difficulty: [...prev.difficulty, difficulty] };
      }
    });
  };
  
  const setDurationFilter = (duration: 'all' | 'short' | 'medium' | 'long') => {
    setFilters(prev => ({ ...prev, duration }));
  };
  
  const resetFilters = () => {
    setFilters({
      topic: [],
      difficulty: [],
      duration: 'all',
    });
    setSearchQuery('');
  };
  
  const activeFiltersCount = filters.topic.length + filters.difficulty.length + (filters.duration !== 'all' ? 1 : 0);
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters {activeFiltersCount > 0 && <span className="ml-1 bg-primary text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">{activeFiltersCount}</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Topics</DropdownMenuLabel>
              {allTopics.map(topic => (
                <DropdownMenuCheckboxItem
                  key={topic}
                  checked={filters.topic.includes(topic)}
                  onSelect={(e) => {
                    e.preventDefault();
                    toggleTopicFilter(topic);
                  }}
                >
                  {topic}
                </DropdownMenuCheckboxItem>
              ))}
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
              {(['Beginner', 'Intermediate', 'Advanced'] as const).map(difficulty => (
                <DropdownMenuCheckboxItem
                  key={difficulty}
                  checked={filters.difficulty.includes(difficulty)}
                  onSelect={(e) => {
                    e.preventDefault();
                    toggleDifficultyFilter(difficulty);
                  }}
                >
                  {difficulty}
                </DropdownMenuCheckboxItem>
              ))}
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Duration</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={filters.duration === 'short'}
                onSelect={(e) => {
                  e.preventDefault();
                  setDurationFilter('short');
                }}
              >
                Under 1 hour
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.duration === 'medium'}
                onSelect={(e) => {
                  e.preventDefault();
                  setDurationFilter('medium');
                }}
              >
                1-2 hours
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.duration === 'long'}
                onSelect={(e) => {
                  e.preventDefault();
                  setDurationFilter('long');
                }}
              >
                Over 2 hours
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.duration === 'all'}
                onSelect={(e) => {
                  e.preventDefault();
                  setDurationFilter('all');
                }}
              >
                Any duration
              </DropdownMenuCheckboxItem>
              
              <DropdownMenuSeparator />
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center mt-2"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {sortBy === 'popularity' ? (
                  <>
                    <Calendar className="h-4 w-4" />
                    Popular
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4" />
                    Duration
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={sortBy === 'popularity'}
                onSelect={() => setSortBy('popularity')}
              >
                Sort by Popularity
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === 'duration'}
                onSelect={() => setSortBy('duration')}
              >
                Sort by Duration (shortest first)
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-muted/20">
          <h3 className="text-xl font-medium mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button onClick={resetFilters}>Clear Filters</Button>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={item}
              whileHover={{ 
                scale: 1.02,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              style={{
                perspective: 1000,
              }}
            >
              <CourseCard 
                key={course.id} 
                course={course} 
                onClick={() => handleCourseClick(course)} 
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CourseCatalog;