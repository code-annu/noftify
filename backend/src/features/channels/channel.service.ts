import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import ChannelRepository from "./channel.repository";
import {
  CreateChannelInput,
  DeleteAppChannelsInput,
  DeleteChannelInput,
  GetAppChannelsInput,
  GetChannelInput,
  UpdateChannelInput,
} from "./channel.dto";
import { Channel } from "./channel.types";
import ProfileValidator from "../../validator/profile.validator";
import AppValidator from "../../validator/app.validator";
import ChannelValidator from "../../validator/channel.validator";
import { NotFoundError } from "../../error/errors";

@injectable()
export default class ChannelService {
  constructor(
    @inject(TYPES.ChannelRepository)
    private readonly channelRepo: ChannelRepository,
    @inject(TYPES.ProfileValidator)
    private readonly profileValidator: ProfileValidator,
    @inject(TYPES.AppValidator) private readonly appValidator: AppValidator,
    @inject(TYPES.ChannelValidator)
    private readonly channelValidator: ChannelValidator,
  ) {}

  async createChannel(input: CreateChannelInput): Promise<Channel> {
    const { ownerId, appId, type, name, provider, configJson } = input;

    await this.profileValidator.ensureProfileExists(ownerId);
    await this.appValidator.ensureAppOwner(ownerId, appId);

    await this.channelValidator.ensureAppChannelNotExistOfType(appId, type);

    const channel = await this.channelRepo.create({
      type,
      name,
      appId,
      provider,
      configJson: configJson || null,
    });

    return channel;
  }

  async getChannel(input: GetChannelInput): Promise<Channel> {
    const { ownerId, channelId } = input;
    await this.profileValidator.ensureProfileExists(ownerId);
    const channel = await this.channelRepo.findById(channelId);
    if (!channel) {
      throw new NotFoundError("Channel not found!");
    }

    await this.appValidator.ensureAppOwner(
      ownerId,
      channel.app.id,
      "Only owner can get their app's channels",
    );

    return channel;
  }

  async updateChannel(
    channelId: string,
    ownerId: string,
    input: UpdateChannelInput,
  ): Promise<Channel> {
    await this.profileValidator.ensureProfileExists(ownerId);
    const channel = await this.channelRepo.findById(channelId);
    if (!channel) {
      throw new NotFoundError("Channel not found!");
    }
    this.appValidator.ensureAppOwner(
      ownerId,
      channel.app.id,
      "Only owner can update their app's channels",
    );

    const updatedChannel = await this.channelRepo.update(channelId, {
      name: input.name ?? channel.name,
      isEnabled: input.isEnabled ?? channel.isEnabled,
      configJson: input.configJson ?? channel.configJson,
    });

    return updatedChannel;
  }

  async deleteChannel(input: DeleteChannelInput): Promise<void> {
    const { ownerId, channelId } = input;
    await this.profileValidator.ensureProfileExists(ownerId);
    const channel = await this.channelRepo.findById(channelId);
    if (!channel) {
      throw new NotFoundError("Channel not found!");
    }
    this.appValidator.ensureAppOwner(
      ownerId,
      channel.app.id,
      "Only owner can delete their app's channels",
    );

    await this.channelRepo.delete(channelId);
  }

  async getAppChannels(input: GetAppChannelsInput): Promise<Channel[]> {
    const { ownerId, appId } = input;
    await this.profileValidator.ensureProfileExists(ownerId);
    await this.appValidator.ensureAppOwner(ownerId, appId);

    return await this.channelRepo.findByAppId(appId);
  }

  async deleteAppChannels(input: DeleteAppChannelsInput): Promise<number> {
    const { ownerId, appId } = input;
    await this.profileValidator.ensureProfileExists(ownerId);
    await this.appValidator.ensureAppOwner(
      ownerId,
      appId,
      "Only owner can delete their app's channels",
    );

    return await this.channelRepo.deleteByAppId(appId);
  }
}
