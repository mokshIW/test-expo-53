// app/(root)/badges.tsx
import { useUser } from "@/contexts/UserContext";
import api from "@/lib/api";
import { Badge } from "@/types/data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 2) GET /badges
async function fetchBadges(): Promise<Badge[]> {
  const { data } = await api.get<Badge[]>("/badges");
  return data;
}

// 3) POST /users/{userId}/badges
async function awardBadge(payload: {
  userId: number;
  badgeId: number;
}): Promise<{ id: number; badge: string; total_count: number }> {
  const { userId, badgeId } = payload;
  const { data } = await api.post<{
    id: number;
    badge: string;
    total_count: number;
  }>(`/users/${userId}/badges`, { badgeId });
  return data;
}

export default function BadgesScreen() {
  const qc = useQueryClient();
  const { user, isLoading: isUserLoading } = useUser();

  // fetch all badges
  const {
    data: badges,
    isLoading: isBadgesLoading,
    isError: badgesError,
  } = useQuery<Badge[], Error>({
    queryKey: ["badges"],
    queryFn: fetchBadges,
  });

  const { mutate, status: mutationStatus } = useMutation<
    { id: number; badge: string; total_count: number },
    Error,
    { userId: number; badgeId: number }
  >({
    mutationFn: awardBadge,
    onSuccess: () => {
      Alert.alert("Success!", "Badge added to your account 🎉");
      qc.invalidateQueries({ queryKey: ["me"] });
      // qc.invalidateQueries(["my-badges"]);
    },
    onError: (err) => {
      Alert.alert("Oops", err.message);
    },
  });

  const isMutating = mutationStatus === "pending";

  // Wait until both user and badges are loaded
  if (isUserLoading || isBadgesLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (!user || !user.id) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>User not loaded. Please sign in again.</Text>
      </View>
    );
  }

  if (badgesError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Failed to load badges</Text>
      </View>
    );
  }

  return (
    <FlatList<Badge>
      data={badges ?? []}
      keyExtractor={(b) => b.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View className="mb-3 p-4 bg-gray-100 rounded">
          <Text className="text-lg font-semibold mb-2">{item.title}</Text>
          <TouchableOpacity
            className="bg-blue-600 px-3 py-1 rounded"
            onPress={() => mutate({ userId: user.id, badgeId: item.id })}
            disabled={isMutating}
          >
            <Text className="text-white">
              {isMutating ? "Adding…" : "Earn this badge"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
