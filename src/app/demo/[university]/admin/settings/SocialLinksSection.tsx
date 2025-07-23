"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

const SocialLinksSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const socialErrors = errors?.social_links as any;

  return (
    <div className="bg-white rounded-lg shadow border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facebook
          </label>
          <Input
            {...register("social_links.facebook")}
            placeholder="Facebook URL"
          />
          {socialErrors?.facebook?.message && (
            <div className="text-red-600 text-sm mt-1">
              {socialErrors.facebook.message}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            X (Twitter)
          </label>
          <Input
            {...register("social_links.x")}
            placeholder="X (Twitter) URL"
          />
          {socialErrors?.x?.message && (
            <div className="text-red-600 text-sm mt-1">
              {socialErrors.x.message}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <Input
            {...register("social_links.linkedin")}
            placeholder="LinkedIn URL"
          />
          {socialErrors?.linkedin?.message && (
            <div className="text-red-600 text-sm mt-1">
              {socialErrors.linkedin.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLinksSection;
