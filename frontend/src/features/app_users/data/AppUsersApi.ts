import { deleteRequest } from "../../../service/client/delete-request";
import { getRequest } from "../../../service/client/get-request";
import { patchRequest } from "../../../service/client/patch-request";
import { postRequest } from "../../../service/client/post-request";
import type {
  AppUser,
  AppUserAddRequestBody,
  AppUserList,
  AppUserListResponse,
  AppUserResponse,
  AppUserUpdateRequestBody,
} from "./types";

export default abstract class AppUserApi {
  public async addAppUsers(
    appId: string,
    body: AppUserAddRequestBody,
  ): Promise<AppUserList> {
    const response = await postRequest<AppUserListResponse>(
      `/apps/${appId}/users`,
      body,
    );
    return response.data;
  }

  public async getAppUsers(appId: string): Promise<AppUserList> {
    const response = await getRequest<AppUserListResponse>(
      `/apps/${appId}/users`,
    );
    return response.data;
  }

  public async getAppUser(userId: string): Promise<AppUser> {
    const response = await getRequest<AppUserResponse>(`/app-users/${userId}`);
    return response.data;
  }

  public async updateAppUser(
    userId: string,
    body: AppUserUpdateRequestBody,
  ): Promise<AppUser> {
    const response = await patchRequest<AppUserResponse>(
      `/app-users/${userId}`,
      body,
    );
    return response.data;
  }

  public async deleteAppUser(userId: string): Promise<void> {
    await deleteRequest(`/app-users/${userId}`);
  }

  public async deleteAppUsers(appId: string): Promise<void> {
    await deleteRequest(`/apps/${appId}/users`);
  }
}
