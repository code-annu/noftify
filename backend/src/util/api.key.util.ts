import crypto from "crypto";

export function generateApiKey() {
  const random = crypto.randomBytes(32).toString("base64url");
  return `sk_${random}`;
}

export function hashApiKey(key: string): string {
  return crypto.createHash("sha256").update(key).digest("hex");
}
