import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input} from "../components";
import { useAuth } from '../context/auth';
import { BASE_URL } from '../utils/fetchData';
const Profile = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");


  // const [goal, setGoal] = useState("");
  // let g = localStorage.getItem("goal");

  useEffect(() => {
    if (auth && auth?.user) {
      const { name, email, city, contact} = auth?.user;
      setName(name);
      setEmail(email);
      setCity(city);
      setContact(contact);
      // setGoal(g);
    }
  }, [auth]);

  const updateUser = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z]+$/.test(name)) {
      toast.error("Name must contain only alphabets");
      return;
    }



    // Validation for City field
    if (!/^[A-Za-z ]+$/.test(city)) {
      toast.error("City must contain only alphabets and spaces");
      return;
    }
    


    const phoneNumberPattern = /^(9|8|7|6)\d{9}$/;
    if (!phoneNumberPattern.test(contact)) {
      toast.error("Phone number must start with 9, 8, 7, or 6 and contain exactly 10 digits");
      return;
    }

    console.log(name, email, city, contact);

    try {
  
      const { data } = await axios.put(`${BASE_URL}/api/v1/auth/user-profile`, {
        name,
        email,
        city,
        contact,
        // goal
      })
      console.log(data);

      if (data?.error) {
        toast.error(data?.error);
        console.log(error);
      }

      else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        // localStorage.setItem("goal", goal);
        toast.success("profile updated successfully");
        // window.location.reload();
        navigate("/");
        
      }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }

  }


  return (
    <section className='bg-gray-900'>

    <div className='container mx-auto px-6'>
      <form className='flex w-full h-screen justify-center items-center flex-col gap-5' onSubmit={updateUser}>
        <h2 className='text-center text-4xl text-white font-bold'>Profile</h2>


        <Input type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength="4"
          // pattern="[A-Za-z ]+"
          maxLength="30"
          // title="Please enter only letters. no other characters are allowed"
        />


        <Input type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
        />


        <Input type="text"
          placeholder="City"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          // pattern="[A-Za-z ]+"
          minLength="4"
          maxLength="35"
        />

        <Input type="text"
          placeholder="Phone"
          name="phone"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          // pattern="9[0-9]{9}" // Ensure the number starts with 9 and contains a total of 10 digits
          // title="Please enter a valid 10-digit phone number starting with 9"
          // pattern="[0-9]+"
          // minLength="10"
          // maxLength="10"
        />

        <button type='submit' className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]' >Update</button>
      </form>
    </div>
    </section>

  )
}

export default Profile;

