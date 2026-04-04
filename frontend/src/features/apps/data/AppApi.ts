import { deleteRequest } from "../../../service/client/delete-request";
import { getRequest } from "../../../service/client/get-request";
import { patchRequest } from "../../../service/client/patch-request";
import { postRequest } from "../../../service/client/post-request";
import type {
  App,
  AppCreateRequestBody,
  AppResponse,
  AppsResponse,
  AppUpdateRequestBody,
} from "./types";

export default abstract class AppApi {
  public static async create(body: AppCreateRequestBody): Promise<App> {
    const response = await postRequest<AppResponse>("/apps", body);
    return response.data;
  }

  public static async getAll(): Promise<App[]> {
    const response = await getRequest<AppsResponse>("/apps");
    return response.data.apps;
  }

  public static async getById(id: string): Promise<App> {
    const response = await getRequest<AppResponse>(`/apps/${id}`);
    return response.data;
  }

  public static async update(
    id: string,
    body: AppUpdateRequestBody,
  ): Promise<App> {
    const response = await patchRequest<AppResponse>(`/apps/${id}`, body);
    return response.data;
  }

  public static async delete(id: string): Promise<void> {
    await deleteRequest(`/apps/${id}`);
  }
}
