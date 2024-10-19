import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../firebase';

export const useAuthForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  if (localStorage.getItem('token')) {
    navigate('/');
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user?.uid) {
        localStorage.setItem('token', user?.accessToken);
        navigate('/');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return { formData, handleChange, handleGoogleSignIn };
};
