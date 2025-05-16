
import React from 'react';
import { QuizQuestionData } from './QuizQuestion';
import { QuizAnswer } from './QuizSession';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  X, 
  ChevronRight, 
  Clock, 
  Trophy, 
  BarChart, 
  Brain 
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import { Badge } from '@/components/ui/badge';

interface QuizResultsProps {
  answers: QuizAnswer[];
  questions: QuizQuestionData[];
  timeSpent: number;
  onRestart?: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ answers, questions, timeSpent, onRestart }) => {
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const score = Math.round((correctAnswers / questions.length) * 100);
  
  const difficultyBreakdown = questions.reduce((acc, question, index) => {
    const difficulty = question.difficulty || 'medium';
    
    if (!acc[difficulty]) {
      acc[difficulty] = { total: 0, correct: 0 };
    }
    
    acc[difficulty].total++;
    
    if (answers[index]?.isCorrect) {
      acc[difficulty].correct++;
    }
    
    return acc;
  }, {} as Record<string, { total: number, correct: number }>);

  // Format time spent as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Determine performance level
  const getPerformanceLevel = () => {
    if (score >= 90) return { text: 'Excellent', color: 'text-green-500' };
    if (score >= 75) return { text: 'Good', color: 'text-blue-500' };
    if (score >= 60) return { text: 'Satisfactory', color: 'text-yellow-500' };
    return { text: 'Needs Improvement', color: 'text-red-500' };
  };

  const performance = getPerformanceLevel();

  // Chart data for the results pie chart
  const chartData = [
    { name: 'Correct', value: correctAnswers, color: '#10B981' },
    { name: 'Incorrect', value: questions.length - correctAnswers, color: '#EF4444' }
  ];

  return (
    <motion.div 
      className="space-y-8"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="text-center py-8"
        variants={{
          hidden: { opacity: 0, y: -20 },
          show: { opacity: 1, y: 0 }
        }}
      >
        <div className="inline-block rounded-full bg-primary/10 p-4 mb-4">
          <Trophy className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-muted-foreground mb-4">
          You scored <span className={`font-bold ${performance.color}`}>{score}%</span> ({correctAnswers} out of {questions.length} correct)
        </p>
        <Badge className={`${score >= 75 ? 'bg-green-100 text-green-800' : score >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'} px-3 py-1`}>
          {performance.text}
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          className="bg-card p-4 rounded-lg border shadow-sm"
          variants={{
            hidden: { opacity: 0, x: -20 },
            show: { opacity: 1, x: 0 }
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Score Breakdown</h3>
          </div>
          <div className="aspect-square relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold">{score}%</span>
              <span className="text-xs text-muted-foreground">Score</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-card p-4 rounded-lg border shadow-sm"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart className="h-5 w-5 text-secondary" />
            <h3 className="font-medium">Difficulty Analysis</h3>
          </div>
          <div className="space-y-4 mt-4">
            {Object.entries(difficultyBreakdown).map(([difficulty, data]) => (
              <div key={difficulty}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm capitalize">{difficulty}</span>
                  <span className="text-sm font-medium">
                    {data.correct}/{data.total} correct
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      difficulty === 'easy' ? 'bg-green-500' : 
                      difficulty === 'medium' ? 'bg-blue-500' : 
                      'bg-purple-500'
                    }`}
                    style={{ width: `${(data.correct / data.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="bg-card p-4 rounded-lg border shadow-sm"
          variants={{
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 }
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-accent" />
            <h3 className="font-medium">Time Analysis</h3>
          </div>
          <div className="flex flex-col justify-center h-full">
            <div className="text-center">
              <span className="block text-3xl font-bold">{formatTime(timeSpent)}</span>
              <span className="text-muted-foreground">Total Time</span>
            </div>
            <div className="mt-4 text-center">
              <span className="block font-medium">{Math.round(timeSpent / questions.length)} seconds</span>
              <span className="text-muted-foreground">Average per question</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="bg-card border rounded-lg p-4 mt-6"
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 }
        }}
      >
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Answer Review
        </h3>
        <div className="space-y-3">
          {questions.map((question, index) => {
            const answer = answers.find(a => a.questionId === question.id);
            const isCorrect = answer?.isCorrect;
            
            return (
              <div 
                key={question.id} 
                className={`p-3 rounded-md border ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-1 ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white flex-shrink-0 mt-0.5`}>
                    {isCorrect ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Question {index + 1}</span>
                    <p className="font-medium text-sm">{question.question}</p>
                    
                    {answer && (
                      <div className="mt-1 text-sm">
                        <p className={`${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {isCorrect ? 'Correct answer!' : 'Incorrect answer.'}
                        </p>
                        {!isCorrect && (
                          <p className="text-muted-foreground text-xs mt-1">
                            Correct answer: {question.options.find(opt => opt.id === question.correctOptionId)?.text}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div 
        className="flex justify-between"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 }
        }}
      >
        {onRestart && (
          <Button 
            onClick={onRestart} 
            className="flex items-center gap-2"
          >
            Try Again
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default QuizResults;
