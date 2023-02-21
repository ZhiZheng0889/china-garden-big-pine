import { fetchJson } from './fetchJson';
const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
const headers = new Headers();
headers.append('Content-Type', 'application/json');
// work in here

// create user
// read user
export class VerifyApi {
  static async sendVerifyToPhoneNumber(phone_number) {
    const url = `${API_BASE_URL}/authentication/send`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ data: { phone_number } }),
      headers,
    };
    return await fetchJson(url, options, {});
  }

  static async verifyPhoneNumber(phone_number, code, user_id = null) {
    const url = `${API_BASE_URL}/authentication/verify`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ data: { phone_number, code, user_id } }),
      headers,
    };
    return await fetchJson(url, options, {});
  }
}
