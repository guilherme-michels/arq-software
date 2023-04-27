import axios from "axios";

export const eventsAPI = axios.create({ baseURL: "http://localhost:3001" });

export const userAPI = axios.create({ baseURL: "http://localhost:3000" });
