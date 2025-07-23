import { z } from "zod";

export const settingsSchema = z.object({
  access_permission: z.object({
    access_level: z.string().min(1, "Access level is required"),
    allow_self_registration: z.boolean(),
    require_email_verification: z.boolean(),
    enable_doc_comments: z.boolean(),
  }),
  general_information: z.object({
    primary_language: z.string().min(1, "Primary language is required"),
  }),
  submission_policies: z.object({
    maximum_file_size: z.number().min(1),
    allowed_file_types: z.array(z.string()),
    plagiarism_threshold: z.number().min(0),
    required_num_of_reviewers: z.number().min(1),
    auto_assign_doi: z.boolean(),
    require_abstract: z.boolean(),
    enable_auto_abstract: z.boolean(),
  }),
  brand_and_appearance: z.object({
    logo: z.union([z.string(), z.instanceof(File)]).nullable(),
    favicon: z.union([z.string(), z.instanceof(File)]).nullable(),
    footer_text: z.string().nullable(),
    hero_text: z.string().nullable(),
    colors: z.object({
      primary_color: z.string().nullable(),
      secondary_color: z.string().nullable(),
    }),
  }),
  external_integration: z.object({
    doi_suffix: z.string().nullable(),
    allow_plagiarism_check: z.boolean(),
    allow_orcid_integration: z.boolean(),
    allow_google_scholar_indexing: z.boolean(),
  }),
  notifications: z.object({
    new_submission_alert: z.boolean(),
    weekly_reports: z.boolean(),
  }),
  registration_info: z.object({
    estimated_num_of_users: z.string(),
    expected_annual_uploads: z.string(),
  }),
  social_links: z.object({
    facebook: z.string().nullable(),
    x: z.string().nullable(),
    linkedin: z.string().nullable(),
  }),
});
