export const dynamic = "force-dynamic";
import { Suspense } from "react";
import DocumentDetailClient from "./DocumentDetailClient";
import DocumentSkeleton from "@/components/documents/DocumentSkeleton";

export default function DocumentDetailPage() {
  return (
    <Suspense fallback={<DocumentSkeleton />}>
      <DocumentDetailClient />
    </Suspense>
  );
}
