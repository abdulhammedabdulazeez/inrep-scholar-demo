import { useQuery } from "@tanstack/react-query";
import { mockGetDocumentDetails } from "@/lib/mockData/documentDetailMockData";
import { DocumentDetail } from "@/lib/documentTypes";

export function useMockDocumentDetails(documentId: string) {
  return useQuery<DocumentDetail | null>({
    queryKey: ["mockDocument", documentId],
    queryFn: () => {
      // Simulate API delay
      return new Promise<DocumentDetail | null>((resolve) => {
        setTimeout(() => {
          resolve(mockGetDocumentDetails(documentId));
        }, 300); // 300ms delay to simulate network request
      });
    },
    enabled: !!documentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
