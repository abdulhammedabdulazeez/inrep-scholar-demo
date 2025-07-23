"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

const doiProviders = [
  { value: "datacite", label: "DataCite" },
  { value: "crossref", label: "Crossref" },
  { value: "disabled", label: "Disabled" },
];
const plagiarismServices = [
  { value: "turnitin", label: "Turnitin" },
  { value: "ithenticate", label: "iThenticate" },
  { value: "disabled", label: "Disabled" },
];

const ExternalIntegrationSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const extErrors = errors?.external_integration as any;

  return (
    <div className="bg-white rounded-lg shadow border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        External Integrations
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DOI Suffix */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              DOI Suffix
            </label>
            <Input
              type="text"
              {...register("external_integration.doi_suffix")}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 10.1234/uni"
            />
            {extErrors?.doi_suffix?.message && (
              <div className="text-red-600 text-sm mt-1">
                {extErrors.doi_suffix.message}
              </div>
            )}
          </div>
          {/* Allow Plagiarism Check */}
          <div className="flex items-center justify-between mt-6 md:mt-0">
            <div>
              <p className="font-medium text-gray-900">
                Allow Plagiarism Check
              </p>
              <p className="text-sm text-gray-600">
                Enable plagiarism checking for submissions
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("external_integration.allow_plagiarism_check")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>
        {/* ORCID, Google Scholar remain unchanged */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">ORCID Integration</p>
              <p className="text-sm text-gray-600">
                Allow users to connect ORCID profiles
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("external_integration.allow_orcid_integration")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Google Scholar Indexing
              </p>
              <p className="text-sm text-gray-600">
                Enable Google Scholar to index repository content
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register(
                  "external_integration.allow_google_scholar_indexing"
                )}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalIntegrationSection;
