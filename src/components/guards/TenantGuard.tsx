"use client";

import { useGeneralStore } from "@/store/generalStore";
import { useUserStore } from "@/store/userStore";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { fetchUniversities } from "@/lib/api/tenantCalls";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/loading";

interface TenantGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function TenantGuard({ children, fallback }: TenantGuardProps) {
  const affiliatedUni = useGeneralStore((state) => state.affiliatedUni);
  const setAffiliatedUni = useGeneralStore((state) => state.setAffiliatedUni);
  const userTenantId = useUserStore((state) => state.tenantId);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const router = useRouter();
  const params = useParams();
  const university = params.university as string;

  // Fetch universities to find the one matching the URL or user's tenant
  const {
    data: universities = [],
    error: universitiesError,
    isLoading: universitiesLoading,
  } = useQuery({
    queryKey: ["universities"],
    queryFn: fetchUniversities,
    enabled: !affiliatedUni, // Only fetch if no tenant
  });

  useEffect(() => {
    console.log("TenantGuard Debug:", {
      university,
      affiliatedUni,
      userTenantId,
      isAuthenticated,
      universitiesCount: universities.length,
      universitiesError,
      universitiesLoading,
    });

    // Don't make any decisions while the API is still loading
    if (universitiesLoading) {
      console.log("Universities still loading, waiting...");
      return;
    }

    // If we have a university param but no affiliatedUni, try to set it
    if (university && !affiliatedUni) {
      // Find matching university in fetched universities
      const matchingUni = universities.find(
        (uni) => uni.subdomain.toLowerCase() === university.toLowerCase()
      );

      if (matchingUni) {
        console.log("Setting affiliated university from URL:", matchingUni);
        setAffiliatedUni(matchingUni);
      } else {
        console.log("No matching university found for subdomain:", university);
        console.log("Available universities:", universities);
        console.log("Universities error:", universitiesError);
        console.log("Universities loading:", universitiesLoading);

        // Only redirect if we have an error or if the API returned no results
        if (universitiesError || universities.length === 0) {
          console.log(
            "Redirecting to landing page due to API error or no universities"
          );
          router.push("/");
        } else {
          console.log("API returned universities but none match the subdomain");
          router.push("/");
        }
      }
    } else if (
      !university &&
      !affiliatedUni &&
      isAuthenticated &&
      userTenantId
    ) {
      // If no university param but user is authenticated, try to find their tenant
      const userUni = universities.find((uni) => uni.tenantId === userTenantId);

      if (userUni) {
        console.log(
          "Setting affiliated university from user's tenant:",
          userUni
        );
        setAffiliatedUni(userUni);
        // Redirect to user's university
        router.push(`/demo/${userUni.subdomain}`);
      } else {
        console.log(
          "No matching university found for user's tenant:",
          userTenantId
        );
        console.log("Available universities:", universities);
        router.push("/");
      }
    } else if (!university && !affiliatedUni && !isAuthenticated) {
      // If no university param and not authenticated, redirect to landing page
      console.log(
        "No affiliated university found, redirecting to landing page"
      );
      router.push("/");
    }
  }, [
    university,
    affiliatedUni,
    universities,
    setAffiliatedUni,
    router,
    userTenantId,
    isAuthenticated,
    universitiesError,
    universitiesLoading,
  ]);

  // Show fallback while loading or redirecting
  if (!affiliatedUni) {
    return (
      fallback || (
        <Loading
          university={university}
          error={
            universitiesError
              ? `Error loading universities: ${universitiesError.message}`
              : undefined
          }
        />
      )
    );
  }

  return <>{children}</>;
}
