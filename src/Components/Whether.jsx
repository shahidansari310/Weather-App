import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Whether = () => {
  const inputRef = useRef();
  const [data, setdata] = useState(false);

  const search = async (city) => {
    if (city === "") {
      toast("Enter city name!".toUpperCase());
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        toast(data.message.toUpperCase());
        return;
      }
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      setdata({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setdata(false);
      toast("Failed to fetch weather data".toUpperCase());
    }
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg w-full mx-auto my-6 p-6 sm:p-10 rounded-[20px] bg-white/10 backdrop-blur-md flex flex-col shadow-lg border border-white/30">
      <div className="place-self-center mb-4 text-xl sm:text-2xl font-bold text-white text-center">
        Live Weather
      </div>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mb-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city..."
          className="w-full rounded-full px-6 py-3 text-base sm:text-lg outline-none bg-white/20 text-white placeholder-white/70 border border-white/30"
        />
        <img
          src="search.png"
          alt="search"
          className="self-center sm:self-auto w-12 h-12 sm:w-auto sm:h-auto px-4 py-3 bg-white/20 rounded-full hover:bg-white/30 transition cursor-pointer"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {/* Weather Data */}
      {data ? (
        <>
          <img
            src={data.icon}
            alt="weather-icon"
            className="place-self-center w-[100px] sm:w-[140px] drop-shadow-lg animate-pulse"
          />
          <p className="place-self-center font-bold text-4xl sm:text-6xl text-white">
            {data.temperature} °C
          </p>
          <p className="place-self-center text-2xl sm:text-4xl font-bold text-amber-100 text-center">
            {data.location}
          </p>

          <div className="flex flex-col sm:flex-row justify-between mt-6 text-white gap-4">
            <div className="flex gap-2 items-center">
              <img src="humidity.png" alt="humidity" className="w-10 h-10" />
              <div>
                <p className="text-[15px]">{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <img src="wind.png" alt="wind" className="w-10 h-10" />
              <div>
                <p className="text-[15px]">{data.wind}km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-xl sm:text-2xl mt-3 text-white font-bold">
          Something went wrong!
        </div>
      )}

      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="dark"
      />
    </div>
  );
};

export default Whether;