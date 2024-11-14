import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = ({isVisible}) => {
  return (
    <footer className={`bg-gray-100 text-gray-700 dark:bg-gray-900 px-[4%] md:px-[10%] dark:text-gray-300 relative ${isVisible?'top-[64px]':'top[24px]'} pt-16 pb-8`}>
      <div className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">About Threatactix</h3>
            <p className="mb-4">
              Threatactix provides cutting-edge cybersecurity threat intelligence to help organizations stay ahead of emerging threats and protect their digital assets.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
              <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
              <li><Link to="/docs" className="hover:underline">Documentation</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Stay Updated</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest cybersecurity insights.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r-md bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors duration-300"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Threatactix. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <Link to="/privacy" className="hover:underline mr-4">Privacy Policy</Link>
              <Link to="/terms" className="hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
