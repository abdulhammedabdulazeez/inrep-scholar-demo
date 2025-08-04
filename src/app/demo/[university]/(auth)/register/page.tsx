"use client";

import { createClient } from "@/lib/supabase/client";
import { useGeneralStore } from "@/store/generalStore";
import { useUserStore } from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createUserProfile, UserProfileCreate } from "@/lib/api/userCalls";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

// Define a schema for form validation using Zod
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
});

type FormFields = z.infer<typeof formSchema>;

const supabase = createClient();

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const affiliatedUni = useGeneralStore((state) => state.affiliatedUni);
  const [showPassword, setShowPassword] = useState(false);

  // Mutation for creating user profile
  const createProfileMutation = useMutation({
    mutationFn: createUserProfile,
    onSuccess: async (data, variables) => {
      // Get the current session to get the user ID
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Store user info in Zustand
      useUserStore.getState().setUser({
        id: session?.user?.id || variables.email,
        name: `${variables.first_name} ${variables.last_name || ""}`.trim(),
        role: "regular",
        tenantId: affiliatedUni?.tenantId || "",
        isAuthenticated: true,
      });

      toast.success("Registration successful! Welcome to InRep Scholar.");
      router.push(`/demo/${affiliatedUni?.subdomain || "alu"}`);
    },
    onError: (error: any) => {
      console.error("Backend registration error:", error);
      console.error("Error response:", error.response?.data);

      if (error.response?.data?.detail) {
        setError("root", { message: error.response.data.detail });
      } else if (error.response?.data?.message) {
        setError("root", { message: error.response.data.message });
      } else if (error.message) {
        setError("root", { message: error.message });
      } else {
        setError("root", {
          message: "Failed to create user profile. Please try again.",
        });
      }
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("Affiliated university:", affiliatedUni);
    console.log("Tenant ID:", affiliatedUni?.tenantId);

    try {
      // Step 1: Create Supabase auth user
      const { data: signUpData, error: authError } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
          options: {
            data: { role: "regular" }, // Default role for new registrations
          },
        }
      );

      if (authError) {
        setError("root", { message: authError.message });
        return;
      }

      if (!signUpData.user) {
        setError("root", { message: "Registration failed. Please try again." });
        return;
      }

      // Step 2: Create user profile in backend using mutation
      if (!affiliatedUni?.tenantId) {
        setError("root", { message: "No tenant ID found. Please try again." });
        return;
      }

      const userProfileData: UserProfileCreate = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name || undefined,
        role: "regular", // Default role
        tenant_id: affiliatedUni.tenantId,
        faculty_id: undefined, // Can be set later
        department_id: undefined, // Can be set later
      };

      console.log("Creating user profile with data:", userProfileData);

      createProfileMutation.mutate(userProfileData);
    } catch (err: any) {
      console.error("Supabase registration error:", err);
      setError("root", { message: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            {affiliatedUni?.subdomain?.toUpperCase() || "ALU"}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">
            Join{" "}
            {affiliatedUni?.universityName || "African Leadership University"}{" "}
            on InRep Scholar
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                {...register("first_name")}
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                {...register("last_name")}
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Doe"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address *
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || createProfileMutation.isPending}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting || createProfileMutation.isPending
              ? "Creating account..."
              : "Create Account"}
          </button>

          {errors.root && (
            <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href={`/demo/${affiliatedUni?.subdomain || "alu"}/login`}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link
            href={`/demo/${affiliatedUni?.subdomain || "alu"}`}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
