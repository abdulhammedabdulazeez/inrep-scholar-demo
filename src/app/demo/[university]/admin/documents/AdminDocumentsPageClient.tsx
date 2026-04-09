"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGeneralStore } from "@/store/generalStore";
import { fetchTenantDocumentsList } from "@/lib/api/documentCalls";
import { DataTable } from "@/components/dashboard/TableComponent";
import { documentColumns } from "@/components/dashboard/DocumentsColumns";
import BulkActionsBar from "@/components/dashboard/BulkActionsBar";
import BulkImportDialog from "./BulkImportDialog";
import BulkExportDialog from "./BulkExportDialog";

const PAGE_SIZE = 20;

export default function AdminDocumentsPageClient() {
  const tenantId = useGeneralStore((state) => state.affiliatedUni?.tenantId);
  const [page, setPage] = useState(1);
  const [selectedDocuments, setSelectedDocumentsRaw] = useState<string[]>([]);
  const setSelectedDocuments = useCallback((ids: string[]) => {
    setSelectedDocumentsRaw((prev) => {
      if (prev.length === ids.length && prev.every((v, i) => v === ids[i])) {
        return prev;
      }
      return ids;
    });
  }, []);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["tenantDocuments", tenantId, page, PAGE_SIZE],
    queryFn: () =>
      fetchTenantDocumentsList(tenantId!, page, PAGE_SIZE),
    enabled: !!tenantId,
  });

  const documents = data?.results ?? [];
  const total = data?.total ?? 0;
  const pages = data?.pages ?? 1;

  if (!tenantId) {
    return (
      <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-900">
        Select a university context to load documents.
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
        Failed to load documents. Check that the backend is reachable and you are
        signed in if required.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Document Management
          </h1>
          <p className="text-gray-600">
            Manage all repository documents and metadata
          </p>
        </div>
        <div className="flex space-x-3">
          <BulkExportDialog />
          <BulkImportDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-lg border bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Documents
              </p>
              <p className="text-2xl font-bold text-gray-900">{total}</p>
            </div>
            <div className="text-2xl">📄</div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">
                {
                  documents.filter((d) => d.document.status === "published")
                    .length
                }
              </p>
              <p className="text-xs text-gray-500">On this page</p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-blue-600">
                {
                  documents.filter((d) => d.document.status === "under_review")
                    .length
                }
              </p>
              <p className="text-xs text-gray-500">On this page</p>
            </div>
            <div className="text-2xl">👁️</div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Actions
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {
                  documents.filter((d) => d.document.status !== "published")
                    .length
                }
              </p>
              <p className="text-xs text-gray-500">On this page</p>
            </div>
            <div className="text-2xl">⏳</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10">
        {isLoading ? (
          <p className="text-gray-600">Loading documents…</p>
        ) : (
          <DataTable
            columns={documentColumns}
            data={documents}
            onSelectionChange={setSelectedDocuments}
            getRowId={(row) => row.document.document_id}
            showSelection={true}
          />
        )}
        <BulkActionsBar
          selectedDocuments={selectedDocuments}
          onSelectionChange={setSelectedDocuments}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          {total === 0 ? (
            "No documents"
          ) : (
            <>
              Showing {(page - 1) * PAGE_SIZE + 1} to{" "}
              {Math.min(page * PAGE_SIZE, total)} of {total} documents
              {isFetching ? " (updating…)" : ""}
            </>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            disabled={page <= 1 || isLoading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="flex items-center px-2 text-sm text-gray-600">
            Page {page} of {Math.max(1, pages)}
          </span>
          <button
            type="button"
            disabled={page >= pages || isLoading}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
