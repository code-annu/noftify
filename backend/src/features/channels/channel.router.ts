import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import ChannelController from "./channel.controller";
import { validateRequestBody } from "../../middleware/validate.request.middleware";
import { createChannelSchema, updateChannelSchema } from "./channel.schema";

const channelRouter = Router();

const channelController = container.get<ChannelController>(TYPES.ChannelController);

channelRouter.get("/:channelId", channelController.getChannel);
channelRouter.patch(
  "/:channelId",
  validateRequestBody(updateChannelSchema),
  channelController.patchChannel,
);
channelRouter.delete("/:channelId", channelController.deleteChannel);

export const channelNestedRouter = Router({ mergeParams: true });

channelNestedRouter.get("/", channelController.getAppChannels);
channelNestedRouter.post(
  "/",
  validateRequestBody(createChannelSchema),
  channelController.postChannel,
);
channelNestedRouter.delete("/", channelController.deleteAppChannels);

export default channelRouter;
