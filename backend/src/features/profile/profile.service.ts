import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import ProfileRepository from "./profile.repository";
import ProfileValidator from "../../validator/profile.validator";
import { ProfileCreateInput, ProfileUpdateInput } from "./profile.dto";
import { Profile } from "./profile.types";
import { ConflictError } from "../../error/errors";

@injectable()
export default class ProfileService {
  constructor(
    @inject(TYPES.ProfileRepository)
    private readonly profileRepo: ProfileRepository,
    @inject(TYPES.ProfileValidator)
    private readonly profileValidator: ProfileValidator,
  ) {}

  async createProfile(input: ProfileCreateInput): Promise<Profile> {
    const existingProfile = await this.profileRepo.findById(input.id);
    if (existingProfile) {
      throw new ConflictError("Profile already exists");
    }

    const profile = await this.profileRepo.create({
      id: input.id,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName || null,
      companyName: input.companyName,
    });
    return profile;
  }

  async updateProfile(input: ProfileUpdateInput): Promise<Profile> {
    const existingProfile = await this.profileValidator.ensureProfileExists(
      input.id,
    );

    const profile = await this.profileRepo.update(input.id, {
      firstName: input.firstName || existingProfile.firstName,
      lastName: input.lastName || existingProfile.lastName,
      companyName: input.companyName || existingProfile.companyName,
    });
    return profile;
  }

  async deleteProfile(id: string): Promise<void> {
    await this.profileValidator.ensureProfileExists(id);
    await this.profileRepo.delete(id);
  }

  async getProfile(id: string): Promise<Profile> {
    return this.profileValidator.ensureProfileExists(id);
  }
}
