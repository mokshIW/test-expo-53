import { useUser } from "@/contexts/UserContext";
import { getToken, signOut } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { user, isLoading, isError } = useUser();
  const queryClient = useQueryClient();

  console.log("HomeScreen user:", user);

  const [token, setToken] = useState<string | null>(null);

  // on mount, fetch and log the token
  useEffect(() => {
    getToken().then((t) => {
      console.log("token:", t);
      setToken(t);
    });
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-3xl font-bold mb-4">Home Screen</Text>
      <Text className="mb-8">You are now signed in!</Text>

      {/* User info section */}
      {isLoading ? (
        <ActivityIndicator />
      ) : isError || !user ? (
        <Text style={{ color: "red" }}>Error loading user info</Text>
      ) : (
        <>
          <Text>Username: {user.username}</Text>
          <Text>User ID: {user.id}</Text>
          <Text>Badges Earned: {user.userBadges?.length ?? 0}</Text>
          {user.userBadges?.map((userBadge) => (
            <View key={userBadge.id} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: "bold" }}>
                Badge: {userBadge.badgeId.title}
              </Text>
              <Text>
                Description:{" "}
                {userBadge.badgeId.description.replace(/<[^>]+>/g, "")}
              </Text>
              <Text>Earned: {userBadge.earnedCount} times</Text>
              <Text>On: {userBadge.earnedAt}</Text>
              {/* You can show the badge image too: */}
              {/* <Image source={{ uri: userBadge.badgeId.badgeImage }} style={{ width: 50, height: 50 }} /> */}
            </View>
          ))}
        </>
      )}

      <TouchableOpacity
        className="bg-purple-500 px-6 py-3 rounded"
        onPress={() => router.push("/badges" as any)}
      >
        <Text className="text-white font-semibold">Badges Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-red-500 px-6 py-3 rounded"
        onPress={() => signOut(router, queryClient)}
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
