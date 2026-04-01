import { injectable } from "inversify";
import { prisma } from "../../config/prisma.client";
import { PrismaClient } from "../../generated/prisma";
import ProfileMapper from "./profile.mapper";
import { Profile, ProfileCreate, ProfileUpdate } from "./profile.types";

@injectable()
export default class ProfileRepository {
  private readonly db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  async create(profileData: ProfileCreate): Promise<Profile> {
    const { id, firstName, lastName, companyName, email } = profileData;
    const profileCreated = await this.db.profile.create({
      data: {
        id: id,
        first_name: firstName,
        last_name: lastName,
        company_name: companyName,
        email: email,
      },
    });
    return ProfileMapper.toType(profileCreated);
  }

  async update(id: string, updates: ProfileUpdate): Promise<Profile> {
    const { firstName, lastName, companyName } = updates;
    const profileUpdated = await this.db.profile.update({
      where: { id: id },
      data: {
        first_name: firstName,
        last_name: lastName,
        company_name: companyName,
      },
    });
    return ProfileMapper.toType(profileUpdated);
  }

  async delete(id: string): Promise<Profile> {
    const profileDeleted = await this.db.profile.update({
      where: { id: id },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
    return ProfileMapper.toType(profileDeleted);
  }

  async findById(id: string): Promise<Profile | null> {
    const profile = await this.db.profile.findUnique({
      where: { id: id },
    });
    return profile ? ProfileMapper.toType(profile) : null;
  }
}
