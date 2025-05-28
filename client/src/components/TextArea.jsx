import React from 'react';

const TextArea = ({message, name, value, onChange, placeholder}) => {
  return (
  <textarea name={name} cols="30" rows="10" placeholder={placeholder} value={value} onChange={onChange} className='w-full max-w-[750px] px-7 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-medium font-medium' >
    {message}
  </textarea>
  )
}

export default TextArea;