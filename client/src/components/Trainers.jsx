
import React, { useEffect } from 'react';
import Heading from './Heading';
import { Trainer } from ".";
import { trainerImg1, trainerImg2, trainerImg3, trainerImg4 } from "../images";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Trainers = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 2000, offset:-200, easing:"ease-in-out" }); // You can customize the duration and options here
  }, []);

  return (
    <section className='pt-10 relative'>
      <Heading name="Our Trainers" />
      <div className="container py-16 mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div data-aos="fade-up">
            <Trainer img={trainerImg1} alt="trainer-1" id="1" name="John" age="48" data-aos-delay="100" />
          </div>
          <div data-aos="fade-in" data-aos-delay="300">
            <Trainer img={trainerImg2} alt="trainer-2" id="2" name="Alish" age="40" />
          </div>
          <div data-aos="fade-down" data-aos-delay="500">
            <Trainer img={trainerImg3} alt="trainer-3" id="3" name="Rey" age="33" />
          </div>
          <div data-aos="zoom-in" data-aos-delay="700">
            <Trainer img={trainerImg4} alt="trainer-4" id="4" name="Akon" age="35" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-green-300 opacity-80 pointer-events-none z-[-1]"></div>
    </section>
  );
};

export default Trainers;




