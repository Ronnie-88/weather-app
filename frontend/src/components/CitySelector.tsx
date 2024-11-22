import { useState } from "react";
import {
  fetchCurrentWeather,
  CurrentWeatherParams,
  fetchForecastWeather,
  Forecast,
} from "../api/fetchWeather";

interface CitySelectorProps {
  updateWeatherData: (
    weatherData: CurrentWeatherParams,
    forecastData: Forecast
  ) => void;
}

export default function CitySelector({ updateWeatherData }: CitySelectorProps) {
  //set the city so that we can send that as a query to the server
  const [city, setCity] = useState("");

  const handleOnChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setCity(changeEvent.target.value);
  };

  const handleClick = async () => {
    if (city.trim() === "") {
      return;
    }
    try {
      const fetchedWeatherData = await fetchCurrentWeather(city);
      const fetchedForecastWeatherData = await fetchForecastWeather(city, 3);
      if (fetchedWeatherData && fetchedForecastWeatherData) {
        updateWeatherData(fetchedWeatherData, fetchedForecastWeatherData);
      }
      setCity("");
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center border w-[400px] mt-5 rounded-lg shadow-md shadow-black">
        <input
          type="text"
          placeholder="Enter a city name"
          value={city}
          onChange={handleOnChange}
          className="border w-96 rounded-md my-2"
        />
        <button
          onClick={handleClick}
          className="bg-orange-500 p-1 my-2 rounded-md text-white hover:bg-orange-600"
        >
          Submit
        </button>
      </div>
    </>
  );
}
