import { AxiosResponse } from "axios";
import axios from "../axiosConfig";

import { IHouseRecord } from "../types/types";

export const createHouseRecord = async (
  data: IHouseRecord
): Promise<IHouseRecord> => {
  try {
    const response: AxiosResponse = await axios.post("/api/houses", {
      address: data.address,
      currentValue: data.currentValue,
      loanAmount: data.loanAmount,
      risk: data.risk,
      image: data.image,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create a house record");
  }
};

export const fetchHouses = async (
  offset = 0,
  limit = 10
): Promise<IHouseRecord[]> => {
  try {
    const response: AxiosResponse = await axios.get("/api/fetchHouses", {
      params: { offset, limit },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch houses");
  }
};

export const updateHouseById = async (
  id: number,
  updatedData: IHouseRecord
): Promise<IHouseRecord[]> => {
  try {
    const response: AxiosResponse = await axios.put(
      `/api/houses/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch houses");
  }
};
export const fetchHouseById = async (id: number): Promise<IHouseRecord> => {
  try {
    const response: AxiosResponse = await axios.get(`/api/houses/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch houses");
  }
};

export const deleteHouseById = async (
  id: number
): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse = await axios.delete(`/api/houses/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch houses");
  }
};

export const fetchRandomHousePic = async (): Promise<string> => {
  try {
    const width = 500; // Desired width for the image
    const height = 400; // Desired height for the image

    const accessKey = "-2OlquUqjgxrcogzMWbca3-Z7uC3TRnT_rhcvdyGoYk";
    const response: AxiosResponse = await axios.get(
      `https://api.unsplash.com/photos/random?query=house&orientation=landscape&client_id=${accessKey}`
    );
    const image = response.data;
    const imageUrl = image.urls.regular;
    return `${imageUrl}?w=${width}&h=${height}`;
  } catch (error) {
    console.error("Error fetching house picture:", error);
    return "";
  }
};
