import {
  App as PrismaApp,
  AppUser as PrismaAppUser,
} from "../../generated/prisma";
import { AppUser } from "./app-users.types";

type AppUserWithApp = PrismaAppUser & {
  app: PrismaApp;
};

export default abstract class AppUserMapper {
  public static toType(appUserWithApp: AppUserWithApp): AppUser {
    const {
      app,
      id,
      external_id,
      fullname,
      phone,
      email,
      created_at,
      is_active,
    } = appUserWithApp;
    return {
      id,
      externalId: external_id,
      fullname,
      phone,
      email,
      createdAt: created_at,
      isActive: is_active,
      app: {
        id: app.id,
        name: app.name,
        isActive: app.is_active,
        createdAt: app.created_at,
      },
    };
  }
}
