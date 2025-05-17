import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { VideoPlayer } from '@/components/VideoPlayer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // This would typically come from your API/database
  const courseData = {
    id: courseId,
    title: "Introduction to Web Development",
    videoId: "YOUR_YOUTUBE_VIDEO_ID", // Replace with actual video ID
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript."
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto p-6"
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/courses')}
          className="mb-6"
        >
          ← Back to Courses
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
            <p className="text-muted-foreground">{courseData.description}</p>
          </div>

          <VideoPlayer
            videoId={courseData.videoId}
            title={courseData.title}
          />
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default CourseDetailPage; 