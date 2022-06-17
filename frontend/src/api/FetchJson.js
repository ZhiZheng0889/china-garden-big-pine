const headers = new Headers();
headers.append('Content-Type', 'application/json');

export async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);
    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();
    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}
