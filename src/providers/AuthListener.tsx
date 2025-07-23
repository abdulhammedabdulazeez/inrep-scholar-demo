// src/app/providers/AuthListener.tsx
"use client";
import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { createClient } from "@/lib/supabase/client";
import { useGeneralStore } from "@/store/generalStore";

const supabase = createClient();

export default function AuthListener({ children }: { children: ReactNode }) {
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        useUserStore.getState().clearUser();
        useGeneralStore.getState().clearAffiliatedUni();
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);
  return children;
}
