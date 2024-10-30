import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PromotionBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsFixed(scrollPosition > 64);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Placeholder div to prevent content jump when banner becomes fixed */}
      {isFixed && <div className="h-[52px]" />}
      
      <div className={`w-full min-h-[54px] bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-3 text-center
        ${isFixed ? 'fixed top-0 left-0 z-50 animate-slide-down' : 'relative'}`}>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-medium">
            20% off for your first invoice with code: FFTHANKYOU
          </span>
          <span className="text-sm">-</span>
          <span className="text-sm">Valid till Oct 25, 2024</span>
          <button className="ml-2 px-4 py-1 text-sm bg-white text-gray-800 rounded-md hover:bg-gray-100 transition-colors">
            Subscribe now
          </button>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close promotion"
        >
          <X size={16} />
        </button>
      </div>

      <style jsx global>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease forwards;
        }
      `}</style>
    </>
  );
};

export default PromotionBar;