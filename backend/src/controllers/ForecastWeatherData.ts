import { Request, Response } from "express";
import axios from "axios";
import ForecastWeatherInfo, { Condition } from "../types/WeatherInfo";
import { dayNames } from "../data/dayNames";

interface WeatherQuery {
  city?: string; // Mark as optional in case it's not provided
  days?: string;
}

const getForecastWeatherData = async (
  req: Request<{}, {}, {}, WeatherQuery>,
  res: Response
) => {
  const { city, days } = req.query;

  if (!city && !days) {
    res.status(400).json({ message: "City is required" });
    return;
  }

  try {
    const request: Axios.AxiosXHRConfigBase<unknown> = {
      params: { key: process.env.WEATHER_API_KEY, q: city, days: days },
    };
    const response = await axios.get<ForecastWeatherInfo>(
      "https://api.weatherapi.com/v1/forecast.json",
      request
    );

    const forecastWeatherData = response.data.forecast.forecastday;
    type forecastinfo = {
      date: string;
      temperatureMax: number;
      temperatureMin: number;
      condition: Condition;
    };
    let extractedData: forecastinfo[] = [];
    const getDayName = (date: string) => {
      const day = new Date(date);
      const dayIndex = day.getUTCDay();
      return dayIndex;
    };
    forecastWeatherData.forEach((forecastday) => {
      const foreCastDay: forecastinfo = {
        date: dayNames[getDayName(forecastday.date)],
        temperatureMax: Math.round(forecastday.day.maxtemp_c),
        temperatureMin: Math.round(forecastday.day.mintemp_c),
        condition: forecastday.day.condition,
      };
      extractedData.push(foreCastDay);
    });

    res.json({ extractedData });
  } catch (error) {
    res
      .status(500)
      .json({ message: `error in fetching weather data. Error: ${error}` });
  }
};

export default getForecastWeatherData;
