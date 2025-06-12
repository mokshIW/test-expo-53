import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // Show header for main/root screens
        headerStyle: { backgroundColor: "#2563eb" }, // Tailwind blue-600
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    />
  );
}
