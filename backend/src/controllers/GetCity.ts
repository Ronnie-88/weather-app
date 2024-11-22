import axios from "axios";
import { Request, Response } from "express";

interface CityData {
  city: string;
}

const getCity = async (req: Request, res: Response) => {
  try {
    const response = await axios.get<CityData>("http://ip-api.com/json/");
    const city = response.data.city;
    res.json({ city });
  } catch (error) {
    res.status(500).json({ message: `error: ${error}` });
  }
};

export default getCity;
