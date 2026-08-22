import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  try {
    const stored = JSON.parse(
      window.localStorage.getItem("ncaa-auth") || "null"
    );
    if (stored?.token) {
      config.headers.Authorization = `Bearer ${stored.token}`;
    }
  } catch {
    // Ignore malformed local session data.
  }

  return config;
});

export const getApiBaseUrl = () => API_BASE_URL;

export const fetchHealth = async () => {
  const { data } = await apiClient.get("/api/health");

  return data;
};

export default apiClient;
