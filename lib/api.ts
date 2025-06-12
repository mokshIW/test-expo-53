import { login as _login } from "@/lib/auth-api"; // your raw login fn
import axios from "axios";
import { getStoredCredentials, getToken, saveCredentials } from "./auth";

const API_URL = "https://medspark.iwwsite.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── 1) inject token into every request ───────────────────────────
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── 2) on 401, try to re‐login once and retry ──────────────────────
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const { username, password } = await getStoredCredentials();

      if (username && password) {
        // re‐login
        const { token } = await _login({
          username,
          password,
        });

        // save new token (and creds, if you want)
        await saveCredentials({
          token,
          username,
          password,
        });

        // inject and retry
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
