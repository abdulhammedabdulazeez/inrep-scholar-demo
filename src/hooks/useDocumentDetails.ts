import { useQuery } from "@tanstack/react-query";
import { fetchDocumentDetails } from "@/lib/api/documentCalls";

export function useDocumentDetails(documentId: string | undefined) {
  return useQuery({
    queryKey: ["documentDetails", documentId],
    queryFn: () => fetchDocumentDetails(documentId!),
    enabled: !!documentId,
  });
}
