import React, { useState, useEffect } from 'react';
import { useAuth} from "../../context/auth";
import {useCart} from "../../context/cart";
import { useNavigate, Link } from 'react-router-dom';
const FavouriteExercises = () => {
  const { auth, setAuth } = useAuth();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  // remove cart item
  const removeExercises = (Eid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.id === Eid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      window.alert("selected exercises removed");
    } catch (error) {
      console.log(error);
    }
  }


  if (cart.length === 0) {
    return <h1 className=' text-3xl sm:text-5xl text-white flex justify-center items-center h-screen'>No Favourite Exercises</h1>
  }


  return (
    <section className='py-20 bg-gray-900'>
      <h2 className='text-3xl md:text-4xl text-black font-medium text-center'>You Have {cart.length} <span className='text-red-500'>Favourite</span>  Exercise</h2>
      <div className="container mx-auto px-2 py-28">

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {cart?.map((exercise, i) => (
         

              <div className='flex justify-center items-center flex-col bg-white gap-5 rounded-sm pb-2 border-2' key={i}>
              <Link to={exercise.id ? `/exercise/${exercise.id}` : "" } key={i} className='no-underline rounded-xl'>
              <div className="overflow-hidden bg-white rounded-lg">
                  <img src={exercise.gifUrl} className='w-[70%] mx-auto hover:scale-110 transition' alt={exercise.name} loading="lazy" />
                  <div className="flex gap-1 flex-row items-center my-8 justify-center">
                      <button className='rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-white bg-[#240b36] hover:opacity-90 transition-all'>{exercise?.bodyPart?.slice(0, 15)}</button>
                      <button className='rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-white bg-[#c31432] hover:opacity-90 transition-all'>{exercise?.target?.slice(0, 15)}</button>
                  </div>
                  <h2 className='text-base sm:text-xl capitalize text-center font-bold'>{exercise?.name?.slice(0, 24)}</h2>
        
                  {/* favourite exercies */}
                
              </div>
  
                </Link>
                <button type='button' className='bg-blue-500 text-white font-semibold rounded-sm px-4 py-2' onClick={() => removeExercises(exercise.id)}>Remove</button>
                </div>
            ))}
          </div>
        </div>

    </section>
  )
}

export default FavouriteExercises;