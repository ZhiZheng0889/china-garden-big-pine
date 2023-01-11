import { fetchJson } from './fetchJson';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const headers = new Headers();
headers.append('Content-Type', 'application/json');

export async function listOrders(user_id, signal) {
  const url = new URL(`${API_BASE_URL}/orders/${user_id}`);
  // return await fetchJson(url, { headers, signal }, []);
  return [];
}
