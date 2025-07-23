"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as documentCalls from "@/lib/api/documentCalls";
import { toast } from "sonner";

const documentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  faculty_id: z.string().optional(),
  department_id: z.string().optional(),
  abstract: z.string().optional(),
  file_url: z.string().url().optional(),
  is_public: z.boolean().optional(),
  is_read_only: z.boolean().optional(),
  doi_link: z.string().url().optional(),
  status: z.string().optional(),
});

type DocumentFormValues = z.infer<typeof documentSchema>;

interface EditDocumentDialogProps {
  document: any;
  onSuccess?: (updated: any) => void;
  trigger?: React.ReactNode;
  asText?: boolean;
}

export default function EditDocumentDialog({
  document,
  onSuccess,
  trigger,
  asText,
}: EditDocumentDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      title: document.title || "",
      faculty_id: document.faculty_id || "",
      department_id: document.department_id || "",
      abstract: document.abstract || "",
      file_url: document.file_url || "",
      is_public: document.is_public ?? true,
      is_read_only: document.is_read_only ?? false,
      doi_link: document.doi_link || "",
      status: document.status || "",
    },
  });

  const { register, handleSubmit, formState, setValue, watch } = form;
  const { errors, isSubmitting } = formState;

  const mutation = useMutation({
    mutationFn: async (values: DocumentFormValues) => {
      return documentCalls.updateDocument(document.id, values);
    },
    onSuccess: (data) => {
      toast.success("Document updated successfully");
      setOpen(false);
      onSuccess?.(data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || "Failed to update document");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : asText ? (
        <DialogTrigger asChild>
          <span className="text-blue-600 hover:text-blue-800 cursor-pointer px-2 py-1">
            Edit
          </span>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="bg-white max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
          <DialogDescription>
            Update the document details below.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input {...register("title")} />
            {errors.title && (
              <p className="text-xs text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Faculty ID</label>
            <Input {...register("faculty_id")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Department ID
            </label>
            <Input {...register("department_id")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Abstract</label>
            <Input {...register("abstract")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">File URL</label>
            <Input {...register("file_url")} />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={watch("is_public")}
                onCheckedChange={(v) => setValue("is_public", !!v)}
              />
              <span>Public</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={watch("is_read_only")}
                onCheckedChange={(v) => setValue("is_read_only", !!v)}
              />
              <span>Read Only</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">DOI Link</label>
            <Input {...register("doi_link")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Input {...register("status")} />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
