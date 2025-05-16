
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export interface QuizQuestionData {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface QuizQuestionProps {
  question: QuizQuestionData;
  onAnswer: (selectedOptionId: string) => void;
  questionNumber?: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer, questionNumber = 1 }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  
  const handleSelectOption = (optionId: string) => {
    if (!isSubmitting && !isAnswerRevealed) {
      setSelectedOptionId(optionId);
    }
  };
  
  const handleSubmit = () => {
    if (selectedOptionId && !isSubmitting) {
      setIsSubmitting(true);
      setIsAnswerRevealed(true);
      
      // Delay to show result before moving to next question
      setTimeout(() => {
        onAnswer(selectedOptionId);
        setSelectedOptionId(null);
        setIsSubmitting(false);
        setIsAnswerRevealed(false);
      }, 1500);
    }
  };
  
  // Get the background color for an option button based on selection and answer reveal
  const getOptionClassName = (optionId: string) => {
    if (!isAnswerRevealed) {
      return selectedOptionId === optionId 
        ? 'border-primary bg-primary/10' 
        : 'border-muted hover:border-primary/50 hover:bg-muted/50';
    }
    
    if (optionId === question.correctOptionId) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
    }
    
    if (selectedOptionId === optionId) {
      return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
    }
    
    return 'border-muted opacity-50';
  };
  
  // Get badge for difficulty level
  const getDifficultyBadge = () => {
    const difficulty = question.difficulty || 'medium';
    
    const badgeClasses = {
      easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      hard: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded ${badgeClasses[difficulty]} font-medium`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Question {questionNumber}</span>
          {getDifficultyBadge()}
        </div>
        <h3 className="text-xl font-medium">{question.question}</h3>
      </div>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => handleSelectOption(option.id)}
            className={`p-4 rounded-md border w-full text-left relative ${getOptionClassName(option.id)}`}
            whileHover={!isAnswerRevealed ? { scale: 1.01 } : {}}
            whileTap={!isAnswerRevealed ? { scale: 0.99 } : {}}
            disabled={isSubmitting || isAnswerRevealed}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex">
              <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-sm mr-3">
                {String.fromCharCode(65 + question.options.indexOf(option))}
              </div>
              <span>{option.text}</span>
            </div>
            
            {isAnswerRevealed && option.id === question.correctOptionId && (
              <motion.div 
                className="absolute top-1/2 right-4 -translate-y-1/2 text-green-600"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
            
            {isAnswerRevealed && selectedOptionId === option.id && option.id !== question.correctOptionId && (
              <motion.div 
                className="absolute top-1/2 right-4 -translate-y-1/2 text-red-600"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      
      <div className="flex justify-end">
        <AnimatePresence mode="wait">
          {selectedOptionId && !isAnswerRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Answer'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizQuestion;
