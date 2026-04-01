import { ENV } from "../config/constants";
import { jwtVerify, createRemoteJWKSet } from "jose";

export interface JWTPayload {
  userId: string;
  email: string;
}

const JWKS = createRemoteJWKSet(
  new URL(`${ENV.SUPABASE_URL}/auth/v1/.well-known/jwks.json`),
);

const verifyAccessToken = async (token: string) => {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: `${ENV.SUPABASE_URL}/auth/v1`,
  });

  const result: JWTPayload = {
    userId: payload.sub!.toString(),
    email: payload.email!.toString(),
  };

  return result;
};

// const verifyRefreshToken = (token: string) =>
//   jwt.verify(token, JWT_SECRET) as JWTPayload;

export { verifyAccessToken };
