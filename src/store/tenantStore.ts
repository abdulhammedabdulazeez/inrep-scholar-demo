import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TenantInfo = {
  settings: Record<string, any>;
  statistics: Record<string, any>;
};

type TenantInfoState = {
  info: TenantInfo | null;
  setTenantInfo: (info: TenantInfo) => void;
  clearTenantInfo: () => void;
};

export const useTenantInfoStore = create<TenantInfoState>()(
  persist(
    (set) => ({
      info: null,
      setTenantInfo: (info) => set({ info }),
      clearTenantInfo: () => set({ info: null }),
    }),
    { name: "tenant-info-store" }
  )
);
