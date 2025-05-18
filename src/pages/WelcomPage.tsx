import React, { useEffect, useState, useRef } from "react";
import AnimatedTitle from '../components/AnimatedTitle';

const WelcomePage = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(true);
  const logoRef = useRef(null);
  
  // Handle the completion of the welcome animation
  const handleComplete = () => {
    setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 300);
  };
  
  // Progress animation effect with improved MacBook-like behavior
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        if (progress < 100) {
          setProgress(prev => {
            // MacBook-style progress - slow start, fast middle, slow finish
            let increment;
            if (prev < 20) increment = 0.5;
            else if (prev < 40) increment = 1;
            else if (prev < 70) increment = 2;
            else if (prev < 90) increment = 1;
            else increment = 0.5;
            
            const newProgress = Math.min(prev + increment, 100);
            
            if (newProgress === 100) {
              setTimeout(handleComplete, 800);
            }
            
            return newProgress;
          });
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [progress, loading, onComplete]);
  
  // MacBook bootup style effect - hide logo as boot completes
  useEffect(() => {
    if (progress > 85) {
      const timer = setTimeout(() => {
        setShowLogo(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress]);
  
  // Apply glossy hover effect on logo
  useEffect(() => {
    if (!logoRef.current) return;
    
    const handleMouseMove = (e) => {
      const logo = logoRef.current;
      const rect = logo.getBoundingClientRect();
      
      // Calculate mouse position relative to logo
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Apply gradient position based on mouse movement
      logo.style.backgroundPosition = `${x / 2}px ${y / 2}px`;
    };
    
    const logo = logoRef.current;
    logo.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      if (logo) logo.removeEventListener("mousemove", handleMouseMove);
    };
  }, [loading]);
  
  if (!loading) return null;
  
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
        opacity: 1,
        transition: "opacity 0.7s ease-in-out",
      }}
    >
      {/* Animated background pattern */}
      <BackgroundPattern />
      
      <div className="relative flex flex-col items-center">
        {/* Apple-inspired minimalist logo animation with pulse effect */}
        {showLogo && (
          <div
            className="mb-10 relative"
            style={{
              transform: "scale(1)",
              opacity: 1,
              transition: "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            <div 
              ref={logoRef}
              className="h-28 w-28 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg relative z-10"
              style={{
                backgroundSize: "200% 200%",
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                overflow: "hidden"
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                style={{
                  opacity: 1,
                  strokeDasharray: 100,
                  strokeDashoffset: 100,
                  animation: "draw 2s ease-in-out forwards",
                }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  className="text-black"
                />
              </svg>
            </div>
            
            {/* Enhanced glow effect with multiple layers */}
            <div 
              className="absolute inset-0 rounded-full bg-white blur-xl"
              style={{
                opacity: 0.2,
                animation: "pulse 2.5s ease-in-out infinite",
              }}
            />
            
            {/* Secondary pulse effect */}
            <div 
              className="absolute -inset-4 rounded-full border-2"
              style={{
                borderColor: "rgba(96, 165, 250, 0.3)",
                opacity: 0.2,
                animation: "ripple 3s ease-out infinite",
              }}
            />
          </div>
        )}
        
        {/* Typography with clean animation and enhanced visibility */}
        <AnimatedTitle 
          title="Learn Smart"
          subtitle="Elevating your learning experience"
          className="mb-10"
        />
        
        {/* MacBook-style progress bar with proper animation */}
        <div
          style={{
            opacity: 1,
            transform: "translateY(0)",
            transition: "opacity 0.6s, transform 0.6s",
            width: "264px",
          }}
          className="w-64"
        >
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden" style={{ position: "relative" }}>
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
              style={{
                width: `${progress}%`,
                transition: "width 0.4s ease-out",
                position: "relative",
                zIndex: 2,
              }}
            />
            
            {/* MacBook-style animated highlight on progress bar */}
            <div 
              className="absolute top-0 left-0 h-full w-full opacity-30"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                transform: `translateX(${progress - 20}%)`,
                transition: "transform 0.4s ease-out",
                width: "20%",
                opacity: progress > 5 && progress < 95 ? 0.3 : 0,
              }}
            />
          </div>
          
          <div className="flex justify-between mt-2">
            <p 
              className="text-gray-300 text-xs"
              style={{ opacity: 0.9 }}
            >
              {progress < 30 ? "Preparing your experience" : 
               progress < 60 ? "Loading resources" : 
               progress < 90 ? "Almost ready" : "Finalizing setup"}
            </p>
            
            <p 
              className="text-blue-300 text-xs font-medium"
              style={{ opacity: 1 }}
            >
              {Math.round(progress)}%
            </p>
          </div>
        </div>
      </div>
      
      <MinimalistParticles />

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes pulse {
          0% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
          100% { opacity: 0.1; transform: scale(1); }
        }
        
        @keyframes ripple {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.3; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
};

const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute h-full w-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
      
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="absolute bottom-0 left-0 right-0 h-64 opacity-10"
          style={{
            background: `linear-gradient(180deg, transparent 0%, rgba(66, 153, 225, ${0.1 - index * 0.02}) 100%)`,
            transform: `translateY(${index * 20}px)`,
            animation: `wave ${7 + index * 2}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes wave {
          0% { transform: translateY(${0}px); }
          100% { transform: translateY(${-15}px); }
        }
      `}</style>
    </div>
  );
};

// Enhanced Apple-inspired particle animation
const MinimalistParticles = () => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 5,
    color: i % 3 === 0 ? "rgba(96, 165, 250, 0.7)" : "rgba(255, 255, 255, 0.7)"
  }));
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { transform: translateY(-50px) scale(1.5); opacity: 0.2; }
          100% { transform: translateY(0) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;