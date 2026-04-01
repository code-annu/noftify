interface AppOwner {
  id: string;
  firstName: string;
  lastName: string | null;
}

export interface App {
  readonly id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  apiKey: string;
  createdAt: Date;
  owner: AppOwner;
}

export interface AppCreate {
  name: string;
  description: string | null;
  apiKey: string;
  ownerId: string;
}

export interface AppUpdate {
  name: string;
  description: string | null;
  apiKey: string;
}
