import React from 'react'

const TitleCard = ({title, bgUrl}) => {
  return (
    <div className='w-full h-[180px] relative'>
        <img src={bgUrl} alt={title} className='w-full h-full object-cover filter brightness-[50%]' />
        <h1 className='text-white text-4xl font-bold absolute bottom-0 translate-x-5 -translate-y-1/2'>{title}</h1>
    </div>
  )
}

export default TitleCard