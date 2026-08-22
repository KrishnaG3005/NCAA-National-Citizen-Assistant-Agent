import apiClient from "../api/client.js";
import { USER_STORAGE_KEY } from "../utils/constants.js";

const readAuth = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
};

const writeAuth = (auth) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(auth));
  return auth;
};

const request = async (promise) => {
  try {
    const { data } = await promise;
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Request failed. Please try again.",
      { cause: error }
    );
  }
};

export const getStoredAuth = () => readAuth();

export const login = async (credentials) => {
  const data = await request(apiClient.post("/api/auth/login", credentials));
  return writeAuth({ token: data.token, user: data.user });
};

export const register = async (payload) => {
  const data = await request(apiClient.post("/api/auth/register", payload));
  return writeAuth({ token: data.token, user: data.user });
};

export const logout = async () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  return true;
};

export const updateProfile = async (updates = {}) => {
  const data = await request(apiClient.put("/api/auth/profile", updates));
  return writeAuth({ ...readAuth(), user: data.user });
};

export const getCurrentUser = async () => {
  const data = await request(apiClient.get("/api/auth/me"));
  return data.user;
};

export default {
  getStoredAuth,
  login,
  register,
  logout,
  updateProfile,
  getCurrentUser,
};
