import React from 'react';
import { aboutImg } from '../images';
import { Heading, ButtonOutline } from '../components';

const About = () => {
    return (
        <section className='pt-36 bg-gray-900'>
            <Heading name="About Us" />

            <div className="container pt-20 mx-auto px-6 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-20 md:gap-0">
                    <div className='flex flex-col gap-5'>
                        <h3 className='text-white text-2xl font-semibold'>Mark Your Attendance</h3>
                        <p className='text-gray-400 text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem dolorum officia neque unde, dolores perspiciatis omnis beatae vitae blanditiis id Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse nostrum fugit iste maxime non suscipit </p>


                        {/* <button type='button' className='font-bold border-2 outline-none px-6 py-3 text-white border-blue-500 hover:bg-blue-500 hover:text-gray-100 transition-all rounded-sm'>Explore More</button> */}
                        <ButtonOutline text="Explore More"/>
                    </div>

                    <img src={aboutImg} alt="about-img" className='w-full scale-125' />
                </div>
            </div>
        </section>
    )
}

export default About;