const TYPES = {
  // Profile feature
  ProfileValidator: Symbol.for("ProfileValidator"),
  ProfileRepository: Symbol.for("ProfileRepository"),
  ProfileService: Symbol.for("ProfileService"),
  ProfileController: Symbol.for("ProfileController"),

  // App feature
  AppRepository: Symbol.for("AppRepository"),
  AppValidator: Symbol.for("AppValidator"),
  AppController: Symbol.for("AppController"),
  AppService: Symbol.for("AppService"),

  // AppUsers feature
  AppUsersRepository: Symbol.for("AppUsersRepository"),
  AppUsersValidator: Symbol.for("AppUsersValidator"),
  AppUsersController: Symbol.for("AppUsersController"),
  AppUsersService: Symbol.for("AppUsersService"),

  // Channel feature
  ChannelRepository: Symbol.for("ChannelRepository"),
  ChannelValidator: Symbol.for("ChannelValidator"),
  ChannelController: Symbol.for("ChannelController"),
  ChannelService: Symbol.for("ChannelService"),
};

export default TYPES;
