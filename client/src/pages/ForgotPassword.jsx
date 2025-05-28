
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { Input } from "../components";
import { BASE_URL } from '../utils/fetchData';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const submitPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({    duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Animation easing
      offset: 120, // Trigger animation before the element comes into view
      once: true });
  }, []);

  return (
    <section className='bg-gray-900'>
      <div className='register-bg container mx-auto px-6'>
        <form className='flex flex-col gap-4 items-center justify-center h-[90vh]' data-aos="fade-up">
          <h2 className='text-center text-2xl sm:text-4xl font-bold text-white' data-aos="zoom-in">RESET PASSWORD</h2>
          
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            data-aos="fade-up" 
          />

          <Input
            type="password"
            placeholder="New Password"
            name="newpassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
            data-aos="fade-up" 
          />

          <button
            className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]'
            type='submit'
            onClick={submitPassword}
            data-aos="slide-up"
          >
            Reset
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
