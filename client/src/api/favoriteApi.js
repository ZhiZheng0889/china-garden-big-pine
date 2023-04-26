import { fetchJson } from "./fetchJson";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function listFavoriteOrders(user_id, controller) {
  const url = new URL(`${API_BASE_URL}/favorites/orders/${user_id}`);
  return await fetchJson(url, { headers }, [], controller);
}

export async function listFavoriteMeals(user_id, controller) {
  const url = new URL(`${API_BASE_URL}/favorites/meals/${user_id}`);
  return await fetchJson(url, { headers }, [], controller);
}

export async function toggleOrderLike(order_id, controller) {
  const url = new URL(
    `${API_BASE_URL}/favorites/orders/toggle-like/${order_id}`
  );
  const options = {
    headers,
    method: "POST",
  };
  return await fetchJson(url, options, {}, controller);
}
