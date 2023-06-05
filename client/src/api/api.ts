import axios from '../axiosConfig';

import { IHouseRecord } from "../types/types";

export const createHouseRecord = async (data: IHouseRecord): Promise<IHouseRecord> => {
    try {
      const response = await axios.post('/api/houses', {
        address: data.address,
        currentValue: data.currentValue,
        loanAmount: data.loanAmount,
        risk: data.risk,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create a house record');
    }
  };
  
  export const fetchHouses = async (offset = 0, limit = 10): Promise<IHouseRecord[]> => {
    try {
      const response = await axios.get('/api/fetchHouses', {
        params: { offset, limit },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch houses');
    }
  };

  export const updateHouseById = async (id: number, updatedData: IHouseRecord): Promise<IHouseRecord[]> => {
    try {
      const response = await axios.put(`/api/houses/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch houses');
    }
  };

  export const deleteHouseById = async (id: number): Promise<IHouseRecord[]> => {
    try {
      const response = await axios.delete(`/api/houses/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch houses');
    }
  };