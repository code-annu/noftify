import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import ChannelService from "./channel.service";
import catchAsync from "../../error/async.catch";
import { AuthRequest } from "../../middleware/auth.middleware";
import { NextFunction, Response } from "express";
import { BadRequestError } from "../../error/errors";

@injectable()
export default class ChannelController {
  constructor(
    @inject(TYPES.ChannelService) private readonly channelService: ChannelService,
  ) {}

  postChannel = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }
      
      const { type, name, provider, configJson } = req.body;
      const channel = await this.channelService.createChannel({
        ownerId: userId,
        appId: appId.toString(),
        type,
        name,
        provider,
        configJson,
      });

      res.status(201).json({
        success: true,
        message: "Channel created successfully",
        data: channel,
        statusCode: 201,
      });
    },
  );

  getChannel = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const channelId = req.params.channelId;
      if (!channelId) {
        throw new BadRequestError("Channel id is required");
      }
      const channel = await this.channelService.getChannel({
        ownerId: userId,
        channelId: channelId.toString(),
      });
      res.status(200).json({
        success: true,
        message: "Channel fetched successfully",
        data: channel,
        statusCode: 200,
      });
    },
  );

  patchChannel = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const channelId = req.params.channelId;
      if (!channelId) {
        throw new BadRequestError("Channel id is required");
      }
      const { name, isEnabled, configJson } = req.body;
      const channel = await this.channelService.updateChannel(
        channelId.toString(),
        userId,
        { name, isEnabled, configJson },
      );
      res.status(200).json({
        success: true,
        message: "Channel updated successfully",
        data: channel,
        statusCode: 200,
      });
    },
  );

  deleteChannel = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const channelId = req.params.channelId;
      if (!channelId) {
        throw new BadRequestError("Channel id is required");
      }
      await this.channelService.deleteChannel({
        ownerId: userId,
        channelId: channelId.toString(),
      });
      res.status(200).json({
        success: true,
        message: "Channel deleted successfully",
        statusCode: 200,
      });
    },
  );

  getAppChannels = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }
      const channels = await this.channelService.getAppChannels({
        ownerId: userId,
        appId: appId.toString(),
      });
      res.status(200).json({
        success: true,
        message: "App channels fetched successfully",
        data: channels,
        statusCode: 200,
      });
    },
  );
  
  deleteAppChannels = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }
      const count = await this.channelService.deleteAppChannels({
        ownerId: userId,
        appId: appId.toString(),
      });
      res.status(200).json({
        success: true,
        message: `Deleted ${count} channels successfully`,
        statusCode: 200,
      });
    },
  );
}
