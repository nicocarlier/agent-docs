import { useAuth } from "@clerk/nextjs";

export const useAuthToken = () => {
  const { getToken } = useAuth();

  const getAuthToken = async (): Promise<string | null> => {
    try {
      const token = await getToken();
      return token;
    } catch (error) {
      console.error("Failed to get auth token:", error);
      return null;
    }
  };

  return { getAuthToken };
};
