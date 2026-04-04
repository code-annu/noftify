import type { NoftifyResponse } from "../../../service/api/noftify.response";

export interface AppUser {
  id: string;
  externalId: string;
  fullname: string;
  phone: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
  app: {
    id: string;
    isActive: boolean;
    name: string;
    createdAt: Date;
  };
}

export interface AppUserList {
  appUsers: AppUser[];
  total: number;
}

export interface AppUserResponse extends NoftifyResponse<AppUser> {}
export interface AppUserListResponse extends NoftifyResponse<AppUserList> {}

export interface AppUserAddRequestBody {
  appUsers: Array<{
    externalId: string;
    fullname: string;
    phone?: string;
    email?: string;
  }>;
}

export interface AppUserUpdateRequestBody {
  email?: string;
  phone?: string;
  fullname?: string;
}
