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
