import api from "./api";
import { getStoredCredentials, saveCredentials } from "./auth";
import { login as rawLogin } from "./auth-api";

export function setupRetryInterceptor() {
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config;
      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;

        const { username, password } = await getStoredCredentials();
        if (username && password) {
          // re‐login
          const { token } = await rawLogin({ username, password });

          // save new token (and creds, if you want)
          await saveCredentials({ token, username, password });

          // retry original request with new token
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        }
      }
      return Promise.reject(error);
    }
  );
}
