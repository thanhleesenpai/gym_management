

import React, { useState, useEffect } from 'react';
import { Heading, Input, TextArea } from '../components';
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from '../utils/fetchData';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS library
    AOS.init({
      duration: 1000,  // Animation duration in milliseconds
      easing: 'ease-in-out', // Animation easing
      offset: 200, // Trigger animation 120px before the element comes into view
      once: true   // Whether animation should happen only once while scrolling down
    });
  }, []);

  const createQuery = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z ]+$/.test(name)) {
      toast.error("Name must contain only alphabets");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(city)) {
      toast.error("City must contain only alphabets and spaces");
      return;
    }

    const phoneNumberPattern = /^(9|8|7|6)\d{9}$/;
    if (!phoneNumberPattern.test(phone)) {
      toast.error("Phone number must start with 9, 8, 7, or 6 and contain exactly 10 digits");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(message)) {
      toast.error("Message must contain only alphabets and spaces");
      return;
    }

    console.log(name, email, city, phone, message);

    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/contact/create-contact`, {
        name,
        email,
        city,
        phone,
        message
      });
      console.log(data);

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success(data.message);
        setName("");
        setEmail("");
        setCity("");
        setPhone("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className='pt-10 contact'>
      <Heading name="Contact Us" />

      <div className="container py-10">
        <form className='flex flex-col gap-8 justify-center items-center' onSubmit={createQuery}>

          <div data-aos="fade-up" className='w-full max-w-[750px] '> {/* AOS fade-up animation for name input */}
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div data-aos="fade-up" className='w-full max-w-[750px]'  data-aos-delay="100"> {/* AOS fade-up with delay for email input */}
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div data-aos="fade-up" className='w-full max-w-[750px]' data-aos-delay="200"> {/* AOS fade-up with delay for city input */}
            <Input
              type="text"
              placeholder="City"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div data-aos="fade-up" className='w-full max-w-[750px]' data-aos-delay="300"> {/* AOS fade-up with delay for phone input */}
            <Input
              type="text"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div data-aos="fade-up" className='w-full max-w-[750px]' data-aos-delay="300"> {/* AOS fade-up with delay for message input */}
            <TextArea
              value={message}
              name="message"
              placeholder="Write Your Message"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div data-aos="zoom-in" className='w-full max-w-[750px]' data-aos-delay="300" > {/* AOS zoom-in for submit button */}
            <button
              className='w-full max-w-[750px] border-2 px-4 py-3 text-white border-white text-center text-xl font-medium hover:bg-white transition-all ease-in hover:text-black'
              type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
