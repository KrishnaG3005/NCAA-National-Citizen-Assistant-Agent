import apiClient from "../api/client.js";

const normalizeScheme = (scheme) => ({
  ...scheme,
  id: scheme._id || scheme.id,
  summary: scheme.description,
  eligibility: `${scheme.state || "All states"} • ${
    scheme.gender || "All applicants"
  }`,
  region: scheme.state || "National",
  benefits:
    typeof scheme.benefits === "string"
      ? [scheme.benefits]
      : scheme.benefits || [],
});

const request = async (promise) => {
  const { data } = await promise;
  return data;
};

export const getSchemes = async () => {
  const data = await request(apiClient.get("/api/schemes"));
  return data.schemes.map(normalizeScheme);
};

export const getFeaturedSchemes = async () => (await getSchemes()).slice(0, 3);

export const getSchemeById = async (schemeId) => {
  try {
    const data = await request(apiClient.get(`/api/schemes/${schemeId}`));
    return normalizeScheme(data.scheme);
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

export const searchSchemes = async (query = "") => {
  const data = await request(
    apiClient.get("/api/schemes", { params: { q: query } })
  );
  return data.schemes.map(normalizeScheme);
};

export const getSavedSchemes = async () => {
  const data = await request(apiClient.get("/api/schemes/saved"));
  return data.savedSchemes.map((saved) => normalizeScheme(saved.schemeId));
};

export const saveScheme = async (schemeId) => {
  await request(apiClient.post(`/api/schemes/${schemeId}/save`));
  return getSavedSchemes();
};

export const removeSavedScheme = async (schemeId) => {
  await request(apiClient.delete(`/api/schemes/${schemeId}/save`));
  return getSavedSchemes();
};

export const isSchemeSaved = async (schemeId) => {
  try {
    return (await getSavedSchemes()).some((scheme) => scheme.id === schemeId);
  } catch (error) {
    if (error.response?.status === 401) return false;
    throw error;
  }
};

export default {
  getSchemes,
  getFeaturedSchemes,
  getSchemeById,
  searchSchemes,
  getSavedSchemes,
  saveScheme,
  removeSavedScheme,
  isSchemeSaved,
};
