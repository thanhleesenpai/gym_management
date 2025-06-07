import React from 'react';
import { Link } from 'react-router-dom';
import {useCart} from "../context/cart";
import {toast} from "react-hot-toast";

const ExerciseCard = ({exercises, heading}) => {
  const { cart, setCart } = useCart();

  // Ensure exercises is an array
  if (!Array.isArray(exercises)) {
    console.error("Invalid data format: exercises is not an array", exercises);
    return (
      <h1 className='text-4xl flex justify-center items-center w-full h-screen text-center text-white'>
        Failed to load exercises. Please try again later.
      </h1>
    );
  }

  if(exercises.length === 0){
    return (
      <h1 className='text-4xl flex justify-center items-center w-full h-screen text-center text-white'>No Exercises Found.....</h1>
    )
  }

  const handleAddToCart = (exercise) => {
    const isExerciseInCart = cart.some(item => item.id === exercise.id);

    if (!isExerciseInCart) {
      setCart([...cart, exercise]);
      localStorage.setItem("cart", JSON.stringify([...cart, exercise]));
      toast.success("Exercise added to Favourite");
    } else {
      toast.error("Exercise is already in the Favourite");
    }
  };

  return (
    <section className='pt-32 bg-white' id='exercises'>
      <div className="px-7 sm:px-14">
        <h2 className='text-2xl sm:text-3xl md:text-5xl text-black capitalize text-center md:text-center border-b-4 border-red-500 sm:border-none mb-20'>{ heading ? ` similar ${heading} exercise` : 'showing Results'}</h2>
        <div className="grid gap-4 md:gap-5 grid-cols-2 lg:grid-cols-3 items-stretch exercise-grid">
          {exercises?.slice(0, 21).map((exercise, id) => (
            <div className='flex justify-center items-center flex-col gap-5 border-2 pb-2' key={id}>
              <Link to={exercise.id ? `${exercise.id}` : "" } key={id} className='no-underline rounded-xl'>
                <div className="overflow-hidden bg-white">
                  <img src={exercise.gifUrl} className='w-[70%] mx-auto hover:scale-110 transition' alt={exercise.name} loading="lazy" />
                  <div className="flex gap-1 flex-row items-center my-8 justify-center">
                    <button className='rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-white bg-[#240b36] hover:opacity-90 transition-all'>{exercise.bodyPart.slice(0, 15)}</button>
                    <button className='rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-white bg-[#c31432] hover:opacity-90 transition-all'>{exercise.target.slice(0, 15)}</button>
                  </div>
                  <h2 className='text-base sm:text-xl capitalize text-center font-bold'>{exercise.name.slice(0, 24)}</h2>
                </div>
                <div></div>
              </Link>
              <button type="button" className="bg-blue-500 text-white font-semibold rounded-sm px-4 py-2" onClick={() => handleAddToCart(exercise)}>Add To Favourites</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExerciseCard;