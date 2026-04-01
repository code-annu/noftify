import { z } from "zod";

export const addAppUsersSchema = z.object({
  appUsers: z.array(
    z.object({
      externalId: z.string("externalId is required"),
      email: z.email("Enter valid email").optional(),
      phone: z.string().optional(),
      fullname: z
        .string("fullname is required")
        .min(3, "fullname must be at least 3 characters")
        .max(100, "fullname must be at most 100 characters"),
    }),
  ),
});

export const updateAppUserSchema = z.object({
  email: z.email("Enter valid email").optional(),
  phone: z.string().optional(),
  fullname: z
    .string()
    .min(3, "fullname must be at least 3 characters")
    .max(100, "fullname must be at most 100 characters")
    .optional(),
});
