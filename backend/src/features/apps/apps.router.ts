import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import AppController from "./apps.controller";
import { validateRequestBody } from "../../middleware/validate.request.middleware";
import { createAppSchema, updateAppSchema } from "./apps.schema";
import { appUsersNestedRouter } from "../app_users/app-users.router";

const appRouter = Router();

const appController = container.get<AppController>(TYPES.AppController);

appRouter.post(
  "/",
  validateRequestBody(createAppSchema),
  appController.postApp,
);

appRouter.get("/", appController.getUserApps);

appRouter.get("/:appId", appController.getApp);

appRouter.patch(
  "/:appId",
  validateRequestBody(updateAppSchema),
  appController.updateApp,
);

appRouter.delete("/:appId", appController.deleteApp);

appRouter.use("/:appId/users", appUsersNestedRouter);

export default appRouter;
