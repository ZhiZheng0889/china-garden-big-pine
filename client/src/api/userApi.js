import { fetchJson } from "./fetchJson";
const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export class UserApi {
  static async signup(user, controller) {
    const url = `${API_BASE_URL}/users`;
    const options = {
      method: "POST",
      body: JSON.stringify({ data: user }),
      headers,
      credentials: "include",
    };
    return await fetchJson(url, options, {}, controller);
  }

  static async login(login, controller) {
    const url = `${API_BASE_URL}/users/login`;
    const options = {
      method: "POST",
      body: JSON.stringify({ data: login }),
      headers,

      credentials: "include",
    };
    return await fetchJson(url, options, {}, controller);
  }
  static async logout(logout, controller) {
    const url = `${API_BASE_URL}/users/logout`;
    const options = {
      method: "POST",
      body: JSON.stringify({ data: logout }),
      headers,
      credentials: "include",
    };
    return await fetchJson(url, options, {}, controller);
  }

  static async deleteUser(user, controller) {
    const url = `${API_BASE_URL}/users`;
    const options = {
      method: "DELETE",
      body: JSON.stringify({ data: user }),
      headers,
      credentials: "include",
    };
    return await fetchJson(url, options, {}, controller);
  }

  static async loginToken(refreshToken, controller) {
    const url = `${API_BASE_URL}/users/login/token`;
    const options = {
      method: "POST",
      body: JSON.stringify({ data: { refreshToken } }),
      headers,
      credentials: "include",
    };
    return await fetchJson(url, options, {}, controller);
  }
}
