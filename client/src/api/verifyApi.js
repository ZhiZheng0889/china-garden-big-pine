import { fetchJson } from "./fetchJson";
const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const headers = new Headers();
headers.append("Content-Type", "application/json");
// work in here

// create user
// read user
export class VerifyApi {
  static async verifyCaptchaToken(token) {
    const url = `${API_BASE_URL}/authentication/captcha/verify-token`;
    const options = {
      method: "POST",
      body: JSON.stringify({ data: { token } }),
      headers,
    };
    return await fetchJson(url, options, {});
  }

  static async sendVerifyToPhoneNumber(phoneNumber, countryCode) {
    const url = `${API_BASE_URL}/authentication/send`;
    const options = {
      method: "POST",
      body: JSON.stringify({ data: { phoneNumber, countryCode } }),
      headers,
    };
    return await fetchJson(url, options, {});
  }

  static async verifyPhoneNumber(request_id, code, user_id = null) {
    const url = `${API_BASE_URL}/authentication/verify`;
    const options = {
      method: "POST",
      body: JSON.stringify({ data: { request_id, code, user_id } }),
      headers,
    };
    return await fetchJson(url, options, {});
  }

  static async sendSMSPhoneNumber(phone_number) {
    const url = `${API_BASE_URL}/authentication/sms/send`;
    const options = {
      method: "POST",
      body: JSON.stringify({ data: { phone_number } }),
      headers,
    };
    return await fetchJson(url, options, {});
  }

  static async verifySMSPhoneNumber(request_id, code, user_id = null) {
    const url = `${API_BASE_URL}/authentication/sms/verify`;
    const options = {
      method: "POST",
      body: JSON.stringify({ data: { request_id, code, user_id } }),
      headers,
    };
    return await fetchJson(url, options, {});
  }
}
