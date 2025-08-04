import { useQuery } from "@tanstack/react-query";
import { useGeneralStore } from "@/store/generalStore";
import { searchDocuments, SearchFilters } from "@/lib/api/searchCalls";
import { DocumentListResponse } from "@/lib/documentTypes";

export function useDocumentSearch(filters: SearchFilters) {
  const tenantId = useGeneralStore((state) => state.affiliatedUni?.tenantId);

  return useQuery<DocumentListResponse>({
    queryKey: ["documents", "search", filters],
    queryFn: () => searchDocuments(tenantId!, filters),
    enabled: !!tenantId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
