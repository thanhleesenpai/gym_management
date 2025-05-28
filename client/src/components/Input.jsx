import React from 'react';

const Input = ({type, name, placeholder, value, onChange, pattern, minLength, maxLength}) => {
  return (
    <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange}  pattern={pattern} minLength={minLength} maxLength={maxLength} required className='w-full max-w-[750px] px-7 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium' />
  )
}

export default Input;