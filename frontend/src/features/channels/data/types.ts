import type { NoftifyResponse } from "../../../service/api/noftify.response";

export enum ChannelType {
  EMAIL = "email",
  SMS = "sms",
  PUSH = "push",
}

export interface EmailConfig {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
}

export interface SmSConfig {
  sid: string;
  token: string;
}

export type ChannelConfig = SmSConfig | EmailConfig;

export interface Channel {
  id: string;
  type: ChannelType;
  name: string;
  isEnabled: boolean;
  provider: string;
  configJson: ChannelConfig | null;
  app: {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
  };
  createdAt: Date;
}

export interface ChannelList {
  channels: Channel[];
  total: number;
}

export interface ChannelResponse extends NoftifyResponse<Channel> {}
export interface ChannelListResponse extends NoftifyResponse<ChannelList> {}

export interface CreateChannelRequestBody {
  type: ChannelType;
  name: string;
  provider: string;
  configJson?: ChannelConfig;
}

export interface UpdateChannelRequestBody {
  name?: string;
  isEnabled?: boolean;
  configJson?: ChannelConfig;
}
