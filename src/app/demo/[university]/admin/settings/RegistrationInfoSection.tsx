"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

const RegistrationInfoSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const regErrors = errors?.registration_info as any;

  return (
    <div className="bg-white rounded-lg shadow border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Registration Info
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Number of Users
          </label>
          <select
            {...register("registration_info.estimated_num_of_users")}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            <option value="201-500">201-500</option>
            <option value="501-1000">501-1000</option>
            <option value="1001-5000">1001-5000</option>
            <option value=">5000">&gt;5000</option>
          </select>
          {regErrors?.estimated_num_of_users?.message && (
            <div className="text-red-600 text-sm mt-1">
              {regErrors.estimated_num_of_users.message}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Annual Uploads
          </label>
          <select
            {...register("registration_info.expected_annual_uploads")}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            <option value="201-500">201-500</option>
            <option value="501-1000">501-1000</option>
            <option value="1001-2000">1001-2000</option>
            <option value="2001-5000">2001-5000</option>
            <option value=">5000">&gt;5000</option>
          </select>
          {regErrors?.expected_annual_uploads?.message && (
            <div className="text-red-600 text-sm mt-1">
              {regErrors.expected_annual_uploads.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationInfoSection;
