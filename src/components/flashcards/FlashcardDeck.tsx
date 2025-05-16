
import React, { useState, useEffect } from 'react';
import Flashcard, { FlashcardData } from './Flashcard';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw } from 'lucide-react';

interface FlashcardDeckProps {
  cards: FlashcardData[];
  onCardReviewed: (cardId: string, known: boolean) => void;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ cards, onCardReviewed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedCards, setReviewedCards] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currentCard = cards[currentIndex];
  
  const handleKnown = (cardId: string) => {
    setReviewedCards(prev => new Set([...prev, cardId]));
    onCardReviewed(cardId, true);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 1000);
  };

  const handleUnknown = (cardId: string) => {
    setReviewedCards(prev => new Set([...prev, cardId]));
    onCardReviewed(cardId, false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 1000);
  };

  const resetDeck = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentIndex(0);
      setReviewedCards(new Set());
      setIsLoading(false);
      toast({
        title: "Deck reset",
        description: "Starting from the first card again."
      });
    }, 800);
  };

  const progressPercentage = cards.length > 0 
    ? (reviewedCards.size / cards.length) * 100 
    : 0;

  if (!cards.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="text-3xl font-bold mb-4">No cards available</div>
        <p className="text-muted-foreground">Add some flashcards to get started!</p>
      </div>
    );
  }

  const isReviewComplete = currentIndex >= cards.length - 1 && reviewedCards.has(cards[currentIndex].id);

  return (
    <div className="w-full">
      <div className="w-full mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{reviewedCards.size} of {cards.length} cards reviewed</span>
          <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isReviewComplete ? (
        <div className="h-64 flex flex-col items-center justify-center border rounded-lg p-6 bg-card">
          <h3 className="text-xl font-medium mb-4">Review Complete!</h3>
          <p className="text-center text-muted-foreground mb-6">You've reviewed all the cards in this deck.</p>
          <Button onClick={resetDeck} className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" /> 
            Review Again
          </Button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Flashcard
              card={currentCard}
              onKnown={handleKnown}
              onUnknown={handleUnknown}
            />
          </motion.div>
        </AnimatePresence>
      )}

      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-sm">
          Card {currentIndex + 1} of {cards.length}
        </p>
        {!isReviewComplete && reviewedCards.size > 0 && (
          <Button 
            variant="ghost" 
            onClick={resetDeck} 
            className="mt-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> 
            Reset Deck
          </Button>
        )}
      </div>
    </div>
  );
};

export default FlashcardDeck;
