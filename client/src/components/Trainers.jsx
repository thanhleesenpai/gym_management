import React, { useEffect, useState } from 'react';
import Heading from './Heading';
import { Trainer } from ".";
import { userImg } from "../images";
import axios from 'axios';
import { BASE_URL } from '../utils/fetchData';
import { toast } from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { trainerImg1 } from '../images';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 2000, offset: -200, easing: "ease-in-out" });
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/v1/user/trainers`, {
          headers: { Authorization: localStorage.getItem("token") }
        });
        console.log("Trainers fetched:", res.data);
        // Đảm bảo trainers luôn là mảng
        if (Array.isArray(res.data)) {
          setTrainers(res.data);
        } else if (Array.isArray(res.data.trainers)) {
          setTrainers(res.data.trainers);
        } else {
          setTrainers([]);
        }
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch trainers");
        setTrainers([]);
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <section className='pt-10 relative'>
      <Heading name="Our Trainers" />
      <div className="container py-16 mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-4 text-center text-white text-xl">Loading...</div>
          ) : trainers.length === 0 ? (
            <div className="col-span-4 text-center text-white text-xl">No trainers found.</div>
          ) : (
            trainers.map((trainer, idx) => (
              <div key={trainer._id} data-aos="fade-up" data-aos-delay={idx * 200}>
                <Trainer
                  img={trainer.imgUrl}
                  alt={`trainer-${trainer.name}`}
                  id={trainer._id}
                  name={trainer.name}
                  age={trainer.age || "N/A"}
                  email={trainer.email}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-green-300 opacity-80 pointer-events-none z-[-1]"></div>
    </section>
  );
};

export default Trainers;




