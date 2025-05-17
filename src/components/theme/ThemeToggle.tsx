
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem("theme") as 'light' | 'dark' | null;
    return savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full relative overflow-hidden bg-gradient-to-br from-background to-muted border-primary/20"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, y: 10 }}
              animate={{ rotate: 0, opacity: 1, y: 0 }}
              exit={{ rotate: 90, opacity: 0, y: -10 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <Sun className="h-5 w-5 text-yellow-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0, y: 10 }}
              animate={{ rotate: 0, opacity: 1, y: 0 }}
              exit={{ rotate: -90, opacity: 0, y: -10 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <Moon className="h-5 w-5 text-blue-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
