import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import { NextFunction, Response } from "express";
import catchAsync from "../../error/async.catch";
import { BadRequestError } from "../../error/errors";
import { AuthRequest } from "../../middleware/auth.middleware";
import {
  buildMultipleAppUsersResponse,
  buildSingleAppUserResponse,
} from "./app-users.response";
import AppUsersService from "./app-users.service";

@injectable()
export default class AppUsersController {
  constructor(
    @inject(TYPES.AppUsersService)
    private readonly appUsersService: AppUsersService,
  ) {}

  getAppUsers = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }
      const appUsers = await this.appUsersService.getAppUsers({
        ownerId: userId,
        appId: appId.toString(),
      });
      const response = buildMultipleAppUsersResponse(
        appUsers,
        200,
        "App users fetched successfully",
      );
      res.status(response.statusCode).json(response);
    },
  );

  postAppUsers = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }

      const appUsers = await this.appUsersService.addAppUsers({
        ownerId: userId,
        appUsers: req.body.appUsers,
        appId: appId.toString(),
      });
      const response = buildMultipleAppUsersResponse(
        appUsers,
        200,
        "App users added successfully",
      );
      res.status(response.statusCode).json(response);
    },
  );

  getAppUser = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appUserId = req.params.appUserId;
      if (!appUserId) {
        throw new BadRequestError("App user id is required");
      }
      const appUser = await this.appUsersService.getAppUser({
        ownerId: userId,
        userId: appUserId.toString(),
      });
      const response = buildSingleAppUserResponse(
        appUser,
        200,
        "App user fetched successfully",
      );
      res.status(response.statusCode).json(response);
    },
  );

  patchAppUser = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appUserId = req.params.appUserId;
      if (!appUserId) {
        throw new BadRequestError("App user id is required");
      }

      const { fullname, phone, email } = req.body;
      const appUser = await this.appUsersService.updateAppUser({
        ownerId: userId,
        userId: appUserId.toString(),
        fullname: fullname,
        phone: phone,
        email: email,
      });
      const response = buildSingleAppUserResponse(
        appUser,
        200,
        "App user updated successfully",
      );
      res.status(response.statusCode).json(response);
    },
  );

  deleteAppUser = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appUserId = req.params.appUserId;
      if (!appUserId) {
        throw new BadRequestError("App user id is required");
      }
      await this.appUsersService.deleteAppUser({
        ownerId: userId,
        userId: appUserId.toString(),
      });

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "App user deleted successfully",
      });
    },
  );

  deleteAppUsers = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }
      await this.appUsersService.deleteAppUsers({
        ownerId: userId,
        appId: appId.toString(),
      });

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "App users deleted successfully",
      });
    },
  );
}
