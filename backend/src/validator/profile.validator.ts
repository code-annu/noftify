import { inject, injectable } from "inversify";
import { Profile } from "../features/profile/profile.types";
import TYPES from "../di/inversify.types";
import ProfileRepository from "../features/profile/profile.repository";
import { NotFoundError } from "../error/errors";

@injectable()
export default class ProfileValidator {
  constructor(
    @inject(TYPES.ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async ensureProfileExists(id: string): Promise<Profile> {
    const profile = await this.profileRepository.findById(id);
    if (!profile || profile.isDeleted) {
      throw new NotFoundError("Profile not found or deleted");
    }
    return profile;
  }
}
