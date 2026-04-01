import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import AppRepository from "./apps.repository";
import {
  CreateAppInput,
  DeleteAppInput,
  GetAppInput,
  UpdateAppInput,
} from "./apps.dto";
import { App } from "./apps.types";
import ProfileValidator from "../../validator/profile.validator";
import AppValidator from "../../validator/app.validator";
import { AppLimitExceedError } from "../../error/errors";
import { generateApiKey, hashApiKey } from "../../util/api.key.util";

@injectable()
export default class AppService {
  constructor(
    @inject(TYPES.AppRepository) private readonly appRepo: AppRepository,
    @inject(TYPES.ProfileValidator)
    private readonly profileValidator: ProfileValidator,
    @inject(TYPES.AppValidator)
    private readonly appValidator: AppValidator,
  ) {}

  async createApp(input: CreateAppInput): Promise<App> {
    const { ownerId, name, description } = input;

    await this.profileValidator.ensureProfileExists(ownerId);
    const apps = await this.appRepo.findByOwnerId(ownerId);
    if (apps.length >= 3) {
      throw new AppLimitExceedError("You cannot create more than 3 apps");
    }

    const apiKey = generateApiKey();
    const hashedApiKey = hashApiKey(apiKey);

    const app = await this.appRepo.create({
      ownerId,
      name,
      description: description || null,
      apiKey: hashedApiKey,
    });

    return { ...app, apiKey: apiKey };
  }

  async getApp(input: GetAppInput): Promise<App> {
    const { userId, appId } = input;
    await this.profileValidator.ensureProfileExists(userId);
    const app = await this.appValidator.ensureAppOwner(userId, appId);
    return app;
  }

  async updateApp(input: UpdateAppInput): Promise<App> {
    const { appId, ownerId, name, description } = input;
    await this.profileValidator.ensureProfileExists(ownerId);
    const app = await this.appValidator.ensureAppOwner(
      ownerId,
      appId,
      "Only owner can update their apps",
    );

    const updatedApp = await this.appRepo.update(appId, {
      name: name || app.name,
      description: description || app.description,
      apiKey: app.apiKey,
    });
    return { ...updatedApp, apiKey: "" };
  }

  async deleteApp(input: DeleteAppInput) {
    const { userId, appId } = input;
    await this.profileValidator.ensureProfileExists(userId);
    await this.appValidator.ensureAppOwner(
      userId,
      appId,
      "Only owner can delete their app",
    );
    await this.appRepo.delete(appId);
  }

  async getUserApps(userId: string): Promise<App[]> {
    await this.profileValidator.ensureProfileExists(userId);
    const apps = await this.appRepo.findByOwnerId(userId);
    return apps.map((app) => {
      return { ...app, apiKey: "" };
    });
  }
}
