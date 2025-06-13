import { saveCredentials } from "@/lib/auth";
import { register } from "@/lib/auth-api";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => register({ username, password }),
    onSuccess: async ({ token }) => {
      // persist token + creds
      await saveCredentials({ token, username, password });
      // navigate into the app
      router.replace("/(root)/home");
    },
    onError: (err: any) => {
      Alert.alert(
        "Registration failed",
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Something went wrong"
      );

      console.error("Registration error:", err);
    },
  });

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Sign Up</Text>

      {/* Email */}
      <View className="w-full mb-4">
        <Text className="text-base font-semibold mb-1 text-gray-700">
          Email
        </Text>
        <TextInput
          placeholder="you@example.com"
          className="w-full border p-3 rounded"
          keyboardType="email-address"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Password */}
      <View className="w-full mb-6">
        <Text className="text-base font-semibold mb-1 text-gray-700">
          Password
        </Text>
        <TextInput
          placeholder="••••••••"
          className="w-full border p-3 rounded"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        className="bg-green-600 w-full py-3 rounded mb-4"
        onPress={() => mutate()}
        disabled={isPending}
      >
        <Text className="text-center text-white font-semibold">
          {isPending ? "Signing Up…" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      {/* Link to Sign In */}
      <Text>
        Already have an account?{" "}
        <Link href="/(auth)/sign-in">
          <Text className="text-green-700 font-bold">Sign In</Text>
        </Link>
      </Text>
    </View>
  );
}
