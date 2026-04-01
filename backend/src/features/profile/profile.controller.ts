import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import ProfileService from "./profile.service";
import { AuthRequest } from "../../middleware/auth.middleware";
import { Response, NextFunction } from "express";
import catchAsync from "../../error/async.catch";
import { buildSingleProfileResponse } from "./profile.response";

@injectable()
export default class ProfileController {
  constructor(
    @inject(TYPES.ProfileService) private profileService: ProfileService,
  ) {}

  public postProfile = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const auth = req.auth!;
      const { firstName, lastName, companyName } = req.body;

      const profile = await this.profileService.createProfile({
        id: auth.userId,
        email: auth.email,
        firstName,
        lastName,
        companyName,
      });

      const response = buildSingleProfileResponse(
        profile,
        "Profile created",
        201,
      );
      res.status(response.statusCode).json(response);
    },
  );

  public getProfile = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const auth = req.auth!;
      const profile = await this.profileService.getProfile(auth.userId);
      const response = buildSingleProfileResponse(
        profile,
        "Profile fetched",
        200,
      );
      res.status(response.statusCode).json(response);
    },
  );

  public updateProfile = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const auth = req.auth!;
      const { firstName, lastName, companyName } = req.body;
      const profile = await this.profileService.updateProfile({
        id: auth.userId,
        firstName,
        lastName,
        companyName,
      });
      const response = buildSingleProfileResponse(
        profile,
        "Profile updated",
        200,
      );
      res.status(response.statusCode).json(response);
    },
  );

  public deleteProfile = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const auth = req.auth!;
      await this.profileService.deleteProfile(auth.userId);
      res.status(200).json({
        success: true,
        message: "Profile deleted",
        statusCode: 200,
      });
    },
  );
}
