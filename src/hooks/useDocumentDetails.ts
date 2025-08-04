import { useQuery } from "@tanstack/react-query";
import { fetchDocumentDetails } from "@/lib/api/documentCalls";

export function useDocumentDetails(documentId: string) {
  return useQuery({
    queryKey: ["document", documentId],
    queryFn: () => fetchDocumentDetails(documentId),
    enabled: !!documentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
