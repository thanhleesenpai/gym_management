import React from 'react';

const ButtonOutline = ({ text }) => {
    return (
        <button type='button' className='btn px-5 py-1 font-medium outline-none border border-white rounded-sm text-2xl text-white hover:text-black hover:bg-white transition-all ease-in'>
            {text}
        </button>
    )
}

export default ButtonOutline;