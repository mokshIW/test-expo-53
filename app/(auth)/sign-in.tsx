import { saveCredentials } from "@/lib/auth";
import { login } from "@/lib/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: async (data) => {
      await saveCredentials({
        token: data.token,
        username,
        password,
      });
      router.replace("/(root)/home");
    },
    onError: (err: any) => {
      Alert.alert(
        "Login failed",
        err?.response?.data?.message ?? "Invalid credentials"
      );
    },
  });

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Sign In</Text>

      {/* Username Field */}
      <View className="w-full mb-4">
        <Text className="text-base font-semibold mb-1 text-gray-700">
          Username
        </Text>
        <TextInput
          placeholder="Username"
          className="w-full border p-3 rounded"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Password Field */}
      <View className="w-full mb-6">
        <Text className="text-base font-semibold mb-1 text-gray-700">
          Password
        </Text>
        <TextInput
          placeholder="Password"
          className="w-full border p-3 rounded"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        className="bg-blue-600 w-full py-3 rounded mb-4"
        onPress={() => mutate()}
        disabled={isPending}
      >
        <Text className="text-center text-white font-semibold">
          {isPending ? "Signing In…" : "Sign In"}
        </Text>
      </TouchableOpacity>

      <Text>
        Don't have an account?{" "}
        <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
          <Text className="text-blue-600 font-bold">Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}
