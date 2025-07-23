"use client";

import { useGeneralStore } from "@/store/generalStore";
import { useQuery } from "@tanstack/react-query";
import { fetchTenantDocuments } from "@/lib/api/documentCalls";
import { DataTable } from "@/components/dashboard/TableComponent";
import { documentColumns } from "@/components/dashboard/DocumentsColumns";
import BulkActionsBar from "@/components/dashboard/BulkActionsBar";
import { useState, useCallback } from "react";

export default function AdminDocumentsTableClient() {
  const tenantId = useGeneralStore((state) => state.affiliatedUni?.tenantId);
  const [selectedDocuments, setSelectedDocumentsRaw] = useState<string[]>([]);
  const setSelectedDocuments = useCallback((ids: string[]) => {
    setSelectedDocumentsRaw((prev) => {
      // Only update if the value actually changed
      if (prev.length === ids.length && prev.every((v, i) => v === ids[i])) {
        return prev;
      }
      return ids;
    });
  }, []);

  const {
    data: documents = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tenantDocuments", tenantId],
    queryFn: () => fetchTenantDocuments(tenantId!),
    enabled: !!tenantId,
  });

  console.log("Documents:", documents);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={documentColumns}
        data={documents}
        onSelectionChange={setSelectedDocuments}
        getRowId={(row) => row.id}
        showSelection={true}
      />
      {/* <BulkActionsBar
        selectedDocuments={selectedDocuments}
        onSelectionChange={setSelectedDocuments}
      /> */}
    </div>
  );
}
