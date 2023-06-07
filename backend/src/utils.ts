import axios, { AxiosResponse } from "axios";

interface IHouseRisk {
  currentValue: number;
  loanAmount: number;
}

export const calculateRisk = (house: IHouseRisk): number => {
  const { currentValue, loanAmount } = house;
  let risk = loanAmount / currentValue; // Calculate initial risk
  if (loanAmount > 0.5 * currentValue) {
    risk += 0.1; // Increase risk by 10% if loanAmount is more than 50% of currentValue
  }
  // Ensure risk value is between 0 and 1
  risk = Math.max(0, Math.min(1, risk));
  return risk;
};

export const fetchRandomHousePic = async (): Promise<string> => {
  try {
    const width = 500;
    const height = 400;

    const accessKey = process.env.UNSPLASH_KEY;
    const response: AxiosResponse = await axios.get(
      `https://api.unsplash.com/photos/random?query=house&orientation=landscape&client_id=${accessKey}`
    );
    const image = response.data;
    const imageUrl = `${image.urls.raw}&w=${width}&h=${height}`;
    return imageUrl;
  } catch (error) {
    console.error("Error fetching house picture:", error);
    return "Error fetching image";
  }
};
