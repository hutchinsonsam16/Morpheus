
import React from 'react';

interface IconProps {
  children: React.ReactNode;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ children, className = 'w-6 h-6' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const BrainCircuitIcon: React.FC<{className?: string}> = ({className}) => (
    <Icon className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.993.129"/><path d="M12 5a3 3 0 1 0 5.993.129"/><path d="M15 12a3 3 0 1 0-5.993.129"/><path d="M15 12a3 3 0 1 0 5.993.129"/><path d="M5 19a3 3 0 1 0-5.993.129"/><path d="M5 19a3 3 0 1 0 5.993.129"/><path d="M19 19a3 3 0 1 0-5.993.129"/><path d="M19 19a3 3 0 1 0 5.993.129"/><path d="M12 12h.01"/><path d="M12 12h.01"/><path d="M12 19h.01"/><path d="M12 19h.01"/><path d="M19 12h.01"/><path d="M19 12h.01"/><path d="M5 12h.01"/><path d="M5 12h.01"/><path d="M12 5h.01"/><path d="M12 5h.01"/><path d="M8.5 7.5c.67-1.33 2-2.5 4.5-2.5"/><path d="M15.5 7.5c-.67-1.33-2-2.5-4.5-2.5"/><path d="M8.5 16.5c.67 1.33 2 2.5 4.5 2.5"/><path d="M15.5 16.5c-.67 1.33-2 2.5-4.5 2.5"/><path d="M8.5 7.5c-1.33.67-2.5 2-2.5 4.5"/><path d="M15.5 7.5c1.33.67 2.5 2 2.5 4.5"/><path d="M8.5 16.5c-1.33-.67-2.5-2-2.5-4.5"/><path d="M15.5 16.5c1.33-.67 2.5-2 2.5-4.5"/></svg>
    </Icon>
);

export const BookIcon: React.FC<{className?: string}> = ({className}) => (
    <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></Icon>
);

export const ClapperboardIcon: React.FC<{className?: string}> = ({className}) => (
    <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m4 11 8-8 8 8"/><path d="m17 4-5 5"/><path d="m7 4 5 5"/></svg></Icon>
);

export const LightbulbIcon: React.FC<{className?: string}> = ({className}) => (
    <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></Icon>
);

export const UsersIcon: React.FC<{className?: string}> = ({className}) => (
    <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></Icon>
);

export const AlertTriangleIcon: React.FC<{className?: string}> = ({className}) => (
    <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></Icon>
);
