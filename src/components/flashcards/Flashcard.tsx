
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  nextReview?: Date;
}

interface FlashcardProps {
  card: FlashcardData;
  onKnown: (cardId: string) => void;
  onUnknown: (cardId: string) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, onKnown, onUnknown }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const { toast } = useToast();

  const handleFlip = () => {
    if (!isAnswered) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleKnown = () => {
    if (!isFlipped) {
      toast({
        title: "Flip the card first!",
        description: "Make sure to check the answer before marking as known.",
      });
      return;
    }
    
    setIsAnswered(true);
    onKnown(card.id);
    
    toast({
      title: "Card marked as known",
      description: "This card will be reviewed less frequently.",
      variant: "default",
    });
  };

  const handleUnknown = () => {
    if (!isFlipped) {
      toast({
        title: "Flip the card first!",
        description: "Make sure to check the answer before marking as unknown.",
      });
      return;
    }
    
    setIsAnswered(true);
    onUnknown(card.id);
    
    toast({
      title: "Card marked for review",
      description: "This card will be shown again soon.",
      variant: "default",
    });
  };

  const difficultyColor = {
    easy: "border-edu-teal-400",
    medium: "border-edu-indigo-400",
    hard: "border-edu-blue-400"
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div 
        className="flashcard-container relative h-64 cursor-pointer bg-transparent rounded-lg"
        onClick={handleFlip}
      >
        <motion.div 
          className={cn("flashcard-inner h-full w-full", {
            "flipped": isFlipped
          })}
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className={cn(
            "flashcard-front rounded-lg border p-6 shadow-md bg-card",
            difficultyColor[card.difficulty]
          )}>
            <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-muted">
              {card.difficulty}
            </div>
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-xl font-medium text-card-foreground mb-4">Question</h3>
              <p className="text-center">{card.question}</p>
            </div>
          </div>
          <div className={cn(
            "flashcard-back rounded-lg border p-6 shadow-md bg-card",
            difficultyColor[card.difficulty]
          )}>
            <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-muted">
              {card.difficulty}
            </div>
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-xl font-medium text-card-foreground mb-4">Answer</h3>
              <p className="text-center">{card.answer}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Button 
          variant="outline" 
          className="bg-white/90 hover:bg-white border-rose-200 hover:border-rose-300 text-rose-600 hover:text-rose-700"
          disabled={isAnswered}
          onClick={handleUnknown}
        >
          <X className="w-4 h-4 mr-2" />
          Don't Know
        </Button>
        <Button
          variant="outline"
          className="bg-white/90 hover:bg-white border-emerald-200 hover:border-emerald-300 text-emerald-600 hover:text-emerald-700"
          disabled={isAnswered}
          onClick={handleKnown}
        >
          <Check className="w-4 h-4 mr-2" />
          Know
        </Button>
      </div>
    </div>
  );
};

export default Flashcard;
