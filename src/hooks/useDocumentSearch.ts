import { useQuery } from "@tanstack/react-query";
import {
  searchDocuments,
  type SearchFilters,
} from "@/lib/api/searchCalls";

export function useDocumentSearch(
  tenantId: string | undefined,
  filters: SearchFilters
) {
  return useQuery({
    queryKey: ["documentSearch", tenantId, filters],
    queryFn: () => searchDocuments(tenantId!, filters),
    enabled: !!tenantId,
  });
}
