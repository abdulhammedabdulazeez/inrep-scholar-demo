"use client";
import React, { useRef, useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const BrandAndAppearanceSection: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const brandErrors = errors?.brand_and_appearance as any;
  const colorErrors = brandErrors?.colors as any;
  const logo = watch("brand_and_appearance.logo");
  const favicon = watch("brand_and_appearance.favicon");

  // Local state for file previews
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  // Refs for file inputs
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  // Helper to get image preview URL
  const getImagePreview = useCallback(
    (value: string | File | null): string | null => {
      if (!value) return null;
      if (typeof value === "string") return value;
      if (value instanceof File) return URL.createObjectURL(value);
      return null;
    },
    []
  );

  // Handle logo file upload
  const handleLogoUpload = useCallback(
    (file: File | null) => {
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setLogoPreview(previewUrl);
        setValue("brand_and_appearance.logo", file, { shouldDirty: true });
      } else {
        setLogoPreview(null);
        setValue("brand_and_appearance.logo", null, { shouldDirty: true });
      }
    },
    [setValue]
  );

  // Handle favicon file upload
  const handleFaviconUpload = useCallback(
    (file: File | null) => {
      if (file) {
        console.log("file", file);
        const previewUrl = URL.createObjectURL(file);
        setFaviconPreview(previewUrl);
        setValue("brand_and_appearance.favicon", file, { shouldDirty: true });
      } else {
        setFaviconPreview(null);
        setValue("brand_and_appearance.favicon", null, { shouldDirty: true });
      }
    },
    [setValue]
  );

  // Clear logo
  const clearLogo = useCallback(() => {
    setLogoPreview(null);
    setValue("brand_and_appearance.logo", null, { shouldDirty: true });
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  }, [setValue]);

  // Clear favicon
  const clearFavicon = useCallback(() => {
    setFaviconPreview(null);
    setValue("brand_and_appearance.favicon", null, { shouldDirty: true });
    if (faviconInputRef.current) {
      faviconInputRef.current.value = "";
    }
  }, [setValue]);

  // Update previews when form values change (e.g., after backend response)
  React.useEffect(() => {
    const logoUrl = getImagePreview(logo);
    const faviconUrl = getImagePreview(favicon);

    setLogoPreview(logoUrl);
    setFaviconPreview(faviconUrl);
  }, [logo, favicon, getImagePreview]);

  return (
    <div className="bg-white rounded-lg shadow border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Branding & Appearance
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <Input
                type="color"
                {...register("brand_and_appearance.colors.primary_color")}
                className="h-10 w-20 border border-gray-300 rounded-md"
              />
              <Input
                type="text"
                {...register("brand_and_appearance.colors.primary_color")}
                className="flex-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#2563eb"
              />
            </div>
            {colorErrors?.primary_color?.message && (
              <div className="text-red-600 text-sm mt-1">
                {colorErrors.primary_color.message}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center space-x-3">
              <Input
                type="color"
                {...register("brand_and_appearance.colors.secondary_color")}
                className="h-10 w-20 border border-gray-300 rounded-md"
              />
              <Input
                type="text"
                {...register("brand_and_appearance.colors.secondary_color")}
                className="flex-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#059669"
              />
            </div>
            {colorErrors?.secondary_color?.message && (
              <div className="text-red-600 text-sm mt-1">
                {colorErrors.secondary_color.message}
              </div>
            )}
          </div>
        </div>

        {/* Favicon Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Favicon Upload
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex flex-col items-center">
            {faviconPreview ? (
              <div className="mb-4">
                <Image
                  src={faviconPreview}
                  alt="Favicon Preview"
                  width={100}
                  height={100}
                  className="mx-auto rounded shadow"
                />
                <button
                  type="button"
                  className="mt-2 text-red-600 text-xs underline"
                  onClick={clearFavicon}
                >
                  Remove Favicon
                </button>
              </div>
            ) : (
              <div className="text-gray-400 mb-2 text-2xl">🌐</div>
            )}
            <p className="text-gray-600 mb-2">Upload your favicon</p>
            <p className="text-sm text-gray-500">ICO, PNG, JPG up to 512KB</p>
            <input
              type="file"
              accept="image/x-icon,image/png,image/jpeg"
              className="mt-4"
              ref={faviconInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleFaviconUpload(file);
              }}
            />
            {brandErrors?.favicon?.message && (
              <div className="text-red-600 text-sm mt-1">
                {brandErrors.favicon.message}
              </div>
            )}
          </div>
        </div>

        {/* Hero Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Text
          </label>
          <textarea
            {...register("brand_and_appearance.hero_text")}
            rows={2}
            placeholder="Welcome to our Institutional Repository!"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {brandErrors?.hero_text?.message && (
            <div className="text-red-600 text-sm mt-1">
              {brandErrors.hero_text.message}
            </div>
          )}
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo Upload
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex flex-col items-center">
            {logoPreview ? (
              <div className="mb-4">
                <div style={{ position: "relative", width: 220, height: 220 }}>
                  <Image
                    src={logoPreview}
                    alt="Logo Preview"
                    fill
                    style={{ objectFit: "contain" }}
                    className="mx-auto rounded shadow"
                  />
                </div>
                <button
                  type="button"
                  className="mt-2 text-red-600 text-xs underline"
                  onClick={clearLogo}
                >
                  Remove Logo
                </button>
              </div>
            ) : (
              <div className="text-gray-400 mb-2 text-2xl">🏛️</div>
            )}
            <p className="text-gray-600 mb-2">Upload your institution logo</p>
            <p className="text-sm text-gray-500">PNG, JPG up to 2MB</p>
            <input
              type="file"
              accept="image/*"
              className="mt-4"
              ref={logoInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleLogoUpload(file);
              }}
            />
            {brandErrors?.logo?.message && (
              <div className="text-red-600 text-sm mt-1">
                {brandErrors.logo.message}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Footer Text
          </label>
          <textarea
            {...register("brand_and_appearance.footer_text")}
            rows={2}
            placeholder="© 2024 African Leadership University. All rights reserved."
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {brandErrors?.footer_text?.message && (
            <div className="text-red-600 text-sm mt-1">
              {brandErrors.footer_text.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandAndAppearanceSection;
