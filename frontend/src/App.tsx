import { useEffect, useState } from "react";
import {
  CurrentWeatherParams,
  fetchCityCoords,
  fetchCurrentWeather,
  fetchForecastWeather,
  Forecast,
} from "./api/fetchWeather";
import CitySelector from "./components/CitySelector";
import CurrentLocationWeatherCard from "./components/CurrentLocationWeatherCard";
import ForecastList from "./components/ForecastList";

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState<
    CurrentWeatherParams | undefined
  >(undefined);
  const [forecastWeatherData, setForecastWeatherData] = useState<
    Forecast | undefined
  >(undefined);

  function updateWeatherData(
    fetchedWeatherData: CurrentWeatherParams,
    fetchedForecastWeatherData: Forecast
  ) {
    setCurrentWeatherData(fetchedWeatherData);
    setForecastWeatherData(fetchedForecastWeatherData);
  }

  useEffect(() => {
    async function fetchLocationWeather() {
      try {
        const fetchedCityCoords = await fetchCityCoords();
        if (!fetchedCityCoords) {
          return;
        }
        const coords = `${fetchedCityCoords.latitude}, ${fetchedCityCoords.longitude}`;
        const fetchedWeatherData = await fetchCurrentWeather(coords);
        const fetchedForecastWeatherData = await fetchForecastWeather(
          coords,
          3
        );
        if (fetchedWeatherData && fetchedForecastWeatherData) {
          updateWeatherData(fetchedWeatherData, fetchedForecastWeatherData);
        }
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    }
    fetchLocationWeather();
  }, []);

  return (
    <>
      <div className="bg-gray-600 h-[1920px] flex flex-col items-center space-y-9">
        <h2 className="mt-5 text-3xl font-light text-slate-200">
          Weather Update
        </h2>
        <CitySelector updateWeatherData={updateWeatherData} />
        {currentWeatherData ? (
          <CurrentLocationWeatherCard weatherData={currentWeatherData} />
        ) : (
          ""
        )}
        {forecastWeatherData ? (
          <ForecastList forecastData={forecastWeatherData.extractedData} />
        ) : (
          " no forecast"
        )}
      </div>
    </>
  );
}

export default App;
