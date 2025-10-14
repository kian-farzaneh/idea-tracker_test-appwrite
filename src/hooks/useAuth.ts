// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { account } from "../../lib/appwrite";
import { ID } from "appwrite";
import type { Models } from "appwrite";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [currentUser, setCurrentUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [currentSession, setCurrentSession] = useState<Models.Session | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const register = async (email: string, password: string): Promise<void> => {
    await account.create({
      userId: ID.unique(),
      email,
      password,
    });
    await login(email, password);
  };

  const login = async (email: string, password: string): Promise<void> => {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });
    setCurrentSession(session);

    const user = await account.get();
    setCurrentUser(user);

    router.push("/");
  };

  const logout = async (): Promise<void> => {
    await account.deleteSession({ sessionId: "current" });
    setCurrentSession(null);
    setCurrentUser(null);
    router.push("/");
  };

  const getCurrentUser = async () => {
    try {
      const user = await account.get();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return {
    currentUser,
    currentSession,
    loading,
    login,
    logout,
    register,
  };
}
