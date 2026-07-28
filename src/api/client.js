import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApiBaseUrl = () => API_BASE_URL;

export const fetchHealth = async () => {
  const { data } = await apiClient.get("/api/health");

  return data;
};

export default apiClient;
