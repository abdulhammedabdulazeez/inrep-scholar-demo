"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

const GeneralInformationSection: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const generalInfoErrors = errors?.general_information as any;

  return (
    <div className="bg-white rounded-lg shadow border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        General Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Repository Name
          </label>
          <Input
            {...register("repository_name")}
            placeholder="e.g. African Leadership University Repository"
          />
          {generalInfoErrors?.repository_name?.message && (
            <div className="text-red-600 text-sm mt-1">
              {generalInfoErrors.repository_name.message}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subdomain
          </label>
          <Input
            {...register("institution_code")}
            placeholder="e.g. UR"
            value={(watch("institution_code") || "").toUpperCase()}
            onChange={(e) => setValue("institution_code", e.target.value)}
          />
          {generalInfoErrors?.institution_code?.message && (
            <div className="text-red-600 text-sm mt-1">
              {generalInfoErrors.institution_code.message}
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Repository Description
          </label>
          <textarea
            {...register("repository_description")}
            rows={3}
            placeholder="The official institutional repository ..."
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {generalInfoErrors?.repository_description?.message && (
            <div className="text-red-600 text-sm mt-1">
              {generalInfoErrors.repository_description.message}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <Input
            type="email"
            {...register("contact_email")}
            placeholder="e.g. repository@ur.ac.rw"
          />
          {generalInfoErrors?.contact_email?.message && (
            <div className="text-red-600 text-sm mt-1">
              {generalInfoErrors.contact_email.message}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Language
          </label>
          <select
            {...register("primary_language")}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value="en"
            disabled
          >
            <option value="en">English</option>
            <option value="rw">Kinyarwanda</option>
            <option value="fr">French</option>
          </select>
          {generalInfoErrors?.primary_language?.message && (
            <div className="text-red-600 text-sm mt-1">
              {generalInfoErrors.primary_language.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInformationSection;
