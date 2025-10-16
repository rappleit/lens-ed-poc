import React from 'react'

const TitleCard = ({title, bgUrl}) => {
  return (
    <div className='w-full h-[180px] relative'>
        <img src={bgUrl} alt={title} className='w-full h-full object-cover filter brightness-[50%]' />
        <h1 className='text-white lg:text-4xl text-2xl font-bold absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-5 -translate-y-1/2'>{title}</h1>
    </div>
  )
}

export default TitleCard