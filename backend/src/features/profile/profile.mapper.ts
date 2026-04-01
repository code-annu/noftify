import { Profile as PrismaProfile } from "../../generated/prisma";
import { Profile } from "./profile.types";

export default abstract class ProfileMapper {
  public static toType(profile: PrismaProfile): Profile {
    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      companyName: profile.company_name,
      isDeleted: profile.is_deleted,
      deletedAt: profile.deleted_at,
      createdAt: profile.created_at,
    };
  }
}
