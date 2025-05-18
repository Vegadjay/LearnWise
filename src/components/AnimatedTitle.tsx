import React from 'react';

interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  title, 
  subtitle, 
  className = "" 
}) => {
  return (
    <div className={`text-center max-w-3xl mx-auto ${className}`}>
      <h1 
        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
        style={{
          opacity: 0,
          animation: "fadeInUp 0.8s ease-out forwards",
        }}
      >
        <span 
          className="relative inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-glow"
        >
          {title}
        </span>
      </h1>
      
      {subtitle && (
        <p 
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          style={{
            opacity: 0,
            animation: "fadeInUp 0.8s ease-out 0.2s forwards",
          }}
        >
          {subtitle}
        </p>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0% {
            text-shadow: 
              0 0 7px rgba(var(--primary), 0.7),
              0 0 10px rgba(var(--primary), 0.5),
              0 0 21px rgba(var(--primary), 0.3),
              0 0 42px rgba(var(--primary), 0.2);
          }
          50% {
            text-shadow: 
              0 0 10px rgba(var(--primary), 0.8),
              0 0 20px rgba(var(--primary), 0.6),
              0 0 30px rgba(var(--primary), 0.4),
              0 0 50px rgba(var(--primary), 0.3);
          }
          100% {
            text-shadow: 
              0 0 7px rgba(var(--primary), 0.7),
              0 0 10px rgba(var(--primary), 0.5),
              0 0 21px rgba(var(--primary), 0.3),
              0 0 42px rgba(var(--primary), 0.2);
          }
        }

        .animate-glow {
          animation: glow 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedTitle; 