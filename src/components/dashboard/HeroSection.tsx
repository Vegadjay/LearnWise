import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Flame, Activity, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  username: string;
  avatar: string;
  banner: string;
  streakCount: number;
  handleNavigation: (path: string) => void;
}

const HeroSection = ({ username, avatar, banner, streakCount, handleNavigation }: HeroSectionProps) => {
  return (
    <motion.div
      className="mb-6 sm:mb-10 rounded-xl border border-primary/10 relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Banner */}
      <div className="relative w-full h-48 sm:h-64 md:h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>

      {/* Profile section */}
      <div className="px-6 pb-6 pt-0 relative">
        {/* Avatar section */}
        <div className="relative -mt-16 sm:-mt-20 md:-mt-24 mb-4 flex justify-between items-end">
          <div className="relative group">
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <Avatar className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 border-4 border-background rounded-full shadow-xl">
                <AvatarImage src={avatar} alt="Profile" />
                <AvatarFallback className="text-2xl sm:text-3xl">
                  {username ? username.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary/10 hover:bg-primary/20 text-primary font-medium px-4 py-2 rounded-md flex items-center gap-2"
            onClick={() => handleNavigation('/profile')}
          >
            <Pencil className="h-4 w-4" />
            <span>Edit Profile</span>
          </motion.button>
        </div>

        {/* Profile information */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {username || 'Mark Zuck'}
                <motion.span
                  className="inline-block bg-orange-500 text-white rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold flex items-center gap-1 shadow-lg align-middle"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Flame className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{streakCount} day streak</span>
                </motion.span>
              </motion.h1>
            </div>

            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Badge className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                JavaScript
              </Badge>
              <Badge className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                React
              </Badge>
              <Badge className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                NodeJS
              </Badge>
              <Badge className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                UI/UX
              </Badge>
            </motion.div>
          </div>
        </div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-wrap mt-6 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
            <Button
              onClick={() => handleNavigation('/flashcards')}
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-md relative z-10"
            >
              <BookOpen className="h-4 w-4" /> Resume Learning
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
            <Button
              variant="outline"
              onClick={() => handleNavigation('/profile')}
              size="lg"
              className="gap-2 border-primary/20 hover:border-primary/50 transition-colors relative z-10 hover:bg-primary/5 hover:text-primary/80 dark:hover:text-primary"
            >
              <Activity className="h-4 w-4" /> View Progress
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection; 