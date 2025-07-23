"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCreateUser } from "@/lib/api/userCalls";
import { useForm } from "react-hook-form";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "reviewer", label: "Reviewer" },
  { value: "regular", label: "Regular" },
];

type CreateUserFormValues = {
  email: string;
  first_name: string;
  last_name?: string;
  role: string;
  faculty_id?: string;
  department_id?: string;
};

const defaultValues: CreateUserFormValues = {
  email: "",
  first_name: "",
  last_name: "",
  role: "regular",
  faculty_id: "",
  department_id: "",
};

const CreateUserDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [apiError, setApiError] = React.useState("");
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormValues>({ defaultValues });

  const createMutation = useMutation({
    mutationFn: adminCreateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      reset();
      setApiError("");
    },
    onError: (err: any) => {
      setApiError(err?.response?.data?.detail || "Failed to create user");
    },
  });

  const onSubmit = (data: CreateUserFormValues) => {
    setApiError("");
    createMutation.mutate({
      ...data,
      faculty_id: data.faculty_id || undefined,
      department_id: data.department_id || undefined,
    });
  };

  return (
    <>
      <Button
        className="bg-green-600 text-white hover:bg-green-700"
        onClick={() => setOpen(true)}
      >
        + Create User
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new user account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              disabled={isSubmitting || createMutation.isPending}
            />
            {errors.email && (
              <div className="text-red-600 text-sm">{errors.email.message}</div>
            )}
            <Input
              {...register("first_name", {
                required: "First name is required",
              })}
              type="text"
              placeholder="First Name"
              disabled={isSubmitting || createMutation.isPending}
            />
            {errors.first_name && (
              <div className="text-red-600 text-sm">
                {errors.first_name.message}
              </div>
            )}
            <Input
              {...register("last_name")}
              type="text"
              placeholder="Last Name (optional)"
              disabled={isSubmitting || createMutation.isPending}
            />
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting || createMutation.isPending}
            >
              {roleOptions.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <div className="text-red-600 text-sm">{errors.role.message}</div>
            )}
            <Input
              {...register("faculty_id")}
              type="text"
              placeholder="Faculty ID (optional)"
              disabled={isSubmitting || createMutation.isPending}
            />
            <Input
              {...register("department_id")}
              type="text"
              placeholder="Department ID (optional)"
              disabled={isSubmitting || createMutation.isPending}
            />
            {apiError && <div className="text-red-600 text-sm">{apiError}</div>}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                type="button"
                disabled={isSubmitting || createMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 text-white hover:bg-green-700"
                disabled={isSubmitting || createMutation.isPending}
              >
                {isSubmitting || createMutation.isPending
                  ? "Creating..."
                  : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateUserDialog;
