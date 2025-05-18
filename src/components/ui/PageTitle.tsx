import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageTitle = ({ title, subtitle, className = '' }: PageTitleProps) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle; 