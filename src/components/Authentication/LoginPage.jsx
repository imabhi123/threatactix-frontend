import React, { useState, useContext, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { signInWithGoogle } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../apis/api'; // Import the login function

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const credentials = { email, password };
      const response = await loginUser(credentials); // Call the API

      console.log(response)
      if (response?.statusCode===200) {
        localStorage.setItem('token', response?.data?.accessToken);
        setToken(response?.data?.accessToken);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user?.uid) {
        localStorage.setItem("token", user?.accessToken);
        setToken(user?.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className="flex max-w-full flex-wrap h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="flex-1 max-w-[100%] flex flex-col justify-center px-12">
        <div className="flex relative bottom-16 items-center mb-8">
          <Shield className="w-8 h-8 text-blue-500 dark:text-red-500 mr-2" />
          <h1 className="text-5xl font-bold">THREATACTIX</h1>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-8">
          Hunt, Identify and <span className="text-blue-500 dark:text-green-500">Act</span> on{' '}
          <span className="text-red-500 dark:text-red-500">threats</span>
          <br />
          before they can harm you<span className="text-red-500">.</span>
        </h2>
        <ul className="space-y-3">
          {[
            'Comprehensive threat actor directory',
            'Constantly updated threat feeds',
            'Safe source for tracking threat actors and campaigns',
            'Data funnelled from all parts of the internet',
          ].map((feature, index) => (
            <li key={index} className="flex text-xl items-center">
              <svg className="w-5 h-5 text-blue-500 dark:text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-xs text-gray-500 dark:text-gray-300">
          Powered by
          <img src="/api/placeholder/100/20" alt="Technisanct logo" className="inline-block ml-2" />
        </div>
      </div>
      <div className="w-full lg:w-[40%] bg-gray-100 dark:bg-gray-900 p-8 flex flex-col justify-center items-center">
        <div className="w-[400px] max-w-full flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-2">Sign in</h2>
          <p className="text-[16px] font-bold text-gray-500 dark:text-gray-400 mb-6">
            View latest updates and developments in CTI
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full outline-none px-3 py-2 bg-gray-100 dark:bg-black rounded-md border border-gray-300 dark:border-gray-700"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full outline-none px-3 py-2 bg-gray-100 dark:bg-black rounded-md border border-gray-300 dark:border-gray-700"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <a href="#" className="text-blue-500 dark:text-green-500 text-sm">
              Forgot password?
            </a>
            <button type="submit" className="w-full bg-blue-500 dark:bg-green-500 text-white py-2 rounded-md font-medium">
              Sign in
            </button>
          </form>
          <div className="mt-4 text-center flex flex-col items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or</p>
            <button
              onClick={handleGoogleSignIn}
              className="w-[300px] max-w-full bg-white dark:bg-gray-700 text-black dark:text-white py-2 rounded-md font-medium flex items-center justify-center"
            >
              <img
                src="https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png"
                alt="Google logo"
                className="mr-2 w-[30px]"
              />
              Continue with Google
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-blue-500 dark:text-green-500">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
