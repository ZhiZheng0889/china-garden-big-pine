import { fetchJson } from "./fetchJson";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export class OrderApi {
  static async create(order) {
    const url = `${API_BASE_URL}/orders`;
    const options = {
      method: "POST",
      body: JSON.stringify({ data: order }),
      headers,
    };
    return await fetchJson(url, options, {});
  }

  static async listOrders(user_id) {
    const url = new URL(`${API_BASE_URL}/orders/${user_id}`);
    return await fetchJson(url, { headers }, []);
  }

  static async read(order_id) {
    const url = `${API_BASE_URL}/orders/${order_id}`;
    return await fetchJson(url, { headers }, []);
  }

  static async listUserOrders(user_id) {
    const url = `${API_BASE_URL}/orders/user/${user_id}`;
    return await fetchJson(url, { headers }, []);
  }
}
