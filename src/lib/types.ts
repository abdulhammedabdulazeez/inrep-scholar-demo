import { z } from "zod";



export const fullSchema = z.object({
  university_name: z
    .string()
    .min(3, "University name must be at least 3 characters"),
  contact_name: z.string().min(2, "Contact name must be at least 2 characters"),
  admin_email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone_number: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  subdomain: z.string().min(3, "Subdomain must be at least 3 characters"),
  description: z.string().optional(),
  estimated_num_of_users: z.string().optional(),
  expected_annual_uploads: z.string().optional(),
  logo: z.instanceof(File).optional().nullable(),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms"),
});

export type RegisterUniFormFields = z.infer<typeof fullSchema>;