import { deleteRequest } from "../../../service/client/delete-request";
import { getRequest } from "../../../service/client/get-request";
import { patchRequest } from "../../../service/client/patch-request";
import { postRequest } from "../../../service/client/post-request";
import type {
  Profile,
  ProfileCreateRequestBody,
  ProfileResponse,
  ProfileUpdateRequestBody,
} from "./types";

export abstract class ProfileApi {
  public static async createProfile(
    profileData: ProfileCreateRequestBody,
  ): Promise<Profile> {
    const response = await postRequest<ProfileResponse>(
      "/profile",
      profileData,
    );
    return response.data;
  }

  public static async getProfile(): Promise<Profile> {
    const response = await getRequest<ProfileResponse>("/profile");
    return response.data;
  }

  public static async updateProfile(
    data: ProfileUpdateRequestBody,
  ): Promise<Profile> {
    const response = await patchRequest<ProfileResponse>("/profile", data);
    return response.data;
  }

  public static async deleteProfile(): Promise<void> {
    await deleteRequest("/profile");
  }

  public static async getProfileById(id: string): Promise<Profile> {
    const response = await getRequest<ProfileResponse>(`/profile/${id}`);
    return response.data;
  }
}
