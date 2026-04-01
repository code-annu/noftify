import { AppUser } from "./app-users.types";

export const buildMultipleAppUsersResponse = (
  appUsers: AppUser[],
  statusCode: number,
  message: string,
) => {
  return {
    statusCode,
    message,
    data: {
      appUsers,
      total: appUsers.length,
    },
  };
};

export const buildSingleAppUserResponse = (
  appUser: AppUser,
  statusCode: number,
  message: string,
) => {
  return {
    statusCode,
    message,
    data: appUser,
  };
};
