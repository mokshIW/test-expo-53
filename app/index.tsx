// app/index.tsx
import { getStoredCredentials, getToken, saveCredentials } from "@/lib/auth";
import { login as rawLogin } from "@/lib/auth-api";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) {
        router.replace("/(auth)/welcome");
        return;
      }

      const { username, password } = await getStoredCredentials();
      if (!username || !password) {
        router.replace("/(auth)/welcome");
        return;
      }

      try {
        const { token: freshToken } = await rawLogin({ username, password });
        await saveCredentials({ token: freshToken, username, password });
        router.replace("/(root)/home");
      } catch {
        router.replace("/(auth)/welcome");
      }
    })().finally(() => setLoading(false));
  }, []);

  // console.log( getToken());

  // while checking credentials
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
