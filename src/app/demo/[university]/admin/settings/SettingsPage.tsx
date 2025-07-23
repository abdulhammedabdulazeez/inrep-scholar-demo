"use client";
import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGeneralStore } from "@/store/generalStore";
import { fetchTenantInfo, updateTenantSettings } from "@/lib/api/tenantCalls";
import { z } from "zod";
import { settingsSchema } from "./settingsSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GeneralInformationSection from "./GeneralInformationSection";
import AccessPermissionSection from "./AccessPermissionSection";
import SubmissionPoliciesSection from "./SubmissionPoliciesSection";
import BrandAndAppearanceSection from "./BrandAndAppearanceSection";
import ExternalIntegrationSection from "./ExternalIntegrationSection";
import NotificationsSection from "./NotificationsSection";
import RegistrationInfoSection from "./RegistrationInfoSection";
import SocialLinksSection from "./SocialLinksSection";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const generalInfoSchema = z.object({
  repository_name: z.string(),
  institution_code: z.string(),
  repository_description: z.string(),
  contact_email: z.string(),
  primary_language: z.string(),
});

type GeneralInfoFormValues = z.infer<typeof generalInfoSchema>;
type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const tenantId = useGeneralStore((state) => state.affiliatedUni?.tenantId);
  const affiliatedUni = useGeneralStore((state) => state.affiliatedUni);

  const {
    data: tenantInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tenantInfo", tenantId],
    queryFn: () => fetchTenantInfo(tenantId as string),
    enabled: !!tenantId,
  });

  // console.log("tenantInfo", tenantInfo);

  const queryClient = useQueryClient();

  const updateSettingsMutation = useMutation({
    mutationFn: (data: SettingsFormValues) =>
      updateTenantSettings(tenantId as string, data),
    onSuccess: async (data) => {
      toast.success("Settings updated successfully!", {
        style: { background: "#22c55e", color: "white" },
        duration: 3000,
      });

      // Refetch settings from backend
      const newData = await queryClient.fetchQuery({
        queryKey: ["tenantInfo", tenantId],
        queryFn: () => fetchTenantInfo(tenantId as string),
      });

      // Reset the form with the latest backend values
      if (newData?.settings) {
        settingsForm.reset(newData.settings);
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update settings", {
        style: { background: "#ef4444", color: "white" },
      });
    },
  });

  // General Info Form uses affiliatedUni from general store
  const generalInfo = affiliatedUni
    ? {
        repository_name: affiliatedUni.universityName,
        institution_code: affiliatedUni.subdomain,
        repository_description: affiliatedUni.description || "",
        contact_email: affiliatedUni.contactEmail || "",
        primary_language: "English",
      }
    : undefined;
  const generalInfoForm = useForm<GeneralInfoFormValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: generalInfo,
    mode: "onChange",
  });
  // Subscribe to value changes to force re-render for isDirty
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const watchedGeneralInfo = generalInfoForm.watch();

  useEffect(() => {
    if (affiliatedUni) {
      generalInfoForm.reset({
        repository_name: affiliatedUni.universityName,
        institution_code: affiliatedUni.subdomain,
        repository_description: affiliatedUni.description || "",
        contact_email: affiliatedUni.contactEmail || "",
        primary_language: "English",
      });
    }
  }, [affiliatedUni]);

  // Settings Form
  const settings = tenantInfo?.settings;
  const settingsForm = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings
      ? {
          ...settings,
          brand_and_appearance: {
            ...settings.brand_and_appearance,
            colors: {
              primary_color:
                settings.brand_and_appearance?.colors?.primary_color ||
                "#2563eb",
              secondary_color:
                settings.brand_and_appearance?.colors?.secondary_color ||
                "#059669",
            },
          },
        }
      : undefined,
    mode: "onChange",
  });
  // Subscribe to value changes to force re-render for isDirty
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const watchedSettings = settingsForm.watch();

  useEffect(() => {
    if (tenantInfo?.settings) {
      const s = tenantInfo.settings;
      settingsForm.reset({
        ...s,
        brand_and_appearance: {
          ...s.brand_and_appearance,
          logo:
            typeof s.brand_and_appearance.logo === "string"
              ? s.brand_and_appearance.logo
              : null,
          favicon:
            typeof s.brand_and_appearance.favicon === "string"
              ? s.brand_and_appearance.favicon
              : null,
          colors: {
            primary_color:
              s.brand_and_appearance?.colors?.primary_color || "#2563eb",
            secondary_color:
              s.brand_and_appearance?.colors?.secondary_color || "#059669",
          },
        },
      });
    }
  }, [tenantInfo?.settings]);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-gray-500">Loading settings...</div>
    );
  }
  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load settings: {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Repository Settings
        </h1>
        <p className="text-gray-600">
          Configure repository policies, branding, and integrations
        </p>
      </div>
      {/* General Information Form */}
      <FormProvider {...generalInfoForm}>
        <form
          className="space-y-6 mb-8"
          onSubmit={generalInfoForm.handleSubmit((data) => {
            console.log("Save General Info", data);
          })}
        >
          <GeneralInformationSection />
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => generalInfoForm.reset(generalInfo)}
              disabled={!generalInfoForm.formState.isDirty}
            >
              Reset General Info
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={
                !generalInfoForm.formState.isDirty ||
                generalInfoForm.formState.isSubmitting
              }
            >
              {generalInfoForm.formState.isSubmitting
                ? "Saving..."
                : "Save General Info"}
            </Button>
          </div>
        </form>
      </FormProvider>
      {/* Other Settings Form */}
      <FormProvider {...settingsForm}>
        <form
          className="space-y-6"
          onSubmit={settingsForm.handleSubmit((data) => {
            updateSettingsMutation.mutate(data);
          })}
        >
          <AccessPermissionSection />
          <SubmissionPoliciesSection />
          <BrandAndAppearanceSection />
          <ExternalIntegrationSection />
          <NotificationsSection />
          <RegistrationInfoSection />
          <SocialLinksSection />
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => settingsForm.reset(settings)}
              disabled={!settingsForm.formState.isDirty}
            >
              Reset Settings
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={
                !settingsForm.formState.isDirty ||
                updateSettingsMutation.isPending
              }
            >
              {updateSettingsMutation.isPending ? "Saving..." : "Save Settings"}
            </Button>
          </div>
          {updateSettingsMutation.isError && updateSettingsMutation.error && (
            <div className="text-red-600 text-sm mt-2">
              {String(
                updateSettingsMutation.error?.message ||
                  "Failed to save settings"
              )}
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
