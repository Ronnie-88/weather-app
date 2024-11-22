import dotenv from "dotenv";
import axios from "axios";
import express, { Request, Response } from "express";
import getCurrentWeatherData from "./controllers/CurrentWeatherData";
import cors from "cors";
import getForecastWeatherData from "./controllers/ForecastWeatherData";
import getCity from "./controllers/GetCity";

//load environment variables from a .env file into process.env
dotenv.config(); // This loads all key-value pairs in .env into process.env so we can use them in our code

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(express.json()); // Tells the Express app to automatically parse JSON data in the request body

app.use(cors());

//Define a route to get weather data for a specific city
// Route: GET /api/weather?city=CityName

app.get("/api/weather", async (req: Request, res: Response) => {
  const { city } = req.query; //Extract the "city" parameter from the request query string (e.g., /api/weather?city=London)
  // Check if the city parameter is provided
  if (!city) {
    res.status(400).json({ error: "City parameter is required" }); // If "city" is missing, send a 400 response with an error message
    return;
  }

  try {
    //make a get request to the external weatherAPI.com
    if (!process.env.WEATHER_API_KEY) {
      throw new Error(
        "WEATHER_API_KEY is not set in the environment variables"
      );
    }
    //this is the axios request containing our query params
    const request: Axios.AxiosXHRConfig<unknown> = {
      url: `GET`,
      params: {
        key: process.env.WEATHER_API_KEY, // Pass the API key from the environment variable
        q: city, // Pass the city name as the location parameter ("q") found in weather api docs
      },
    };
    const response: Axios.AxiosXHR<unknown> = await axios.get(
      `https://api.weatherapi.com/v1/current.json`,
      request
    );

    // Send the weather data received from WeatherAPI.com back to the client
    res.json(response.data); // Send the JSON response data to the client (e.g., weather details for the requested city)
  } catch (error) {
    // If there's an error with the request, send a 500 response with an error message
    res.status(500).json({ error: `Failed to fetch weather data error` });
    console.error("Error fetching weather data:", error);
  }
});

app.get("/api/weather/getCurrentWeatherData", getCurrentWeatherData);
app.get("/api/weather/getForecastWeatherData", getForecastWeatherData);
app.get("/api/weather/getCity", getCity);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message when the server starts successfully
});
