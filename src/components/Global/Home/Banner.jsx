import React from 'react';

export default function Banner({ post }) {
  return (
    <div className='w-full h-[180px] relative rounded-t-lg overflow-hidden'>
      <img src={post.image} alt='banner' />
      <div className='absolute bottom-3 left-3 text-white text-[14px] leading-5'>
        <p className='font-bold'>{post.title}</p>
        <p>{post.description}</p>
      </div>
    </div>
  );
}
