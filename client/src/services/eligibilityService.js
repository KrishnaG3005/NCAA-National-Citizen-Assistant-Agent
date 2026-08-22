import apiClient from "../api/client.js";

export const checkEligibility = async (profile) => {
  const { data } = await apiClient.post("/api/eligibility/check", profile);
  return data.schemes || [];
};

export default { checkEligibility };
