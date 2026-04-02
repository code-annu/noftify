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

interface App {
  readonly id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Channel {
  readonly id: string;
  type: ChannelType;
  name: string;
  app: App;
  isEnabled: boolean;
  provider: string;
  configJson: ChannelConfig | null;
  createdAt: Date;
}

export interface ChannelCreate {
  type: ChannelType;
  name: string;
  appId: string;
  provider: string;
  configJson: ChannelConfig | null;
}

export interface ChannelUpdate {
  name: string;
  isEnabled: boolean;
  configJson: ChannelConfig | null;
}
