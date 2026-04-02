import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import AppUsersRepository from "./app-users.repository";
import { AppUser } from "./app-users.types";
import {
  AppUserCreateInput,
  AppUserUpdateInput,
  DeleteAppUserInput,
  DeleteAppUsersInput,
  GetAppUserInput,
  GetAppUsersInput,
} from "./app-users.dto";
import AppValidator from "../../validator/app.validator";
import ProfileValidator from "../../validator/profile.validator";
import { AppUserLimitExceedError } from "../../error/errors";
import AppUsersValidator from "../../validator/app.users.validator";

@injectable()
export default class AppUsersService {
  private readonly APP_USERS_LIMIT = 100;
  constructor(
    @inject(TYPES.AppUsersRepository)
    private readonly appUsersRepo: AppUsersRepository,
    @inject(TYPES.AppValidator)
    private readonly appValidator: AppValidator,
    @inject(TYPES.ProfileValidator)
    private readonly profileValidator: ProfileValidator,
    @inject(TYPES.AppUsersValidator)
    private readonly appUsersValidator: AppUsersValidator,
  ) {}

  public async addAppUsers(input: AppUserCreateInput): Promise<AppUser[]> {
    const { ownerId, appUsers, appId } = input;
    await this.profileValidator.ensureProfileExists(ownerId);
    await this.appValidator.ensureAppOwner(
      ownerId,
      appId,
      "Only app owner can add app users",
    );

    const existingUsers = await this.appUsersRepo.findByAppId(appId);
    if (existingUsers.length + appUsers.length > this.APP_USERS_LIMIT) {
      throw new AppUserLimitExceedError(
        `You cannot add more app users than your app limit of ${this.APP_USERS_LIMIT}`,
      );
    }

    const createdAppUsers = await Promise.all(
      appUsers.map(async (appUser) => {
        const existingUser = await this.appUsersRepo.findByExternalIdOfApp(
          appUser.externalId,
          appId,
        );
        if (existingUser) return existingUser;
        
        return this.appUsersRepo.create({
          externalId: appUser.externalId,
          fullname: appUser.fullname,
          phone: appUser.phone || null,
          email: appUser.email || null,
          appId: appId,
        });
      }),
    );
    return createdAppUsers;
  }

  public async getAppUsers(input: GetAppUsersInput): Promise<AppUser[]> {
    const { ownerId, appId } = input;
    await this.profileValidator.ensureProfileExists(ownerId);
    await this.appValidator.ensureAppOwner(
      ownerId,
      appId,
      "Only app owner can get app users",
    );
    return this.appUsersRepo.findByAppId(appId);
  }

  public async getAppUser(input: GetAppUserInput): Promise<AppUser> {
    const { ownerId, userId } = input;
    await this.profileValidator.ensureProfileExists(ownerId);
    const appUser = await this.appUsersValidator.ensureAppUserExists(userId);
    await this.appValidator.ensureAppOwner(
      ownerId,
      appUser.app.id,
      "Only app owner can get app user",
    );
    return appUser;
  }

  public async updateAppUser(input: AppUserUpdateInput): Promise<AppUser> {
    const { ownerId, userId, fullname, phone, email } = input;
    await this.profileValidator.ensureProfileExists(ownerId);
    const appUser = await this.appUsersValidator.ensureAppUserExists(userId);
    await this.appValidator.ensureAppOwner(
      ownerId,
      appUser.app.id,
      "Only app owner can update app user",
    );

    return this.appUsersRepo.update(userId, {
      fullname: fullname || appUser.fullname,
      phone: phone || appUser.phone,
      email: email || appUser.email,
    });
  }

  public async deleteAppUser(input: DeleteAppUserInput) {
    const { ownerId, userId } = input;
    await this.profileValidator.ensureProfileExists(ownerId);
    const appUser = await this.appUsersValidator.ensureAppUserExists(userId);
    await this.appValidator.ensureAppOwner(
      ownerId,
      appUser.app.id,
      "Only app owner can delete app user",
    );
    await this.appUsersRepo.delete(userId);
  }

  public async deleteAppUsers(input: DeleteAppUsersInput) {
    const { ownerId, appId } = input;
    await this.profileValidator.ensureProfileExists(ownerId);
    await this.appValidator.ensureAppOwner(
      ownerId,
      appId,
      "Only app owner can delete app users",
    );
    await this.appUsersRepo.deleteByAppId(appId);
  }
}
