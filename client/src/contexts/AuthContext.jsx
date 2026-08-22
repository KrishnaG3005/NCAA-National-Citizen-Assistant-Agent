import { createContext, useContext, useMemo, useState } from "react";
import {
  getStoredAuth,
  login as loginUser,
  register as registerUser,
  logout as logoutUser,
  updateProfile,
} from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(
    () => getStoredAuth() || { token: null, user: null }
  );
  const loading = false;

  const login = async (credentials) => {
    const nextAuth = await loginUser(credentials);
    setAuthState(nextAuth);
    return nextAuth;
  };

  const register = async (payload) => {
    const nextAuth = await registerUser(payload);
    setAuthState(nextAuth);
    return nextAuth;
  };

  const logout = async () => {
    await logoutUser();
    setAuthState({ token: null, user: null });
  };

  const updateUser = async (updates) => {
    const nextAuth = await updateProfile(updates);
    setAuthState(nextAuth);
    return nextAuth;
  };

  const value = useMemo(
    () => ({
      loading,
      user: authState.user,
      token: authState.token,
      isAuthenticated: Boolean(authState.token && authState.user),
      login,
      register,
      logout,
      updateUser,
    }),
    [authState, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};

export default AuthContext;
