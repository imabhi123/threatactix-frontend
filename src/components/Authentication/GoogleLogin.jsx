// src/components/GoogleLogin.js
import React from 'react';
import { signInWithGoogle } from '../../firebase';

const GoogleLogin = () => {
 

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
