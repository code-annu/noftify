import { Profile } from "./profile.types";

export const buildSingleProfileResponse = (
  profile: Profile,
  message: string,
  statusCode: number,
) => {
  return {
    success: true,
    message,
    statusCode,
    data: {
      id: profile.id,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      companyName: profile.companyName,
      createdAt: profile.createdAt,
    },
  };
};
