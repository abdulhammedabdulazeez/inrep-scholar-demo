"use client";

import { useRef, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useGeneralStore } from "@/store/generalStore";
import { bulkImportDocuments } from "@/lib/api/documentCalls";

export default function BulkImportDialog({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tenantId = useGeneralStore((state) => state.affiliatedUni?.tenantId);

  const {
    mutate,
    error: mutationError,
    data: mutationData,
    reset,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (file: File) => {
      if (!tenantId) throw new Error("No tenant ID");
      return bulkImportDocuments(tenantId, file);
    },
    onSuccess: () => {
      reset(); // reset mutation state after showing success
      onSuccess?.();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleImport = () => {
    if (!file) return;
    mutate(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          Bulk Import
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Bulk Import Documents</DialogTitle>
          <DialogDescription>
            Upload a ZIP file containing a CSV file and document files.
            <br />
            <a
              href="/sample-documents-import.zip"
              download
              className="text-blue-600 underline text-sm"
            >
              Download sample ZIP
            </a>
          </DialogDescription>
        </DialogHeader>
        <Input
          ref={inputRef}
          type="file"
          accept=".zip" // Accept only .zip files
          onChange={handleFileChange}
          disabled={isPending}
        />
        {isError && (
          <div className="text-red-600 text-sm mt-2">
            {mutationError?.message || "Import failed"}
          </div>
        )}
        {isSuccess && (
          <div className="text-green-600 text-sm mt-2">
            Successfully imported {mutationData?.created} documents.
          </div>
        )}
        <DialogFooter>
          <Button
            onClick={handleImport}
            disabled={isPending || !file}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            {isPending ? "Importing..." : "Import"}
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
