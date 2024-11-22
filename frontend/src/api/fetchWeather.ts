import axios from "axios";

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

export interface LocationParams {
  city: string;
}

export const fetchCurrentWeather = async (
  selectedCity: string
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
  selectedCity: string,
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

export const fetchCity = async () => {
  try {
    const response = await axios.get<LocationParams>(
      `${import.meta.env.VITE_CITYDATAURL}`
    );
    return response.data.city;
  } catch (error) {
    alert("Failed to fetch weather data. Please try again.");
    console.error("Error fetching weather data", error);
  }
};
