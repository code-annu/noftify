import { ChannelConfig, ChannelType } from "./channel.types";

export interface CreateChannelInput {
  ownerId: string;
  appId: string;
  type: ChannelType;
  name: string;
  provider: string;
  configJson?: ChannelConfig;
}

export interface UpdateChannelInput {
  name?: string;
  isEnabled?: boolean;
  configJson?: ChannelConfig;
}

export interface GetChannelInput {
  ownerId: string;
  channelId: string;
}

export interface GetAppChannelsInput {
  ownerId: string;
  appId: string;
}

export interface DeleteChannelInput {
  ownerId: string;
  channelId: string;
}

export interface DeleteAppChannelsInput {
  ownerId: string;
  appId: string;
}
