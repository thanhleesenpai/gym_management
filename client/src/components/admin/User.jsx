import React from 'react';

const User = ({ userImg, name, email, contact, city, role, i }) => {
  const getRoleText = (role) => {
    switch (role) {
      case 1:
        return "Admin";
      case 2:
        return "Trainer";
      default:
        return "User";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      default:
        return 'bg-red-100 text-red-600';
    }
  };

  return (
    <div
      key={i}
      className='flex flex-col gap-6 justify-center items-center border-2 border-gray-200 rounded-lg p-6 transition-all ease-in-out duration-300 group shadow-md hover:shadow-lg hover:bg-gray-50 w-full max-w-lg mx-auto'
    >
      <h3 className='text-indigo-600 font-bold text-center text-2xl group-hover:text-indigo-800 transition-all ease-in-out'>
        {name}
      </h3>
      <img
        src={userImg}
        alt="User"
        className='w-[100px] h-[100px] object-cover rounded-full border-4 border-gray-300 group-hover:scale-110 transition-transform duration-300'
      />
      <div className='flex flex-col gap-4 w-full'>
        <p className='text-gray-700 text-md bg-indigo-100 rounded-lg p-3'>
          <span className='font-semibold text-indigo-600'>Email: </span>{email}
        </p>
        <p className='text-gray-700 text-md bg-teal-100 rounded-lg p-3'>
          <span className='font-semibold text-teal-600'>Contact: </span>{contact}
        </p>
        <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
          <span className='font-semibold text-pink-600'>City: </span>{city}
        </p>
        <p className={`text-gray-700 text-md rounded-lg p-3 ${getRoleColor(role)}`}>
          <span className='font-semibold'>Role: </span>{getRoleText(role)}
        </p>
      </div>
    </div>
  );
}

export default User;
