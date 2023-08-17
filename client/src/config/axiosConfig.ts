import axios, { AxiosInstance } from "axios";

let baseURL = "http://localhost:3000";

if (window.location.hostname !== "localhost") {
  baseURL = "https://houstable-backend.onrender.com";
}

const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
});
export default instance;
