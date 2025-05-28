
// aos
import React, { useEffect } from 'react';
import { Heading, FaqComponent } from ".";
import AOS from 'aos';
import 'aos/dist/aos.css';

const FAQ = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,       // Duration of the animation
      offset: 100,          // Delay the animation until the element is in the viewport
      easing: 'ease-in-out', // Controls the smoothness of the animation
      once: true,           // Whether animation should happen only once
      mirror: false         // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <section className='pt-10 relative'>
      <Heading name="Frequently Asked Questions" />

      <div className="container mx-auto py-10 px-6">
        <div className="flex flex-col">
          <div data-aos="fade-up">
            <FaqComponent
              question="How To SignUp And Login?"
              answer="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error quae ratione, porro consectetur doloremque rerum."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <FaqComponent
              question="What Is The Fees Of The Plans?"
              answer="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error quae ratione, porro consectetur doloremque rerum."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <FaqComponent
              question="Is The Fees Refundable?"
              answer="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error quae ratione, porro consectetur doloremque rerum."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <FaqComponent
              question="Is It Reliable To Buy Our Packs?"
              answer="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error quae ratione, porro consectetur doloremque rerum."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="400">
            <FaqComponent
              question="How Much Time Does It Take to Complete A Pack?"
              answer="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error quae ratione, porro consectetur doloremque rerum."
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-amber-300 opacity-80 pointer-events-none z-[-1]"></div>
    </section>
  );
};

export default FAQ;

