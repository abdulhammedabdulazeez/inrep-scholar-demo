import { UseFormSetValue } from "react-hook-form";
import { RegisterUniFormFields } from "./types";

export function generateSubdomain(universityName: string) {
  return universityName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "")
    .replace(/university|of|the/g, "")
    .slice(0, 15);
}

export const takenSubdomains = [
  "harvard",
  "mit",
  "stanford",
  "oxford",
  "cambridge",
];

// Suggest subdomain when universityName changes
export const handleUniversityNameChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  checkSubdomainAvailability: (subdomain: string) => void,
  setValue: UseFormSetValue<RegisterUniFormFields>
) => {
  const name = e.target.value;
  setValue("university_name", name);
  if (name.length >= 3) {
    const suggested = generateSubdomain(name);
    setValue("subdomain", suggested);
    checkSubdomainAvailability(suggested);
  }
};

// When subdomain input changes
export const handleSubdomainChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  checkSubdomainAvailability: (subdomain: string) => void,
  setValue: UseFormSetValue<RegisterUniFormFields>
) => {
  const sub = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "");
  setValue("subdomain", sub);
  checkSubdomainAvailability(sub);
};

// File upload
export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<RegisterUniFormFields>
) => {
  const file = e.target.files?.[0] || null;
  setValue("logo", file);
};
