import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore extends User {
  accessToken: string;
}

type Store = {
  user: UserStore | null;
  onAuthSuccess: ({ user }: { user: UserStore }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      onAuthSuccess: ({ user }) => set(() => ({ user })),
      clearAuth: () => set(() => ({ user: null })),
    }),
    {
      name: "Evaria",
      partialize: (state) => ({
        user: state.user
          ? {
              accessToken: state.user.accessToken,
            }
          : null,
      }),
    },
  ),
);
