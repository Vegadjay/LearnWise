import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ThumbsUp, ThumbsDown, Loader2, Award, RotateCcw, Bookmark, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useAnimation, useMotionValue } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

const flashcardsData: { [key: string]: Flashcard[] } = {
  javascript: [
    { id: 'js-1', question: 'What is a closure in JavaScript?', answer: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created.' },
    { id: 'js-2', question: 'What is the difference between let and var?', answer: 'var is function scoped while let is block scoped. Variables declared with var can be redeclared and updated, while let variables can be updated but not redeclared within the same scope.' },
    { id: 'js-3', question: 'What is event bubbling?', answer: 'Event bubbling is a type of event propagation where the event first triggers on the innermost target element, and then triggers on ancestors (parents) of the target element in the same nesting hierarchy till it reaches the outermost DOM element.' },
    { id: 'js-4', question: 'What is a Promise in JavaScript?', answer: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation. It allows you to associate handlers with an asynchronous action\'s eventual success value or failure reason.' },
    { id: 'js-5', question: 'What is the purpose of the "this" keyword?', answer: '"this" refers to the object it belongs to. In a method, "this" refers to the owner object. Alone, "this" refers to the global object. In a function, "this" refers to the global object. In a function, in strict mode, "this" is undefined.' },
    { id: 'js-6', question: 'What is the difference between == and ===?', answer: '== compares values and performs type coercion if needed, while === compares both values and types without any type coercion.' },
    { id: 'js-7', question: 'What is hoisting in JavaScript?', answer: 'Hoisting is JavaScript\'s default behavior of moving declarations to the top. Variables and function declarations are moved to the top of their scope before code execution.' },
    { id: 'js-8', question: 'What is the event loop?', answer: 'The event loop is a programming construct that waits for and dispatches events or messages in a program. It works by making a request to some internal or external "event provider", then calls the relevant event handler.' },
    { id: 'js-9', question: 'What is AJAX?', answer: 'AJAX stands for Asynchronous JavaScript And XML. It allows web pages to be updated asynchronously by exchanging data with a web server behind the scenes, without having to reload the entire page.' },
    { id: 'js-10', question: 'What is the difference between null and undefined?', answer: 'undefined means a variable has been declared but has not yet been assigned a value. null is an assignment value that represents no value or no object. It implies absence of value.' },
  ],
  python: [
    { id: 'py-1', question: 'What is a generator in Python?', answer: 'A generator is a function that returns an iterator that produces a sequence of values when iterated over. Generators generate values one at a time using the yield statement instead of returning all values at once.' },
    { id: 'py-2', question: 'What is the difference between a list and a tuple?', answer: 'Lists are mutable (can be changed after creation) while tuples are immutable (cannot be modified after creation). Lists use square brackets [] while tuples use parentheses ().' },
    { id: 'py-3', question: 'What is a decorator in Python?', answer: 'A decorator is a design pattern in Python that allows a user to add new functionality to an existing object without modifying its structure. Decorators are usually called before the definition of a function you want to decorate.' },
    { id: 'py-4', question: 'What is the purpose of __init__ method?', answer: 'The __init__ method is a special method in Python classes, similar to a constructor in other languages. It\'s called when an instance of the class is created, and is used to initialize the attributes of the class.' },
    { id: 'py-5', question: 'What are list comprehensions?', answer: 'List comprehensions provide a concise way to create lists based on existing lists or iterables. They consist of brackets containing an expression followed by a for clause, then zero or more for or if clauses.' },
    { id: 'py-6', question: 'What is PEP 8?', answer: 'PEP 8 is the official style guide for Python code. It provides conventions for Python code layout, naming conventions, and programming recommendations to make the code more readable and consistent.' },
    { id: 'py-7', question: 'What is the Global Interpreter Lock (GIL)?', answer: 'The Global Interpreter Lock (GIL) is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at once. This simplifies the implementation, but effectively limits CPU-bound Python programs to a single CPU core.' },
    { id: 'py-8', question: 'What is the difference between deep and shallow copy?', answer: 'A shallow copy creates a new object but inserts references to the objects in the original, while a deep copy creates a new object and recursively adds copies of nested objects found in the original.' },
    { id: 'py-9', question: 'What are Python modules and packages?', answer: 'A module is a file containing Python code. A package is a directory of Python modules containing an additional __init__.py file, which makes Python treat directories containing the file as packages.' },
    { id: 'py-10', question: 'What is the purpose of the *args and **kwargs parameters?', answer: '*args allows you to pass a variable number of positional arguments. **kwargs allows you to pass a variable number of keyword arguments. Together, they allow a function to accept any number of positional and keyword arguments.' },
  ],
  java: [
    { id: 'java-1', question: 'What is the difference between JDK, JRE, and JVM?', answer: 'JDK (Java Development Kit) contains development tools, JRE (Java Runtime Environment) is needed to run Java programs, and JVM (Java Virtual Machine) is an abstract machine that executes Java bytecode.' },
    { id: 'java-2', question: 'What is polymorphism in Java?', answer: 'Polymorphism allows a single interface to represent different underlying forms (data types). In Java, it occurs when a parent class reference is used to refer to a child class object.' },
    { id: 'java-3', question: 'What is the difference between method overloading and overriding?', answer: 'Method overloading allows multiple methods with the same name but different parameters in the same class. Method overriding replaces a method from a parent class with a new implementation in a child class.' },
  ],
  typescript: [
    { id: 'ts-1', question: 'What are TypeScript interfaces?', answer: 'Interfaces in TypeScript are used to define contracts for shape of objects. They describe the properties and methods that an object must have.' },
    { id: 'ts-2', question: 'What is the difference between interface and type in TypeScript?', answer: 'Interfaces are primarily used for object shapes while types can represent primitives, unions, intersections, and more. Types cannot be re-opened to add new properties while interfaces are always extendable.' },
    { id: 'ts-3', question: 'What are generics in TypeScript?', answer: 'Generics provide a way to create reusable components that can work with a variety of types rather than a single one. They allow type variables that specify type relationships between parameters, returns, and constraints.' },
  ],
  // Add other languages as needed
};

const LanguageFlashcardsPage = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bookmarkedCards, setBookmarkedCards] = useState<string[]>([]);
  const [isChangingCard, setIsChangingCard] = useState(false);
  const [sparkleEffects, setSparkleEffects] = useState(false);
  const [showAnswerButton, setShowAnswerButton] = useState(true); // State for the "Show Answer" button

  const cardControls = useAnimation();
  const rotateY = useMotionValue(0);

  // Get the appropriate flashcards based on the language
  useEffect(() => {
    if (language) {
      const cards = flashcardsData[language] || [];
      setFlashcards(cards);

      // Simulate loading delay
      setTimeout(() => {
        setIsLoading(false);
      }, 800);

      // Load known cards from localStorage
      const savedKnownCards = localStorage.getItem(`${language}-known-cards`);
      if (savedKnownCards) {
        try {
          setKnownCards(JSON.parse(savedKnownCards));
        } catch (error) {
          console.error('Error parsing known cards from localStorage:', error);
          setKnownCards([]);
        }
      }

      // Load streak from localStorage
      const savedStreak = localStorage.getItem(`${language}-streak`);
      if (savedStreak) {
        try {
          setStreak(JSON.parse(savedStreak));
        } catch (error) {
          console.error('Error parsing streak from localStorage:', error);
          setStreak(0);
        }
      }

      // Load bookmarked cards from localStorage
      const savedBookmarkedCards = localStorage.getItem(`${language}-bookmarked-cards`);
      if (savedBookmarkedCards) {
        try {
          setBookmarkedCards(JSON.parse(savedBookmarkedCards));
        } catch (error) {
          console.error('Error parsing bookmarked cards from localStorage:', error);
          setBookmarkedCards([]);
        }
      }
    }
  }, [language]);

  const handleCardKnown = () => {
    if (!flashcards[currentCardIndex] || isChangingCard) return;

    const currentCardId = flashcards[currentCardIndex].id;
    const updatedKnownCards = [...knownCards];

    if (!knownCards.includes(currentCardId)) {
      updatedKnownCards.push(currentCardId);
      setKnownCards(updatedKnownCards);
      localStorage.setItem(`${language}-known-cards`, JSON.stringify(updatedKnownCards));

      // Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem(`${language}-streak`, JSON.stringify(newStreak));

      // Show confetti for milestone streaks
      if (newStreak > 0 && newStreak % 5 === 0) {
        setConfetti(true);
        toast.success(`🎉 ${newStreak} card streak! Keep it up!`);
        setTimeout(() => setConfetti(false), 3000);
      } else {
        toast.success("Card marked as known!");
      }
    }

    setShowAnimation(true);
    setIsChangingCard(true);

    cardControls.start({
      x: [0, -20, 400],
      opacity: [1, 1, 0],
      transition: { duration: 0.5 }
    }).then(() => {
      moveToNextCard();
      setShowAnimation(false);
    });
  };

  const handleCardUnknown = () => {
    if (!flashcards[currentCardIndex] || isChangingCard) return;

    const currentCardId = flashcards[currentCardIndex].id;
    const updatedKnownCards = knownCards.filter(id => id !== currentCardId);

    setKnownCards(updatedKnownCards);
    localStorage.setItem(`${language}-known-cards`, JSON.stringify(updatedKnownCards));

    // Reset streak
    setStreak(0);
    localStorage.setItem(`${language}-streak`, JSON.stringify(0));

    toast("You'll see this card again soon.");

    setShowAnimation(true);
    setIsChangingCard(true);

    cardControls.start({
      x: [0, 20, -400],
      opacity: [1, 1, 0],
      transition: { duration: 0.5 }
    }).then(() => {
      moveToNextCard();
      setShowAnimation(false);
    });
  };

  const moveToNextCard = () => {
    // Ensure we fully reset the card state
    setIsFlipped(false);
    rotateY.set(0);
    setShowAnswerButton(true); // Show the "Show Answer" button again

    setTimeout(() => {
      if (currentCardIndex < flashcards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setCurrentCardIndex(0);
        toast.success("You've reviewed all the flashcards! Starting again.", { icon: '🎉' });
        setSparkleEffects(true);
        setTimeout(() => setSparkleEffects(false), 2000);
      }

      // Important: Reset the changing card state to allow interactions again
      setTimeout(() => {
        setIsChangingCard(false);
      }, 300);
    }, 300);
  };

  const flipCardToShowAnswer = () => {
    if (isChangingCard) return;
    setIsFlipped(true);
    rotateY.set(180);
    setShowAnswerButton(false); // Hide the "Show Answer" button after flipping
  };

  // Toggle bookmark
  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip if clicked directly on the icon

    if (!flashcards[currentCardIndex] || isChangingCard) return;

    const currentCardId = flashcards[currentCardIndex].id;
    let updatedBookmarkedCards;

    if (bookmarkedCards.includes(currentCardId)) {
      updatedBookmarkedCards = bookmarkedCards.filter(id => id !== currentCardId);
      toast("Bookmark removed");
    } else {
      updatedBookmarkedCards = [...bookmarkedCards, currentCardId];
      toast.success("Card bookmarked for later review!");
    }

    setBookmarkedCards(updatedBookmarkedCards);
    localStorage.setItem(`${language}-bookmarked-cards`, JSON.stringify(updatedBookmarkedCards));
  };

  // Shuffle cards
  const shuffleCards = () => {
    if (isChangingCard) return;

    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    rotateY.set(0);
    setShowAnswerButton(true); // Show the "Show Answer" button on shuffle
    toast("Cards shuffled!");

    // Show sparkles effect on shuffle
    setSparkleEffects(true);
    setTimeout(() => setSparkleEffects(false), 2000);
  };

  const getLanguageName = (langKey: string) => {
    const languageMap: { [key: string]: string } = {
      javascript: 'JavaScript',
      python: 'Python',
      java: 'Java',
      sql: 'SQL',
      html: 'HTML & CSS',
      csharp: 'C#',
      typescript: 'TypeScript',
      react: 'React',
    };

    return languageMap[langKey] || langKey;
  };

  const currentCard = flashcards[currentCardIndex];
  const progress = flashcards.length > 0 ? ((currentCardIndex + 1) / flashcards.length) * 100 : 0;
  const languageName = language ? getLanguageName(language) : '';
  const isCurrentCardBookmarked = currentCard ? bookmarkedCards.includes(currentCard.id) : false;

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-12 w-12 text-primary mx-auto mb-4" />
            </motion.div>
            <p className="text-lg text-muted-foreground">Loading flashcards...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (flashcards.length === 0) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="ghost" onClick={() => navigate('/flashcards')} className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Languages
            </Button>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="text-center p-8">
              <CardTitle className="mb-4">No Flashcards Available</CardTitle>
              <CardDescription>
                There are no flashcards available for this language yet. Please check back later.
              </CardDescription>
            </Card>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {confetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                initial={{
                  top: "50%",
                  left: "50%",
                  scale: 0,
                  backgroundColor: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"][
                    Math.floor(Math.random() * 5)
                  ],
                }}
                animate={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: "easeOut",
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Sparkle effects for shuffle and completion */}
        {sparkleEffects && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute"
                initial={{
                  top: "50%",
                  left: "50%",
                  opacity: 0,
                }}
                animate={{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${30 + Math.random() * 40}%`,
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0],
                }}
                transition={{
                  duration: 1 + Math.random() * 1.5,
                  ease: "easeOut",
                  delay: Math.random() * 0.5,
                }}
              >
                <Sparkles className="h-5 w-5 text-yellow-400" />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between items-center mb-8"
        >
          <Button variant="ghost" onClick={() => navigate('/flashcards')} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Languages
          </Button>
          <div className="text-right">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold"
            >
              {languageName} Flashcards
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground"
            >
              Card {currentCardIndex + 1} of {flashcards.length}
            </motion.p>
          </div>
        </motion.div>

        <div className="flex items-center justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/20 px-3 py-1.5 rounded-full"
          >
            <Award className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Streak: {streak}</span>
          </motion.div>

          <div className="flex gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={shuffleCards}
                disabled={isChangingCard}
              >
                <RotateCcw className="h-3.5 w-3.5" /> Shuffle
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Flashcard container without mouse move tracking */}
        <div
          className="flashcard-container min-h-[400px] mb-8"
          style={{ perspective: "1000px" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${currentCardIndex}`}
              className={`flashcard-inner w-full h-full ${isChangingCard ? 'pointer-events-none' : ''}`}
              style={{
                transformStyle: "preserve-3d",
                rotateY,
                transition: "transform 0.5s ease"
              }}
              animate={showAnimation ? cardControls : {}}
              initial={!isChangingCard ? { opacity: 0, scale: 0.9 } : {}}
              animate={!showAnimation ? { opacity: 1, scale: 1 } : {}}
            // Remove onClick from the inner div to prevent automatic flip
            >
              <motion.div
                className="flashcard-front absolute w-full h-full backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  rotateY: 0,
                }}
              >
                <Card className="h-full shadow-lg dark:bg-card dark:text-card-foreground relative overflow-hidden">
                  {/* Background pulse animation - added glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent dark:via-blue-900/10 z-0"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.3)', // Glow effect
                    }}
                  />
                  <CardHeader className="text-center relative z-10">
                    <motion.div
                      className="absolute top-3 right-3"
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleBookmark}
                    >
                      <Bookmark className={`h-5 w-5 cursor-pointer ${isCurrentCardBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                    </motion.div>
                    <CardTitle className="text-lg flex justify-center items-center">
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Badge variant="default" className="px-3 py-1 text-base">Question</Badge>
                      </motion.div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-8 h-[280px] text-center z-10">
                    <div className="max-h-full overflow-auto">
                      <motion.p
                        className="text-xl dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {currentCard?.question}
                      </motion.p>
                    </div>
                  </CardContent>
                  {/* "Show Answer" button */}
                  {showAnswerButton && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
                      <motion.div
                        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(165, 180, 252, 0.6)' }} // Glow on hover
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button onClick={flipCardToShowAnswer} disabled={isChangingCard}>
                          Show Answer
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </Card>
              </motion.div>

              <motion.div
                className="flashcard-back absolute w-full h-full backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  rotateY: 180,
                }}
              >
                <Card className="h-full shadow-lg dark:bg-card dark:text-card-foreground relative overflow-hidden">
                  {/* Background pulse animation - added glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/20 to-transparent dark:via-purple-900/10 z-0"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      boxShadow: '0 0 20px rgba(168, 85, 247, 0.4), 0 0 30px rgba(168, 85, 247, 0.3)', // Glow effect
                    }}
                  />
                  <CardHeader className="text-center relative z-10">
                    <motion.div
                      className="absolute top-3 right-3"
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleBookmark}
                    >
                      <Bookmark className={`h-5 w-5 cursor-pointer ${isCurrentCardBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                    </motion.div>
                    <CardTitle className="text-lg flex justify-center items-center">
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Badge variant="secondary" className="px-3 py-1 text-base">Answer</Badge>
                      </motion.div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-8 h-[280px] text-center z-10">
                    <div className="max-h-full overflow-auto">
                      <motion.p
                        className="text-lg dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {currentCard?.answer}
                      </motion.p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card actions - visible only when flipped */}
        <AnimatePresence>
          {!showAnswerButton && (
            <motion.div
              className="grid grid-cols-2 gap-4 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)' }} // Glow on hover
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="w-full py-6 text-red-500 border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center gap-2"
                  onClick={handleCardUnknown}
                  disabled={isChangingCard}
                >
                  <ThumbsDown className="h-5 w-5" />
                  <span className="text-base">Still Learning</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)' }} // Glow on hover
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="w-full py-6 text-green-500 border-green-200 dark:border-green-900/30 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 flex items-center justify-center gap-2"
                  onClick={handleCardKnown}
                  disabled={isChangingCard}
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span className="text-base">Got It!</span>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        <motion.div
          className="text-center mt-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>Tap the card to flip it (removed)</p> {/* Updated text */}
          <p className="mt-1">{knownCards.length} of {flashcards.length} cards marked as known</p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default LanguageFlashcardsPage;
