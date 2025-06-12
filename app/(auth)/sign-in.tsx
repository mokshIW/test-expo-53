import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Sign In</Text>
      <View className="w-full mb-4">
        <Text className="text-base font-semibold mb-1 text-gray-700">
          Email
        </Text>
        <TextInput
          placeholder="Email"
          className="w-full border p-3 rounded"
          keyboardType="email-address"
          autoCapitalize="none"
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
        />
      </View>
      <TouchableOpacity
        className="bg-blue-600 w-full py-3 rounded mb-4"
        onPress={() => router.replace("/(root)/home")}
      >
        <Text className="text-center text-white font-semibold">Sign In</Text>
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
