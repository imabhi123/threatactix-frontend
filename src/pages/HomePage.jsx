import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
const HomePage = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/dashboard');
        }
        else navigate('/login');
    },[])
    
  return (
    <div>
        
    </div>
  )
}

export default HomePage