import { USER_STORAGE_KEY } from "../utils/constants.js";

const safeStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

const readAuth = () => {
  const storage = safeStorage();

  if (!storage) {
    return null;
  }

  try {
    const raw = storage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeAuth = (auth) => {
  const storage = safeStorage();

  if (!storage) {
    return auth;
  }

  storage.setItem(USER_STORAGE_KEY, JSON.stringify(auth));
  return auth;
};

const clearAuth = () => {
  const storage = safeStorage();

  if (!storage) {
    return;
  }

  storage.removeItem(USER_STORAGE_KEY);
};

const buildUser = ({
  email = "citizen@example.com",
  name,
  role = "citizen",
}) => ({
  id: email,
  name: name || email.split("@")[0].replace(/[._-]/g, " ") || "Citizen",
  email,
  role,
});

export const getStoredAuth = () => readAuth();

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const role = email.toLowerCase().includes("admin") ? "admin" : "citizen";
  const auth = {
    token: "demo-token",
    user: buildUser({ email, role }),
  };

  return writeAuth(auth);
};

export const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required.");
  }

  const auth = {
    token: "demo-token",
    user: buildUser({ name, email, role: "citizen" }),
  };

  return writeAuth(auth);
};

export const logout = async () => {
  clearAuth();
  return true;
};

export const updateProfile = async (updates = {}) => {
  const current = readAuth();

  if (!current?.user) {
    throw new Error("No active session found.");
  }

  const next = {
    ...current,
    user: {
      ...current.user,
      ...updates,
    },
  };

  return writeAuth(next);
};

export const getCurrentUser = async () => readAuth()?.user ?? null;

export default {
  getStoredAuth,
  login,
  register,
  logout,
  updateProfile,
  getCurrentUser,
};
