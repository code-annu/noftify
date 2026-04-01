import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import ProfileController from "./profile.controller";
import { validateRequestBody } from "../../middleware/validate.request.middleware";
import { createProfileSchema, updateProfileSchema } from "./profile.schema";

const profileRouter = Router();

const profileController = container.get<ProfileController>(
  TYPES.ProfileController,
);

profileRouter.post(
  "/",
  validateRequestBody(createProfileSchema),
  profileController.postProfile,
);

profileRouter.get("/", profileController.getProfile);

profileRouter.patch(
  "/",
  validateRequestBody(updateProfileSchema),
  profileController.updateProfile,
);

profileRouter.delete("/", profileController.deleteProfile);


export default profileRouter;
