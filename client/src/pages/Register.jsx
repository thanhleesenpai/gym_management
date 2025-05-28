
// aos 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { Input } from "../components";
import { BASE_URL } from '../utils/fetchData';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z]+$/.test(name)) {
      toast.error("Name must contain only alphabets");
      return;
    }

    if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(city)) {
      toast.error("City must contain only alphabets and spaces");
      return;
    }

    const phoneNumberPattern = /^(9|8|7|6)\d{9}$/;
    if (!phoneNumberPattern.test(contact)) {
      toast.error("Phone number must start with 9, 8, 7, or 6 and contain exactly 10 digits");
      return;
    }

    console.log(name, password, email, city, contact);

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        name,
        password,
        email,
        city,
        contact,
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
    <div className='bg-gray-900'>
      <div className='container mx-auto px-6'>
        <form
          className='flex w-full h-screen justify-center items-center flex-col gap-5'
          onSubmit={onSubmit}
          data-aos="fade-up" // Add AOS animation
        >
          <h2 className='text-center text-4xl text-white font-bold'>Register</h2>

          <Input 
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength="4"
            maxLength="30"
            data-aos="zoom-in" // Add AOS animation
          />

          <Input 
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-aos="zoom-in" // Add AOS animation
          />

          <Input 
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-aos="zoom-in" // Add AOS animation
          />

          <Input 
            type="text"
            placeholder="City"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            minLength="4"
            maxLength="35"
            data-aos="zoom-in" // Add AOS animation
          />

          <Input 
            type="text"
            placeholder="Phone"
            name="phone"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            data-aos="zoom-in" // Add AOS animation
          />

          <Link to="/login" className='text-white opacity-85 font-medium' data-aos="fade-in">
            Already a registered user? <span className='underline text-blue-600 font-semibold'>Login</span>
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

export default Register;
