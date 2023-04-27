import axios from "axios";

export const eventsAPI = axios.create({ baseURL: "http://localhost:3001" });

export const userAPI = axios.create({ baseURL: "http://localhost:3000" });

export const emailAPI = axios.create({ baseURL: `http://localhost:3003` });

eventsAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

eventsAPI.interceptors.response.use((config) => {
  if (config.status === 401) {
    localStorage.removeItem("");
    window.location.reload();
  }

  return config;
});
