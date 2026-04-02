import { Channel as PrismaChannel } from "../../generated/prisma";
import { Channel, ChannelType, EmailConfig, SmSConfig } from "./channel.types";

type ChannelWithApp = PrismaChannel & {
  app: {
    id: string;
    name: string;
    is_active: boolean;
    created_at: Date;
  };
};

export default abstract class ChannelMapper {
  public static toType(channelWithApp: ChannelWithApp): Channel {
    const {
      app,
      config_json,
      created_at,
      id,
      is_enabled,
      name,
      provider,
      type,
    } = channelWithApp;
    return {
      id,
      type: type as ChannelType,
      name,
      app: {
        id: app.id,
        name: app.name,
        isActive: app.is_active,
        createdAt: app.created_at,
      },
      isEnabled: is_enabled,
      provider,
      configJson: config_json as EmailConfig | SmSConfig | null,
      createdAt: created_at,
    };
  }
}
