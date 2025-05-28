import React from 'react'
import { error } from '../images'
const Error = () => {
  return (
    <section>
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center w-full h-screen">
          <img src={error} className='w-full lg:w-[70%]' alt="error" />
        </div>
      </div>
    </section>
  )
}

export default Error