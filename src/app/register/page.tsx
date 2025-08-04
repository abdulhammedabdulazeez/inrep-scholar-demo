"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fullSchema, RegisterUniFormFields } from "@/lib/types";
import {
  handleFileChange,
  handleSubdomainChange,
  handleUniversityNameChange,
  takenSubdomains,
} from "@/lib/tenantRegUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  registerTenant,
  TenantDataWithoutPassword,
} from "@/lib/api/tenantCalls";
import { createClient } from "@/lib/supabase/client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const supabase = createClient();

export default function TenantRegistrationPage() {
  const [step, setStep] = useState(1);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(
    null
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // const queryClient = useQueryClient();

  const methods = useForm<RegisterUniFormFields>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      university_name: "",
      contact_name: "",
      admin_email: "",
      password: "",
      phone_number: "",
      country: "",
      subdomain: "",
      description: "",
      estimated_num_of_users: "",
      expected_annual_uploads: "",
      logo: null,
      termsAccepted: false,
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  // Watch fields for dynamic logic
  const universityName = watch("university_name");
  const subdomain = watch("subdomain");

  // Check subdomain availability (mock)
  async function checkSubdomainAvailability(sub: string) {
    if (sub.length < 3) {
      setSubdomainAvailable(null);
      return;
    }
    setSubdomainAvailable(null); // show "checking"
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubdomainAvailable(!takenSubdomains.includes(sub.toLowerCase()));
  }

  // Step navigation
  const nextStep = () => setStep((s) => Math.min(s + 1, 2));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // useMutation
  const mutation = useMutation({
    mutationFn: ({
      tenantData,
      accessToken,
    }: {
      tenantData: TenantDataWithoutPassword;
      accessToken: string;
    }) => registerTenant(tenantData, accessToken),
    onError: async (error: any) => {
      console.error("🚨 Mutation error:", error);

      if (axios.isAxiosError(error)) {
        console.error("📊 Error details:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });

        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          `Request failed with status ${error.response?.status}`;
        setError("root", { message: errorMessage });
      } else {
        // Sign out and clear Supabase session if backend registration fails
        // await supabase.auth.signOut();
        setError("root", { message: "An unexpected error occurred" });
      }
    },
    onSuccess: (data) => {
      console.log("🎊 Backend registration successful:", data);
      setStep(3);
    },
  });

  // Final submit
  const onSubmit = async (tenantData: RegisterUniFormFields) => {
    console.log("🏁 Starting form submission with:", tenantData);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: tenantData.admin_email,
        password: tenantData.password,
        options: {
          data: { role: "admin" },
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.session) {
        throw new Error("No session returned. Please try again.");
      }

      const accessToken = authData.session.access_token;

      const { password, ...tenantDataWithoutPassword } = tenantData;

      console.log("📤 Calling backend with data:", tenantDataWithoutPassword);

      await mutation.mutateAsync({
        tenantData: tenantDataWithoutPassword,
        accessToken,
      });

      console.log("🎉 Registration completed successfully!");
    } catch (error) {
      console.error("💥 Registration failed:", error);
      if (error instanceof Error) {
        setError("root", { message: error.message });
      } else {
        setError("root", { message: "An unknown error occurred" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                IR
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  InRep Scholar
                </h1>
                <p className="text-sm text-gray-500">University Registration</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                ← Back to Home
              </Link>
              <Link
                href="/demo/alu"
                className="text-blue-600 hover:text-blue-800"
              >
                View Demo
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {step < 3 && (
          <>
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-8">
                <div
                  className={`flex items-center space-x-2 ${
                    step >= 1 ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 1 ? "bg-blue-600 text-white" : "bg-gray-300"
                    }`}
                  >
                    1
                  </div>
                  <span className="font-medium">University Details</span>
                </div>
                <div
                  className={`w-16 h-1 ${
                    step >= 2 ? "bg-blue-600" : "bg-gray-300"
                  } rounded`}
                />
                <div
                  className={`flex items-center space-x-2 ${
                    step >= 2 ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 2 ? "bg-blue-600 text-white" : "bg-gray-300"
                    }`}
                  >
                    2
                  </div>
                  <span className="font-medium">Configuration</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg border p-8">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Step 1: University Details */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                          Register Your University
                        </h2>
                        <p className="text-gray-600 mt-2">
                          Join leading African universities using InRep Scholar
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            University Name *
                          </label>
                          <input
                            type="text"
                            {...register("university_name")}
                            onChange={(e) =>
                              handleUniversityNameChange(
                                e,
                                checkSubdomainAvailability,
                                setValue
                              )
                            }
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="African Leadership University"
                            required
                          />
                          {errors.university_name && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.university_name.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            {...register("admin_email")}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="library@ur.ac.rw"
                            required
                          />
                          {errors.admin_email && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.admin_email.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password *
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              {...register("password")}
                              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                              placeholder="Your password"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeSlashIcon
                                  className="h-5 w-5"
                                  aria-label="Hide password"
                                />
                              ) : (
                                <EyeIcon
                                  className="h-5 w-5"
                                  aria-label="Show password"
                                />
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.password?.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Person *
                          </label>
                          <input
                            type="text"
                            {...register("contact_name")}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Dr. Sarah Kagame"
                            required
                          />
                          {errors.contact_name && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.contact_name.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            {...register("phone_number")}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="+250 788 123 456"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country *
                          </label>
                          <select
                            {...register("country")}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Select country</option>
                            <option value="rwanda">Rwanda</option>
                            <option value="kenya">Kenya</option>
                            <option value="uganda">Uganda</option>
                            <option value="tanzania">Tanzania</option>
                            <option value="south-africa">South Africa</option>
                            <option value="ghana">Ghana</option>
                            <option value="nigeria">Nigeria</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.country && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.country.message}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Repository Subdomain *
                          </label>
                          <div className="flex items-center">
                            <input
                              type="text"
                              {...register("subdomain")}
                              value={subdomain}
                              onChange={(e) =>
                                handleSubdomainChange(
                                  e,
                                  checkSubdomainAvailability,
                                  setValue
                                )
                              }
                              className="flex-1 border border-gray-300 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="ur"
                              required
                            />
                            <span className="bg-gray-100 border border-l-0 border-gray-300 px-3 py-2 rounded-r-md text-gray-600">
                              .inrepscholar.com
                            </span>
                          </div>
                          {subdomain && (
                            <div className="mt-2">
                              {subdomainAvailable === null &&
                                subdomain.length >= 3 && (
                                  <p className="text-sm text-gray-500">
                                    Checking availability...
                                  </p>
                                )}
                              {subdomainAvailable === true && (
                                <p className="text-sm text-green-600">
                                  ✓ Available: {subdomain}.inrepscholar.com
                                </p>
                              )}
                              {subdomainAvailable === false && (
                                <p className="text-sm text-red-600">
                                  ✗ Not available. Please try another subdomain.
                                </p>
                              )}
                            </div>
                          )}
                          {errors.subdomain && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.subdomain.message}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            University Description
                          </label>
                          <textarea
                            {...register("description")}
                            rows={4}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Brief description of your university and research focus areas..."
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={
                            !universityName ||
                            !methods.getValues("admin_email") ||
                            !methods.getValues("country") ||
                            !subdomain ||
                            subdomainAvailable !== true
                          }
                          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continue to Configuration
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Step 2: Configuration */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                          Repository Configuration
                        </h2>
                        <p className="text-gray-600 mt-2">
                          Help us set up your repository
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Number of Users
                          </label>
                          <select
                            {...register("estimated_num_of_users")}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select range</option>
                            <option value="1-50">1 - 50 users</option>
                            <option value="51-200">51 - 200 users</option>
                            <option value="201-500">201 - 500 users</option>
                            <option value="501-1000">501 - 1,000 users</option>
                            <option value="1000+">1,000+ users</option>
                          </select>
                          {errors.estimated_num_of_users && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.estimated_num_of_users.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expected Annual Document Uploads
                          </label>
                          <select
                            {...register("expected_annual_uploads")}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select range</option>
                            <option value="1-100">1 - 100 documents</option>
                            <option value="101-500">101 - 500 documents</option>
                            <option value="501-1000">
                              501 - 1,000 documents
                            </option>
                            <option value="1001-2000">
                              1,001 - 2,000 documents
                            </option>
                            <option value="2000+">2,000+ documents</option>
                          </select>
                          {errors.expected_annual_uploads && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.expected_annual_uploads.message}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            University Logo
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <div className="text-2xl text-gray-400 mb-2">
                              🏛️
                            </div>
                            <p className="text-gray-600 mb-2">
                              Upload your university logo
                            </p>
                            <p className="text-sm text-gray-500">
                              PNG, JPG up to 2MB (optional)
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, setValue)}
                              className="mt-4"
                            />
                            {methods.getValues("logo") && (
                              <p className="text-sm text-green-600 mt-2">
                                ✓ {methods.getValues("logo")?.name}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              {...register("termsAccepted")}
                              className="w-4 h-4 text-blue-600"
                              defaultChecked={false}
                              required
                            />
                            <label className="text-sm text-gray-700">
                              I agree to the{" "}
                              <Link
                                href="/terms"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link
                                href="/privacy-policy"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Privacy Policy
                              </Link>
                            </label>
                          </div>
                          {errors.termsAccepted && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.termsAccepted.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Submission Error */}
                      {errors.root && (
                        <p className="text-red-600 text-sm mt-2">
                          {errors.root.message}
                        </p>
                      )}

                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={
                            !methods.getValues("termsAccepted") || isSubmitting
                          }
                          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting
                            ? "Submitting..."
                            : "Register University"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </FormProvider>
            </div>
          </>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg border p-8">
              <div className="text-6xl text-green-600 mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Registration Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for registering {methods.getValues("university_name")}
                . We've received your application and will review it shortly.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What happens next:
                </h3>
                <ul className="text-sm text-gray-700 space-y-1 text-left">
                  <li>
                    ✓ Email verification sent to{" "}
                    {methods.getValues("admin_email")}
                  </li>
                  <li>
                    ✓ Application under review (typically 1-2 business days)
                  </li>
                  <li>
                    ✓ Repository setup at {methods.getValues("subdomain")}
                    .inrepscholar.com
                  </li>
                  <li>✓ Admin account creation and training materials</li>
                </ul>
              </div>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
                >
                  Back to Home
                </Link>
                <Link
                  href="/demo/alu"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition"
                >
                  Explore Demo Repository
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
