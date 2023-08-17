import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://houstable-backend.onrender.com",
});

export default instance;
