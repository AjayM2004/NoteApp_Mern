import axios from "axios";
// in production, there is no localhost so we need to have to make this dynamic
// in development, we are using localhost:5001/api
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
const api = axios.create({
  baseURL: BASE_URL,
})
export default api;