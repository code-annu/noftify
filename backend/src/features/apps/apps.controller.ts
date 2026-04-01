import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import AppService from "./apps.service";
import catchAsync from "../../error/async.catch";
import { AuthRequest } from "../../middleware/auth.middleware";
import { NextFunction, Response } from "express";
import {
  buildSingleAppResponse,
  buildMultipleAppResponse,
} from "./apps.response";
import { BadRequestError } from "../../error/errors";

@injectable()
export default class AppController {
  constructor(
    @inject(TYPES.AppService) private readonly appService: AppService,
  ) {}

  postApp = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const { name, description } = req.body;
      const app = await this.appService.createApp({
        ownerId: userId,
        name: name,
        description: description,
      });

      const response = buildSingleAppResponse(
        app,
        201,
        "App created successfully",
      );
      res.status(response.statusCode).json(response);
    },
  );

  getApp = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }
      const app = await this.appService.getApp({
        userId: userId,
        appId: appId.toString(),
      });
      const response = buildSingleAppResponse(
        app,
        200,
        "App fetched successfully",
      );
      res.status(response.statusCode).json(response);
    },
  );

  updateApp = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }
      const { name, description } = req.body;
      const app = await this.appService.updateApp({
        appId: appId.toString(),
        ownerId: userId,
        name,
        description,
      });
      const response = buildSingleAppResponse(
        app,
        200,
        "App updated successfully",
      );
      res.status(response.statusCode).json(response);
    },
  );

  deleteApp = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }
      await this.appService.deleteApp({
        userId: userId,
        appId: appId.toString(),
      });
      res.status(200).json({
        success: true,
        message: "App deleted successfully",
        statusCode: 200,
      });
    },
  );

  getUserApps = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const apps = await this.appService.getUserApps(userId);
      const response = buildMultipleAppResponse(
        apps,
        200,
        "Apps fetched successfully",
      );
      res.status(response.statusCode).json(response);
    },
  );
}
