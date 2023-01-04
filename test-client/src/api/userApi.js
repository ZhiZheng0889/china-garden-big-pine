import { fetchJson } from './fetchJson';
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const headers = new Headers();
headers.append('Content-Type', 'application/json');
// work in here

// create user
// read user
export class UserApi {
  static async signup(user, signal) {
    const url = `${API_BASE_URL}/users`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ data: user }),
      headers,
      signal,
      credentials: 'include',
    };
    return await fetchJson(url, options, {});
  }

  static async login(login, signal) {
    const url = `${API_BASE_URL}/users/login`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ data: login }),
      headers,
      signal,
      credentials: 'include',
    };
    return await fetchJson(url, options, {});
  }
  static async logout(logout, signal) {
    const url = `${API_BASE_URL}/users/logout`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ data: logout }),
      headers,
      signal,
      credentials: 'include',
    };
    return await fetchJson(url, options, {});
  }

  static async deleteUser(user, signal) {
    const url = `${API_BASE_URL}/users`;
    const options = {
      method: 'DELETE',
      body: JSON.stringify({ data: user }),
      headers,
      signal,
      credentials: 'include',
    };
    return await fetchJson(url, options, {});
  }

  static async loginToken(refreshToken, signal) {
    const url = `${API_BASE_URL}/users/login/token`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ data: refreshToken }),
      headers,
      signal,
      credentials: 'include',
    };
    return await fetchJson(url, options, {});
  }
}
