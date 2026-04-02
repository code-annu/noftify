import dotenv from "dotenv";

dotenv.config();

console.log("ENV loaded.");

export const ENV = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL!,
  DIRECT_URL: process.env.DIRECT_URL!,
  SUPABASE_URL: process.env.SUPABASE_URL!,
};