interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
}

interface CurrentWeatherParams {
  temp_c: number;
  condition: Condition;
}

export default interface WeatherInfo {
  location: WeatherLocation;
  current: CurrentWeatherParams;
}

export interface DayParams {
  maxtemp_c: number;
  mintemp_c: number;
  condition: Condition;
}
export interface ForecastDayParams {
  date: string;
  day: DayParams;
}

interface ForecastParams {
  forecastday: ForecastDayParams[];
}

export default interface ForecastWeatherInfo {
  forecast: ForecastParams;
}
