

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
      <div className="container mx-auto px-6 py-10 md:py-16 lg:py-24 overflow-x-hidden overflow-y-hidden">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10">
          {/* Heading Section */}
          <div 
            className="md:w-1/2 text-center md:text-left"
            data-aos="fade-right" // AOS fade-right animation
          >
            <h1 className="text-white text-5xl lg:text-7xl xl:text-7xl font-bold leading-tight uppercase heading">
              make <span className="text-blue-400 animate-heading">your</span> <br />
              day special <br />
              anytime
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mt-4 lg:mt-6 max-w-md mx-auto md:mx-0">
              Achieve your fitness goals with personalized plans, expert trainers, and a community that supports you!
            </p>

            {/* Buttons */}
            {!auth?.user && (
              <div className="mt-10 flex justify-center md:justify-start gap-6">
                <Link to="/register">
                  <ButtonOutline text="Sign Up" />
                </Link>
                <Link to="/login">
                  <Button text="Login" />
                </Link>
              </div>
            )}
          </div>

          {/* Image Section */}
          <div 
            className="w-full md:w-1/2"
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
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-gray-500 opacity-100 pointer-events-none z-[-1]"></div>
    </main>
  );
}

export default Hero;
