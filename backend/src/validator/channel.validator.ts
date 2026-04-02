import { inject, injectable } from "inversify";
import TYPES from "../di/inversify.types";
import ChannelRepository from "../features/channels/channel.repository";
import { Channel, ChannelType } from "../features/channels/channel.types";
import { ConflictError, ForbiddenError, NotFoundError } from "../error/errors";
import AppValidator from "./app.validator";

@injectable()
export default class ChannelValidator {
  constructor(
    @inject(TYPES.ChannelRepository)
    private readonly channelRepo: ChannelRepository,
    @inject(TYPES.AppValidator) private readonly appValidator: AppValidator,
  ) {}

  async ensureChannelExists(id: string): Promise<Channel> {
    const channel = await this.channelRepo.findById(id);
    if (!channel) {
      throw new NotFoundError("Channel not found");
    }
    return channel;
  }

  async ensureAppChannelNotExistOfType(appId: string, type: ChannelType) {
    const channel = await this.channelRepo.findByAppIdAndType(appId, type);
    if (channel) {
      throw new ConflictError(
        `Channel of type ${type} already exists for this app`,
      );
    }
  }
}
