import React,{useEffect} from 'react';
import { Hero, Plans, Trainers, Reviews, FAQ } from '../components';
import Contact from "./Contact";
import About from './About';
const Home = () => {
  
  useEffect(() => {
    window.scrollTo({top:0, left:0, behavior:"smooth"})    
}, [])

  return (
    <div>
    <Hero/>
    <Plans/>
    <Trainers/>
    <Reviews/>
    <FAQ/>
    <Contact/>
    </div>
  )
}

export default Home;