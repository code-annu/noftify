import { Router } from "express";
import container from "../../di/inversify.config";
import AppUsersController from "./app-users.controller";
import TYPES from "../../di/inversify.types";
import { validateRequestBody } from "../../middleware/validate.request.middleware";
import { addAppUsersSchema } from "./app-users.schema";

const appUsersRouter = Router();
const appUsersController = container.get<AppUsersController>(
  TYPES.AppUsersController,
);

appUsersRouter.get("/:appUserId", appUsersController.getAppUser);
appUsersRouter.patch("/:appUserId", appUsersController.patchAppUser);
appUsersRouter.delete("/:appUserId", appUsersController.deleteAppUser);

export const appUsersNestedRouter = Router({ mergeParams: true });

appUsersNestedRouter.get("/", appUsersController.getAppUsers);
appUsersNestedRouter.post(
  "/",
  validateRequestBody(addAppUsersSchema),
  appUsersController.postAppUsers,
);

export default appUsersRouter;
