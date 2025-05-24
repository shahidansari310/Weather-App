import React from 'react'

const Whether = () => {
  return (
    <div className='place-self-center p-10 rounded-[10px] bg-gradient-to-r from-indigo-600 to-purple-500 flex flex-col'>
      <div className='flex gap-2'>
        <input type="text" placeholder='search'
        className='border rounded-3xl p-2 bg-white text-xl' />
        <img src="search.png" alt="" className='w-10 h-11 p-1 ' />
      </div>
      <img src="clear.png" alt="" className='w-[150px] place-self-center' />
      <p className='place-self-center font-bold text-2xl text-white'>16 °C </p>
      <p className='place-self-center text-5xl font-bold text-amber-100'>London</p>
      <div className='flex justify-between mt-5 text-white'>
      <div>
        <img src="humidity.png" alt="" />
        <p className='mt-2'>Humidity</p>
      </div>
      <div>
        <img src="wind.png" alt="" />
        <p className='mt-2'>Wind</p>
      </div>
    </div>
    </div>
  )
}

export default Whether
