export interface AppUserCreateInput {
  ownerId: string;
  appId: string;
  appUsers: {
    externalId: string;
    fullname: string;
    phone?: string;
    email?: string;
  }[];
}

export interface AppUserUpdateInput {
  ownerId: string;
  userId: string;
  fullname?: string;
  phone?: string;
  email?: string;
}

export interface GetAppUsersInput {
  ownerId: string;
  appId: string;
}

export interface DeleteAppUserInput {
  ownerId: string;
  userId: string;
}

export interface DeleteAppUsersInput {
  ownerId: string;
  appId: string;
}

export interface GetAppUserInput {
  ownerId: string;
  userId: string;
}
