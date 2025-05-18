import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import CourseCatalog from '@/components/courses/CourseCatalog';
import VideoPlayer from '@/components/courses/VideoPlayer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CoursesPage: React.FC = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string, youtubeVideoId: string) => {
    setSelectedVideoId(youtubeVideoId);
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
        
        {selectedVideoId && (
          <div className="mb-8">
            <VideoPlayer videoId={selectedVideoId} />
          </div>
        )}
        
        <CourseCatalog onCourseClick={handleCourseClick} />
      </motion.div>
    </AppLayout>
  );
};

export default CoursesPage;
