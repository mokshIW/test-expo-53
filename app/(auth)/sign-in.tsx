import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Sign In</Text>
      <TextInput
        placeholder="Email"
        className="w-full border p-3 mb-4 rounded"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        className="w-full border p-3 mb-4 rounded"
        secureTextEntry
      />
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
