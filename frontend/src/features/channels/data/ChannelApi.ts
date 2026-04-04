import { deleteRequest } from "../../../service/client/delete-request";
import { getRequest } from "../../../service/client/get-request";
import { patchRequest } from "../../../service/client/patch-request";
import { postRequest } from "../../../service/client/post-request";
import type {
  Channel,
  ChannelList,
  ChannelListResponse,
  ChannelResponse,
  CreateChannelRequestBody,
  UpdateChannelRequestBody,
} from "./types";

export default abstract class ChannelApi {
  public static async createChannel(
    appId: string,
    body: CreateChannelRequestBody,
  ): Promise<Channel> {
    const response = await postRequest<ChannelResponse>(
      `/apps/${appId}/channels`,
      body,
    );
    return response.data;
  }

  public static async getChannels(appId: string): Promise<ChannelList> {
    const response = await getRequest<ChannelListResponse>(
      `/apps/${appId}/channels`,
    );
    return response.data;
  }

  public static async getChannelById(channelId: string): Promise<Channel> {
    const response = await getRequest<ChannelResponse>(
      `/channels/${channelId}`,
    );
    return response.data;
  }

  public static async updateChannel(
    channelId: string,
    body: UpdateChannelRequestBody,
  ): Promise<Channel> {
    const response = await patchRequest<ChannelResponse>(
      `/channels/${channelId}`,
      body,
    );
    return response.data;
  }

  public static async deleteChannel(channelId: string): Promise<void> {
    await deleteRequest(`/channels/${channelId}`);
  }
}
