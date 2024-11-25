export interface CityData {
  latitude: number;
  longitude: number;
}

const getLocation = (): Promise<CityData> => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation not supported");
  }

  return new Promise((resolve, reject) => {
    const successCallback: PositionCallback = (
      position: GeolocationPosition
    ) => {
      const { latitude, longitude } = position.coords;
      resolve({ latitude, longitude });
    };
    const errorCallback: PositionErrorCallback = (
      positionError: GeolocationPositionError
    ) => {
      reject(new Error(`Error: ${positionError.message}`));
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  });
};

export default getLocation;
