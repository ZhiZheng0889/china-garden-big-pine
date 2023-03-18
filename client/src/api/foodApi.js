import { fetchJson } from "./fetchJson";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 *
 * @param {params} params object has a key category and a value query for which category food.
 * @param {AbortController.signal} signal that allows user to cancel request when changing params
 * @returns list of foods in []
 */
export async function listFoods(params, signal) {
  const url = new URL(`${API_BASE_URL}/foods`);
  // Map parameters for url with key value pairs from params object
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  const timeout = 8000;
  const options = { headers, signal, timeout };
  return await fetchJson(url, options, []);
}
