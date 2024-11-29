import React, { useState } from 'react';
import { Mail, Send, User } from 'lucide-react';

const AnimatedInput = ({ children, ...props }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `;

    const mailtoLink = `mailto:kumarabhishek13909@gmail.com?subject=New Contact Form Submission&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
    setSubmitted(true);
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="w-full  bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
        {/* Contact Information Section */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Get in Touch
          </h2>
          <p className="mb-8 text-blue-100">
            Have a question or want to work together? Fill out the form and I'll get back to you as soon as possible.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <a 
                href="mailto:kumarabhishek13909@gmail.com" 
                className="hover:text-blue-100 transition-colors"
              >
                kumarabhishek13909@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Send className="h-6 w-6 text-white" />
              </div>
              <span>Bangalore, India</span>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full md:w-7/12 p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatedInput>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border-b border-gray-300 dark:border-gray-600 dark:text-white bg-transparent focus:outline-none focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>
            </AnimatedInput>

            <AnimatedInput>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border-b border-gray-300 dark:text-white dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </AnimatedInput>

            <AnimatedInput>
              <label 
                htmlFor="message" 
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border-b border-gray-300 dark:text-white dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500 resize-none"
                placeholder="What can I help you with?"
              />
            </AnimatedInput>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Send Message
            </button>

            {submitted && (
              <div className="mt-4 text-center text-green-600 animate-bounce">
                Email client opened! Please complete sending the email.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;