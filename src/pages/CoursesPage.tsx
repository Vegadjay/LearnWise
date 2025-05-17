import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import CourseCatalog from '@/components/courses/CourseCatalog';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CoursesPage = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
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
          <h1 className="text-3xl font-bold mb-2">Course Catalog</h1>
          <p className="text-muted-foreground">Browse and filter courses by topic and duration</p>
        </header>
        
        <CourseCatalog onCourseClick={handleCourseClick} />
      </motion.div>
    </AppLayout>
  );
};

export default CoursesPage;
