"use client";
import { useFormContext, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";

const accessLevels = [
  { value: "open_access", label: "Open Access" },
  { value: "restricted", label: "Restricted" },
  { value: "private", label: "Private" },
];
const guestAccessOptions = [
  { value: "enabled", label: "Enabled" },
  { value: "disabled", label: "Disabled" },
];

const AccessPermissionSection: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const accessPermissionErrors = errors?.access_permission as
    | FieldErrors
    | undefined;
  const accessLevelError = accessPermissionErrors?.access_level as
    | { message?: string }
    | undefined;

  return (
    <div className="bg-white rounded-lg shadow border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Access & Permissions
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Access Level
            </label>
            <select
              {...register("access_permission.access_level", {
                required: true,
              })}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {accessLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            {typeof accessLevelError?.message === "string" && (
              <div className="text-red-600 text-sm mt-1">
                {accessLevelError.message}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Allow Self-Registration
              </p>
              <p className="text-sm text-gray-600">
                Users can create accounts without admin approval
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("access_permission.allow_self_registration")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Require Email Verification
              </p>
              <p className="text-sm text-gray-600">
                New users must verify their email address
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("access_permission.require_email_verification")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Enable Document Comments
              </p>
              <p className="text-sm text-gray-600">
                Allow users to comment on documents
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("access_permission.enable_doc_comments")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessPermissionSection;
