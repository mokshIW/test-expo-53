import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-3xl font-bold mb-4">Home Screen</Text>
      <Text className="mb-8">You are now signed in!</Text>
      <TouchableOpacity
        className="bg-red-500 px-6 py-3 rounded"
        onPress={() => router.replace("/(auth)/sign-in")}
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
