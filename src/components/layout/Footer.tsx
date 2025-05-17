
import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <div className="h-6 w-6 rounded-full bg-primary mr-2 flex items-center justify-center">
                <span className="text-primary-foreground font-medium text-xs">L</span>
              </div>
              LearnWise
            </h3>
            <p className="text-muted-foreground mb-4">
              Your personalized learning platform to master new skills through flashcards, quizzes, and habit tracking.
            </p>
            <p className="text-muted-foreground mb-4">
              Images are genrated by ChatGPT.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-muted/60 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-muted/60 text-muted-foreground hover:text-blue-400 transition-colors"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-muted/60 text-muted-foreground hover:text-blue-700 transition-colors"
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors animated-underline">Dashboard</a>
              </li>
              <li>
                <a href="/flashcards" className="text-muted-foreground hover:text-primary transition-colors animated-underline">Flashcards</a>
              </li>
              <li>
                <a href="/quizzes" className="text-muted-foreground hover:text-primary transition-colors animated-underline">Quizzes</a>
              </li>
              <li>
                <a href="/progress" className="text-muted-foreground hover:text-primary transition-colors animated-underline">Progress</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors animated-underline">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors animated-underline">Blog</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors animated-underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors animated-underline">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {currentYear} LearnWise. All rights reserved.</p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">Made with ❤️ for effective learning</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
