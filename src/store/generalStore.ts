import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AffiliatedUni = {
  tenantId: string;
  universityName: string;
  subdomain: string;
  description?: string;
  contactEmail?: string;
};

type GeneralStore = {
  affiliatedUni: AffiliatedUni | null;
  setAffiliatedUni: (uni: AffiliatedUni) => void;
  clearAffiliatedUni: () => void;
};

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      affiliatedUni: null,
      setAffiliatedUni: (uni) => set({ affiliatedUni: uni }),
      clearAffiliatedUni: () => set({ affiliatedUni: null }),
    }),
    {
      name: "general-store",
    }
  )
);
