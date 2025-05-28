
import React from 'react';

const FeedbackComponent = ({ userImg, rating, comment, name, date, i, feedbackId, handleDelete }) => {
  const isoString = date;

  // Convert to Date object
  const currentDate = new Date(isoString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  // Format the date
  let readableDate = currentDate.toLocaleString('en-US', options);
  const gmtIndex = readableDate.indexOf(' MDT');
  if (gmtIndex !== -1) {
    readableDate = readableDate.slice(0, gmtIndex);
  }

  return (
    <div 
      className='border-2 rounded-lg hover:bg-gray-50 p-4 transition-all ease-in-out duration-300 group flex flex-col gap-4 shadow-md hover:shadow-xl'
      key={i}
    >
      <img 
        src={userImg} 
        alt="User" 
        className='max-w-[80px] w-full mx-auto rounded-full group-hover:scale-110 transition-all ease-in-out duration-300 border-4 border-gray-300'
      />
      <h3 className='text-yellow-500 group-hover:text-gray-800 capitalize font-bold text-xl group-hover:underline text-center'>
        {name}
      </h3>
      <p className='text-gray-600 group-hover:text-gray-800 text-md font-medium'>
        <span className='font-semibold'>Comment:</span> {comment}
      </p>
      <p className='text-red-500 text-md font-medium'>
        <span className='font-semibold'>Rating:</span> <span className='text-white group-hover:text-black'>{rating}</span>
      </p>
      <p className='text-gray-600 group-hover:text-gray-800 text-md font-medium'>
        <span className='font-semibold'>Date:</span> {readableDate}
      </p>
      <p className='text-gray-600 group-hover:text-gray-800 text-md font-medium'>
        <span className='font-semibold'>Feedback ID:</span> {feedbackId}
      </p>
      <button 
        className='bg-blue-500 text-white text-sm font-bold py-1 px-3 rounded-lg hover:bg-blue-600 transition-colors' 
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default FeedbackComponent;
