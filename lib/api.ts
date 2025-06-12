import axios from "axios";

const API_URL = "https://medspark.iwwsite.com/api";

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const response = await axios.post(
    `${API_URL}/auth`,
    { username, password },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data; // Should contain your token
}
