"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import * as documentCalls from "@/lib/api/documentCalls";
import { toast } from "sonner";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@/lib/supabase/client";

interface BulkActionsBarProps {
  selectedDocuments: string[];
  onSelectionChange: (documentIds: string[]) => void;
}

interface Collection {
  id: string;
  name: string;
  description?: string;
}

export default function BulkActionsBar({
  selectedDocuments,
  onSelectionChange,
}: BulkActionsBarProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAccessDialogOpen, setIsAccessDialogOpen] = useState(false);
  const [isCollectionsDialogOpen, setIsCollectionsDialogOpen] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState<string>("");
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useUserStore((state) => state);
  const tenantId = user?.tenantId;
  // No token needed here
  const queryClient = useQueryClient();

  // Mock collections data - replace with actual API call
  const collections: Collection[] = [
    { id: "1", name: "Computer Science", description: "CS related documents" },
    { id: "2", name: "Engineering", description: "Engineering documents" },
    { id: "3", name: "Research Papers", description: "Research publications" },
  ];

  const accessOptions = [
    {
      value: "open",
      label: "Open Access",
      description: "Anyone can view and download the document.",
    },
    {
      value: "restricted",
      label: "Restricted",
      description: "Anyone can view the document, but no one can download it.",
    },
    {
      value: "private",
      label: "Private",
      description:
        "Only authenticated users can view the document; no one can download it.",
    },
  ];

  // Bulk Delete Mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: async (documentIds: string[]) => {
      if (!tenantId) throw new Error("No tenant ID");
      return documentCalls.bulkDeleteDocuments(tenantId, documentIds);
    },
    onSuccess: (data) => {
      toast.success(`Successfully deleted ${data.deleted} documents`);
      onSelectionChange([]);
      queryClient.invalidateQueries({ queryKey: ["tenantDocuments"] });
    },
    onError: (error) => {
      toast.error("Failed to delete documents");
      console.error("Bulk delete error:", error);
    },
  });

  // Bulk Access Update Mutation
  const bulkAccessMutation = useMutation({
    mutationFn: async ({
      documentIds,
      access,
    }: {
      documentIds: string[];
      access: string;
    }) => {
      if (!tenantId) throw new Error("No tenant ID");
      return documentCalls.bulkUpdateDocumentAccess(
        tenantId,
        documentIds,
        access
      );
    },
    onSuccess: (data) => {
      toast.success(
        `Successfully updated access for ${data.updated} documents`
      );
      onSelectionChange([]);
      queryClient.invalidateQueries({ queryKey: ["tenantDocuments"] });
    },
    onError: (error) => {
      toast.error("Failed to update document access");
      console.error("Bulk access update error:", error);
    },
  });

  // Bulk Assign Collections Mutation
  const bulkCollectionsMutation = useMutation({
    mutationFn: async ({
      documentIds,
      collectionIds,
    }: {
      documentIds: string[];
      collectionIds: string[];
    }) => {
      if (!tenantId) throw new Error("No tenant ID");
      return documentCalls.bulkAssignDocumentsToCollections(
        tenantId,
        documentIds,
        collectionIds
      );
    },
    onSuccess: (data) => {
      toast.success(
        `Successfully assigned ${data.assigned} documents to collections`
      );
      onSelectionChange([]);
      queryClient.invalidateQueries({ queryKey: ["tenantDocuments"] });
    },
    onError: (error) => {
      toast.error("Failed to assign documents to collections");
      console.error("Bulk collections assignment error:", error);
    },
  });

  const handleBulkDelete = async () => {
    if (selectedDocuments.length === 0) return;

    setIsLoading(true);
    try {
      await bulkDeleteMutation.mutateAsync(selectedDocuments);
      setIsDeleteDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkAccessUpdate = async () => {
    if (selectedDocuments.length === 0 || !selectedAccess) return;

    setIsLoading(true);
    try {
      await bulkAccessMutation.mutateAsync({
        documentIds: selectedDocuments,
        access: selectedAccess,
      });
      setIsAccessDialogOpen(false);
      setSelectedAccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkAssignCollections = async () => {
    if (selectedDocuments.length === 0 || selectedCollections.length === 0)
      return;

    setIsLoading(true);
    try {
      await bulkCollectionsMutation.mutateAsync({
        documentIds: selectedDocuments,
        collectionIds: selectedCollections,
      });
      setIsCollectionsDialogOpen(false);
      setSelectedCollections([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCollectionToggle = (collectionId: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  if (selectedDocuments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow border p-4">
        <div className="text-sm text-gray-600">
          Select documents above to perform bulk actions
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {selectedDocuments.length} document(s) selected
        </div>
        <div className="flex space-x-3">
          {/* Bulk Delete */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                variant="outline"
                size="sm"
              >
                Bulk Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Confirm Bulk Delete</DialogTitle>
                <DialogDescription>
                  <span className="inline-flex items-center gap-2">
                    <span className="text-red-600 font-bold">
                      {selectedDocuments.length}
                    </span>{" "}
                    document(s) will be deleted.
                  </span>
                  <br />
                  This action{" "}
                  <span className="font-bold text-red-600">
                    cannot be undone
                  </span>
                  .
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  variant="destructive"
                  onClick={handleBulkDelete}
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Bulk Access Update */}
          <Dialog
            open={isAccessDialogOpen}
            onOpenChange={setIsAccessDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                variant="outline"
                size="sm"
              >
                Change Access
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Update Document Access</DialogTitle>
                <DialogDescription>
                  <span className="inline-flex items-center gap-2">
                    <span className="text-blue-600 font-bold">
                      {selectedDocuments.length}
                    </span>{" "}
                    document(s) will be updated.
                  </span>
                  <br />
                  Select the new access level below:
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <fieldset>
                  <legend className="text-sm font-medium mb-2">
                    Access Level
                  </legend>
                  <div className="flex flex-col gap-2">
                    {accessOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-2 rounded-md border cursor-pointer transition-colors
                          ${
                            selectedAccess === option.value
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-300 bg-white hover:bg-gray-50"
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="access"
                          value={option.value}
                          checked={selectedAccess === option.value}
                          onChange={() => setSelectedAccess(option.value)}
                          className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs text-gray-500">
                            {option.description}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAccessDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleBulkAccessUpdate}
                  disabled={isLoading || !selectedAccess}
                >
                  {isLoading ? "Updating..." : "Update Access"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Bulk Assign Collections */}
          <Dialog
            open={isCollectionsDialogOpen}
            onOpenChange={setIsCollectionsDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                variant="outline"
                size="sm"
              >
                Assign Collections
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Assign to Collections</DialogTitle>
                <DialogDescription>
                  <span className="inline-flex items-center gap-2">
                    <span className="text-green-600 font-bold">
                      {selectedDocuments.length}
                    </span>{" "}
                    document(s) will be assigned.
                  </span>
                  <br />
                  Select collections below:
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  {collections.map((collection) => (
                    <div
                      key={collection.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={collection.id}
                        checked={selectedCollections.includes(collection.id)}
                        onCheckedChange={() =>
                          handleCollectionToggle(collection.id)
                        }
                      />
                      <label
                        htmlFor={collection.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <div className="font-medium">{collection.name}</div>
                        {collection.description && (
                          <div className="text-sm text-gray-500">
                            {collection.description}
                          </div>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCollectionsDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleBulkAssignCollections}
                  disabled={isLoading || selectedCollections.length === 0}
                >
                  {isLoading ? "Assigning..." : "Assign to Collections"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
