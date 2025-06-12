import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AuthWelcomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold mb-4">Welcome!</Text>
      <Text className="text-lg text-gray-700 mb-8">
        Get started by signing in or creating an account.
      </Text>

      <TouchableOpacity
        className="w-56 py-3 bg-blue-600 rounded mb-4"
        onPress={() => router.push("/(auth)/sign-in")}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Sign In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-56 py-3 bg-green-600 rounded"
        onPress={() => router.push("/(auth)/sign-up")}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
