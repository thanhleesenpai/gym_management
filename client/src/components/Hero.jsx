

import React, { useEffect } from 'react';
import { heroImg } from '../images';
import { ButtonOutline, Button } from "./";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Hero = () => {
  const { auth } = useAuth();

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000,  // Animation duration in milliseconds
      offset: 200,     // Offset from the top
      easing: 'ease-in-out', // Easing function
      once: true       // Whether animation should happen only once or every time
    });
  }, []);

  return (
    <main className="relative">
      <div className="container mx-auto px-6 py-10 md:py-16 bg-white lg:py-24 overflow-x-hidden overflow-y-hidden">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10">
          {/* Heading Section */}
      

          {/* Image Section */}
          <div 
            className="w-3/4 mx-auto"
            data-aos="fade-up" // AOS fade-up animation for image
          >
            <img
              src={heroImg}
              alt="hero-img"
              className="w-full rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 animate-img"
            />
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-white opacity-100 pointer-events-none z-[-1]"></div>
    </main>
  );
}

export default Hero;
