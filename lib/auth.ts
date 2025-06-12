import * as SecureStore from "expo-secure-store";

export const TOKEN_KEY = "token";
export const USERNAME_KEY = "username";
export const PASSWORD_KEY = "password";

export async function saveCredentials({
  token,
  username,
  password,
}: {
  token: string;
  username: string;
  password: string;
}) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(USERNAME_KEY, username);
  await SecureStore.setItemAsync(PASSWORD_KEY, password);
}

// clears stored credentials & token
export async function clearCredentials() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USERNAME_KEY);
  await SecureStore.deleteItemAsync(PASSWORD_KEY);
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function getStoredCredentials(): Promise<{
  username: string | null;
  password: string | null;
}> {
  const username = await SecureStore.getItemAsync(USERNAME_KEY);
  const password = await SecureStore.getItemAsync(PASSWORD_KEY);
  return { username, password };
}

/**
 * Sign the user out:
 * - Clears stored token/credentials
 * - Redirects to the Sign In screen
 */
export async function signOut(router: { replace: (...args: any[]) => void }) {
  await clearCredentials();
  router.replace("/(auth)/sign-in");
}
