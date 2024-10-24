import React from 'react';

const AdaptivePulsatingSpinner = ({ darkMode = false }) => {
  const baseClasses = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const spinnerClasses = darkMode ? 'bg-purple-500' : 'bg-blue-500';
  const dotClasses = darkMode ? 'bg-gray-200' : 'bg-white';

  return (
    <div className={`flex items-center justify-center h-screen ${baseClasses} fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen w-screen  transition-colors duration-300`}>
      <div className="relative">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-16 h-16 ${spinnerClasses} rounded-full 
                        animate-ping opacity-75 transition-colors duration-300
                        ${index === 0 ? 'animate-delay-0' : 
                          index === 1 ? 'animate-delay-300 scale-75' : 
                          'animate-delay-600 scale-50'}`}
            style={{
              animationDuration: '2s',
              animationIterationCount: 'infinite',
            }}
          ></div>
        ))}
        <div className={`relative w-16 h-16 ${spinnerClasses} rounded-full animate-spin transition-colors duration-300`}>
          <div className={`absolute top-1/2 left-1/2 w-3 h-3 ${dotClasses} rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-300`}></div>
        </div>
      </div>
    </div>
  );
};

export default AdaptivePulsatingSpinner;