/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
export async function fetchJson(
  url,
  options,
  onCancel,
  controller = new AbortController()
) {
  try {
    const { timeout = 10000 } = options;
    options.signal = controller.signal;
    const id = setTimeout(() => {
      controller.abort();
    }, timeout);
    const response = await fetch(url, options);
    clearTimeout(id);
    if (response.status === 429) {
      return Promise.reject({
        message: "Too many requests, please try again later.",
      });
    }
    if (response.status === 204) {
      return null;
    }
    if (response.status === 203) {
      return response;
    }
    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}
