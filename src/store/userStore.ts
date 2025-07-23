// src/store/userStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserState = {
  id: string | null;
  name: string | null;
  role: string | null;
  tenantId: string | null;
  isAuthenticated: boolean;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: null,
      name: null,
      role: null,
      tenantId: null,
      isAuthenticated: false,
      setUser: (user) =>
        set((state) => ({ ...state, ...user, isAuthenticated: true })),
      clearUser: () =>
        set(() => ({
          id: null,
          name: null,
          role: null,
          tenantId: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: "user-store", // key in localStorage
    }
  )
);
