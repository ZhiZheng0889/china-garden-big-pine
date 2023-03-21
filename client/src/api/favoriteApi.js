import { fetchJson } from "./fetchJson";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function listFavoriteOrders(user_id, controller) {
  const url = new URL(`${API_BASE_URL}/favorite/order/${user_id}`);
  return await fetchJson(url, { headers }, [], controller);
}

export async function listFavoriteMeals(user_id, controller) {
  const url = new URL(`${API_BASE_URL}/favorite/meals/${user_id}`);
  return await fetchJson(url, { headers }, [], controller);
}
