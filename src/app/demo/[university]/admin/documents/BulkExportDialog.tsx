"use client";

import { useMutation } from "@tanstack/react-query";
import { useGeneralStore } from "@/store/generalStore";
import { exportDocuments } from "@/lib/api/documentCalls";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BulkExportDialog({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const tenantId = useGeneralStore((state) => state.affiliatedUni?.tenantId);

  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error: mutationError,
  } = useMutation({
    mutationFn: async () => {
      if (!tenantId) throw new Error("No tenant ID");
      return exportDocuments(tenantId);
    },
    onSuccess: (blob) => {
      // Create download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `documents-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      onSuccess?.();
    },
  });

  const handleExport = () => {
    mutate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Bulk Export
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Export Documents</DialogTitle>
          <DialogDescription>
            Export all documents for this repository as a CSV file.
          </DialogDescription>
        </DialogHeader>

        {isError && (
          <div className="text-red-600 text-sm mt-2">
            {mutationError?.message || "Export failed"}
          </div>
        )}

        {isSuccess && (
          <div className="text-green-600 text-sm mt-2">
            Export completed successfully!
          </div>
        )}

        <DialogFooter>
          <Button
            onClick={handleExport}
            disabled={isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isPending ? "Exporting..." : "Export CSV"}
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
