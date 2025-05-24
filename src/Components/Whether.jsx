import React,{useEffect, useState} from 'react'

const Whether = () => {

    const [data, setdata] = useState(false)

    const allicon={
        "01d":"clear.png",
        "01n":"clear.png",
        "02d":"cloud.png",
        "02n":"cloud.png",
        "03d":"cloud.png",
        "03n":"cloud.png",
        "04d":"drizzle.png",
        "04n":"drizzle.png",
        "09d":"rain.png",
        "09n":"rain.png",
        "10d":'rain.png',
        "10n":'rain.png',
        "13d":'snow.png',
        "13n":'snow.png',
    }

    const search=async(city)=>{
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`

            const response=await fetch(url);
            const data=await response.json();
            console.log(data);
            const icon=allicon[data.weather[0].icon] || 'clear.png';
            setdata({
                humidity:data.main.humidity,
                wind:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon,
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        search("London");
    },[])

  return (
    <div className='place-self-center p-10 rounded-[20px] bg-gradient-to-r from-indigo-600 to-purple-500 flex flex-col shadow-amber-600'>
        <div className='place-self-center mb-4 text-2xl font-bold text-white'>Live Weather</div>
      <div className='flex gap-2'>
        <input type="text" placeholder='search'
        className='border rounded-3xl p-2 bg-white text-xl pl-4 pr-4' />
        <img src="search.png" alt="" className='w-10 h-11 p-1 ' />
      </div>
      <img src="clear.png" alt="" className='w-[150px] place-self-center' />
      <p className='place-self-center font-bold text-6xl text-white'>{data.temperature} °C </p>
      <p className='place-self-center text-4xl font-bold text-amber-100'>{data.location}</p>
      <div className='flex justify-between mt-6 text-white'>
        
        <div className='flex gap-2'>
        <img src="humidity.png" alt="" className='w-10 h-10 mt-[5px]'/>
        <div>
        <p className='text-[15px]'>{data.humidity}%</p>
        <p>Humidity</p>
        </div>
        </div>
      
        <div className='flex gap-2'>
        <img src="wind.png" alt="" className='w-10 h-10 mt-[5px]'/>
        <div>
        <p className='text-[15px]'>{data.wind}km/h</p>
        <p>Wind</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Whether
