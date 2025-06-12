import { login } from "@/lib/api"; // <-- update with your path
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Save the token, then redirect
      // For demo, we'll just alert and go home
      // Save to secure storage in real app!
      // Example: await SecureStore.setItemAsync('token', data.token);
      Alert.alert("Success", "Login successful!");
      router.replace("/(root)/home");
    },
    onError: (error: any) => {
      Alert.alert(
        "Login failed",
        error?.response?.data?.message || "Invalid credentials"
      );
    },
  });

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Sign In</Text>
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
      <View className="w-full mb-4">
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
        onPress={() => mutation.mutate({ username, password })}
        disabled={mutation.isPending}
      >
        <Text className="text-center text-white font-semibold">
          {mutation.isPending ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>
      <Text>
        Don't have an account?{" "}
        <Link href="/(auth)/sign-up" className="text-blue-600 font-bold">
          Sign Up
        </Link>
      </Text>
    </View>
  );
}
