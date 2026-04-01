import { App } from "./apps.types";

export const buildSingleAppResponse = (
  app: App,
  statusCode: number,
  message: string,
) => {
  const { owner, id, name, description, createdAt, isActive, apiKey } = app;

  return {
    success: true,
    message,
    statusCode,
    data: {
      id,
      name,
      description,
      createdAt,
      isActive,
      apiKey,
      owner: {
        id: owner.id,
        firstName: owner.firstName,
        lastName: owner.lastName,
      },
    },
  };
};

export const buildMultipleAppResponse = (
  apps: App[],
  statusCode: number,
  message: string,
) => {
  const userApps = apps.map((app) => {
    const { owner, id, name, description, createdAt, isActive } = app;
    return {
      id,
      name,
      description,
      createdAt,
      isActive,
      apiKey: null,
      owner: {
        id: owner.id,
        firstName: owner.firstName,
        lastName: owner.lastName,
      },
    };
  });

  return {
    success: true,
    message,
    statusCode,
    data: {
      apps: userApps,
      total: userApps.length,
    },
  };
};
