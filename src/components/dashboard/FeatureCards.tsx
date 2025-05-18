import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
  glowColor: string;
  stats: string;
  progress: number;
}

interface FeatureCardsProps {
  features: Feature[];
  handleNavigation: (path: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const cardHoverVariants = {
  initial: { y: 0, scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  hover: {
    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const FeatureCards = ({ features, handleNavigation }: FeatureCardsProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-10"
    >
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          variants={cardHoverVariants}
          whileHover="hover"
          initial="initial"
          className="transition-all duration-300"
        >
          <Card className="h-full border border-muted/60 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all relative overflow-hidden group">
            <CardHeader className="pb-2 relative">
              <div className="flex justify-between items-start">
                <motion.div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${feature.color} flex items-center justify-center relative overflow-hidden`}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <Badge variant="outline" className="group-hover:bg-background/50 transition-all duration-300 z-10">
                  {feature.stats}
                </Badge>
              </div>
              <CardTitle className="mt-4 text-base sm:text-lg relative z-10">{feature.title}</CardTitle>
              <CardDescription className="text-xs sm:text-sm relative z-10">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 relative z-10">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-2 cursor-help">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span className="font-medium">{feature.progress}%</span>
                      </div>
                      <Progress value={feature.progress} className="h-2" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You've completed {feature.progress}% in this area</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
            <CardFooter className="relative z-10">
              <motion.div
                className="w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between bg-muted/50 hover:bg-muted group-hover:border-primary/20 hover:text-primary/80 dark:hover:text-primary transition-colors duration-300"
                  onClick={() => handleNavigation(feature.link)}
                >
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureCards; 