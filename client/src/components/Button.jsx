import React from 'react';

const Button = ({text}) => {
  return (
    <button className='btn px-5 py-1 font-medium outline-none border border-white rounded-sm text-2xl text-black bg-white transition-all ease-in hover:scale-105'>
        {text}
    </button>
  )
}

export default Button;