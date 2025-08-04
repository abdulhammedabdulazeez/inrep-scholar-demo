import { useQuery } from "@tanstack/react-query";
import { mockSearchDocuments } from "@/lib/mockData/searchMockData";
import { DocumentListResponse } from "@/lib/documentTypes";
import { SearchFilters } from "@/lib/api/searchCalls";

export function useMockDocumentSearch(filters: SearchFilters) {
  return useQuery<DocumentListResponse>({
    queryKey: ["mockDocuments", "search", filters],
    queryFn: () => {
      // Simulate API delay
      return new Promise<DocumentListResponse>((resolve) => {
        setTimeout(() => {
          resolve(mockSearchDocuments(filters));
        }, 500); // 500ms delay to simulate network request
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
