interface ForecastCardProps {
  day: string;
  maxTemp: number;
  minTemp: number;
  icon: string;
}

export default function ForecastCard({
  day,
  maxTemp,
  minTemp,
  icon,
}: ForecastCardProps) {
  return (
    <>
      <div className="flex flex-col items-center grow text-white border rounded-lg max-w-28 py-2 shadow-md shadow-black">
        <p>{day}</p>
        <img src={icon} alt="" />
        <p className="text-red-300">{maxTemp}</p>
        <p className="text-green-300">{minTemp}</p>
      </div>
    </>
  );
}
