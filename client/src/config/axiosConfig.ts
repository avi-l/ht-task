import axios, { AxiosInstance } from "axios";

let baseURL = "https://houstable-backend.onrender.com";


if (window.location.hostname === "localhost") {
  baseURL = "http://localhost:3000"
}

const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

export default instance;
