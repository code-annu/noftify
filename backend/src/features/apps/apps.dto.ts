export interface CreateAppInput {
  name: string;
  description?: string;
  ownerId: string;
}

export interface UpdateAppInput {
  appId: string;
  ownerId: string;
  name?: string;
  description?: string;
}

export interface GetAppInput {
  userId: string;
  appId: string;
}

export interface DeleteAppInput {
  userId: string;
  appId: string;
}

