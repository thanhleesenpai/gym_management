

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
      <div className="container mx-auto px-0 py-0 md:py-0 bg-white lg:py-0 overflow-hidden">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-0">
          <div 
            className="w-full h-full"
            data-aos="fade-up"
          >
            <img
              src={heroImg}
              alt="hero-img"
              className="w-full h-full object-cover rounded-none shadow-none"
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
