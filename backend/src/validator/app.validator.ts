import { inject, injectable } from "inversify";
import TYPES from "../di/inversify.types";
import AppRepository from "../features/apps/apps.repository";
import { App } from "../features/apps/apps.types";
import { ForbiddenError, NotFoundError } from "../error/errors";

@injectable()
export default class AppValidator {
  constructor(
    @inject(TYPES.AppRepository) private readonly appRepo: AppRepository,
  ) {}

  async ensureAppExists(id: string): Promise<App> {
    const app = await this.appRepo.findById(id);
    if (!app || !app.isActive) {
      throw new NotFoundError("App not found or is not active");
    }
    return app;
  }

  async ensureAppOwner(
    ownerId: string,
    appId: string,
    errorMsg: string = "You are not owner of this app",
  ): Promise<App> {
    const app = await this.ensureAppExists(appId);
    if (app.owner.id !== ownerId) {
      throw new ForbiddenError(errorMsg);
    }
    return app;
  }
}
