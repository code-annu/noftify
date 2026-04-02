import { z } from "zod";
import { ChannelType } from "./channel.types";

export const createChannelSchema = z.object({
  type: z.enum(ChannelType, {
    error: "Invalid channel type",
  }),
  name: z
    .string("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be at most 100 characters long"),
  provider: z.string("Provider is required"),
  configJson: z
    .object({
      host: z.string().optional(),
      port: z.number().optional(),
      auth: z
        .object({
          user: z.string(),
          pass: z.string(),
        })
        .optional(),
      from: z.string().optional(),
      sid: z.string().optional(),
      token: z.string().optional(),
    })
    .passthrough()
    .optional()
    .nullable(),
});

export const updateChannelSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be at most 100 characters long")
    .optional(),
  isEnabled: z.boolean().optional(),
  configJson: z.any().optional().nullable(),
});
