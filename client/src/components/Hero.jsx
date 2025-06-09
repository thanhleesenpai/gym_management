import React, { useEffect } from 'react';
import { heroImg } from '../images';
import { ButtonOutline, Button } from "./";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Hero = () => {
  const { auth } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  return (
    <main className="relative w-full h-[90vh] overflow-hidden flex items-center bg-gray-900 text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="hero-bg"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70" />
      </div>

      {/* Foreground content */}
      <div className="container mx-auto relative z-10 px-6 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 text-center md:text-left space-y-6" data-aos="fade-right">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-wide uppercase">
          Empower <span className="text-pink-400">your</span> journey <br /> with confidence
        </h1>
        <p className="text-gray-200 text-base md:text-lg max-w-md leading-relaxed">
          Unlock your true potential with customized programs, professional coaching, and a vibrant community cheering you on every step of the way.
        </p>
      </div>

        {/* Buttons */}
        {!auth?.user && (
          <div className="md:w-1/2 flex justify-start md:justify-end gap-6 mt-10 md:mt-0 md:mr-20" data-aos="fade-left">
            <Link to="/register">
              <ButtonOutline text="Sign Up" />
            </Link>
            <Link to="/login">
              <Button text="Login" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Hero;