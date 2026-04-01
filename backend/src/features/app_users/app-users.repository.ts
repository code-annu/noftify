import { injectable } from "inversify";
import { PrismaClient } from "../../generated/prisma";
import { prisma } from "../../config/prisma.client";
import { AppUser, AppUserCreate, AppUserUpdate } from "./app-users.types";
import AppUserMapper from "./app-users.mapper";

@injectable()
export default class AppUsersRepository {
  private readonly db: PrismaClient;
  constructor() {
    this.db = prisma;
  }

  public async create(appUser: AppUserCreate): Promise<AppUser> {
    const createdAppUser = await this.db.appUser.create({
      data: {
        external_id: appUser.externalId,
        fullname: appUser.fullname,
        phone: appUser.phone,
        email: appUser.email,
        app_id: appUser.appId,
      },
      include: { app: true },
    });
    return AppUserMapper.toType(createdAppUser);
  }

  public async update(id: string, updates: AppUserUpdate): Promise<AppUser> {
    const updatedAppUser = await this.db.appUser.update({
      where: {
        id: id,
      },
      data: {
        fullname: updates.fullname,
        phone: updates.phone,
        email: updates.email,
      },
      include: { app: true },
    });
    return AppUserMapper.toType(updatedAppUser);
  }

  public async findById(id: string): Promise<AppUser | null> {
    const appUser = await this.db.appUser.findUnique({
      where: { id: id },
      include: { app: true },
    });
    return appUser ? AppUserMapper.toType(appUser) : null;
  }

  public async delete(id: string): Promise<AppUser> {
    const appUserDeleted = await this.db.appUser.delete({
      where: { id: id },
      include: { app: true },
    });
    return AppUserMapper.toType(appUserDeleted);
  }

  public async findByExternalIdOfApp(
    externalId: string,
    appId: string,
  ): Promise<AppUser | null> {
    const appUser = await this.db.appUser.findUnique({
      where: {
        app_id_external_id: {
          app_id: appId,
          external_id: externalId,
        },
      },
      include: { app: true },
    });
    return appUser ? AppUserMapper.toType(appUser) : null;
  }

  public async findByAppId(appId: string): Promise<AppUser[]> {
    const appUsers = await this.db.appUser.findMany({
      where: { app_id: appId },
      include: { app: true },
    });
    return appUsers.map((appUser) => AppUserMapper.toType(appUser));
  }

  public async deleteByAppId(appId: string) {
    await this.db.appUser.deleteMany({
      where: { app_id: appId },
    });
  }
}
