

import React,{useEffect} from 'react';
import { Review, Heading } from "./";
import { review1, review2, review3, review4 } from "../images";
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const Reviews = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      offset: -100, // Trigger animation after scrolling 200px
      easing: 'ease-in-back', // Animation easing
    });
  }, []);
  return (
    <section className='pt-10 relative'>
      <Heading name="Our Reviews" />
      <div className="container py-16 mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {[
    {
      img: review1,
      name: "Kyle",
      height:80,
      weight : 70,
      age : 25,
      description: "Kyle is a passionate fitness trainer with 5 years of experience.",
    },
    {
      img: review2,
      name: "River",
       height:80,
      weight : 70,
      age : 25,
      description: "River specializes in yoga and mindfulness training.",
    },
    {
      img: review3,
      name: "Akon",
       height:80,
      weight : 70,
      age : 25,
      description: "Akon brings energy and motivation to every session.",
    },
    {
      img: review4,
      name: "Arnold",
       height:80,
      weight : 70,
      age : 25,
      description: "Arnold focuses on strength and performance coaching.",
    }
  ].map((review, index) => (
    <div
      key={index}
      data-aos="fade-zoom-in"
      data-aos-delay={`${index * 300}`}
    >
      <Review
        img={review.img}
        alt={`review-${index + 1}`}
        name={review.name}
        height={review.height}
        weight={review.weight}
        age={review.age}
        description={review.description}
      />
    </div>
  ))}
</div>

      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-rose-300 opacity-80 pointer-events-none z-[-1]"></div>
    </section>
  );
};

export default Reviews;




