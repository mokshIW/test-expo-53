import api from "./api";

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  // this talks directly to /auth
  const { data } = await api.post("/auth", {
    username,
    password,
  });
  // data should be { token: '…' }
  return data;
}

export async function register({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const { data } = await api.post("/auth/register", {
    username,
    password,
  });
  // data === { token: string, user: { id, username } }
  return data;
}
