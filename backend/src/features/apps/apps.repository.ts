import { injectable } from "inversify";
import { PrismaClient } from "../../generated/prisma";
import { prisma } from "../../config/prisma.client";
import { App, AppCreate, AppUpdate } from "./apps.types";
import AppMapper from "./apps.mapper";

@injectable()
export default class AppRepository {
  private readonly db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  async create(app: AppCreate): Promise<App> {
    const appCreated = await this.db.app.create({
      data: {
        name: app.name,
        description: app.description,
        api_key: app.apiKey,
        owner_id: app.ownerId,
      },
      include: { owner: true },
    });

    return AppMapper.toType(appCreated);
  }

  async update(id: string, updates: AppUpdate): Promise<App> {
    const { name, description, apiKey } = updates;
    const appUpdated = await this.db.app.update({
      where: { id: id },
      data: {
        name: name,
        description: description,
        api_key: apiKey,
      },
      include: { owner: true },
    });
    return AppMapper.toType(appUpdated);
  }

  async findById(id: string): Promise<App | null> {
    const app = await this.db.app.findUnique({
      where: { id: id },
      include: { owner: true },
    });
    return app ? AppMapper.toType(app) : null;
  }

  async findByOwnerId(ownerId: string): Promise<App[]> {
    const apps = await this.db.app.findMany({
      where: { owner_id: ownerId },
      include: { owner: true },
    });
    return apps.map(AppMapper.toType);
  }

  async delete(id: string): Promise<App> {
    const appDeleted = await this.db.app.delete({
      where: { id: id },
      include: { owner: true },
    });
    return AppMapper.toType(appDeleted);
  }

  async deleteByOwnerId(ownerId: string): Promise<number> {
    const result = await this.db.app.deleteMany({
      where: { owner_id: ownerId },
    });
    return result.count;
  }

  async findByApiKey(apiKey: string): Promise<App | null> {
    const app = await this.db.app.findUnique({
      where: { api_key: apiKey },
      include: { owner: true },
    });
    return app ? AppMapper.toType(app) : null;
  }
}
