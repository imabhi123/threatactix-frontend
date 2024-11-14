import React from 'react';

const SimpleLoader = ({ darkMode = false }) => {
  const baseClasses = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const primaryColor = darkMode ? 'bg-purple-500' : 'bg-blue-500';
  
  return (
    <div className={`fixed inset-0 ${baseClasses} flex items-center justify-center z-50`}>
      <div className="relative w-16 h-16">
        {/* Main spinner */}
        <div 
          className={`w-16 h-16 ${primaryColor} rounded-full opacity-20 
                     animate-[spin_1.5s_linear_infinite]`}
        />
        
        {/* Inner spinner */}
        <div 
          className={`absolute top-2 left-2 w-12 h-12 ${primaryColor} rounded-full opacity-40 
                     animate-[spin_1.5s_linear_infinite_reverse]`}
        />
        
        {/* Center dot */}
        <div 
          className={`absolute top-1/2 left-1/2 w-4 h-4 ${primaryColor} rounded-full 
                     transform -translate-x-1/2 -translate-y-1/2`}
        />
      </div>
    </div>
  );
};

export default SimpleLoader;