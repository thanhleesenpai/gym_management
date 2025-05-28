import React,{useEffect} from 'react';
import { fetchData, exerciseOptions } from '../utils/fetchData';
import {exercisePng} from "../images";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
// import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';


const BodyPart = ({bodyParts, setBodyPart, bodyPart, setExercises }) => {
  useEffect(() => {
    const fetchExercisesData = async () => {
    let exercisesData = [];
    if(bodyPart === "all"){
       exercisesData = await fetchData("https://exercisedb.p.rapidapi.com/exercises", exerciseOptions);
    }
    else{
       exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
    }
    setExercises(exercisesData);
    }
    fetchExercisesData();
  },[bodyPart]);


  return (
    <section>
    
      <div className="overflow-hidden">
        <h2 className='text-2xl sm:text-3xl md:text-5xl text-white capitalize text-center md:text-center border-b-4 border-red-500 sm:border-none mb-20'>Exercise Categories</h2>
        <Swiper
          slidesPerView="auto"
          spaceBetween={20}
          // freeMode
          centeredSlides
          centeredSlidesBounds
          // modules={[FreeMode]}
          className="my-5"
        >

          {bodyParts.map((exercise, id) => (
              <SwiperSlide key={id} 
              style={{maxWidth:"150px", height: "auto", overflow:"hidden" }}
               className='shadow-lg animate-slideright cursor-pointer hover:opacity-80 transition-all overflow-hidden'>
            <div className='bg-white rounded-lg hover:bg-gray-200 transition text-center cursor-pointer border-t-2 border-t-rose-500 overflow-hidden' key={id} onClick={() => {setBodyPart(exercise);   window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
            }} >
            <img src={exercisePng} alt="exercise-type" className='w-full mx-auto hover:scale-150 transition'/>
            <h2 className='text-xl border-b-2 border-b-green-500 hover:opacity-80 text-black '>{exercise}</h2>
          </div>
          </SwiperSlide>
          ))}

          </Swiper>
      </div>

    </section>
  )
}

export default BodyPart;