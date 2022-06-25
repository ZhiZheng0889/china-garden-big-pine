import { fetchJson } from './FetchJson';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const headers = new Headers();
headers.append('Content-Type', 'application/json');
export async function listFood(params, signal) {
  const url = new URL(`${API_BASE_URL}/foods`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );

  return await fetchJson(url, { headers, signal }, []);
}
