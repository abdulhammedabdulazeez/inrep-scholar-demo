"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

const fileTypes = ["pdf", "docx", "doc"];

const SubmissionPoliciesSection: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const submissionErrors = errors?.submission_policies as any;
  const selectedTypes = watch("submission_policies.allowed_file_types") || [];

  const handleFileTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setValue(
        "submission_policies.allowed_file_types",
        selectedTypes.filter((t: string) => t !== type),
        { shouldDirty: true }
      );
    } else {
      setValue(
        "submission_policies.allowed_file_types",
        [...selectedTypes, type],
        { shouldDirty: true }
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Submission Policies
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum File Size (MB)
            </label>
            <Input
              type="number"
              {...register("submission_policies.maximum_file_size", {
                valueAsNumber: true,
              })}
              min={1}
            />
            {submissionErrors?.maximum_file_size?.message && (
              <div className="text-red-600 text-sm mt-1">
                {submissionErrors.maximum_file_size.message}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allowed File Types
            </label>
            <div className="flex gap-4">
              {fileTypes.map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleFileTypeChange(type)}
                  />
                  {type.toUpperCase()}
                </label>
              ))}
            </div>
            {submissionErrors?.allowed_file_types?.message && (
              <div className="text-red-600 text-sm mt-1">
                {submissionErrors.allowed_file_types.message}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plagiarism Threshold (%)
            </label>
            <Input
              type="number"
              {...register("submission_policies.plagiarism_threshold", {
                valueAsNumber: true,
              })}
              min={0}
            />
            {submissionErrors?.plagiarism_threshold?.message && (
              <div className="text-red-600 text-sm mt-1">
                {submissionErrors.plagiarism_threshold.message}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Reviewers
            </label>
            <Input
              type="number"
              {...register("submission_policies.required_num_of_reviewers", {
                valueAsNumber: true,
              })}
              min={1}
            />
            {submissionErrors?.required_num_of_reviewers?.message && (
              <div className="text-red-600 text-sm mt-1">
                {submissionErrors.required_num_of_reviewers.message}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-assign DOI</p>
              <p className="text-sm text-gray-600">
                Automatically assign DOI after approval
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("submission_policies.auto_assign_doi")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Require Abstract</p>
              <p className="text-sm text-gray-600">
                Abstract is mandatory for submissions
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("submission_policies.require_abstract")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Enable Auto Abstract Extraction
              </p>
              <p className="text-sm text-gray-600">
                Automatically extract abstracts from uploaded documents
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("submission_policies.enable_auto_abstract")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPoliciesSection;
