const envBaseUrl = import.meta.env.VITE_API_URL?.trim();

const API_BASE_URL = envBaseUrl
  ? envBaseUrl.replace(/\/+$/, "")
  : window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "";

export const getApiUrl = (path) => {
  if (!path.startsWith("/")) {
    throw new Error(`API path must start with '/'. Received: ${path}`);
  }

  if (!API_BASE_URL) {
    throw new Error(
      "API base URL is missing. Set VITE_API_URL in frontend environment."
    );
  }

  return `${API_BASE_URL}${path}`;
};

