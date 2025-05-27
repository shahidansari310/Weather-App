import React, { useEffect, useRef, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import addNotification from "react-push-notification";

const Whether = () => {
  const inputRef = useRef();
  const [data, setdata] = useState(false);

  useEffect(()=>{
    addNotification({
      title:"Weather App",
      message:'Using Weather App by Shahid Ansari',
      duration:4000,
      native:true,
    })
  },[])

  const search = async (city) => {
    if (city === "") {
      toast("Enter city name!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        toast(data.message);
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
  
    }
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className=
    "place-self-center p-10 rounded-[20px] bg-white/10 backdrop-blur-md flex flex-col shadow-lg border border-white/30"
    >
      <div className="place-self-center mb-4 text-2xl font-bold text-white">
        Live Weather
      </div>

      {/* Input section */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city..."
          className="w-full rounded-full px-5 py-2 text-base outline-none bg-white/20 text-white placeholder-white/70 border border-white/30"
        />
        <button
          onClick={() => search(inputRef.current.value)}
          className="rounded-full px-4 py-2 bg-white/20 hover:bg-white/30 transition text-white text-sm font-semibold"
        >
          Search
        </button>
      </div>

      {data ? (
        <>
          <img
            src={data.icon}
            alt="icon"
            className="w-24 sm:w-32 mx-auto drop-shadow-lg animate-pulse"
          />
          <p className="text-4xl sm:text-6xl font-bold text-center text-white mt-2">
            {data.temperature}°C
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-center text-amber-100">
            {data.location}
          </p>

          <div className="flex flex-row sm:flex-row justify-between mt-6 gap-4 text-white text-center sm:text-left">
            <div className="flex gap-3 items-center justify-center sm:justify-start">
              <img src="humidity.png" alt="humidity" className="w-8 h-8" />
              <div>
                <p className="text-sm">{data.humidity}%</p>
                <p className="text-xs">Humidity</p>
              </div>
            </div>
            <div className="flex gap-3 items-center justify-center sm:justify-start">
              <img src="wind.png" alt="wind" className="w-8 h-8" />
              <div>
                <p className="text-sm">{data.wind}km/h</p>
                <p className="text-xs">Wind</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-2xl mt-3 text-white font-bold">
            Something went Wrong!
          </div>
        </>
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