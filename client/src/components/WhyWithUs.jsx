
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
  <Heading name="Why Train With Us?" />

  <div className="flex justify-between max-w-5xl mx-auto mt-12 px-4">
    {[
      { src: "https://bluegym.vn/wp-content/uploads/2023/09/cong-dung-1-8.png", alt: "icon 1", text: "Enhance Strength", width: 170, height: 170 },
      { src: "https://bluegym.vn/wp-content/uploads/2023/09/cong-dung-2-8.png", alt: "icon 2", text: "Flexible Muscles", width: 170, height: 170 },
      { src: "https://bluegym.vn/wp-content/uploads/2023/09/cong-dung-3-8.png", alt: "icon 3", text: "Strong and Stable Body", width: 170, height: 170 },
      { src: "https://bluegym.vn/wp-content/uploads/2023/09/cong-dung-4-8.png", alt: "icon 4", text: "Enduring Health", width: 170, height: 170 },
    ].map(({ src, alt, text, width, height }, idx) => (
      <div key={idx} className="flex flex-col items-center h-[250px]">
        <img src={src} alt={alt} width={width} height={height} />
        <p className="mt-4 text-center text-gray-700">{text}</p>
      </div>
    ))}
  </div>

  <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-amber-300 opacity-80 pointer-events-none z-[-1]"></div>
</section>


    
  );
};

export default FAQ;

