import { fetchJson } from './FetchJson';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getFood(params, signal) {
  const url = new URL(`${API_BASE_URL}/food`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, []);
}
