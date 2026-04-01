interface App {
  readonly id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
}

export interface AppUser {
  readonly id: string;
  externalId: string;
  fullname: string;
  isActive: boolean;
  phone: string | null;
  email: string | null;
  app: App;
  createdAt: Date;
}

export interface AppUserCreate {
  externalId: string;
  fullname: string;
  phone: string | null;
  email: string | null;
  appId: string;
}

export interface AppUserUpdate {
  fullname: string;
  phone: string | null;
  email: string | null;
}
