import axios from "axios";
import { Request, Response } from "express";

interface CityData {
  city: string;
}

const getCity = async (req: Request, res: Response) => {
  try {
    const response: Axios.AxiosXHR<CityData> = await axios.get<CityData>(
      "http://ip-api.com/json/"
    );
    const city = response.data.city;
    res.json({ city });
  } catch (error) {
    res.status(500).json({ message: `error fetching city` });
    console.error("Error fetching city data:", error);
  }
};

export default getCity;
