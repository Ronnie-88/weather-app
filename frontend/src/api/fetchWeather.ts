import axios from "axios";
import getLocation, { CityData } from "./fetchLocation";

interface ConditionParams {
  text: string;
  icon: string;
}
export interface CurrentWeatherParams {
  temperature?: number;
  city?: string;
  country?: string;
  condition?: ConditionParams;
  day?: string;
}

export interface ForecastWeatherParams {
  date?: string;
  temperatureMax?: number;
  temperatureMin?: number;
  condition?: ConditionParams;
}

export interface Forecast {
  extractedData: ForecastWeatherParams[];
}

export const fetchCurrentWeather = async (
  selectedCity: string | CityData
): Promise<CurrentWeatherParams | undefined> => {
  try {
    const request = { params: { city: selectedCity } };
    const response = await axios.get<CurrentWeatherParams>(
      `${import.meta.env.VITE_CURRENTDATAROUTEURL}`,
      request
    );
    return response.data;
  } catch (error) {
    alert("Failed to fetch weather data. Please try again.");
    console.error("Error fetching weather data", error);
  }
};

export const fetchForecastWeather = async (
  selectedCity: string | CityData,
  days: number
): Promise<Forecast | undefined> => {
  try {
    const request = { params: { city: selectedCity, days: days } };
    const response = await axios.get<Forecast>(
      `${import.meta.env.VITE_FORECASTDATAURL}`,
      request
    );
    return response.data;
  } catch (error) {
    alert("Failed to fetch weather data. Please try again.");
    console.error("Error fetching weather data", error);
  }
};

export const fetchCityCoords = async () => {
  try {
    const location = await getLocation();
    return location;
  } catch (error) {
    alert("Failed to fetch weather data. Please try again.");
    console.error("Error fetching weather data", error);
  }
};
