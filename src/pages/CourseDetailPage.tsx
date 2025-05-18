import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { VideoPlayer } from '@/components/VideoPlayer';
import { motion } from 'framer-motion';
import { SAMPLE_COURSES } from '../data/courses';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find the specific course by ID
        const foundCourse = SAMPLE_COURSES.find(course => course.id === courseId);
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to load course data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-center">
            <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-4"></div>
            <p>Loading course details...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-red-500">
            <p>{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!course) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Course not found</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 py-6"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground mb-4">{course.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {course.instructor && (
              <div className="flex items-center">
                <span className="font-medium">Instructor:</span>
                <span className="ml-1">{course.instructor}</span>
              </div>
            )}
            
            {course.duration && (
              <div className="flex items-center">
                <span className="font-medium">Duration:</span>
                <span className="ml-1">{course.duration}</span>
              </div>
            )}
            
            {course.level && (
              <div className="flex items-center">
                <span className="font-medium">Level:</span>
                <span className="ml-1">{course.level}</span>
              </div>
            )}
          </div>
        </header>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <VideoPlayer 
            videoId={course.youtubeVideoId} 
            title={course.title} 
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Course Contents</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-500">Course curriculum details will be displayed here.</p>
          </div>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default CourseDetailPage;