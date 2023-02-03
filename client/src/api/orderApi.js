import { fetchJson } from './fetchJson';

const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
const headers = new Headers();
headers.append('Content-Type', 'application/json');

export async function listOrders(user_id, signal) {
  const url = new URL(`${API_BASE_URL}/orders/${user_id}`);
  // return await fetchJson(url, { headers, signal }, []);
  return [];
}
