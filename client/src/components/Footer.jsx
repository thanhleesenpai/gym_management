



import React from 'react';
import { sponsorImg1, sponsorImg2, sponsorImg3, sponsorImg4 } from "../images";

const Footer = () => {
  return (
    <footer className='bg-blue-600 pt-20 pb-10 text-white'>
      <div className="container mx-auto px-6">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16'>
          {/* Explore More Section */}
          {/* Explore More Section */}
          <div className="flex flex-col gap-6 mt-0">
            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>

            {/* Địa chỉ 1 */}
            <div className="flex items-center gap-3">
              <img 
                alt="Location" 
                src="https://static.vecteezy.com/system/resources/previews/000/599/083/original/location-icon-vector.jpg" 
                width={30} 
                height={30} 
              />
              <p className='text-lg'>Số 1 Giải Phóng</p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <img 
                alt="Email" 
                src="https://tse2.mm.bing.net/th?id=OIP.LJToC8Q5-Kwm7tMwY5GAgwHaHa&pid=Api&P=0&h=180" 
                width={30} 
                height={30} 
              />
              <p className='text-lg'>caongo2004@gmail.com</p>
            </div>

            {/* Số điện thoại 1 */}
            <div className="flex items-center gap-3">
              <img 
                alt="Phone" 
                src="https://bluegym.vn/wp-content/plugins/button-contact-vr/img/phone.png" 
                width={30} 
                height={30} 
              />
              <p className='text-lg'>0909 090 909</p>
            </div>

           
            
          </div>



          

          {/* Social Media Links */}
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-semibold'>Follow Us</h2>
            <ul className='space-y-2'>
              <li>
                <a href="#" className='text-lg text-gray-300 hover:text-indigo-500 transition-all'>Twitter</a>
              </li>
              <li>
                <a href="#" className='text-lg text-gray-300 hover:text-indigo-500 transition-all'>Facebook</a>
              </li>
              <li>
                <a href="#" className='text-lg text-gray-300 hover:text-indigo-500 transition-all'>Instagram</a>
              </li>
              <li>
                <a href="#" className='text-lg text-gray-300 hover:text-indigo-500 transition-all'>LinkedIn</a>
              </li>
              <li>
                <a href="#" className='text-lg text-gray-300 hover:text-indigo-500 transition-all'>GitHub</a>
              </li>
            </ul>
          </div>

          {/* Sponsor Logos */}
          {/* <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-semibold'>Our Sponsors</h2>
            <div className='flex flex-wrap gap-4'>
              <img src={sponsorImg1} alt="sponsor-img1" className='w-full max-w-[120px] object-contain' />
              <img src={sponsorImg2} alt="sponsor-img2" className='w-full max-w-[120px] object-contain' />
              <img src={sponsorImg3} alt="sponsor-img3" className='w-full max-w-[120px] object-contain' />
              <img src={sponsorImg4} alt="sponsor-img4" className='w-full max-w-[120px] object-contain' />
            </div>
          </div> */}
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-gray-700 mt-10 pt-6 text-center'>
          <p className='text-gray-400'>© 2025 Blue Gym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
