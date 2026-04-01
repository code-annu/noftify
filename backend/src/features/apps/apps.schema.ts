import { z } from "zod";

export const createAppSchema = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be at most 100 characters long"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters long")
    .optional(),
});

export const updateAppSchema = createAppSchema.partial();
