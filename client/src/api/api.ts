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
      console.log(response.data); // Handle the response data as needed
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create a house record');
    }
  };
  