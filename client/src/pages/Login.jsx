

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { Input } from "../components";
import { BASE_URL } from '../utils/fetchData';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { auth, setAuth } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='bg-gray-900'>
      <div className='container mx-auto px-6'>
        <form 
          className='flex w-full h-screen justify-center items-center flex-col gap-5' 
          onSubmit={onSubmit}
          data-aos="fade-up" // Add AOS animation
        >
          <h2 className='text-center text-4xl text-white font-bold'>Login</h2>

          <Input 
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" 
            data-aos="zoom-in" // Add AOS animation
          />

          <Input 
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$" 
            data-aos="zoom-in" // Add AOS animation
          />

          <Link 
            to="/forgot-password" 
            className='text-white opacity-85 font-medium'
            data-aos="fade-in" // Add AOS animation
          >
            forgot password? <span className='underline text-blue-600 font-semibold'>Reset Password</span>
          </Link>

          <button 
            type='submit' 
            className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]'
            data-aos="slide-up" // Add AOS animation
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
