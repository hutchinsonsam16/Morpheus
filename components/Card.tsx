
import React from 'react';

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className, titleClassName }) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg backdrop-blur-sm ${className}`}>
      <div className={`flex items-center p-3 border-b border-gray-700 ${titleClassName}`}>
        {icon && <div className="mr-3 text-purple-400">{icon}</div>}
        <h3 className="font-bold text-lg text-gray-200 tracking-wider">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
