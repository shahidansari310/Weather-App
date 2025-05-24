import React from 'react'

const Whether = () => {
  return (
    <div className='place-self-center p-10 rounded-[20px] bg-gradient-to-r from-indigo-600 to-purple-500 flex flex-col shadow-amber-600'>
        <div className='place-self-center mb-4 text-2xl font-bold text-white'>Live Weather</div>
      <div className='flex gap-2'>
        <input type="text" placeholder='search'
        className='border rounded-3xl p-2 bg-white text-xl pl-4 pr-4' />
        <img src="search.png" alt="" className='w-10 h-11 p-1 ' />
      </div>
      <img src="clear.png" alt="" className='w-[150px] place-self-center' />
      <p className='place-self-center font-bold text-2xl text-white'>16 °C </p>
      <p className='place-self-center text-5xl font-bold text-amber-100'>London</p>
      <div className='flex justify-between mt-6 text-white'>
        
        <div className='flex gap-2'>
        <img src="humidity.png" alt="" className='w-10 h-10 mt-[5px]'/>
        <div>
        <p className='text-[15px]'>36%</p>
        <p>Humidity</p>
        </div>
        </div>
      
        <div className='flex gap-2'>
        <img src="wind.png" alt="" className='w-10 h-10 mt-[5px]'/>
        <div>
        <p className='text-[15px]'>32 km/hr</p>
        <p>Wind</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Whether
