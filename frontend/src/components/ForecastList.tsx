import { ForecastWeatherParams } from "../api/fetchWeather";
import ForecastCard from "./ForecastCard";

interface ForecastListProps {
  forecastData: ForecastWeatherParams[];
}

export default function ForecastList({ forecastData }: ForecastListProps) {
  return (
    <>
      <div className="flex justify-between gap-1 p-3 w-[500px]">
        {forecastData.map((forecast, index) => {
          return (
            <ForecastCard
              key={index}
              day={forecast.date as Required<string>}
              icon={forecast.condition?.icon as Required<string>}
              maxTemp={forecast.temperatureMax as Required<number>}
              minTemp={forecast.temperatureMin as Required<number>}
            />
          );
        })}
      </div>
    </>
  );
}
