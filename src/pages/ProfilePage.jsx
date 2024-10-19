import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Linkedin, Twitter, Moon, Sun } from 'lucide-react';
import { FaGithub as GitHub } from 'react-icons/fa';

const Tab = ({ icon, label, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center justify-center p-4 ${
      isActive
        ? 'bg-blue-500 text-white dark:bg-blue-600'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
    } transition-colors duration-200 md:rounded-t-lg`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2 font-medium">{label}</span>
  </motion.button>
);

const Input = ({ label, id, type = 'text', placeholder, icon }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-600">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
    </div>
  </div>
);

const Switch = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <motion.button
        className={`w-14 h-8 flex items-center rounded-full p-1 ${
          isChecked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
        onClick={() => setIsChecked(!isChecked)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-200 w-6 h-6 rounded-full shadow-md"
          animate={{ x: isChecked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        />
      </motion.button>
    </div>
  );
};

const Button = ({ children, variant = 'primary', onClick }) => {
  const baseStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700",
  };
  
  return (
    <motion.button 
      className={`${baseStyle} ${variants[variant]}`} 
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <ChevronDown size={18} /> },
    { id: 'billing', label: 'Billing', icon: <ChevronDown size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <ChevronDown size={18} /> },
    { id: 'social', label: 'Social links', icon: <ChevronDown size={18} /> },
    { id: 'security', label: 'Security', icon: <ChevronDown size={18} /> },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">User Profile</h1>
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-lg overflow-hidden">
          <div className="flex flex-wrap border-b gap-4 border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                icon={tab.icon}
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'general' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div className="mb-4 relative">
                      <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Profile" className="rounded-full w-32 h-32 mx-auto shadow-lg" />
                      <motion.button 
                        className="absolute bottom-0 right-0 rounded-full p-2 bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        📤
                      </motion.button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">max size of 3 Mb</p>
                    <Switch label="Public profile" />
                    <Button variant="danger" className="w-full mt-4">Delete user</Button>
                  </div>
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="Name" id="name" placeholder="John Doe" icon={<ChevronDown size={18} />} />
                      <Input label="Email address" id="email" type="email" placeholder="john@example.com" icon={<Mail size={18} />} />
                      <Input label="Phone number" id="phone" type="tel" placeholder="(555) 555-5555" icon={<Phone size={18} />} />
                      <Input label="Address" id="address" placeholder="123 Main St" icon={<MapPin size={18} />} />
                      <div className="mb-4">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>France</option>
                        </select>
                      </div>
                      <Input label="State/Region" id="state" placeholder="California" icon={<MapPin size={18} />} />
                      <Input label="City" id="city" placeholder="San Francisco" icon={<MapPin size={18} />} />
                      <Input label="ZIP/Postal code" id="zip" placeholder="94103" icon={<MapPin size={18} />} />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        About
                      </label>
                      <textarea
                        id="about"
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Write a few sentences about yourself."
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Billing Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Card Number" id="card-number" placeholder="**** **** **** 1234" icon={<ChevronDown size={18} />} />
                    <Input label="Name on Card" id="card-name" placeholder="John Doe" icon={<ChevronDown size={18} />} />
                    <Input label="Expiry Date" id="expiry" placeholder="MM/YY" icon={<ChevronDown size={18} />} />
                    <Input label="CVV" id="cvv" placeholder="123" icon={<ChevronDown size={18} />} />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Billing History</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 dark:text-gray-300">Premium Plan - Monthly</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">$19.99</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Next billing date: Nov 1, 2023</div>
                    </div>
                  </div>
                  <Button className="mt-6">Update Payment Method</Button>
                </div>
              )}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
                      <Switch label="Email Notifications" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Receive updates via email</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
                      <Switch label="Push Notifications" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Receive notifications on your device</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
                      <Switch label="SMS Notifications" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Receive text messages for important updates</p>
                    </div>
                  </div>
                  <Button className="mt-6">Save Preferences</Button>
                </div>
              )}
              {activeTab === 'social' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Social Links</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="LinkedIn" id="linkedin" placeholder="LinkedIn Profile URL" icon={<Linkedin size={18} />} />
                    <Input label="Twitter" id="twitter" placeholder="Twitter Handle" icon={<Twitter size={18} />} />
                    <Input label="GitHub" id="github" placeholder="GitHub Username" icon={<GitHub size={18} />} />
                  </div>
                  <Button className="mt-6">Update Social Links</Button>
                </div>
              )}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Security Settings</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                      <Switch label="Enable Two-Factor Authentication" />
                      <p className="text-sm text-gray-600 mt-1">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                      <Switch label="Login Alerts" />
                      <p className="text-sm text-gray-600 mt-1">
                        Receive alerts when a new device logs into your account.
                      </p>
                    </div>
                    <Button className="mt-6">Update Security Settings</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;