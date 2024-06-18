import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const validate = () => {
    let emailError = '';
    let passwordError = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError = 'Please enter a valid email address';
    }

    if (password.length < 6) {
      passwordError = 'Password should be at least 6 characters';
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }

    setErrors({ email: '', password: '' });
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
     navigate("/")
      console.log('Logged in successfully');
    
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center brightness-75 bg-cover bg-no-repeat bg-center bg-[url(https://wallpapers.com/images/featured/4k-space-9w27dqmc4nrs3xwd.jpg)] w-full h-screen'>
      <div className='w-4/12 py-10 bg-white/20 brightness-100 rounded-2xl shadow-lg backdrop-blur-sm border flex flex-col justify-evenly'>
        <div className='flex justify-center m-7 flex-col items-center'>
          <h1 className='text-5xl  text-white font-semibold font-serif pb-5'>LOGIN</h1>
          <input
            type="email"
            placeholder='Enter your Email'
            className="w-full p-3 my-4 rounded-md border text-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
          <input
            type="password"
            placeholder='Enter your Password'
            className="w-full p-3 my-4 rounded-md border text-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
          <button
            type="button" // Change type to 'button' to prevent form submission
            className='w-full p-3 my-8 rounded-md bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 font-semibold'
            onClick={handleLogin}
          >
            Login
          </button>
          <span className='text-white text-lg '> Don't have an account? <span className='text-blue-400 ml-2'><Link to="/SignUp">Sign Up</Link></span></span>
        </div>
      </div>
    </div>
  );
}
