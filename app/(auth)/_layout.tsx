import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hides header for all auth screens
        animation: "fade", // Smooth transition (optional)
      }}
    />
  );
}
