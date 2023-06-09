import { AxiosResponse } from "axios";
import axios from "../config/axiosConfig";

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
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create a house record");
  }
};

export const fetchHouses = async (
  offset = 0,
  limit = 100
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
