import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CustomButton = ({ children, className, ...props }) => (
  <button
    className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const CustomBadge = ({ children, className, ...props }) => (
  <span
    className={`inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 ${className}`}
    {...props}
  >
    {children}
  </span>
);

const PricingCard = () => {
  const [isYearly, setIsYearly] = useState(false);

  const togglePricing = () => {
    setIsYearly(!isYearly);
  };

  const pricing = {
    basic: isYearly ? 468 : 39,
    researcher: isYearly ? 948 : 79,
    business: isYearly ? 3600 : 300,
    enterprise: isYearly ? 6000 : 500,
  };

  const features = {
    basic: ['Basic Malware C2 Categories (10-20 types)', 'Common Vulnerabilities and Exposures Database', 'Access to Threat Feed (7 days)'],
    researcher: ['Medium Malware C2 Categories (20-40 types)', 'Access to Threat Feed (14 days)', '5 Custom Alert Topics'],
    business: ['Ransomware Analysis Module', 'Custom Alert Topics', 'Slack & Teams Integration'],
    enterprise: ['Advanced Persistent Threat (APT) Categorization', 'EASM and OSINT Integration', 'Custom Alert Topics'],
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Unlock the power of advanced threat intelligence</p>
          <div className="flex justify-center items-center space-x-4 mb-12">
            <span className="text-gray-900 dark:text-gray-300 font-medium">Monthly</span>
            <label className="switch">
              <input type="checkbox" checked={isYearly} onChange={togglePricing} />
              <span className="slider round"></span>
            </label>
            <span className="text-gray-900 dark:text-gray-300 font-medium">Yearly</span>
            <CustomBadge className="ml-2">Save up to 20%</CustomBadge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries({ basic: "Basic", researcher: "Researcher", business: "Business", enterprise: "Enterprise" }).map(([key, title]) => (
            <motion.div
              key={key}
              className="bg-white dark:bg-gray-800 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8 flex min-h-full flex-col">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-300 mb-6">
                  ${pricing[key]}<span className="text-lg font-normal text-gray-500 dark:text-gray-400">/{isYearly ? 'year' : 'month'}</span>
                </div>
                <ul className="text-gray-700 dark:text-gray-400 mb-8">
                  {features[key].map((feature, index) => (
                    <li key={index} className="flex items-center mb-3">
                      <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <CustomButton className={'mt-auto'}>
                  Get Started
                </CustomButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
        }
        input:checked + .slider {
          background-color: #2196F3;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        .slider.round {
          border-radius: 34px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default PricingCard;
