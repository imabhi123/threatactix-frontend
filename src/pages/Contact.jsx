import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

// Custom Alert Component
const CustomAlert = ({ type, message, onClose }) => {
  if (!message) return null;

  return (
    <div 
      className={`relative px-4 py-3 rounded-lg border mb-6 ${
        type === 'error' 
          ? 'bg-red-50 dark:bg-red-900/30 border-red-400 text-red-700 dark:text-red-200' 
          : 'bg-green-50 dark:bg-green-900/30 border-green-400 text-green-700 dark:text-green-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-sm opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!agreed) {
      setStatus({
        type: 'error',
        message: 'Please agree to the privacy policy before submitting.'
      });
      return;
    }

    // Construct email body
    const emailBody = `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}

Message:
${formData.message}
    `;

    // Create mailto link
    const mailtoLink = `mailto:kumarabhishek13909@gmail.com?subject=New Contact Form Submission&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.location.href = mailtoLink;

    // Show success message
    setStatus({
      type: 'success',
      message: 'Email client opened! Please send the email from your client.'
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    });
    setAgreed(false);
  };

  const clearAlert = () => {
    setStatus({ type: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex flex-col items-center py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Contact Us
        </h1>
        <p className="text-center mb-12 text-lg text-gray-700 dark:text-gray-300">
          We're here to help! Reach out with any questions or concerns.
        </p>

        <CustomAlert 
          type={status.type} 
          message={status.message} 
          onClose={clearAlert}
        />

        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          {/* Contact Form */}
          <div className="w-full lg:w-7/12 bg-white dark:bg-white/10 dark:backdrop-blur-md dark:border-0 shadow-2xl rounded-lg p-8">
            <h2 className="text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="first-name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full outline-none bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your First Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full outline-none bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Last Name"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full outline-none bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full outline-none bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                />
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="agreed"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 outline-none text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agreed" className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-blue-400 hover:underline">
                    privacy policy
                  </a>
                </label>
              </div>
              <button
                type="submit"
                disabled={!agreed}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="w-full lg:w-4/12 bg-white dark:bg-white/10 dark:backdrop-blur-md dark:border-0 shadow-2xl rounded-lg p-8">
            <h2 className="text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Contact Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-400">Email</p>
                  <a href="mailto:kumarabhishek13909@gmail.com" className="text-lg text-blue-400 hover:underline">
                    kumarabhishek13909@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-purple-500 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-400">Phone</p>
                  <a href="tel:+123456789" className="text-lg text-blue-400 hover:underline">
                    +1 234 567 89
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-500 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-400">Address</p>
                  <p className="text-lg">123 Threatactix St, Bangalore, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;