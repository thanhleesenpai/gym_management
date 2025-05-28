
import React, { useState, useEffect } from 'react';
import { ExerciseCard, SearchInput } from '../components';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Exercise = () => {
  const [bodyPart, setBodyPart] = useState("all");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className='bg-gray-900'>


      <SearchInput
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        data-aos="fade-up" // Animation for SearchInput
      />
      <ExerciseCard
        exercises={exercises}
        bodyPart={bodyPart}
        setExercises={setExercises}
        data-aos="fade-up" // Animation for ExerciseCard
      />
    </section>
  );
};

export default Exercise;
