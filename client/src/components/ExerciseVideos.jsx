import React from 'react';

const ExerciseVideos = ({youtubeVideo, name}) => {

  if(youtubeVideo.length === 0){
    return (
      <h1 className='text-4xl flex justify-center items-center w-full h-screen text-center'>Loading.....</h1>
    )
  }

  return (
    <section className='bg-white py-14'>
    <div className="px-7 sm:px-14">
    <h2 className='text-2xl sm:text-3xl md:text-5xl text-black capitalize text-center md:text-center border-b-4 border-red-500 sm:border-none mb-20'> <span className='text-red-400'>{name}</span> exercise videos</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 text-center grid-col-mob">
    {youtubeVideo?.slice(0,6).map((item, index) => (
            <a href={`https://www.youtube.com/watch?v=${item.video.videoId}`} key={index} target="_blank" rel='noreferrer'>
            <img src={item.video.thumbnails[0].url} className='w-full mb-6' alt={item.video.title} loading="lazy" />
            <h2 className='text-base sm:text-xl font-normal'>{item.video.title.slice(0,40) + ".."}</h2>
            </a>
    ))}
      </div>
    </div>
  </section>
  )
}

export default ExerciseVideos;