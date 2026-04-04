import type { NoftifyResponse } from "../../../service/api/noftify.response";

export interface App {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  apiKey: string | null;
  owner: {
    id: string;
    firstName: string;
    lastName: string | null;
  };
  createdAt: Date;
}

export interface AppList {
  apps: App[];
  total: number;
}

export interface AppResponse extends NoftifyResponse<App> {}
export interface AppsResponse extends NoftifyResponse<AppList> {}

export interface AppCreateRequestBody {
  name: string;
  description?: string;
}

export interface AppUpdateRequestBody {
  name?: string;
  description?: string;
  isActive?: boolean;
}
