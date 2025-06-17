// contexts/UserContext.tsx
import api from "@/lib/api";
import { clearCredentials, getToken } from "@/lib/auth";
import { AuthenticatedUser } from "@/types/data";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";


type UserContextType = {
  user: AuthenticatedUser | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const [token, setToken] = useState<string | null>(null);

  // load the JWT once, on mount
  useEffect(() => {
    getToken().then((t) => {
      console.log("UserProvider got token:", t);
      setToken(t);
    });
  }, []);

  // now that we have token, fire /me
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<AuthenticatedUser, Error>({
    queryKey: ["me"],
    queryFn: () => api.get<AuthenticatedUser>("/me").then((r) => r.data),
    enabled: !!token, // only once token is non‐null
    retry: false, // don’t keep retrying on 401
  });

  // if the call errors (401 etc), clear creds
  useEffect(() => {
    if (error) {
      console.warn("me query failed, clearing credentials", error);
      clearCredentials();
    }
  }, [error]);

  // log on every user change
  useEffect(() => {
    console.log("UserProvider: user is now", user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        isError: Boolean(error),
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
