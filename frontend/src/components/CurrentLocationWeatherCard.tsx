import { CurrentWeatherParams } from "../api/fetchWeather";

interface CurrentLocationWeatherCardProps {
  weatherData: CurrentWeatherParams;
}

export default function CurrentLocationWeatherCard({
  weatherData,
}: CurrentLocationWeatherCardProps) {
  return (
    <>
      <div className="border w-auto h-auto rounded-lg p-3 flex justify-between shadow-md shadow-black">
        {weatherData && (
          <>
            <div
              id="conditionAndIconWrapper"
              className="flex flex-col items-center grow border-r pr-7"
            >
              <div>
                <p className="text-xl text-white font-semibold">
                  {weatherData.condition?.text}
                </p>
              </div>
              <div className="w-24 h-24">
                <img
                  className="w-full h-full object-fill"
                  src={weatherData.condition?.icon.replace("64x64", "128x128")}
                  alt=""
                />
              </div>
            </div>
            <div
              id="locationAndDayAndTempWrapper"
              className="min-w-40 text-white ml-5"
            >
              <div>
                <p>
                  {weatherData.city}, {weatherData.country}
                </p>
              </div>
              <div>
                <p>{weatherData.day}</p>
              </div>
              <div>
                <p className="text-5xl font-semibold">
                  {weatherData.temperature} <sup>o</sup>C
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
