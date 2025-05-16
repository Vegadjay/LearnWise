import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Badge } from '@/components/ui/badge';

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
  // Add more language flashcards here...
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
    }
  }, [language]);
  
  const handleCardKnown = () => {
    if (!flashcards[currentCardIndex]) return;
    
    const currentCardId = flashcards[currentCardIndex].id;
    const updatedKnownCards = [...knownCards];
    
    if (!knownCards.includes(currentCardId)) {
      updatedKnownCards.push(currentCardId);
      setKnownCards(updatedKnownCards);
      localStorage.setItem(`${language}-known-cards`, JSON.stringify(updatedKnownCards));
      toast.success("Card marked as known!");
    }
    
    setShowAnimation(true);
    setTimeout(() => {
      moveToNextCard();
      setShowAnimation(false);
    }, 400);
  };
  
  const handleCardUnknown = () => {
    if (!flashcards[currentCardIndex]) return;
    
    const currentCardId = flashcards[currentCardIndex].id;
    const updatedKnownCards = knownCards.filter(id => id !== currentCardId);
    
    setKnownCards(updatedKnownCards);
    localStorage.setItem(`${language}-known-cards`, JSON.stringify(updatedKnownCards));
    toast("You'll see this card again soon.");
    
    setShowAnimation(true);
    setTimeout(() => {
      moveToNextCard();
      setShowAnimation(false);
    }, 400);
  };
  
  const moveToNextCard = () => {
    setIsFlipped(false);
    
    setTimeout(() => {
      if (currentCardIndex < flashcards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setCurrentCardIndex(0);
        toast.success("You've reviewed all the flashcards! Starting again.", { icon: '🎉' });
      }
    }, 300);
  };
  
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
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
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-4 h-2 bg-muted rounded-full overflow-hidden w-full"
        >
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        <div className="flashcard-container min-h-[400px] mb-8 perspective-1000" onClick={toggleFlip}>
          <motion.div 
            className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            animate={showAnimation ? { x: [0, -20, 400] } : {}}
            transition={showAnimation ? { duration: 0.4 } : {}}
            style={{ 
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${currentCardIndex}-${isFlipped ? 'back' : 'front'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`w-full h-full ${isFlipped ? 'flashcard-back' : 'flashcard-front'}`}
                style={{
                  backfaceVisibility: 'hidden',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                <Card className="h-full shadow-lg dark:bg-card dark:text-card-foreground" data-type={isFlipped ? 'back' : 'front'}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg flex justify-center items-center">
                      {isFlipped ? 
                        <Badge variant="secondary" className="px-3 py-1 text-base">Answer</Badge> : 
                        <Badge variant="default" className="px-3 py-1 text-base">Question</Badge>
                      }
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-8 h-[280px] text-center">
                    <div className="max-h-full overflow-auto">
                      <p className="text-xl dark:text-white">
                        {isFlipped ? currentCard?.answer : currentCard?.question}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mb-6"
        >
          {isFlipped ? "Click to see the question" : "Click to reveal the answer"}
        </motion.div>
        
        <div className="flex justify-center gap-4">
          {isFlipped && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  onClick={handleCardUnknown}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <ThumbsDown className="h-4 w-4" /> Don't Know
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleCardKnown}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-edu-indigo-500"
                  size="lg"
                >
                  <ThumbsUp className="h-4 w-4" /> Know It
                </Button>
              </motion.div>
            </>
          )}
          
          {!isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={toggleFlip}
                className="flex items-center gap-2"
                variant="outline"
                size="lg"
              >
                Show Answer <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-2">
            Progress: {knownCards.length} of {flashcards.length} cards marked as known
          </p>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(knownCards.length / flashcards.length) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default LanguageFlashcardsPage;
