import React, { useRef, useEffect, useState } from 'react';
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
  initial: { y: 0, scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const FeatureCards = ({ features, handleNavigation }: FeatureCardsProps) => {
  // Add CSS to head for glow animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .card-glow {
        position: absolute;
        width: 150px;
        height: 150px;
        background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        mix-blend-mode: screen;
        transform: translate(-50%, -50%);
        z-index: 1;
        filter: blur(15px);
        transition: opacity 0.2s;
      }
      
      .card-container {
        position: relative;
        overflow: visible;
      }
      
      .feature-card {
        position: relative;
        z-index: 2;
        backdrop-filter: blur(5px);
        transition: all 0.3s ease;
      }
      
      .feature-card::before {
        content: '';
        position: absolute;
        inset: -1px;
        background: linear-gradient(130deg, transparent, transparent, var(--border-glow-color), transparent, transparent);
        z-index: -1;
        opacity: 0;
        transition: opacity 0.5s ease;
        border-radius: inherit;
      }
      
      .feature-card:hover::before {
        opacity: 1;
      }
      
      .card-icon {
        position: relative;
        overflow: hidden;
      }
      
      .card-icon::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: radial-gradient(circle at center, var(--icon-glow-color) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .feature-card:hover .card-icon::after {
        opacity: 1;
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-10"
    >
      {features.map((feature, index) => {
        // Create refs for each card
        const cardRef = useRef<HTMLDivElement>(null);
        const glowRef = useRef<HTMLDivElement>(null);
        
        // Mouse move handler specific to this card
        useEffect(() => {
          const card = cardRef.current;
          const glow = glowRef.current;
          
          if (!card || !glow) return;
          
          // Set custom properties for this card
          card.style.setProperty('--border-glow-color', feature.glowColor);
          card.style.setProperty('--icon-glow-color', feature.glowColor);
          glow.style.setProperty('--glow-color', feature.glowColor);
          
          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate distance from center of card to determine opacity
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const maxDistance = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 2;
            const proximity = 1 - Math.min(distance / maxDistance, 1);
            
            // Update glow position and opacity
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
            glow.style.opacity = String(proximity * 0.8);
          };
          
          const handleMouseEnter = () => {
            glow.style.opacity = '0.6';
          };
          
          const handleMouseLeave = () => {
            glow.style.opacity = '0';
          };
          
          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseenter', handleMouseEnter);
          card.addEventListener('mouseleave', handleMouseLeave);
          
          return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
          };
        }, [feature.glowColor]);
        
        return (
          <motion.div
            key={feature.title}
            variants={cardHoverVariants}
            whileHover="hover"
            initial="initial"
            className="card-container"
            ref={cardRef}
          >
            {/* Glow element that follows cursor */}
            <div ref={glowRef} className="card-glow" />
            
            <Card className="feature-card h-full border border-muted/60 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all relative overflow-hidden group">
              <CardHeader className="pb-2 relative">
                <div className="flex justify-between items-start">
                  <motion.div
                    className={`card-icon w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${feature.color} flex items-center justify-center relative`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
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
        );
      })}
    </motion.div>
  );
};

export default FeatureCards;