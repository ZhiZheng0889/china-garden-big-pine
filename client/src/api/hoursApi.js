import { fetchJson } from "./fetchJson";
const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export class HoursApi {
  static async getDailyHours(date) {
    const url = `${API_BASE_URL}/hours/${date}`;
    return await fetchJson(url, { headers }, {});
  }
}
