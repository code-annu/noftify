import type { NoftifyResponse } from "../../../service/api/noftify.response";

export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  companyName: string;
  createdAt: Date;
}

export interface ProfileResponse extends NoftifyResponse<Profile> {}

export interface ProfileCreateRequestBody {
  firstName: string;
  lastName?: string;
  companyName: string;
}

export interface ProfileUpdateRequestBody {
  firstName?: string;
  lastName?: string;
  companyName?: string;
}
