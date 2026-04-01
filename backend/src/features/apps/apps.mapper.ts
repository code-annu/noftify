import { App as PrismaApp, Profile as AppOwner } from "../../generated/prisma";
import { App } from "./apps.types";

type PrismaAppWithOwner = PrismaApp & { owner: AppOwner };

export default abstract class AppMapper {
  public static toType(appWithOwner: PrismaAppWithOwner): App {
    const { owner, id, name, description, created_at, api_key, is_active } =
      appWithOwner;
    return {
      id,
      description,
      name,
      createdAt: created_at,
      apiKey: api_key,
      isActive: is_active,
      owner: {
        id: owner.id,
        firstName: owner.first_name,
        lastName: owner.last_name,
      },
    };
  }
}
