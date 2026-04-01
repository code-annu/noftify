import { z } from "zod";

export const createProfileSchema = z.object({
  firstName: z
    .string("First name is required")
    .min(3, "First name must be at least 3 characters long")
    .max(50, "First name must be at most 50 characters long"),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .max(50, "Last name must be at most 50 characters long")
    .optional(),
  companyName: z
    .string("Company name is required")
    .min(3, "Company name must be at least 3 characters long")
    .max(70, "Company name must be at most 70 characters long"),
});

export const updateProfileSchema = createProfileSchema.partial();

