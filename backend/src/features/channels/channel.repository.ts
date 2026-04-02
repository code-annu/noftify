import { injectable } from "inversify";
import { Prisma, PrismaClient } from "../../generated/prisma";
import { prisma } from "../../config/prisma.client";
import { Channel, ChannelCreate, ChannelType } from "./channel.types";
import ChannelMapper from "./channel.mapper";

@injectable()
export default class ChannelRepository {
  private db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  async create(channel: ChannelCreate): Promise<Channel> {
    const channelCreated = await this.db.channel.create({
      data: {
        type: channel.type,
        name: channel.name,
        app_id: channel.appId,
        provider: channel.provider,
        config_json: channel.configJson
          ? (channel.configJson as any)
          : Prisma.DbNull,
      },
      include: { app: true },
    });
    return ChannelMapper.toType(channelCreated);
  }

  async update(
    id: string,
    updates: import("./channel.types").ChannelUpdate,
  ): Promise<Channel> {
    const { name, isEnabled, configJson } = updates;
    const channelUpdated = await this.db.channel.update({
      where: { id: id },
      data: {
        name: name,
        is_enabled: isEnabled,
        config_json: configJson ? (configJson as any) : Prisma.DbNull,
      },
      include: { app: true },
    });
    return ChannelMapper.toType(channelUpdated);
  }

  async findById(id: string): Promise<Channel | null> {
    const channel = await this.db.channel.findUnique({
      where: { id: id },
      include: { app: true },
    });
    return channel ? ChannelMapper.toType(channel) : null;
  }

  async findByAppId(appId: string): Promise<Channel[]> {
    const channels = await this.db.channel.findMany({
      where: { app_id: appId },
      include: { app: true },
    });
    return channels.map(ChannelMapper.toType);
  }

  async delete(id: string): Promise<Channel> {
    const channelDeleted = await this.db.channel.delete({
      where: { id: id },
      include: { app: true },
    });
    return ChannelMapper.toType(channelDeleted);
  }

  async deleteByAppId(appId: string): Promise<number> {
    const result = await this.db.channel.deleteMany({
      where: { app_id: appId },
    });
    return result.count;
  }

  async findByAppIdAndType(
    appId: string,
    type: ChannelType,
  ): Promise<Channel | null> {
    const channel = await this.db.channel.findUnique({
      where: { app_id_type: { app_id: appId, type: type } },
      include: { app: true },
    });
    return channel ? ChannelMapper.toType(channel) : null;
  }
}
