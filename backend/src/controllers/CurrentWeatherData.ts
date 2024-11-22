import express, { Request, Response } from "express";
import axios from "axios";
import WeatherInfo from "../types/WeatherInfo";
import { dayNames } from "../data/dayNames";

interface WeatherQuery {
  city?: string; // Mark as optional in case it's not provided
}

const getCurrentWeatherData = async (
  req: Request<{}, {}, {}, WeatherQuery>,
  res: Response
) => {
  const { city } = req.query;

  if (!city) {
    res.status(400).json({ message: "City is required" });
    return;
  }

  try {
    const request: Axios.AxiosXHRConfig<unknown> = {
      url: `GET`,
      params: { key: process.env.WEATHER_API_KEY, q: city },
    };
    const response: Axios.AxiosXHR<WeatherInfo> = await axios.get<WeatherInfo>(
      "https://api.weatherapi.com/v1/current.json",
      request
    );

    const currentWeatherData = response.data.current;
    const locationData = response.data.location;
    const day = new Date(locationData.localtime);
    const dayIndex = day.getDay();
    const extractedData = {
      temperature: Math.round(currentWeatherData.temp_c),
      city: locationData.name,
      country: locationData.country,
      condition: currentWeatherData.condition,
      day: dayNames[dayIndex],
    };
    res.json(extractedData);
  } catch (error) {
    res.status(500).json({ message: `error in fetching current weather data` });
    console.error("Error fetching weather data:", error);
  }
};

export default getCurrentWeatherData;
