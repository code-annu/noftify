import { inject, injectable } from "inversify";
import TYPES from "../di/inversify.types";
import AppUsersRepository from "../features/app_users/app-users.repository";
import { AppUser } from "../features/app_users/app-users.types";
import { NotFoundError } from "../error/errors";

@injectable()
export default class AppUsersValidator {
  constructor(
    @inject(TYPES.AppUsersRepository)
    private readonly appUsersRepo: AppUsersRepository,
  ) {}

  async ensureAppUserExists(id: string): Promise<AppUser> {
    const appUser = await this.appUsersRepo.findById(id);
    if (!appUser) {
      throw new NotFoundError("App user not found");
    }
    return appUser;
  }

  async ensureAppUserExistsOfApp(
    externalId: string,
    appId: string,
  ): Promise<AppUser> {
    const appUser = await this.appUsersRepo.findByExternalIdOfApp(
      externalId,
      appId,
    );
    if (!appUser) {
      throw new NotFoundError("App user not found");
    }
    return appUser;
  }
}
