
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizQuestion, { QuizQuestionData } from './QuizQuestion';
import QuizResults from './QuizResults';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import toast from 'react-hot-toast';

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface QuizResults {
  answers: QuizAnswer[];
  score: number;
  totalQuestions: number;
  timeSpent: number;
}

interface QuizSessionProps {
  questions: QuizQuestionData[];
  onComplete: (results: QuizResults) => void;
  onRestart?: () => void;
  timeLimit?: number; // in seconds
}

const QuizSession: React.FC<QuizSessionProps> = ({ questions, onComplete, onRestart, timeLimit = 300 }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [completed, setCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [leaveWarningOpen, setLeaveWarningOpen] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerActive && !completed && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          // Show warning when 20% of time remains
          if (prev === Math.floor(timeLimit * 0.2)) {
            setShowTimeWarning(true);
            toast.error("Time is running out!", {
              icon: <Clock className="h-5 w-5" />,
              duration: 3000
            });
          }
          
          // Time's up
          if (prev <= 1) {
            handleQuizComplete();
            return 0;
          }
          
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, completed, timeRemaining, timeLimit]);
  
  // Format time remaining to mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Prevent leaving the page during quiz
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!completed && answers.length > 0) {
        e.preventDefault();
        e.returnValue = '';
        setLeaveWarningOpen(true);
        return '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [completed, answers]);

  const handleAnswer = useCallback((selectedOptionId: string) => {
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    
    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId,
      isCorrect,
    };
    
    setAnswers(prev => [...prev, answer]);
    
    toast.success(isCorrect ? "Correct answer!" : "Incorrect answer");
    
    // Move to next question or complete the quiz
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleQuizComplete();
      }
    }, 1000);
  }, [currentQuestion, currentQuestionIndex, questions.length]);

  const handleQuizComplete = useCallback(() => {
    setCompleted(true);
    setIsTimerActive(false);
    
    // Calculate score and time spent
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const score = Math.round((correctAnswers / questions.length) * 100);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    const results: QuizResults = {
      answers,
      score,
      totalQuestions: questions.length,
      timeSpent,
    };
    
    onComplete(results);
  }, [answers, questions.length, startTime, onComplete]);

  return (
    <div className="relative">
      {!completed ? (
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
              </div>
              <div className={`flex items-center ${timeRemaining < timeLimit * 0.2 ? 'text-destructive animate-pulse' : ''}`}>
                <Clock className="mr-1 h-4 w-4" />
                <span className="font-medium">{formatTime(timeRemaining)}</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuizQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <QuizResults 
            answers={answers} 
            questions={questions} 
            timeSpent={Math.round((Date.now() - startTime) / 1000)}
            onRestart={onRestart}
          />
        </motion.div>
      )}
      
      {/* Time warning modal */}
      <Dialog open={showTimeWarning} onOpenChange={setShowTimeWarning}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Time is running out!
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">You have less than {Math.floor((timeLimit * 0.2) / 60)} minutes remaining to complete the quiz.</p>
          <DialogFooter>
            <Button onClick={() => setShowTimeWarning(false)}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Leave warning modal */}
      <Dialog open={leaveWarningOpen} onOpenChange={setLeaveWarningOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Leave the quiz?
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Your progress will be lost if you leave now. Are you sure you want to exit the quiz?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLeaveWarningOpen(false)}>
              Continue Quiz
            </Button>
            <Button variant="destructive" onClick={handleQuizComplete}>
              Leave & End Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizSession;
