import React, {useState, useEffect} from 'react';
import {AiOutlineSearch} from "react-icons/ai";
import { exerciseOptions, fetchData } from '../utils/fetchData';
import BodyPart from './BodyPart';
const SearchInput = ( {setExercises, bodyPart, setBodyPart  } ) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  
  useEffect(() => {
    const fetchBodypartsData = async () => {
      const bodypartsData = await fetchData("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", exerciseOptions);
      setBodyParts(["all", ...bodypartsData]);
    }
    
    fetchBodypartsData();
  }, []);
  
  const handleSearch = async () => {
    if(search){
      const exercisesData = await fetchData("https://exercisedb.p.rapidapi.com/exercises", exerciseOptions);
      const searchedExercises = exercisesData.filter((exercise) => exercise.name.toLowerCase().includes(search) || exercise.target.toLowerCase().includes(search) || exercise.equipment.toLowerCase().includes(search) || exercise.bodyPart.toLowerCase().includes(search) );
      setSearch('');
      setExercises(searchedExercises);
      window.scrollTo({top:1500, left:100, behavior:"smooth"})
      }

  }

  return (
    <section className='pt-32 '>
      <div className='px-7 sm:px-14 space-y-12'>
          <h2 className='text-2xl sm:text-3xl md:text-5xl text-white capitalize text-center md:text-center border-b-4 border-red-500 sm:border-none'>awesome exercise you <br /> should know</h2>
          <div className='flex flex-row justify-center items-center'>
            <input type="text" placeholder='search' className='outline-none px-6 py-2 text-2xl text-gray-400 w-full max-w-4xl' value={search} onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}/>
            <button className='text-3xl md:text-4xl px-5 text-white bg-blue-500 py-[7px] rounded hover:bg-blue-600' onClick={handleSearch}><AiOutlineSearch/></button>
          </div>
          
          <BodyPart bodyParts={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} setExercises={setExercises}/>
      </div>
        
    </section>
  )
}

export default SearchInput;