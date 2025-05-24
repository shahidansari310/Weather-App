import React, { useEffect, useRef, useState } from "react";

const Whether = () => {
  const inputRef = useRef();
  const [data, setdata] = useState(false);

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      }
      console.log(data);
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
      console.log(error.message);
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
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city..."
          className="rounded-full px-6 py-3 text-lg outline-none bg-white/20 text-white placeholder-white/70 border border-white/30"
        />
        <img
          src="search.png"
          alt=""
          className="px-4 py-3 bg-white/20 rounded-full hover:bg-white/30 transition"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {data ? (
        <>
          <img
            src={data.icon}
            alt=""
            className="place-self-center w-[140px] drop-shadow-lg animate-pulse"
          />
          <p className="place-self-center font-bold text-6xl text-white">
            {data.temperature} °C
          </p>
          <p className="place-self-center text-4xl font-bold text-amber-100">
            {data.location}
          </p>
          <div className="flex justify-between mt-6 text-white">
            <div className="flex gap-2">
              <img src="humidity.png" alt="" className="w-10 h-10 mt-[5px]" />
              <div>
                <p className="text-[15px]">{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="flex gap-2">
              <img src="wind.png" alt="" className="w-10 h-10 mt-[5px]" />
              <div>
                <p className="text-[15px]">{data.wind}km/h</p>
                <p>Wind</p>
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
    </div>
  );
};

export default Whether;
