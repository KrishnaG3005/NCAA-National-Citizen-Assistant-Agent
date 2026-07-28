import { DEMO_SCHEMES, SAVED_SCHEMES_STORAGE_KEY } from "../utils/constants.js";

const safeStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

const readSavedIds = () => {
  const storage = safeStorage();

  if (!storage) {
    return [];
  }

  try {
    const raw = storage.getItem(SAVED_SCHEMES_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeSavedIds = (ids) => {
  const storage = safeStorage();

  if (!storage) {
    return ids;
  }

  storage.setItem(SAVED_SCHEMES_STORAGE_KEY, JSON.stringify(ids));
  return ids;
};

const normalizeQuery = (query = "") => query.trim().toLowerCase();

const matchesScheme = (scheme, query) => {
  if (!query) {
    return true;
  }

  const searchable = [
    scheme.title,
    scheme.category,
    scheme.summary,
    scheme.eligibility,
    scheme.region,
    ...(scheme.benefits ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(query);
};

export const getSchemes = async () => DEMO_SCHEMES;

export const getFeaturedSchemes = async () => DEMO_SCHEMES.slice(0, 3);

export const getSchemeById = async (schemeId) =>
  DEMO_SCHEMES.find((scheme) => scheme.id === schemeId) ?? null;

export const searchSchemes = async (query = "") => {
  const normalized = normalizeQuery(query);
  return DEMO_SCHEMES.filter((scheme) => matchesScheme(scheme, normalized));
};

export const getSavedSchemes = async () => {
  const savedIds = readSavedIds();
  return DEMO_SCHEMES.filter((scheme) => savedIds.includes(scheme.id));
};

export const saveScheme = async (schemeId) => {
  const savedIds = readSavedIds();

  if (!savedIds.includes(schemeId)) {
    savedIds.push(schemeId);
  }

  writeSavedIds(savedIds);
  return getSavedSchemes();
};

export const removeSavedScheme = async (schemeId) => {
  const nextIds = readSavedIds().filter((id) => id !== schemeId);
  writeSavedIds(nextIds);
  return getSavedSchemes();
};

export const isSchemeSaved = async (schemeId) =>
  readSavedIds().includes(schemeId);

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
