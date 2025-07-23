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

// Define a schema for form validation using Zod
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormFields = z.infer<typeof formSchema>;

const supabase = createClient();

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>(
    {
      // defaultValues: {
      //   email: "myname@gmail.com",
      // },
      resolver: zodResolver(formSchema),
    }
  );

  const router = useRouter();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const { data: signInData, error } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      if (error || !signInData.user) {
        setError("root", { message: "Invalid email or password" });
        return;
      }

      // Get user metadata
      const user = signInData.user;
      const userTenantId = user.user_metadata?.tenant_id;
      const userRole = user.user_metadata?.role;
      const userName = user.user_metadata?.name;
      const affiliatedUni = useGeneralStore.getState().affiliatedUni;

      // Check if user belongs to the university
      if (userTenantId !== affiliatedUni?.tenantId) {
        await supabase.auth.signOut();
        useUserStore.getState().clearUser();
        setError("root", {
          message: "You are trying to log in to the wrong university.",
        });
        return;
      }

      // Store user info in Zustand
      useUserStore.getState().setUser({
        id: user.id,
        name: userName,
        role: userRole,
        tenantId: userTenantId,
        isAuthenticated: true,
      });

      // Redirect to university home page
      router.push(`/demo/${affiliatedUni?.subdomain}`);
    } catch (err) {
      setError("root", { message: "Login failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            IR
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            Sign in to your InRep Scholar account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@ur.ac.rw"
              // defaultValue="admin@ur.ac.rw"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              // defaultValue="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
          {errors.root && (
            <p className="text-red-500 text-sm mt-1">
              {errors.root.message}
            </p>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-500 text-center mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-600 text-center">Email: admin@ur.ac.rw</p>
          <p className="text-xs text-gray-600 text-center">Password: password</p>
        </div> */}

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
